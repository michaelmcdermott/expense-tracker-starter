---
name: verify
description: Build, run, and screenshot this app to verify a UI/behavior change actually renders and works.
---

# Verify

This is a Vite + React app with no test suite and no Playwright/browser-automation
tool installed. Verification means actually rendering the app and looking at it.

## Steps

1. **Build** (catches compile errors):
   ```bash
   export PATH="/c/Users/mike_/AppData/Local/node-portable/node-v24.18.0-win-x64:$PATH"
   npm run build
   ```

2. **Run the dev server in the background**:
   ```bash
   npm run dev > /tmp/vite-verify.log 2>&1 &
   sleep 2 && cat /tmp/vite-verify.log
   ```
   Note the port — it auto-increments (5173, 5174, ...) if previous dev
   servers from earlier sessions are still bound. Read the actual port from
   the log, don't assume 5173.

3. **Screenshot with headless Edge** (no Chromium/Playwright available on
   this machine):
   ```bash
   "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
     --headless --disable-gpu --no-sandbox \
     --window-size=1280,1500 --virtual-time-budget=3000 \
     --user-data-dir="<unique-tmp-dir>" \
     --screenshot="<output-path>.png" \
     http://localhost:<port>
   ```
   - `--user-data-dir` must be unique per invocation or the screenshot
     silently fails (profile lock).
   - `--virtual-time-budget=3000` lets CSS load-in animations settle before
     capture — otherwise you catch a mid-fade-in frame and misdiagnose it as
     a rendering bug.
   - Read the resulting PNG with the Read tool to actually look at it.

4. **To drive a specific data-dependent code path** (e.g. an edge case in a
   computed value like a gauge/needle/ratio), temporarily edit the seed data
   in `src/App.jsx` (the `useState` transactions array), rebuild/re-screenshot,
   then revert with `git diff --stat` to confirm a clean return to HEAD. This
   is legitimate end-to-end verification (real render, real props) — not a
   unit test.

## Known gotcha: don't trust apparent horizontal overflow from a screenshot alone

`--window-size=W,H` in this headless Edge build does **not** reliably produce
a viewport of exactly `W` — it's been observed reporting `window.innerWidth`
of ~476 regardless of requesting 390/420/450. A screenshot that looks like
content/panels are clipped flush at the right edge (no rounded corner
visible) is ambiguous on its own — it could be a real overflow, or just the
true (larger-than-requested) viewport edge.

To tell the difference, inject a one-off diagnostic before screenshotting:
```html
<script>
  window.addEventListener('load', () => setTimeout(() => {
    const d = document.createElement('div');
    d.style.cssText = 'position:fixed;top:0;left:0;background:red;color:white;font-size:14px;padding:4px;z-index:99999;';
    d.textContent = 'innerWidth=' + window.innerWidth + ' scrollWidth=' + document.documentElement.scrollWidth;
    document.body.appendChild(d);
  }, 800);
</script>
```
in `index.html` temporarily. If `scrollWidth <= innerWidth`, there is no real
overflow — remove the diagnostic and move on. Only chase a layout fix if
`scrollWidth` is genuinely larger.

## Node/npm not on PATH

Prepend the portable Node install if `npm`/`node` aren't found:
`C:\Users\mike_\AppData\Local\node-portable\node-v24.18.0-win-x64`

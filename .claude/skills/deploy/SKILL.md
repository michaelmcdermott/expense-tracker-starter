---
name: deploy
description: Run tests, build the production bundle, and push the build to the local staging folder for this project. Use when the user asks to "deploy", "ship", "push to staging", or "cut a build" for the expense tracker app.
---

# Deploy

Deploys this project locally: run the test gate, build the production
bundle, then publish it into the local staging folder.

## Steps

1. **Test gate.** Check whether `package.json` has a `scripts.test` entry.
   - If it does, run `npm test` and stop here (do not build or push) if it
     fails.
   - If it doesn't (true as of this writing — see CLAUDE.md, "There is no
     test suite configured in this project"), print a one-line note that
     there's no test suite yet and continue. This step is a placeholder:
     once a test script exists, it becomes a real gate with no changes
     needed here.

2. **Build.** Run `npm run build`. This produces `dist/`. Stop and report
   the failure if the build errors — never push a stale or partial build.

3. **Push to staging.** Copy the contents of `dist/` into `staging/` at
   the project root, replacing whatever was there before (staging always
   mirrors the latest successful build, it isn't versioned history).
   - PowerShell: `Remove-Item staging -Recurse -Force -ErrorAction SilentlyContinue; Copy-Item dist staging -Recurse`
   - Bash: `rm -rf staging && cp -r dist staging`
   - `staging/` is gitignored (same as `dist/`) — this is a local publish
     step, not a commit/push to any git remote.

4. **Report** the staging path and a summary of what ran (tests
   skipped/passed, build output size, files copied).

## Notes

- `node`/`npm` may not be on `PATH` in this environment even though the
  project needs them — if `npm` isn't found, check for a portable Node
  install (this machine has one under
  `C:\Users\mike_\AppData\Local\node-portable\node-v24.18.0-win-x64`)
  and prepend it to `PATH` for the session rather than failing.
- Don't `git push` anything as part of this skill — "staging" here means
  the local `staging/` folder, not a remote branch or hosting provider.

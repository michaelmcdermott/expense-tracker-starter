// Fixed categorical order/hues so a category always gets the same color,
// regardless of how the data is sorted or filtered. Shared between the
// category chart and the transaction list's category dots.
export const CATEGORY_COLORS = {
  food: '#2a78d6',
  housing: '#1baf7a',
  utilities: '#eda100',
  transport: '#008300',
  entertainment: '#4a3aa7',
  salary: '#e34948',
  other: '#e87ba4',
}

export const OTHER_COLOR = '#898781'

export function colorFor(category) {
  return category === 'Other' ? OTHER_COLOR : CATEGORY_COLORS[category] || OTHER_COLOR
}

// Fixed categorical order/hues so a category always gets the same color,
// regardless of how the data is sorted or filtered. Shared between the
// category chart and the transaction list's category dots. Tuned to read
// clearly against the dark vault-green panel background.
export const CATEGORY_COLORS = {
  food: '#f2a65a',
  housing: '#63b8ff',
  utilities: '#e8c468',
  transport: '#7fd9c4',
  entertainment: '#b98bd9',
  salary: '#6fcf97',
  other: '#a8a296',
}

export const OTHER_COLOR = '#a8a296'

export function colorFor(category) {
  return category === 'Other' ? OTHER_COLOR : CATEGORY_COLORS[category] || OTHER_COLOR
}

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

// The full category list is derived from CATEGORY_COLORS so a category can
// never exist here without a matching color (or vice versa). Which type
// each category applies to is separate metadata (colors don't imply type),
// so it's tracked explicitly below, but co-located here as the one other
// place category identity is defined.
export const ALL_CATEGORIES = Object.keys(CATEGORY_COLORS)

export const CATEGORIES_BY_TYPE = {
  income: ['salary', 'other'],
  expense: ['food', 'housing', 'utilities', 'transport', 'entertainment', 'other'],
}

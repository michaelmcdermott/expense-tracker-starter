// Shared aggregation/formatting helpers so Summary, TransactionList, and
// SpendingChart can't drift out of sync on how a total is computed or shown.

export function sumByType(transactions, type) {
  return transactions
    .filter(t => t.type === type)
    .reduce((sum, t) => sum + t.amount, 0)
}

export function sumByCategory(transactions, category, type) {
  return transactions
    .filter(t => t.category === category && (type === undefined || t.type === type))
    .reduce((sum, t) => sum + t.amount, 0)
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export function formatCurrency(amount) {
  return currencyFormatter.format(amount)
}

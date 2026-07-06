import { useState } from 'react'
import { colorFor } from './categoryColors'
import { sumByType, formatCurrency } from './utils/transactions.js'

function TransactionList({ transactions, categories, onDeleteTransaction }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredTransactions = transactions.filter(t =>
    (filterType === "all" || t.type === filterType) &&
    (filterCategory === "all" || t.category === filterCategory)
  );

  const filteredTotalIn = sumByType(filteredTransactions, "income");
  const filteredTotalOut = sumByType(filteredTransactions, "expense");

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} aria-label="Filter by type">
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} aria-label="Filter by category">
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th className="amount-col">Money In</th>
              <th className="amount-col">Money Out</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(t => (
              <tr key={t.id}>
                <td className="date-cell">{t.date}</td>
                <td>{t.description}</td>
                <td>
                  <span className="category-dot" style={{ backgroundColor: colorFor(t.category) }} />
                  {t.category}
                </td>
                <td className="amount-col income-amount">{t.type === "income" ? formatCurrency(t.amount) : "—"}</td>
                <td className="amount-col expense-amount">{t.type === "expense" ? formatCurrency(t.amount) : "—"}</td>
                <td>
                  <button
                    className="void-btn"
                    onClick={() => {
                      if (window.confirm(`Void "${t.description}"? This can't be undone.`)) {
                        onDeleteTransaction(t.id);
                      }
                    }}
                  >
                    Void
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="totals-label">Total</td>
              <td className="amount-col income-amount">{formatCurrency(filteredTotalIn)}</td>
              <td className="amount-col expense-amount">{formatCurrency(filteredTotalOut)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default TransactionList

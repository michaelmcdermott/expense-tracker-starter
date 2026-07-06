import { useState } from 'react'
import { colorFor } from './categoryColors'

function TransactionList({ transactions, categories, onDeleteTransaction }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  const totalIn = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalOut = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
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
                <td className="amount-col income-amount">{t.type === "income" ? `$${t.amount.toLocaleString()}` : "—"}</td>
                <td className="amount-col expense-amount">{t.type === "expense" ? `$${t.amount.toLocaleString()}` : "—"}</td>
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
              <td className="amount-col income-amount">${totalIn.toLocaleString()}</td>
              <td className="amount-col expense-amount">${totalOut.toLocaleString()}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default TransactionList

import { sumByType, formatCurrency } from './utils/transactions.js'

function Summary({ transactions }) {
  const totalIncome = sumByType(transactions, "income");
  const totalExpenses = sumByType(transactions, "expense");
  const balance = totalIncome - totalExpenses;

  // Needle sweeps a 180deg arc: fully left (-90deg) means the balance is
  // wiped out, fully right (+90deg) means none of the income has been spent.
  const ratio = totalIncome > 0 ? Math.max(0, Math.min(1, balance / totalIncome)) : 0.5;
  const needleDeg = -90 + ratio * 180;

  return (
    <div className="summary">
      <div className="summary-cell">
        <h3>Money In</h3>
        <p className="income-amount">{formatCurrency(totalIncome)}</p>
      </div>
      <div className="summary-cell">
        <h3>Money Out</h3>
        <p className="expense-amount">{formatCurrency(totalExpenses)}</p>
      </div>
      <div className="summary-cell summary-cell-balance">
        <div
          className="dial"
          role="img"
          aria-label={`Balance ${formatCurrency(balance)}`}
          style={{ '--needle-color': balance >= 0 ? 'var(--credit)' : 'var(--debit)' }}
        >
          <div className="dial-needle" style={{ transform: `rotate(${needleDeg}deg)` }} />
          <div className="dial-face">
            <p className="balance-amount">{formatCurrency(balance)}</p>
            <h3>Balance</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary

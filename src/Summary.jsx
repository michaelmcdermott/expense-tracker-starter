function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Needle sweeps a 180deg arc: fully left (-90deg) means the balance is
  // wiped out, fully right (+90deg) means none of the income has been spent.
  const ratio = totalIncome > 0 ? Math.max(0, Math.min(1, balance / totalIncome)) : 0.5;
  const needleDeg = -90 + ratio * 180;

  return (
    <div className="summary">
      <div className="summary-cell">
        <h3>Money In</h3>
        <p className="income-amount">${totalIncome.toLocaleString()}</p>
      </div>
      <div className="summary-cell">
        <h3>Money Out</h3>
        <p className="expense-amount">${totalExpenses.toLocaleString()}</p>
      </div>
      <div className="summary-cell summary-cell-balance">
        <div className="dial" role="img" aria-label={`Balance $${balance.toLocaleString()}`}>
          <div className="dial-needle" style={{ transform: `rotate(${needleDeg}deg)` }} />
          <div className="dial-face">
            <p className="balance-amount">${balance.toLocaleString()}</p>
            <h3>Balance</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary

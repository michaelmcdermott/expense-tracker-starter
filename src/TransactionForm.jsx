import { useState } from 'react'

function TransactionForm({ categoriesByType, onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(categoriesByType.expense[0]);

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory(categoriesByType[newType][0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedDescription = description.trim();
    const numericAmount = Number(amount);
    if (!trimmedDescription || !(numericAmount > 0)) return;

    onAddTransaction({
      id: crypto.randomUUID(),
      description: trimmedDescription,
      amount: numericAmount,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory(categoriesByType.expense[0]);
  };

  return (
    <div className="add-transaction">
      <h2>New Entry</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          aria-label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          aria-label="Amount"
          className="amount-input"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={type} onChange={(e) => handleTypeChange(e.target.value)} aria-label="Type">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category">
          {categoriesByType[type].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit" className="stamp-btn">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm

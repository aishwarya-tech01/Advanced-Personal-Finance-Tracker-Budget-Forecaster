import React, { useState } from 'react';

const ExpenseForm = ({ userId, onAdded }) => {
  const [form, setForm] = useState({ type: 'expense', category: 'Food', amount: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, user_id: userId })
    });
    setForm({ ...form, amount: '' });
    onAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <input type="text" placeholder="Category (e.g. Food)" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} required />
      <input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} required />
      <button type="submit">Save Transaction</button>
    </form>
  );
};

export default ExpenseForm;
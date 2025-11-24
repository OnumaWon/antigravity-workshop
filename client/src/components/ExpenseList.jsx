import React from 'react';

function ExpenseList({ expenses, onDeleteExpense }) {
    if (expenses.length === 0) {
        return (
            <div className="card" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                <p>No expenses recorded yet.</p>
            </div>
        );
    }

    return (
        <div className="card">
            <ul className="expense-list">
                {expenses.map((expense) => (
                    <li key={expense.id} className="expense-item">
                        <div className="expense-info">
                            <span className="expense-desc">{expense.description}</span>
                            <div className="expense-meta">
                                <span className="category-tag">{expense.category}</span>
                                <span>{new Date(expense.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="expense-amount">฿{parseFloat(expense.amount).toFixed(2)}</span>
                            <button
                                className="delete-btn"
                                onClick={() => onDeleteExpense(expense.id)}
                                aria-label="Delete expense"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 6h18"></path>
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExpenseList;

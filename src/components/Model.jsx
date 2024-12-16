import React from 'react';
import Modal from 'react-modal';
import './Model.css';

Modal.setAppElement('#root'); // Replace '#root' with your app root ID

function Model({
    isIncomeFormVisible,
    setIsIncomeFormVisible,
    isExpenseFormVisible,
    setIsExpenseFormVisible,
    newIncome,
    setNewIncome,
    handleIncomeFormSubmit,
    expenseDetails,
    setExpenseDetails,
    handleExpenseFormSubmit,
    editExpense,  // Add editExpense prop to handle editing functionality
    setEditExpense // Add setEditExpense prop to reset editExpense after submission
}) {
    const handleExpenseChange = (field, value) => {
        // Make sure price is treated as a number
        if (field === 'price') {
            value = parseFloat(value) || 0; // Convert to number, default to 0 if invalid
        }
        setExpenseDetails({ ...expenseDetails, [field]: value });
    };

    return (
        <div>
            {/* Income Modal */}
            <Modal
                isOpen={isIncomeFormVisible}
                onRequestClose={() => setIsIncomeFormVisible(false)}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2 style={{ textAlign: 'left' }}>Add Income</h2>
                <form onSubmit={handleIncomeFormSubmit} className="modal-form" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input
                        type="text"
                        placeholder="Income Amount"
                        value={newIncome}
                        onChange={(e) => setNewIncome(e.target.value)}
                        required
                        style={{ flex: "1", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                    <div className="modal-buttons" style={{ display: "flex", gap: "10px" }}>
                        <button type="submit" style={{ backgroundColor: "#F4BB4A", color: "white", padding: "8px 12px", border: "none", borderRadius: "4px" }}>
                            Add Income
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsIncomeFormVisible(false)}
                            style={{ backgroundColor: "#D9D9D9", padding: "8px 12px", border: "none", borderRadius: "4px" }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Expense Modal */}
            <Modal
                isOpen={isExpenseFormVisible}
                onRequestClose={() => setIsExpenseFormVisible(false)}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2 style={{ textAlign: 'left' }}>{editExpense ? 'Edit Expense' : 'Add Expense'}</h2>
                <form onSubmit={handleExpenseFormSubmit} className="modal-form" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                    <div style={{ display: "flex", gap: "10px", width: "100%", justifyContent: "space-between" }}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={editExpense ? editExpense.title : expenseDetails.title}
                            onChange={(e) => handleExpenseChange('title', e.target.value)}
                            required
                            style={{ flex: "1", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                        />
                        <input
                            type="text"
                            placeholder="Price"
                            value={editExpense ? editExpense.price : expenseDetails.price}
                            onChange={(e) => handleExpenseChange('price', e.target.value)}
                            required
                            style={{ flex: "1", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                        />
                    </div>
                    <div style={{ display: "flex", gap: "10px", width: "100%", justifyContent: "space-between" }}>
                        <select
                            value={editExpense ? editExpense.category : expenseDetails.category}
                            onChange={(e) => handleExpenseChange('category', e.target.value)}
                            required
                            style={{ flex: "1", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Entertainment">Entertainment</option>
                        </select>
                        <input
                            type="date"
                            value={editExpense ? editExpense.date : expenseDetails.date}
                            onChange={(e) => handleExpenseChange('date', e.target.value)}
                            required
                            style={{ flex: "1", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                        />
                    </div>
                    <div className="modal-buttons" style={{ display: "flex", justifyContent: "left", gap: "10px", width: "100%" }}>
                        <button type="submit" style={{ backgroundColor: "#F4BB4A", color: "white", padding: "8px 12px", border: "none", borderRadius: "4px" }}>
                            {editExpense ? 'Save Changes' : 'Add Expense'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsExpenseFormVisible(false);
                                setEditExpense(null); // Reset the editExpense state after closing
                            }}
                            style={{ backgroundColor: "#D9D9D9", padding: "8px 12px", border: "none", borderRadius: "4px" }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Model;

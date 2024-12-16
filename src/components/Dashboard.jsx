import React, { useState, useEffect } from 'react';
import Card from './Card';
import Model from './Model';
import Chart from './Chart';

function Dashboard({
  expenses,
  setExpenses,
  spendAmount,
  setSpendAmount
}) {
  const [balance, setBalance] = useState(() => {
    const storedBalance = localStorage.getItem('balance');
    return storedBalance ? parseFloat(storedBalance) : 5000; // Default to 5000 if not available
  });

  const [isIncomeFormVisible, setIsIncomeFormVisible] = useState(false);
  const [isExpenseFormVisible, setIsExpenseFormVisible] = useState(false);
  const [newIncome, setNewIncome] = useState('');
  const [expenseDetails, setExpenseDetails] = useState({
    title: '',
    price: '',
    category: '',
  });

  // Sync state with localStorage whenever balance, spendAmount, or expenses change
  useEffect(() => {
    localStorage.setItem('balance', balance); // Save balance to localStorage
    localStorage.setItem('spendAmount', spendAmount); // Save spendAmount to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses)); // Save expenses to localStorage
  }, [balance, spendAmount, expenses]); // Depend on balance, spendAmount, expenses

  const aggregateExpensesByCategory = () => {
    const aggregatedData = expenses.reduce((acc, expense) => {
      const { category, price } = expense;
      if (acc[category]) {
        acc[category] += price;
      } else {
        acc[category] = price;
      }
      return acc;
    }, {});

    return Object.keys(aggregatedData).map((category) => ({
      name: category,
      value: aggregatedData[category],
    }));
  };

  const handleIncomeFormSubmit = (e) => {
    e.preventDefault();
    const income = parseFloat(newIncome);
    if (!isNaN(income) && income > 0) {
      const updatedBalance = balance + income;
      setBalance(updatedBalance); // Update balance
      setNewIncome(''); // Reset income input field
      setIsIncomeFormVisible(false); // Close income modal
    }
  };

  const handleExpenseFormSubmit = (e) => {
    e.preventDefault();
    const expense = {
      ...expenseDetails,
      id: Date.now(), // Generate a unique ID for each expense
      price: parseFloat(expenseDetails.price),
    };
  
    if (!isNaN(expense.price) && expense.price > 0) {
      const updatedSpendAmount = spendAmount + expense.price; // Calculate new spendAmount
      const updatedBalance = balance - expense.price; // Calculate new balance
  
      if (updatedBalance >= 0) {
        // Update localStorage directly before state updates
        localStorage.setItem('balance', updatedBalance);
        localStorage.setItem('spendAmount', updatedSpendAmount);
  
        // Update expenses in localStorage immediately
        const updatedExpenses = [...expenses, expense];
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  
        // Update React state
        setSpendAmount(updatedSpendAmount);
        setBalance(updatedBalance);
        setExpenses(updatedExpenses);
  
        // Reset expense details and close modal
        setExpenseDetails({ title: '', price: '', category: '' });
        setIsExpenseFormVisible(false);
      } else {
        alert('Insufficient balance to add this expense.');
      }
    }
  };
  
  
  

  return (
    <div style={{ color: "white", width: "100%", margin: "10px" }}>
      <h2>Expense Tracker</h2>
      <div style={{
        backgroundColor: "#626262",
        width: "97%",
        height: "300px",
        borderRadius: "10px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: "10px"
      }}>
        <Card balance={balance} type="Income" onAddIncome={() => setIsIncomeFormVisible(true)} />
        <Card balance={spendAmount} type="Expenses" onAddIncome={() => setIsExpenseFormVisible(true)} />
        <div>
          <Chart data={aggregateExpensesByCategory()} />
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div style={{ width: "26px", height: "8px", backgroundColor: "#A000FF" }}></div>
              <span style={{ color: "white" }}>Food</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div style={{ width: "26px", height: "8px", backgroundColor: "#FF9304" }}></div>
              <span style={{ color: "white" }}>Entertainment</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div style={{ width: "26px", height: "8px", backgroundColor: "#FDE006" }}></div>
              <span style={{ color: "white" }}>Travel</span>
            </div>
          </div>
        </div>
      </div>
      <Model
        isIncomeFormVisible={isIncomeFormVisible}
        setIsIncomeFormVisible={setIsIncomeFormVisible}
        isExpenseFormVisible={isExpenseFormVisible}
        setIsExpenseFormVisible={setIsExpenseFormVisible}
        newIncome={newIncome}
        setNewIncome={setNewIncome}
        handleIncomeFormSubmit={handleIncomeFormSubmit}
        expenseDetails={expenseDetails}
        setExpenseDetails={setExpenseDetails}
        handleExpenseFormSubmit={handleExpenseFormSubmit}
      />
    </div>
  );
}

export default Dashboard;

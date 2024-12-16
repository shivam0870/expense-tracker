import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import TopExpenses from './TopExpenses';
import RecentTransactions from './RecentTransactions';
import Model from './Model';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('balance');
    return savedBalance ? parseFloat(savedBalance) : 5000;
  });
  const [spendAmount, setSpendAmount] = useState(() => {
    const savedSpendAmount = localStorage.getItem('spendAmount');
    return savedSpendAmount ? parseFloat(savedSpendAmount) : 0;
  });
  const [editExpense, setEditExpense] = useState(null);  // New state for editing an expense
  const [isExpenseFormVisible, setIsExpenseFormVisible] = useState(false);

  // Sync state with localStorage whenever there are changes
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('balance', balance.toString());
    localStorage.setItem('spendAmount', spendAmount.toString());
  }, [expenses, balance, spendAmount]);

  // Get aggregated data for categories
  const getAggregatedData = () => {
    const categories = ['Food', 'Entertainment', 'Travel'];
    const aggregatedData = categories.map((category) => {
      const total = expenses
        .filter((expense) => expense.category === category)
        .reduce((sum, expense) => sum + expense.price, 0);
      return { name: category, value: total };
    });
    return aggregatedData;
  };

  // Function to open the modal for adding/editing an expense
  const openModal = (open) => {
    setIsExpenseFormVisible(open);
  };

  // Function to handle submitting the expense form (either add or edit)
  const handleExpenseFormSubmit = (formData) => {
    if (editExpense) {
      // If we're editing an existing expense, update it
      const updatedExpenses = expenses.map((expense) =>
        expense.id === editExpense.id ? { ...expense, ...formData } : expense
      );
      setExpenses(updatedExpenses);

      // Update balance and spendAmount
      const diff = formData.price - editExpense.price;
      setBalance((prevBalance) => prevBalance - diff);
      setSpendAmount((prevSpendAmount) => prevSpendAmount + diff);

      // Update localStorage
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      localStorage.setItem('balance', (balance - diff).toString());
      localStorage.setItem('spendAmount', (spendAmount + diff).toString());
    } else {
      // If we're adding a new expense, add it to the list
      const newExpense = {
        ...formData,
        price: parseFloat(formData.price),
        id: new Date().toISOString(), // Ensure unique ID for each expense
      };
      const updatedExpenses = [...expenses, newExpense];
      setExpenses(updatedExpenses);

      // Update balance and spendAmount
      setBalance((prevBalance) => prevBalance - newExpense.price);
      setSpendAmount((prevSpendAmount) => prevSpendAmount + newExpense.price);

      // Update localStorage
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      localStorage.setItem('balance', (balance - newExpense.price).toString());
      localStorage.setItem('spendAmount', (spendAmount + newExpense.price).toString());
    }

    // Close the modal
    setIsExpenseFormVisible(false);
    setEditExpense(null); // Reset editExpense after submitting
  };

  return (
    <div>
      <div>
        <Dashboard 
          expenses={expenses} 
          balance={balance} 
          spendAmount={spendAmount} 
          setExpenses={setExpenses}
          setBalance={setBalance}
          setSpendAmount={setSpendAmount} 
        />
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '60%' }}>
          <RecentTransactions 
            expenses={expenses} 
            setExpenses={setExpenses} 
            setBalance={setBalance} 
            setSpendAmount={setSpendAmount} 
            openModal={openModal}
            setEditExpense={setEditExpense}  // Pass down setEditExpense
          />
        </div>
        <div style={{ width: '40%' }}>
          <TopExpenses data={getAggregatedData()} />
        </div>
      </div>

      {/* Modal for adding/editing expenses */}
      <Model
        isExpenseFormVisible={isExpenseFormVisible}
        setIsExpenseFormVisible={setIsExpenseFormVisible}
        expenseDetails={expenses}
        handleExpenseFormSubmit={handleExpenseFormSubmit}
        editExpense={editExpense}
        setEditExpense={setEditExpense}
        setExpenses={setExpenses}
        setBalance={setBalance}
        setSpendAmount={setSpendAmount}
      />
    </div>
  );
}

export default ExpenseTracker;

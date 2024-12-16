import React, { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineCancel, MdOutlineEdit } from "react-icons/md";
import { IoPizzaOutline } from "react-icons/io5";
import { PiGiftLight } from "react-icons/pi";
import { CiRollingSuitcase } from "react-icons/ci";

function RecentTransactions({ expenses, setExpenses, setBalance, setSpendAmount, openModal, setEditExpense }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = (expenseToDelete) => {
    const updatedExpenses = expenses.filter((expense) => expense !== expenseToDelete);
    setExpenses(updatedExpenses);
    setBalance((prevBalance) => prevBalance + expenseToDelete.price);
    setSpendAmount((prevSpendAmount) => prevSpendAmount - expenseToDelete.price);

    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    localStorage.setItem(
      "balance",
      (parseFloat(localStorage.getItem("balance")) + expenseToDelete.price).toString()
    );
    localStorage.setItem(
      "spendAmount",
      (parseFloat(localStorage.getItem("spendAmount")) - expenseToDelete.price).toString()
    );
  };

  const handleEdit = (expenseToEdit) => {
    setEditExpense(expenseToEdit);
    openModal(true);
  };

  const totalPages = Math.ceil(expenses.length / rowsPerPage);
  const paginatedExpenses = expenses.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return <IoPizzaOutline />;
      case "Entertainment":
        return <PiGiftLight />;
      case "Travel":
        return <CiRollingSuitcase />;
      default:
        return null;
    }
  };

  return (
    <div style={{ color: "white", width: "97%", margin: "10px" }}>
      <h2>Recent Transactions</h2>
      <div style={{ backgroundColor: "white", color: "black", borderStartEndRadius: "10px", borderTopLeftRadius: "10px" }}>
        <table style={{ width: "97%", tableLayout: "auto", borderCollapse: "collapse", justifyContent: "center" }}>
          <tbody>
            {paginatedExpenses.length > 0 ? (
              paginatedExpenses.map((expense, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  <td style={{ width: "10%", textAlign: "left", padding: "10px" }}>
                      <div
                        style={{
                          marginTop: "15px",
                          fontSize: "20px",
                          backgroundColor: "#D9D9D9",
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {getCategoryIcon(expense.category)}
                      </div>
                    </td>

                  <td style={{ width: "60%", textAlign: "left", padding: "10px" }}>
                    <div style={{ marginTop: "15px" }}>
                      <div>{expense.title}</div>
                      <small style={{ color: "gray" }}>{formatDate(expense.date)}</small>
                    </div>
                  </td>
                  <td style={{ width: "10%", textAlign: "right", padding: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "10px",
                        color: "#F4BB4A",
                      }}
                    >
                      <strong>₹{expense.price.toFixed(2)}</strong>
                      <div style={{display:"flex"}}>
                        <button
                          style={{
                            marginRight: "5px",
                            backgroundColor: "#e74c3c",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color: "white",
                            border: "none",
                            width: "30px", 
                            height: "30px",
                            padding: "5px 10px",
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(expense)}
                        >
                          <MdOutlineCancel />
                        </button>
                        <button
                          style={{
                            backgroundColor: "#F4BB4A",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color: "white",
                            border: "none",
                            width: "30px", 
                            height: "30px",
                            padding: "5px 10px",
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                          onClick={() => handleEdit(expense)}
                        >
                          <MdOutlineEdit />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", padding: "10px" }}>
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "0px",
          padding: "10px",
          gap: "10px",
          backgroundColor: "white",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          height: "50px",
        }}
      >
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          style={{
            padding: "5px 10px",
            backgroundColor: "#F1F1F1",
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            border: "none",
            width: "40px", 
            height: "40px",
            borderRadius: "50%",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          <FaArrowLeftLong />
        </button>
        <span
          style={{
            backgroundColor: "#43967B",
            width: "25px",
            height: "25px",
            borderRadius: "3px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          {currentPage}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
          style={{
            padding: "5px 10px",
            backgroundColor: "#F1F1F1",
            color: "black",
            border: "none",
            width: "40px", 
            height: "40px",
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
}

export default RecentTransactions;

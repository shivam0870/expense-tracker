import React from 'react'

function Card({ balance, type, onAddIncome }) {
  return (
    <div style={{
        width:"350px", 
        height:"200px", 
        backgroundColor:"#9B9B9B", 
        borderRadius:"10px", 
        display:"flex", 
        flexDirection:"column", 
        justifyContent:"center", 
        alignItems:"center"}}>
        <h2 style={{ fontWeight: "normal" }}>
            {type === 'Income' ? 'Wallet Balance' : type}: 
            <span style={{ color: type === 'Income' ? '#9DFF5B' : '#F4BB4A', fontWeight: "bold" }}>{" ₹"+balance}
            </span>
        </h2>
        <button
            style={{
            borderRadius: "10px",
            width: "10rem",
            height: "2rem",
            color: "white",
            background: type === 'Income'
                ? 'linear-gradient(90deg, #B5DC52 0%, #89E148 100%)'
                : 'linear-gradient(90deg, #FF9595 0%, #FF4747 80%, #FF3838 100%)',
            border: "none",
            fontWeight: "bold",
            cursor: "pointer"
            }}
            onClick={onAddIncome}
        >
            + Add {type}
        </button>
    </div>
  )
}

export default Card;
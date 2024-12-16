import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TopExpenses = ({ data }) => {
  return (
    <div style={{ color: 'white', width: '100%', margin: '10px' }}>
      <h2>Top Expenses</h2>
      <div style={{ backgroundColor: "white", borderRadius: "10px", marginRight: "20px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            layout="vertical" // Makes the bars horizontal
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            {/* Hide the X-axis */}
            <XAxis type="number" hide />
            
            {/* Show Y-axis values, hide axis line and ticks */}
            <YAxis 
              type="category" 
              dataKey="name" 
              width={100} 
              axisLine={false} 
              tickLine={false} 
            />
            
            <Tooltip />
            <Bar 
              dataKey="value" 
              fill="#8884d8" 
              barSize={20} 
              radius={[0, 10, 10, 0]} // Add border radius to the right
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopExpenses;

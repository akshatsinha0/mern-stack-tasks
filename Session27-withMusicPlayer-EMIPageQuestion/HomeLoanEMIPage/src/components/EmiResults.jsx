import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EmiResults = ({ data }) => {
  const { monthlyEMI, totalAmount, totalInterest, principalAmount } = data;

  const formatCurrency = (amount) => {
    return `₹ ${new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)}`;
  };

  const chartData = [
    {
      name: 'Principal',
      value: principalAmount,
      color: '#8b1538'
    },
    {
      name: 'Interest',
      value: totalInterest,
      color: '#f37021'
    }
  ];

  const CustomLegend = () => {
    return (
      <div className="results-summary">
        <div className="result-item">
          <div className="result-label">
            <span className="color-indicator principal"></span>
            Principal amount
          </div>
          <div className="result-value">{formatCurrency(principalAmount)}</div>
        </div>
        <div className="result-item">
          <div className="result-label">
            <span className="color-indicator interest"></span>
            Interest amount
          </div>
          <div className="result-value">{formatCurrency(totalInterest)}</div>
        </div>
        <div className="result-item">
          <div className="result-label">
            Total amount
          </div>
          <div className="result-value">{formatCurrency(totalAmount)}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <CustomLegend />
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="color-indicator principal"></span>
          <span style={{ color: '#888', fontWeight: 500 }}>Principle</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="color-indicator interest"></span>
          <span style={{ color: '#888', fontWeight: 500 }}>Interest</span>
        </div>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="emi-highlight">
        <div className="emi-label">Your Monthly EMI is</div>
        <div className="emi-value">{formatCurrency(monthlyEMI)}</div>
      </div>

      <button className="apply-button">
        APPLY FOR HOME LOAN
      </button>
    </>
  );
};

export default EmiResults;

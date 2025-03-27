// components/AssetSummary.jsx
import React from 'react';

// components/AssetSummary.jsx
const AssetSummary = ({ totalValue }) => {
    return (
      <div className="asset-summary-container">
        <h2>Portfolio Summary</h2>
        <div className="summary-card">
          <h3>Total Value</h3>
          <p className="total-value">${totalValue.toFixed(2)}</p>
        </div>
      </div>
    );
  };

export default AssetSummary;
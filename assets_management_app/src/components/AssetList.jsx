// components/AssetList.jsx
import React from 'react';

const AssetList = ({ assets, removeAsset, calculateDailyGrowth }) => {
  const getTypeDetails = (type) => {
    switch (type) {
      case 'cash':
        return { className: 'cash', label: 'Cash', rate: '8%' };
      case 'property':
        return { className: 'property', label: 'Property', rate: '12%' };
      case 'vehicle':
        return { className: 'vehicle', label: 'Vehicle', rate: '-7%' };
      default:
        return { className: '', label: '', rate: '' };
    }
  };

  return (
    <div className="asset-list">
      <h2>Your Assets</h2>
      {assets.length === 0 ? (
        <p>No assets added yet.</p>
      ) : (
        <ul>
          {assets.map(asset => {
            const updatedAsset = calculateDailyGrowth(asset);
            const typeDetails = getTypeDetails(asset.type);
            
            return (
              <li key={asset.id} className={`asset-item ${typeDetails.className}`}>
                <div className="asset-info">
                  <h3>{asset.name}</h3>
                  <span className="asset-type">{typeDetails.label} ({typeDetails.rate})</span>
                  <div className="asset-values">
                    <span>Initial: ${asset.initialValue.toFixed(2)}</span>
                    <span>Current: ${updatedAsset.currentValue.toFixed(2)}</span>
                  </div>
                  <small>Acquired: {new Date(asset.dateAcquired).toLocaleDateString()}</small>
                </div>
                <button 
                  onClick={() => removeAsset(asset.id)}
                  className="btn-remove"
                >
                  &times;
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AssetList;
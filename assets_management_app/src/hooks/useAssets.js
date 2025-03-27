// hooks/useAssets.js
import { useState, useEffect } from 'react';

const useAssets = () => {
  const [assets, setAssets] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Load from localStorage on initial render
  useEffect(() => {
    const savedAssets = JSON.parse(localStorage.getItem('assets')) || [];
    const savedDate = localStorage.getItem('lastUpdated');
    
    if (savedAssets.length > 0) {
      // Calculate growth for each asset since last update
      const updatedAssets = savedAssets.map(asset => {
        const daysPassed = savedDate ? 
        Math.floor((new Date() - new Date(asset.lastUpdated)) / (1000 * 60 * 60 * 24)) : 0;
        
        if (daysPassed > 0) {
          return calculateGrowth(asset, daysPassed);
        }
        return asset;
      });
      
      setAssets(updatedAssets);
      setLastUpdated(new Date());
      localStorage.setItem('assets', JSON.stringify(updatedAssets));
      localStorage.setItem('lastUpdated', new Date().toISOString());
    }
  }, []);

  // Calculate total value whenever assets change
  useEffect(() => {
    const newTotal = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
    setTotalValue(newTotal);
  }, [assets]);

  const calculateGrowth = (asset, days) => {
    let dailyRate;
    switch (asset.type) {
      case 'cash':
        dailyRate = 0.08 / 365; // 8% yearly
        break;
      case 'property':
        dailyRate = 0.12 / 365; // 12% yearly
        break;
      case 'vehicle':
        dailyRate = -0.07 / 365; // -7% yearly
        break;
      default:
        dailyRate = 0;
    }
    
    const growthFactor = Math.pow(1 + dailyRate, days);
    const newValue = asset.initialValue * growthFactor;
    
    return {
      ...asset,
      currentValue: newValue,
      lastUpdated: new Date().toISOString()
    };
  };

  const calculateDailyGrowth = (asset) => {
    const daysPassed = asset.lastUpdated ? 
      Math.floor((new Date() - new Date(asset.lastUpdated)) / (1000 * 60 * 60 * 24)) : 0;
    
    if (daysPassed > 0) {
      return calculateGrowth(asset, daysPassed);
    }
    return asset;
  };

  const addAsset = (asset) => {
    const newAsset = {
      ...asset,
      id: Date.now(),
      initialValue: parseFloat(asset.initialValue),
      currentValue: parseFloat(asset.initialValue),
      lastUpdated: new Date().toISOString()
    };
    
    const updatedAssets = [...assets, newAsset];
    setAssets(updatedAssets);
    localStorage.setItem('assets', JSON.stringify(updatedAssets));
    localStorage.setItem('lastUpdated', new Date().toISOString());
  };

  const removeAsset = (id) => {
    const updatedAssets = assets.filter(asset => asset.id !== id);
    setAssets(updatedAssets);
    localStorage.setItem('assets', JSON.stringify(updatedAssets));
  };

  return {
    assets,
    addAsset,
    removeAsset,
    calculateDailyGrowth,
    totalValue
  };
};

export default useAssets;
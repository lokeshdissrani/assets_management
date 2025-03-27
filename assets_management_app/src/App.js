// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useAssets from './hooks/useAssets';
import AssetForm from './components/AssetForm';
import AssetList from './components/AssetList';
import AssetSummary from './components/AssetSummary';
import Navbar from './components/Navbar';
import './styles/App.css';
import './styles/responsive.css';

function App() {
  const {
    assets,
    addAsset,
    removeAsset,
    calculateDailyGrowth,
    totalValue
  } = useAssets();

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/assets_management" element={
            <div className="container">
              <div className="row">
                {/* Left Column - AssetForm */}
                <div className="col-md-6">
                  <AssetForm addAsset={addAsset} />
                </div>
                
                {/* Right Column - Summary and List */}
                <div className="col-md-6">
                  <AssetSummary totalValue={totalValue} />
                  <AssetList 
                    assets={assets} 
                    removeAsset={removeAsset} 
                    calculateDailyGrowth={calculateDailyGrowth}
                  />
                </div>
              </div>
            </div>
          } />
          <Route path="/add-asset" element={<AssetForm addAsset={addAsset} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
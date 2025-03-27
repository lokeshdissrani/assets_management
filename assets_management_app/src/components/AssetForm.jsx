// components/AssetForm.jsx
import React, { useState } from 'react';

const AssetForm = ({ addAsset }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'cash',
    initialValue: '',
    dateAcquired: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.initialValue) return;
    
    addAsset(formData);
    setFormData({
      name: '',
      type: 'cash',
      initialValue: '',
      dateAcquired: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="asset-form">
      <h2>Add New Asset</h2>
      <div className="form-group">
        <label>Asset Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Asset Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="cash">Cash (8% yearly growth)</option>
          <option value="property">Property (12% yearly growth)</option>
          <option value="vehicle">Vehicle (7% yearly depreciation)</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Initial Value ($)</label>
        <input
          type="number"
          name="initialValue"
          value={formData.initialValue}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>
      
      <div className="form-group">
        <label>Date Acquired</label>
        <input
          type="date"
          name="dateAcquired"
          value={formData.dateAcquired}
          onChange={handleChange}
          required
        />
      </div>
      
      <button type="submit" className="btn-primary">Add Asset</button>
    </form>
  );
};

export default AssetForm;
import { useState } from 'react';
import axios from 'axios';

import './style.css';

const Dashboard = () => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState('');

  const handleUpdateInventory = async () => {
    try {
      const response = await axios.post(`/api/inventory-update`, {
        productId, quantity,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to update inventory');
    }
  };

  return (
    <>
     <div className="app-wrapper">
      <div className="container">
        <h1>Inventory Dashboard</h1>
        
        <input 
          type="text" 
          className="input" 
          placeholder="Product ID" 
          value={productId} 
          onChange={(e) => setProductId(e.target.value)} 
        />
        
        <input 
          type="number" 
          className="input" 
          placeholder="Quantity" 
          value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value))} 
        />

        <button 
          className="button" 
          onClick={handleUpdateInventory}
        >
          Submit
        </button>
        
        {message && (
          <p className="message">{message}</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Dashboard;

import React from 'react';

const CoinDetailsModal = ({ coin, onClose }) => {
 if (!coin) return null;

 return (
  <div className="modal">
   <div className="modal-content">
    <span className="close" onClick={onClose}>&times;</span>
    <h2>{coin.description} Details</h2>
    <p>Rate: {coin.rate}</p>
    <p dangerouslySetInnerHTML={{ __html: coin.symbol }}></p>

   </div>
  </div>
 );
};

export default CoinDetailsModal;
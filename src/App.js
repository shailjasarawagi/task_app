
import React, { useState, useEffect } from 'react';
import { fetchBitcoinPrice } from '../src/services/api';
import BarChart from '../src/component/Barchart';
import CoinList from '../src/component/CoinList';
import CoinDetailsModal from '../src/component/CoinDetailsModal';

const App = () => {
  const [bitcoinData, setBitcoinData] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const fetchBitcoinData = async () => {
    const data = await fetchBitcoinPrice();
    setBitcoinData(data);
  };

  useEffect(() => {
    fetchBitcoinData();
    const interval = setInterval(() => {
      fetchBitcoinData();
    }, 10000); // Fetch data every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  if (!bitcoinData) return <div>Loading...</div>;

  return (
    <div className="App">
      <h1> Dashboard {bitcoinData.time.updated}</h1>
      <BarChart data={bitcoinData} />
      <CoinList data={bitcoinData} onDetailClick={setSelectedCoin} />
      <CoinDetailsModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
    </div>
  );
};

export default App;

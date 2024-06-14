// src/components/CoinList.js
import React, { useEffect, useState } from 'react';

const CoinList = ({ data, onDetailClick }) => {
 const [coins, setCoins] = useState([]);
 const [searchTerm, setSearchTerm] = useState({ code: '', rate: '' });
 const [sortConfig, setSortConfig] = useState({ key: 'code', direction: 'ascending' });

 useEffect(() => {

  const coinsData = Object.values(data.bpi);
  setCoins(coinsData);

 }, []);

 const handleSearchChange = (event, column) => {
  setSearchTerm({ ...searchTerm, [column]: event.target.value });
 };

 const sortedCoins = [...coins].sort((a, b) => {
  if (a[sortConfig.key] < b[sortConfig.key]) {
   return sortConfig.direction === 'ascending' ? -1 : 1;
  }
  if (a[sortConfig.key] > b[sortConfig.key]) {
   return sortConfig.direction === 'ascending' ? 1 : -1;
  }
  return 0;
 });

 const filteredCoins = sortedCoins.filter((coin) => {
  return (
   coin.code.toLowerCase().includes(searchTerm.code.toLowerCase()) &&
   coin.rate_float.toString().toLowerCase().includes(searchTerm.rate.toLowerCase())
  );
 });

 const requestSort = (key) => {
  let direction = 'ascending';
  if (sortConfig.key === key && sortConfig.direction === 'ascending') {
   direction = 'descending';
  }
  setSortConfig({ key, direction });
 };

 return (
  <div>

   <table>
    <thead>
     <tr>

      <th>
       <div>
        <span onClick={() => requestSort('code')}>Currency Code</span>
        <input
         type="text"
         placeholder="Search Code"
         value={searchTerm.code}
         onChange={(e) => handleSearchChange(e, 'code')}
        />
       </div></th>
      <th> <div>
       <span onClick={() => requestSort('rate_float')}>Rate</span>
       <input
        type="text"
        placeholder="Search Rate"
        value={searchTerm.rate}
        onChange={(e) => handleSearchChange(e, 'rate')}
       />
      </div></th>
      <th>Symbol</th>
      <th>Description</th>
      <th>Rate Float</th>
      <th>Details</th>
     </tr>
    </thead>
    <tbody>

     {filteredCoins.map(coin => (

      <tr key={coin.code}>
       <td>{coin.code}</td>
       <td>{coin.rate}</td>
       <td dangerouslySetInnerHTML={{ __html: coin.symbol }}></td>
       <td>{coin.description}</td>

       <td>{coin.rate_float}</td>
       <td><button onClick={() => onDetailClick(coin)}>Details</button></td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 );
};

export default CoinList;

import axios from 'axios';

const API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

export const fetchBitcoinPrice = async () => {
 const response = await axios.get(API_URL);
 return response.data;
};
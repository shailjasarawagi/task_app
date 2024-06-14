import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ data }) => {
 const chartData = Object.keys(data.bpi).map(key => ({ currency: key, rate: data.bpi[key].rate_float }));

 return (
  <ResponsiveContainer width={700} height={300}>
   <BarChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="currency" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="rate" fill="#8884d8" />
   </BarChart>
  </ResponsiveContainer>
 );
};

export default BarChartComponent;
import React from 'react';
import BidGenerator from '../components/bid/BidGenerator';

const BidEngine = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Project Bid Engine</h1>
        <p className="text-gray-600 mt-2">Generate accurate project bids based on Malaysian market rates</p>
      </div>
      <BidGenerator />
    </div>
  );
};

export default BidEngine;
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";

const NeuralNetworkVisualization: React.FC = () => {
  const [weights, setWeights] = useState([0.5, 0.5, 0.5]);
  const [iteration, setIteration] = useState(0);

  const updateWeights = useCallback(() => {
    setWeights(weights.map(w => w + Math.random() * 0.2 - 0.1));
    setIteration(iteration + 1);
  }, [iteration, weights]);

  useEffect(() => {
    const interval = setInterval(updateWeights, 1000);
    return () => clearInterval(interval);
  }, [weights, iteration, updateWeights]);

  return (
    <div className="my-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Neural Network Weights Visualization</h3>
      <div className="flex justify-around mb-4">
        {weights.map((weight, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 rounded-full bg-highlight flex items-center justify-center mb-2">
              <span className="text-white font-bold">{weight.toFixed(2)}</span>
            </div>
            <p>Weight {index + 1}</p>
          </div>
        ))}
      </div>
      <p className="text-center mb-2">Iteration: {iteration}</p>
      <div className="text-center">
        <Button onClick={updateWeights} className='text-white hover:bg-highlight bg-slate-500'>
          Adjust Weights
        </Button>
      </div>
    </div>
  );
};

export default NeuralNetworkVisualization;

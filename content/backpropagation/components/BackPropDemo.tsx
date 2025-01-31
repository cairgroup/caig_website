"use client";

import React, { useState, useEffect } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

import { NeuralNetwork, initializeNetwork, forwardPass, train, initializeNetworkProps } from './utils/neural-network';
import { NetworkVisualization } from './utils/network-visualization';
import { TypographyH4 } from '@/components/ui/typography';

type StateConst = {
  name: string,
  max: number,
  min: number,
  stepCount: number,
}

const SliderComponent = ({
  constObj,
  constState,
  setConstState
} : {
  constObj: StateConst,
  constState: number,
  setConstState: (param: number) => void
}) => {
  return (
    <div>
      <label>{constObj.name}: {constState.toLocaleString()}</label>
      <Slider min={
        constObj.min
      } max={
        constObj.max
      } step={
        constObj.stepCount
      } value={
        [constState]
      } onValueChange={
        ([value]) => setConstState(value ?? constObj.min)
      } />
    </div>
  );
}

const BackpropagationDemo = () => {
  // Initial States
  const [numLayers, setNumLayers] = useState<number>(1);
  const [neuronsPerLayer, setNeuronsPerLayer] = useState<number>(5);

  // ARCHITECTURE CONSTANTS
  const numLayersConsts = {
    name: 'Number of Hidden Layers',
    max: 3,
    min: 1,
    stepCount: 1
  }
  const neuronsPerLayerConsts = {
    name: 'Neurons Per Hidden Layer',
    max: 5,
    min: 1,
    stepCount: 1
  }

  // CONSTANTS
  const numEpochs = 10;

  const trainingData = [
    { input: [7420,4,2], target: 13300000 },
    { input: [8960,4,4], target: 12250000 },
    { input: [9960,3,2], target: 12250000 },
    { input: [7500,4,2], target: 12215000 },
    { input: [7420,4,1], target: 11410000 },
    { input: [7500,3,3], target: 10850000 },
    { input: [8520,3,1], target: 5250000 },
    { input: [2145,3,1], target: 4200000 },
    { input: [4775,4,1], target: 3325000 },
    { input: [3040,2,1], target: 2870000 },
    { input: [4000,3,1], target: 2730000 },
    { input: [3000,3,1], target: 2485000 },
    { input: [3180,2,1], target: 2310000 },
    { input: [2910,3,1], target: 1750000 },
    { input: [3850,3,1], target: 1750000 }
  ];

  const networkConfig: initializeNetworkProps = {
    inputSize: trainingData[0]?.input.length ?? 3, // [squareFootage, bathrooms, bedrooms]
    hiddenLayers: numLayers,
    neuronsPerLayer: neuronsPerLayer,
    activationFunction: 'ReLU'
  };

  // INPUT CONSTANTS
  const squareFootageConsts = {
    name: 'Square Footage',
    max: trainingData.map((entry) => entry.input[0] ?? 0).sort((a, b) => b - a)[0] ?? 0,
    min: trainingData.map((entry) => entry.input[0] ?? Infinity).sort((a, b) => a - b)[0] ?? 0,
    stepCount: 100
  }
  const bathroomsConsts = {
    name: 'Bathrooms',
    max: trainingData.map((entry) => entry.input[1] ?? 0).sort((a, b) => b - a)[0] ?? 0,
    min: trainingData.map((entry) => entry.input[1] ?? Infinity).sort((a, b) => a - b)[0] ?? 0,
    stepCount: 1,
  }
  const bedroomConsts = {
    name: 'Bedrooms',
    max: trainingData.map((entry) => entry.input[2] ?? 0).sort((a, b) => b - a)[0] ?? 0,
    min: trainingData.map((entry) => entry.input[2] ?? Infinity).sort((a, b) => a - b)[0] ?? 0,
    stepCount: 1
  }
  const targetConsts = {
    name: 'Price',
    max: trainingData.map((entry) => entry.target ?? 0).sort((a, b) => b - a)[0] ?? 0,
    min: trainingData.map((entry) => entry.target ?? Infinity).sort((a, b) => a - b)[0] ?? 0,
  }

  // STATES
  const [network, setNetwork] = useState<NeuralNetwork>(initializeNetwork(networkConfig));
  const [squareFootage, setSquareFootage] = useState(1500);
  const [bathrooms, setBathrooms] = useState(2);
  const [bedrooms, setBedrooms] = useState(3);
  const [prediction, setPrediction] = useState(0);
  const [epoch, setEpoch] = useState(0);
  const [errorHistory, setErrorHistory] = useState<number[]>([]);

  const normalizeInput = (value: number, min: number, max: number) => {
    return (value - min) / (max - min);
  };

  const denormalizeOutput = (value: number, min: number, max: number) => {
    return value * (max - min) + min;
  };

  useEffect(() => {
    setNetwork(initializeNetwork({
      inputSize: 3, // [squareFootage, bathrooms, bedrooms]
      hiddenLayers: numLayers,
      neuronsPerLayer: neuronsPerLayer,
      activationFunction: 'ReLU'
    }));
    setErrorHistory([]);
    setEpoch(0);
  }, [neuronsPerLayer, numLayers]);

  useEffect(() => {
    const normalizedInput = [
      normalizeInput(squareFootage, squareFootageConsts.min, squareFootageConsts.max),
      normalizeInput(bathrooms, bathroomsConsts.min, bathroomsConsts.max),
      normalizeInput(bedrooms, bedroomConsts.min, bedroomConsts.max),
    ];
    const rawPrediction = forwardPass(network, normalizedInput);
    setPrediction(denormalizeOutput(rawPrediction, targetConsts.min, targetConsts.max));
  }, [network, squareFootage, bathrooms, bedrooms]);

  const handleTrain = () => {
    const normalizedInputs = trainingData.map(d => d.input.map((v, i) =>
      normalizeInput(
        v,
        [squareFootageConsts.min, bathroomsConsts.min, bedroomConsts.min]?.[i] ?? 0,
        [squareFootageConsts.max, bathroomsConsts.max, bedroomConsts.max]?.[i] ?? 0
      )
    ));
    const normalizedTargets = trainingData.map(d =>
      normalizeInput(d.target, targetConsts.min, targetConsts.max)
    );
    const {
      network: newNetwork,
      errorHistory: newErrorHistory
    } = train(network, normalizedInputs, normalizedTargets, numEpochs);
    setNetwork(newNetwork);
    setEpoch(epoch + numEpochs);

    const tempErrorHistory = [...errorHistory];
    tempErrorHistory.push(...newErrorHistory);
    setErrorHistory(tempErrorHistory);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl text-background font-bold mb-4">Backpropagation Demo: House Price Prediction</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Card>
            <TypographyH4 className="space-y-1.5 p-6">Input Parameters</TypographyH4>
            <CardContent>
              <div className="space-y-4">
                {/* Square Footage */}
                <SliderComponent
                  constObj={squareFootageConsts}
                  constState={squareFootage}
                  setConstState={setSquareFootage}
                />

                {/* Bathrooms */}
                <SliderComponent
                  constObj={bathroomsConsts}
                  constState={bathrooms}
                  setConstState={setBathrooms}
                />

                {/* Bedrooms */}
                <SliderComponent
                  constObj={bedroomConsts}
                  constState={bedrooms}
                  setConstState={setBedrooms}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <TypographyH4 className="space-y-1.5 p-6">Neural Network Architecture</TypographyH4>
            <CardContent>
              <div className="space-y-4">
                {/* Number of Hidden Layers */}
                <SliderComponent
                  constObj={numLayersConsts}
                  constState={numLayers}
                  setConstState={setNumLayers}
                />

                {/* Neurons Per Hidden Layers */}
                <SliderComponent
                  constObj={neuronsPerLayerConsts}
                  constState={neuronsPerLayer}
                  setConstState={setNeuronsPerLayer}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className='mb-2'>
          <TypographyH4 className="space-y-1.5 p-6">Prediction</TypographyH4>
          <CardContent>
            <p className="sm:text-2xl font-bold">${prediction.toLocaleString()}</p>
            <p>Epoch: {epoch}</p>
            <Button className="text-background bg-transparent hover:bg-highlight border-2 border-highlight mt-2" onClick={handleTrain}>Train ({numEpochs} epoch)</Button>
          </CardContent>
        </Card>
      </div>

      <NetworkVisualization network={network} />

      {errorHistory.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Training Error</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={errorHistory.map((error, epoch) => ({ epoch, error }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="epoch" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="error" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
    </div>
  );
};

export default BackpropagationDemo;

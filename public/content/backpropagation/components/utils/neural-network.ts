interface NeuralNetwork {
  inputLayer: number[];
  hiddenLayers: number[][];
  outputLayer: number;
  weights1: number[][];
  weights2: number[][][];
  weights3: number[];
  learningRate: number;
  activationFunction: 'ReLU' | 'Sigmoid' | 'Tanh';
}

export interface initializeNetworkProps {
  inputSize: number;
  hiddenLayers?: number;
  neuronsPerLayer?: number;
  activationFunction?: 'ReLU' | 'Sigmoid' | 'Tanh';
}

function initializeNetwork({
  inputSize,
  hiddenLayers = 1,
  neuronsPerLayer = 3,
  activationFunction = 'ReLU'
}: initializeNetworkProps): NeuralNetwork {
  return {
    inputLayer: Array(inputSize).fill(0),
    hiddenLayers: Array.from({ length: hiddenLayers }, () => Array(neuronsPerLayer).fill(0)),
    outputLayer: 0, // Predicted house price
    weights1: Array.from({ length: neuronsPerLayer }, () => Array(inputSize).fill(0).map(() => Math.random())),
    weights2: Array.from({ length: hiddenLayers - 1 }, () =>
      Array.from({ length: neuronsPerLayer }, () => Array(neuronsPerLayer).fill(0).map(() => Math.random()))
    ),
    weights3: Array(neuronsPerLayer).fill(0).map(() => Math.random()),
    learningRate: 0.1,
    activationFunction,
  };
}

// Activation functions and their derivatives
const activationFunctions = {
  ReLU: {
    activate: (x: number): number => Math.max(0, x),
    derivative: (x: number): number => x > 0 ? 1 : 0,
  },
  Sigmoid: {
    activate: (x: number): number => 1 / (1 + Math.exp(-x)),
    derivative: (x: number): number => x * (1 - x),
  },
  Tanh: {
    activate: (x: number): number => Math.tanh(x),
    derivative: (x: number): number => 1 - x * x,
  },
};

// Forward pass
function forwardPass(network: NeuralNetwork, input: number[]): number {
  network.inputLayer = input;
  const activate = activationFunctions[network.activationFunction].activate;

  // Calculate hidden layers
  for (let i = 0; i < network.hiddenLayers.length; i++) {
    const currentLayer = network.hiddenLayers[i] ?? [];
    const weights = i === 0 ? network.weights1 : network.weights2[i - 1] ?? [];
    const prevLayer = i === 0 ? network.inputLayer : network.hiddenLayers[i - 1] ?? [];

    for (let j = 0; j < currentLayer.length; j++) {
      let sum = 0;
      for (let k = 0; k < prevLayer.length; k++) {
        sum += (prevLayer[k] ?? 0) * (weights[j]?.[k] ?? 0);
      }
      currentLayer[j] = activate(sum);
    }
  }

  // Calculate output layer
  const lastHiddenLayer = network.hiddenLayers[network.hiddenLayers.length - 1];
  network.outputLayer = lastHiddenLayer?.reduce((sum, neuron, i) =>
    sum + neuron * (network.weights3[i] ?? 0), 0
  ) ?? 0;

  return network.outputLayer;
}

// Backpropagation
function backpropagate(network: NeuralNetwork, target: number): void {
  const outputError = target - network.outputLayer;
  const derivative = activationFunctions[network.activationFunction].derivative;

  // Calculate errors for each layer
  const layerErrors: number[][] = [];
  for (let i = network.hiddenLayers.length - 1; i >= 0; i--) {
    if (i === network.hiddenLayers.length - 1) {
      layerErrors[i] = network.weights3.map(weight => outputError * weight);
    } else {
      layerErrors[i] = network.weights2[i]?.map((_, neuronIndex) =>
        layerErrors[i + 1]?.reduce((sum, error, nextNeuronIndex) =>
          sum + error * (network.weights2[i]?.[nextNeuronIndex]?.[neuronIndex] ?? 0), 0
        ) ?? []
      ) as number[];
    }
  }

  // Update weights3
  for (let i = 0; i < network.weights3.length; i++) {
    const lastHiddenLayer = network.hiddenLayers[network.hiddenLayers.length - 1] ?? [];
    network.weights3[i] += network.learningRate * outputError * (lastHiddenLayer[i] ?? 0);
  }

  // Update weights2 and weights1
  for (let i = network.hiddenLayers.length - 1; i >= 0; i--) {
    const currentLayer = network.hiddenLayers[i] ?? [];
    const prevLayer = i === 0 ? network.inputLayer : network.hiddenLayers[i - 1] ?? [];
    const weights = i === 0 ? network.weights1 : network.weights2[i - 1] ?? [] as number[][];

    for (let j = 0; j < currentLayer.length; j++) {
      const error = layerErrors[i]?.[j] ?? 0;
      const neuronOutput = currentLayer[j] ?? 0;

      for (let k = 0; k < (prevLayer?.length ?? 0); k++) {
        const delta = network.learningRate * error * derivative(neuronOutput) * (prevLayer[k] ?? 0);
        (weights[j] ?? [])[k] = (weights[j]?.[k] ?? 0) + delta;
      }
    }
  }
}

// Train the network
function train(
  network: NeuralNetwork,
  inputs: number[][],
  targets: number[],
  epochs: number
): {
  network: NeuralNetwork;
  errorHistory: number[];
} {
  const errorHistory: number[] = [];

  for (let epoch = 0; epoch < epochs; epoch++) {
    let totalError = 0;

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const target = targets[i];

      if (input && typeof target === 'number') {
        const prediction = forwardPass(network, input);
        backpropagate(network, target);

        // Calculate squared error for this example
        const error = Math.pow(prediction - target, 2);
        totalError += error;
      }
    }

    // Calculate mean squared error for this epoch
    const mse = totalError / inputs.length;
    errorHistory.push(mse);
  }

  return { network, errorHistory };
}

// Normalize input data
function normalizeInput(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

// Denormalize output data
function denormalizeOutput(value: number, min: number, max: number): number {
  return value * (max - min) + min;
}

export {
  type NeuralNetwork,
  initializeNetwork,
  forwardPass,
  backpropagate,
  train,
  normalizeInput,
  denormalizeOutput
};

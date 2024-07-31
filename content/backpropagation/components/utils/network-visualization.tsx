import { useEffect, useRef } from "react";
import { NeuralNetwork } from "./neural-network";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const NetworkVisualization = ({ network }: { network: NeuralNetwork }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = svgRef.current;
      const rect = svg.getBoundingClientRect();
      if (rect.width > 300) {
        svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
      } else {
        svg.setAttribute('viewBox', `0 0 ${rect.width * 2.5} ${rect.height}`);
      }
    }
  }, []);

  const layerCount = 2 + network.hiddenLayers.length; // input + hidden + output
  const maxNeurons = Math.max(
    network.inputLayer.length,
    ...network.hiddenLayers.map(layer => layer.length),
    1 // output layer
  );

  const neuronRadius = 10;
  const layerSpacing = 100;
  const neuronSpacing = 40;

  const height = maxNeurons * neuronSpacing;

  const renderLayer = (neurons: number[], layerIndex: number, color: string) => {
    return neurons.map((_, neuronIndex) => (
      <circle
        aria-label={`${layerIndex}-${neuronIndex}-${neurons}`}
        key={`${layerIndex}-${neuronIndex}`}
        cx={layerIndex * layerSpacing + layerSpacing / 2}
        cy={(height - (neurons.length - 1) * neuronSpacing) / 2 + neuronIndex * neuronSpacing}
        r={neuronRadius}
        fill={color}
      />
    ));
  };

  const renderConnections = (fromLayer: number[], toLayer: number[], weights: number[][], fromIndex: number, toIndex: number) => {
    return weights.flatMap((row, i) =>
      row.map((weight, j) => (
        <line
          key={`w-${fromIndex}-${toIndex}-${i}-${j}`}
          x1={fromIndex * layerSpacing + layerSpacing / 2 + neuronRadius}
          y1={(height - (fromLayer.length - 1) * neuronSpacing) / 2 + j * neuronSpacing}
          x2={toIndex * layerSpacing + layerSpacing / 2 - neuronRadius}
          y2={(height - (toLayer.length - 1) * neuronSpacing) / 2 + (i * neuronSpacing)}
          stroke={weight > 0 ? "rgba(0,255,0,0.5)" : "rgba(255,0,0,0.5)"}
          strokeWidth={Math.abs(weight) * 2}
        />
      ))
    );
  };

  return (
    <Card className="mt-4">
      <CardHeader>Neural Network Visualization</CardHeader>
      <CardContent>
        <svg ref={svgRef} width="100%" height={200} preserveAspectRatio="xMidYMid meet">
          {/* Input Layer */}
          {renderLayer(network.inputLayer, 0, "blue")}

          {/* Hidden Layers */}
          {network.hiddenLayers.map((layer, index) => renderLayer(layer, index + 1, "green"))}

          {/* Output Layer */}
          {renderLayer([network.outputLayer], layerCount - 1, "red")}

          {/* Connections */}
          {renderConnections(network.inputLayer, network.hiddenLayers[0] ?? [], network.weights1, 0, 1)}

          {network.hiddenLayers.slice(0, -1).map((layer, index) =>
            renderConnections(layer, network.hiddenLayers[index + 1] ?? [], network.weights2[index] ?? [[]], index + 1, index + 2)
          )}

          {renderConnections(
            network.hiddenLayers[network.hiddenLayers.length - 1] ?? [],
            [network.outputLayer],
            [network.weights3],
            network.hiddenLayers.length,
            layerCount - 1
          )}
        </svg>
      </CardContent>
    </Card>
  );
};

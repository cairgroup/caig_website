# The No-Bullsh*t Guide to Back Propagation

Possible titles:
1. Understanding Back Propagation in Neural Networks
2. The No-Bullsh*t Guide to Back Propagation
3. Neural Networks and Back Propagation: The In-Depth No Bullsh*t Guide
4. How Machines Learn: Backpropagation and Neural Networks
5. The Math Behind Learning: Backpropagation in Neural Networks
6. Actually Understanding AI Basics: Backpropagation in Neural Networks
7. Back Propagation for Dummies
8. What is back propagation really doing?
9. The most important algorithm in AI
10. Understanding AI from the Ground Up
11.

**Storyboard:**

Section 1 [TODO]:
[W] Introduction with a hook ->
[I] Fun game to get people thinking about the problem ->
[W] Explanation of why game is important and its relevance ->

Section 2 [TODO]:
[W] Explaining the motivation behind neural networks ->
[W] High level concept of the structure of neural networks ->
* Input layers, hidden layers, and output layers
[W/I] Detailed explanation of the feedforward process for the different parts of a neural network
(show the code behind each part of the network and explain step by step why that is) ->
* Nodes / Neurons
* Input layers -> give initial numbers that are used for the neural network
* Weights -> applied on every edge and multiplied to the original number given
  * Edges connect each node from the previous layer to every other node on the next layer
* Bias -> applied as an additional trained component for each
* Activation functions -> used to stratify the results weighting the activations differently to remove noise
* Reward function -> creating a means of defining how good an output is based on the data we have
[I] Create an interactive experience that encapsulates all of the material that was discussed before [TODO] ->

Section 3 [TODO]:
[W] So, how does the network actually learn?
* Explain the high lvl concept of what back propagation actually is
[W] Explain the details behind the math of how it all works
[I] Showing step by step how an input is passed through the network, how the reward is calculated, and how the weights and biases are adjusted accordingly

Section 4 [TODO]:
[W] Give a high level explanation for how this is all implemented in
[I] Show the back propagation demo with an explanation for how to use it
[I] Train the neural network on other pieces of data and then compare it's guesses to yours from the beginning of the game

Section 5 [TODO]:
[W] Conclusion
* What topics were covered
* CTA -> sign up for the readers group or builders group
[I] Quick quiz on everything that was learned
* If some things were wrong suggest parts of the article to review material from

## Introduction [TODO]

We've all heard about AI or artificial intelligence, but how does it actually work? Well, in this article we hope to provide an in-depth look into understanding how primitive neural networks work and how they learn from the data they are given. (Hint: The answer lies in an algorithm called backpropagation)

**So, in this article, we'll explore:**

1. What are neural networks?
2. What is backpropagation?
3. How does backpropagation work?

> Before we start though, this article is interactive in nature. To get the most from this experience, we kindly ask that you play along with the interactive demos.

## House Price Guessing Game

So, we will start off by playing a little game to get an intuitive understand of how we learn! So, we will be doing every mom's favorite activity: guessing housing prices! We will do this based on the square footage, the number of bedrooms, and the number of bathrooms of a given house.

<StartingGame />

After having played the game, you may have noticed that, as you were given feedback on your guesses, you were able to adjust your guesses to get closer to the actual price. This is the essence of learning. We improve a skill by building myelin (or insulation) around the neurons that fire during specific activities:

1. First, we define a goal that we want to do. In this case, correctly predicting the housing price based on the given inputs.
2. Second, we make a prediction based on the given factors.
3. Third, we compare the prediction we made with the action to see if the signals we sent were good.
4. Finally, we repeat the action trying to improve the reward we get for our specified goal.

This process is what has inspired the algorithms that neural networks use to "learn" from data.

## So, what are Neural Networks?

To start, let's ask an even more simple question. What is the problem that neural networks can help solve?

Neural networks are made up of three parts: the input layer, the hidden layers, and the output layer.

1. The input layer - this is the information that is given to the network

are merely a series of dot-products on matricies that attempt to parse diffferent

mimic the operations of the human brain to recognize relationships in a set of data. They are composed of layers of interconnected nodes, or "neurons," that process and transform input data to produce meaningful output.

They are used in a variety of applications, such as image and speech recognition, natural language processing, and more.

In neural networks, this process is done by adjusting the weights of the neurons. This process is what neural networks try to approximate doing by simulating neurons backpropagation aims to help in neural networks.

Multi-Layer Perceptron (MLP) neural networks are a fundamental concept in deep learning. They consist of multiple layers of interconnected nodes, or "neurons," that process and transform input data to produce meaningful output.

<BackPropDemo />

## Structure of an MLP

An MLP typically consists of three types of layers:

1. Input Layer: Receives the initial data
2. Hidden Layer(s): Processes the data
3. Output Layer: Produces the final result

Each neuron in these layers is connected to every neuron in the adjacent layers, forming a fully connected network.

## Forward Propagation

During forward propagation, data flows from the input layer through the hidden layers to the output layer. At each neuron, the input is multiplied by weights, summed, and then passed through an activation function.

Here's a simple example in Python:

```python
def forward_propagation(inputs, weights):
    layer1 = np.dot(inputs, weights[0])
    activation1 = sigmoid(layer1)
    layer2 = np.dot(activation1, weights[1])
    output = sigmoid(layer2)
    return output

def sigmoid(x):
    return 1 / (1 + np.exp(-x))
```

## Backpropagation

Backpropagation is the key algorithm used to train MLPs. It adjusts the weights of the network to minimize the difference between the predicted output and the actual output.

The process involves:

1. Calculating the error at the output layer
2. Propagating this error backwards through the network
3. Adjusting weights based on their contribution to the error

Here's a simplified version of backpropagation:

```python
def backpropagation(inputs, targets, outputs, weights):
    output_error = targets - outputs
    output_delta = output_error * sigmoid_derivative(outputs)

    hidden_error = np.dot(output_delta, weights[1].T)
    hidden_delta = hidden_error * sigmoid_derivative(hidden_layer)

    weights[1] += learning_rate * np.dot(hidden_layer.T, output_delta)
    weights[0] += learning_rate * np.dot(inputs.T, hidden_delta)

def sigmoid_derivative(x):
    return x * (1 - x)
```

## Visualization of Weight Adjustment

Below is an interactive visualization showing how weights might change during the backpropagation process:

<NeuralNetworkVisualization />

In this visualization, you can see three weights being adjusted over time. Each iteration represents a round of backpropagation. The "Adjust Weights" button simulates a manual round of backpropagation.

## Conclusion

MLPs and backpropagation form the foundation of many modern deep learning techniques. While more advanced architectures exist, understanding these core concepts is crucial for anyone diving into the field of neural networks and machine learning.

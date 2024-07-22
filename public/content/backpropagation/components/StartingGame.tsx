import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Bed, Bath, Maximize, Trophy, HelpCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type HouseData = {
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  price: number;
};

type Difficulty = 'easy' | 'medium' | 'hard';

const difficultyMultipliers = {
  easy: 1,
  medium: 1.5,
  hard: 2
};

const generateHouseData = (difficulty: Difficulty): HouseData => {
  const multiplier = difficultyMultipliers[difficulty];
  return {
    bedrooms: Math.floor(Math.random() * 5) + 1,
    bathrooms: Math.floor(Math.random() * 4) + 1,
    squareFootage: Math.floor(Math.random() * 3000) + 1000,
    price: Math.floor((Math.random() * 500000 + 200000) * multiplier),
  };
};

const calculateScore = (guess: number, actual: number): number => {
  const difference = Math.abs(guess - actual);
  const percentageDiff = (difference / actual) * 100;
  return Math.max(100 - Math.floor(percentageDiff), 0);
};

const getHint = (houseData: HouseData): string => {
  const hints = [
    `This house is in a ${Math.random() > 0.5 ? 'popular' : 'quiet'} neighborhood.`,
    `The property has ${Math.random() > 0.5 ? 'a large' : 'a small'} backyard.`,
    `It was built in ${2023 - Math.floor(Math.random() * 50)} and is in ${Math.random() > 0.5 ? 'excellent' : 'good'} condition.`,
    `The house ${Math.random() > 0.7 ? 'has' : 'doesn\'t have'} a garage.`,
    `There ${Math.random() > 0.6 ? 'are' : 'aren\'t'} many similar houses on the market right now.`
  ];
  return hints[Math.floor(Math.random() * hints.length)];
};

const CustomButton = ({ children, ...props }: React.ComponentProps<typeof Button>) => (
  <Button className="mt-4 text-background bg-transparent hover:bg-highlight border-2 border-highlight" {...props}>
    {children}
  </Button>
);

const Tutorial: React.FC = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button className="border-none" variant="outline" size="default">
        <span className='mr-2'>How to play</span> <HelpCircle className="h-6 w-6" />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>How to Play</DialogTitle>
        <DialogDescription>
          <p>
            1. Choose a difficulty level.
          </p>
          <p>
            2. Guess the house price based on the given information.
          </p>
          <p>
            3. Submit your guess and see how close you were.
          </p>
          <p>
            4. Play 7 rounds and try to get the highest score!
          </p>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

const HousePriceGame: React.FC = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [currentHouse, setCurrentHouse] = useState<HouseData | null>(null);
  const [guess, setGuess] = useState('');
  const [scores, setScores] = useState<number[]>([]);
  const [highScores, setHighScores] = useState<Record<Difficulty, number>>({ easy: 0, medium: 0, hard: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [hint, setHint] = useState('');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    setAnimate(true);
    setTimeout(() => {
      const newHouse = generateHouseData(difficulty);
      setCurrentHouse(newHouse);
      setHint(getHint(newHouse));
      setShowResult(false);
      setGuess('');
      setAnimate(false);
    }, 300);
  };

  useEffect(() => {
    if (currentRound > 7) {
      setGameOver(true);
      const totalScore = scores.reduce((a, b) => a + b, 0);
      if (totalScore > highScores[difficulty]) {
        setHighScores({ ...highScores, [difficulty]: totalScore });
      }
    }
  }, [currentRound, scores, highScores, difficulty]);

  const handleGuess = () => {
    if (!currentHouse) return;
    const guessNumber = parseInt(guess);
    if (isNaN(guessNumber)) return;

    const score = calculateScore(guessNumber, currentHouse.price);
    setCurrentScore(score);
    setScores([...scores, score]);
    setShowResult(true);
  };

  const handleNextRound = () => {
    if (currentRound < 7) {
      setCurrentRound(currentRound + 1);
      startNewRound();
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setCurrentRound(1);
    setScores([]);
    setGameOver(false);
    startNewRound();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center align-middle">
          <CardTitle className="text-background m-0">House Price Guessing Game</CardTitle>
          <Tutorial />
        </div>
      </CardHeader>
      <CardContent>
        {!gameOver ? (
          <div className={`space-y-4 transition-opacity duration-300 ${animate ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex justify-between items-center">
              <p>Round: {currentRound}/7</p>
              <Select value={difficulty} onValueChange={(value: Difficulty) => setDifficulty(value)}>
                <SelectTrigger className="w-[180px] bg-background text-black">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="easy" className="hover:bg-slate-400 rounded-lg">Easy</SelectItem>
                  <SelectItem value="medium" className="hover:bg-slate-400 rounded-lg">Medium</SelectItem>
                  <SelectItem value="hard" className="hover:bg-slate-400 rounded-lg">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {currentHouse && (
              <div className={`transition-all duration-300 ${animate ? 'transform translate-x-full opacity-0' : 'transform translate-x-0 opacity-100'}`}>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <Bed className="mr-2" />
                    <span>Bedrooms: {currentHouse.bedrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="mr-2" />
                    <span>Bathrooms: {currentHouse.bathrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Maximize className="mr-2" />
                    <span>Sq Ft: {currentHouse.squareFootage}</span>
                  </div>
                </div>
                <Alert className="text-black">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Hint</AlertTitle>
                  <AlertDescription>{hint}</AlertDescription>
                </Alert>
                <div className="mt-4">
                  <Input
                    type="number"
                    className="text-background border-background placeholder:text-background_3"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Guess the house price"
                    disabled={showResult}
                  />
                </div>
                {!showResult ? (
                  <CustomButton onClick={handleGuess}>Submit Guess</CustomButton>
                ) : (
                  <div className="space-y-2 mt-4 transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
                    <p>Actual price: ${currentHouse.price.toLocaleString()}</p>
                    <p>Your score: {currentScore}</p>
                    <Progress value={currentScore} className="w-full bg-background" />
                    <CustomButton onClick={handleNextRound}>Next Round</CustomButton>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 transition-opacity duration-300 ease-in-out opacity-100">
            <h2 className="text-2xl font-bold text-background">Game Over!</h2>
            <p>Your scores:</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scores.map((score, index) => ({ round: index + 1, score }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="round" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
            <p>Total Score: {scores.reduce((a, b) => a + b, 0)}</p>
            <div className="flex items-center">
              <Trophy className="mr-2" />
              <span>High Score ({difficulty}): {highScores[difficulty]}</span>
            </div>
            <CustomButton onClick={restartGame}>Play Again</CustomButton>
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default HousePriceGame;

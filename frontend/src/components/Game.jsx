import React, { useState, useEffect, useRef } from "react";

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState("RIGHT");
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // Tracks if game has started after Play
  const boxSize = 20;
  const boardSize = 20;

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        case " ":
          togglePause();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, isRunning, isPaused]);

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      let head = { ...newSnake[0] };

      switch (direction) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
        default:
          break;
      }

      if (
        head.x < 0 ||
        head.x >= boardSize ||
        head.y < 0 ||
        head.y >= boardSize ||
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setIsRunning(false);
        alert("Game Over!");
        return;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore(score + 1);
        setFood({
          x: Math.floor(Math.random() * boardSize),
          y: Math.floor(Math.random() * boardSize),
        });
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [snake, food, direction, isRunning, isPaused]);

  useEffect(() => {
    if (!gameStarted) return;
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, boardSize * boxSize, boardSize * boxSize);

    context.fillStyle = "red";
    context.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);

    context.fillStyle = "green";
    snake.forEach((segment) => {
      context.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
    });
  }, [snake, food, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setHasStarted(true);
    setIsRunning(true);
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection("RIGHT");
    setScore(0);
    setIsPaused(false);
  };

  const quitGame = () => {
    setGameStarted(false);
    setHasStarted(false);
    setIsRunning(false);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 dark:text-white h-screen flex flex-col items-center justify-center">
      {!gameStarted ? (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">Snake Game</h1>
          <button
            onClick={() => setGameStarted(true)}
            className="bg-green-500 text-white font-bold py-2 px-6 rounded mb-2 hover:bg-green-700"
          >
            Play
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-2">Score: {score}</h1>
          <div className="flex gap-4 mb-4">
            <button
              onClick={startGame}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              {hasStarted ? "Restart" : "Start"}
            </button>
            <button
              onClick={togglePause}
              className="bg-yellow-500 text-black font-bold py-2 px-4 rounded hover:bg-yellow-700"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
            <button
              onClick={quitGame}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
            >
              Quit
            </button>
          </div>
          <canvas ref={canvasRef} width={boardSize * boxSize} height={boardSize * boxSize} className="border-2 border-white" />
        </div>
      )}
    </div>
  );
};

export default SnakeGame;

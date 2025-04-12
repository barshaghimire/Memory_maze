// import React, { useState, useEffect } from "react";

// const mazeData = [
//   [1, 1, 1, 1, 1],
//   [1, 0, 0, 0, 1],
//   [1, 0, 1, 0, 1],
//   [1, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1],
// ];

// const goalPos = { row: 3, col: 3 };

// const MazeGrid = () => {
//   const [playerPos, setPlayerPos] = useState({ row: 1, col: 1 });
//   const [hasWon, setHasWon] = useState(false);
//   const [hideWalls, setHideWalls] = useState(false);

//   useEffect(() => {
//     // Hide walls after 5 seconds
//     const timer = setTimeout(() => {
//       setHideWalls(true);
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       setPlayerPos((prev) => {
//         if (hasWon) return prev;

//         let { row, col } = prev;
//         let newRow = row;
//         let newCol = col;

//         if (e.key === "ArrowUp") newRow--;
//         else if (e.key === "ArrowDown") newRow++;
//         else if (e.key === "ArrowLeft") newCol--;
//         else if (e.key === "ArrowRight") newCol++;

//         if (mazeData[newRow][newCol] === 1) return prev;

//         if (newRow === goalPos.row && newCol === goalPos.col) {
//           setHasWon(true);
//         }

//         return { row: newRow, col: newCol };
//       });
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [hasWon]);

//   return (
//     <div className="text-center space-y-4">
//       <h1 className="text-2xl font-bold">🧠 Memory Maze: AI Escape</h1>
//       {!hideWalls && <p className="text-sm text-gray-500">Memorize the maze!</p>}
//       {hasWon && (
//         <div className="text-green-500 font-bold text-xl">🎉 You Escaped!</div>
//       )}
//       <div className="grid grid-cols-5 gap-1 justify-center p-4">
//         {mazeData.map((row, rowIndex) =>
//           row.map((cell, colIndex) => {
//             const isPlayerHere =
//               playerPos.row === rowIndex && playerPos.col === colIndex;
//             const isGoalHere =
//               goalPos.row === rowIndex && goalPos.col === colIndex;

//             const showWall = cell === 1 && !hideWalls;

//             return (
//               <div
//                 key={`${rowIndex}-${colIndex}`}
//                 className={`w-12 h-12 flex items-center justify-center rounded border ${
//                   showWall ? "bg-gray-800" : "bg-white"
//                 }`}
//               >
//                 {isGoalHere && !isPlayerHere && (
//                   <div className="w-4 h-4 bg-yellow-500 rounded-full" />
//                 )}
//                 {isPlayerHere && (
//                   <div
//                     className={`w-6 h-6 rounded-full ${
//                       hasWon ? "bg-green-400" : "bg-green-600"
//                     }`}
//                   />
//                 )}
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };





// // src/components/MazeGrid.jsx
// import React, { useEffect, useState } from "react";
// import { generateMaze } from "../utils/generateMaze";
// import { motion } from "framer-motion";

// const size = 15;

// const MazeGrid = () => {
//   const initialData = generateMaze(size);
//   const [displayMazeData, setDisplayMazeData] = useState(initialData);
//   const [activeMazeData, setActiveMazeData] = useState(initialData);
//   const [playerPos, setPlayerPos] = useState(initialData.start);
//   const [hasWon, setHasWon] = useState(false);
//   const [hideWalls, setHideWalls] = useState(false);
//   const [countdown, setCountdown] = useState(5);
//   const [timeTaken, setTimeTaken] = useState(0);
//   const [timerActive, setTimerActive] = useState(false);
//   const [retry, setRetry] = useState(false);

//   useEffect(() => {
//     let countdownInterval;
//     setCountdown(5);
//     setHideWalls(false);
//     setTimerActive(false);
//     setRetry(false);

//     const newMazeData = generateMaze(size);
//     setDisplayMazeData(newMazeData);
//     setActiveMazeData(newMazeData); // Set it here so it's consistent
//     setPlayerPos((prevPos) => prevPos); // 👈 Keep the player at current position

//     countdownInterval = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev <= 1) {
//           clearInterval(countdownInterval);
//           setHideWalls(true);
//           setTimerActive(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(countdownInterval);
//   }, [retry]);

//   useEffect(() => {
//     if (!timerActive) return;
//     const timer = setInterval(() => {
//       setTimeTaken((t) => {
//         if (t >= 10) {
//           clearInterval(timer);
//           setRetry(true);
//           setTimeTaken(0);
//           setTimerActive(false);
//         }
//         return t + 1;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [timerActive]);

//   const movePlayer = (dr, dc) => {
//     const newRow = playerPos.row + dr;
//     const newCol = playerPos.col + dc;
//     const maze = activeMazeData.maze;
//     if (
//       newRow >= 0 &&
//       newRow < size &&
//       newCol >= 0 &&
//       newCol < size &&
//       maze[newRow][newCol] === 0
//     ) {
//       setPlayerPos({ row: newRow, col: newCol });
//     }
//   };

//   useEffect(() => {
//     if (playerPos.row === activeMazeData.goal.row && playerPos.col === activeMazeData.goal.col) {
//       setHasWon(true);
//       setTimerActive(false);
//     }
//   }, [playerPos, activeMazeData.goal.col, activeMazeData.goal.row]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!timerActive || hasWon || retry) return;
//       if (e.key === "ArrowUp") movePlayer(-1, 0);
//       if (e.key === "ArrowDown") movePlayer(1, 0);
//       if (e.key === "ArrowLeft") movePlayer(0, -1);
//       if (e.key === "ArrowRight") movePlayer(0, 1);
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [timerActive, hasWon, retry, playerPos]);

//   const handleRetry = () => {
//     const newMazeData = generateMaze(size);
//     setDisplayMazeData(newMazeData);
//     setActiveMazeData(newMazeData);
//     setPlayerPos(newMazeData.start);
//     setHasWon(false);
//     setTimeTaken(0);
//     setCountdown(5);
//     setRetry(false);
//   };

//   const mazeToRender = hideWalls ? activeMazeData.maze : displayMazeData.maze;
//   const goal = hideWalls ? activeMazeData.goal : displayMazeData.goal;

//   return (
//     <div className="flex flex-col items-center p-4">
//       <h1 className="text-3xl font-bold mb-4">🧠 Memory Maze: AI Escape</h1>
//       {!hideWalls && <p className="text-xl">👀 Memorize the maze: {countdown}s</p>}
//       {hideWalls && !hasWon && <p className="text-xl">⏱️ Time: {timeTaken}s</p>}
//       {hasWon && <p className="text-green-500 text-2xl">🎉 You Escaped!</p>}
//       {retry && (
//         <div className="text-red-500 text-xl mt-4">
//           <p>⏳ Time's up! Try Again?</p>
//           <button onClick={handleRetry} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Retry</button>
//         </div>
//       )}
//       <div className="grid mt-4" style={{ gridTemplateColumns: `repeat(${size}, 20px)` }}>
//         {mazeToRender.map((row, rIdx) =>
//           row.map((cell, cIdx) => {
//             const isPlayer = rIdx === playerPos.row && cIdx === playerPos.col;
//             const isGoal = rIdx === goal.row && cIdx === goal.col;
//             return (
//               <motion.div
//                 key={`${rIdx}-${cIdx}`}
//                 className={`w-5 h-5 border
//                   ${isPlayer ? "bg-yellow-400" :
//                   isGoal ? "bg-green-400" :
//                   hideWalls ? "bg-white" :
//                   cell === 1 ? "bg-black" : "bg-white"}
//                 `}
//                 layout
//               />
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default MazeGrid;

















// src/components/MazeGrid.jsx
import React, { useEffect, useState } from "react";
import { generateMaze } from "../utils/generateMaze";
import { motion } from "framer-motion";

const size = 15;

const MazeGrid = () => {
  const initialData = generateMaze(size);
  const [displayMazeData, setDisplayMazeData] = useState(initialData);
  const [activeMazeData, setActiveMazeData] = useState(initialData);
  const [playerPos, setPlayerPos] = useState(initialData.start);
  const [hasWon, setHasWon] = useState(false);
  const [hideWalls, setHideWalls] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [timeTaken, setTimeTaken] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [retry, setRetry] = useState(false);
  const [level, setLevel] = useState(1); // Added level state

  useEffect(() => {
    let countdownInterval;
    setCountdown(5);
    setHideWalls(false);
    setTimerActive(false);
    setRetry(false);

    const newMazeData = generateMaze(size);
    setDisplayMazeData(newMazeData);
    setActiveMazeData(newMazeData);
    setPlayerPos((prevPos) => prevPos); // Keep player at current position

    countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setHideWalls(true);
          setTimerActive(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [retry, level]); // Added level to dependencies

  useEffect(() => {
    if (!timerActive) return;
    const timer = setInterval(() => {
      setTimeTaken((t) => {
        if (t >= 10) {
          clearInterval(timer);
          setRetry(true);
          setTimeTaken(0);
          setTimerActive(false);
        }
        return t + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timerActive]);

  const movePlayer = (dr, dc) => {
    const newRow = playerPos.row + dr;
    const newCol = playerPos.col + dc;
    const maze = activeMazeData.maze;
    if (
      newRow >= 0 &&
      newRow < size &&
      newCol >= 0 &&
      newCol < size &&
      maze[newRow][newCol] === 0
    ) {
      setPlayerPos({ row: newRow, col: newCol });
    }
  };

  useEffect(() => {
    if (playerPos.row === activeMazeData.goal.row && playerPos.col === activeMazeData.goal.col) {
      setHasWon(true);
      setTimerActive(false);
    }
  }, [playerPos, activeMazeData.goal.col, activeMazeData.goal.row]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!timerActive || hasWon || retry) return;
      if (e.key === "ArrowUp") movePlayer(-1, 0);
      if (e.key === "ArrowDown") movePlayer(1, 0);
      if (e.key === "ArrowLeft") movePlayer(0, -1);
      if (e.key === "ArrowRight") movePlayer(0, 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [timerActive, hasWon, retry, playerPos]);

  const handleRetry = () => {
    const newMazeData = generateMaze(size);
    setDisplayMazeData(newMazeData);
    setActiveMazeData(newMazeData);
    setPlayerPos(newMazeData.start);
    setHasWon(false);
    setTimeTaken(0);
    setCountdown(5);
    setRetry(false);
  };

  // Added next level handler
  const handleNextLevel = () => {
    const newMazeData = generateMaze(size);
    setDisplayMazeData(newMazeData);
    setActiveMazeData(newMazeData);
    setPlayerPos(newMazeData.start);
    setHasWon(false);
    setTimeTaken(0);
    setCountdown(5);
    setRetry(false);
    setLevel(level + 1);
  };

  const mazeToRender = hideWalls ? activeMazeData.maze : displayMazeData.maze;
  const goal = hideWalls ? activeMazeData.goal : displayMazeData.goal;

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">🧠 Memory Maze: AI Escape</h1>
      <p className="text-xl mb-2">Level: {level}</p> {/* Added level display */}
      {!hideWalls && <p className="text-xl">👀 Memorize the maze: {countdown}s</p>}
      {hideWalls && !hasWon && <p className="text-xl">⏱️ Time: {timeTaken}s</p>}
      {hasWon && (
        <div className="text-green-500 text-2xl">
          <p>🎉 You Escaped!</p>
          <button 
            onClick={handleNextLevel} 
            className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
          >
            Next Level ({level + 1})
          </button>
        </div>
      )}
      {retry && (
        <div className="text-red-500 text-xl mt-4">
          <p>⏳ Time's up! Try Again?</p>
          <button onClick={handleRetry} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Retry</button>
        </div>
      )}
      <div className="grid mt-4" style={{ gridTemplateColumns: `repeat(${size}, 20px)` }}>
        {mazeToRender.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            const isPlayer = rIdx === playerPos.row && cIdx === playerPos.col;
            const isGoal = rIdx === goal.row && cIdx === goal.col;
            return (
              <motion.div
                key={`${rIdx}-${cIdx}`}
                className={`w-5 h-5 border
                  ${isPlayer ? "bg-yellow-400" :
                  isGoal ? "bg-green-400" :
                  hideWalls ? "bg-white" :
                  cell === 1 ? "bg-black" : "bg-white"}
                `}
                layout
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default MazeGrid;
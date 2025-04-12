export function generateMaze(size) {
    const maze = Array(size).fill(0).map(() => Array(size).fill(1));
    const dirs = [
      [0, -2],
      [0, 2],
      [-2, 0],
      [2, 0],
    ];
  
    function isInBounds(r, c) {
      return r > 0 && r < size - 1 && c > 0 && c < size - 1;
    }
  
    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  
    function carve(r, c) {
      maze[r][c] = 0;
      const directions = [...dirs];
      shuffle(directions);
  
      for (let [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (isInBounds(nr, nc) && maze[nr][nc] === 1) {
          maze[r + dr / 2][c + dc / 2] = 0;
          carve(nr, nc);
        }
      }
    }
  
    carve(1, 1);
    maze[1][1] = 0;
    maze[size - 2][size - 2] = 0;
  
    return {
      maze,
      start: { row: 1, col: 1 },
      goal: { row: size - 2, col: size - 2 }
    };
  }
  
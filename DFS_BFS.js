function generateNextStates(current) {
  let nextStates = [];
  let blankIndex = current.indexOf(0);
  let dx = [-1, 1, 0, 0];
  let dy = [0, 0, -1, 1];
  for (let i = 0; i < 4; i++) {
    let x = (blankIndex % 3) + dx[i];
    let y = Math.floor(blankIndex / 3) + dy[i];
    if (x >= 0 && x < 3 && y >= 0 && y < 3) {
      let next = current.slice();
      [next[blankIndex], next[x + y * 3]] = [next[x + y * 3], next[blankIndex]];
      nextStates.push(next);
    }
  }
  return nextStates;
}

function DFS(start, goal) {
  let stack = [start];
  let visited = new Set();
  while (stack.length > 0) {
    let current = stack.pop();
    if (JSON.stringify(current) === JSON.stringify(goal)) {
      return current;
    }
    visited.add(current.toString());
    let nextStates = generateNextStates(current);
    for (let nextState of nextStates) {
      if (!visited.has(nextState.toString())) {
        stack.push(nextState);
      }
    }
  }
  return null;
}

function BFS(start, goal) {
  let queue = [start];
  let visited = new Set();
  while (queue.length > 0) {
    let current = queue.shift();
    //    console.log("Current state: " + current);
    //    console.log("Visited states: " + visited.size);
    if (JSON.stringify(current) === JSON.stringify(goal)) {
      return current;
    }
    visited.add(current.toString());
    let nextStates = generateNextStates(current);
    for (let nextState of nextStates) {
      if (!visited.has(nextState.toString())) {
        queue.push(nextState);
      }
    }
  }
  return null;
}

// define the initial state and goal state of the puzzle
let initialState = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0];

// start timer
let start = new Date();
console.log("Using DFS: ");
let result = DFS(initialState, goalState);
if (result) {
  console.log("Found goal state: " + result);
} else {
  console.log("Goal state not found.");
}
// stop timer
let end = new Date();
console.log("Time taken to find goal state using DFS: " + (end - start) + "ms");

// start timer
start = new Date();
console.log("Using BFS: ");
result = BFS(initialState, goalState);
if (result) {
  console.log("Found goal state: " + result);
} else {
  console.log("Goal state not found.");
}

// stop timer
end = new Date();
console.log("Time taken to find goal state using BFS: " + (end - start) + "ms");

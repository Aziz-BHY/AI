class TaquinBoard {
    constructor(state) {
      this.state = state;
    }
  
    move(direction) {
      let emptyRow, emptyCol;
      for (let row = 0; row < this.state.length; row++) {
        for (let col = 0; col < this.state[row].length; col++) {
          if (this.state[row][col] === null) {
            emptyRow = row;
            emptyCol = col;
            break;
          }
        }
      }
  
      if (direction === 'up' && emptyRow > 0) {
        this.swap(emptyRow, emptyCol, emptyRow - 1, emptyCol);
        return true;
      } else if (direction === 'down' && emptyRow < this.state.length - 1) {
        this.swap(emptyRow, emptyCol, emptyRow + 1, emptyCol);
        return true;
      } else if (direction === 'left' && emptyCol > 0) {
        this.swap(emptyRow, emptyCol, emptyRow, emptyCol - 1);
        return true;
      } else if (direction === 'right' && emptyCol < this.state[0].length - 1) {
        this.swap(emptyRow, emptyCol, emptyRow, emptyCol + 1);
        return true;
      }
      return false;
    }
  
    swap(row1, col1, row2, col2) {
      let temp = this.state[row1][col1];
      this.state[row1][col1] = this.state[row2][col2];
      this.state[row2][col2] = temp;
    }
  
    clone() {
      let newState = new TaquinBoard(this.state.map(row => row.slice()));
      return newState;
    }
  }
  
  class AStar {
    constructor(initial, goal) {
      this.initial = initial;
      this.goal = goal;
      this.open = [initial];
      this.closed = [];
    }
  
    solve() {
        while (this.open.length > 0) {
          // find the state with the lowest f(n) = g(n) + h(n)
          let current = this.open.reduce((acc, state) => {
            if (acc === null || state.fn < acc.fn) {
              return state;
            }
            return acc;
          }, null);
          console.log(current.state)
          // move the current state to the closed list
          this.open.splice(this.open.indexOf(current), 1);
          this.closed.push(current);
    
          // check if the current state is the goal
          if (current.state === this.goal.state) {
            //return this.getSolution(current);
            console.log(current)
            return;
          }
    
          // generate new states for each possible move
          let newStates = this.generateStates(current);
          for (let newState of newStates) {
            if (!this.closed.some(state => state.state === newState.state)) {
              newState.fn = newState.cost + this.heuristic(newState);
              this.open.push(newState);
            }
          }
          // sort the open list by ascending fn values
          this.open.sort((a, b) => a.fn - b.fn);
        }
        return null; // no solution found
      }
      generateStates(current) {
        let newStates = [];
    
        // move up
        let newState = current.clone();
        if (newState.move("up")) {
          newState.cost = current.cost + 1;
          newStates.push(newState);
        }
    
        // move down
        newState = current.clone();
        if (newState.move("down")) {
          newState.cost = current.cost + 1;
          newStates.push(newState);
        }
    
        // move left
        newState = current.clone();
        if (newState.move("left")) {
          newState.cost = current.cost + 1;
          newStates.push(newState);
        }
    
        // move right
        newState = current.clone();
        if (newState.move("right")) {
          newState.cost = current.cost + 1;
          newStates.push(newState);
        }
        return newStates;
      }

      heuristic(state) {
        let cost = 0;
        for (let i = 0; i < state.state.length; i++) {
          for (let j = 0; j < state.state[i].length; j++) {
            if (state.state[i][j] !== null) {
              let goalPos = this.getGoalPos(state.state[i][j]);
              cost += Math.abs(goalPos.row - i) + Math.abs(goalPos.col - j);
            }
          }
        }
        return cost;
      }
    getGoalPos(tile) {
    for (let i = 0; i < this.goal.state.length; i++) {
      for (let j = 0; j < this.goal.state[i].length; j++) {
        if (this.goal.state[i][j] === tile) {
          return { row: i, col: j };
        }
      }
    }
     }

  }

  let initialState = new TaquinBoard([[1, 2, 3], [5, null, 6], [7, 8, 4]]);
  let goalState = new TaquinBoard([[1, 2, 3], [5, 8, 6], [7, null, 4]]);
  
  let aStar = new AStar(initialState, goalState);
  let solution = aStar.solve();
  
  if (solution) {
    console.log("Solution found!");
    console.log("Steps to solve the puzzle: ", solution.length);
    console.log("Moves: ", solution);
  } else {
    console.log("No solution found.");
  }
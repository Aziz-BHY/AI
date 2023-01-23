const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];
  
  class Node {
    constructor(val, g, father) {
      this.value = val;
      this.g = g;
      this.h = heuristic(val);
      this.f = this.g + this.h;
      this.father = father;
    }
  }
  
  class Possibility {
    constructor(x, y, possibilities) {
      this.positionX = x;
      this.positionY = y;
      this.possibilities = possibilities;
    }
  }
  function isSame(mat1, mat2) {
    if (mat1 == null || mat2 == null) {
      return false;
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (mat1[i][j] != mat2[i][j]) return false;
      }
    }
    return true;
  }
  function heuristic(matrix) {
    let cost = 0;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] !== null) {
          let goalPos = this.getGoalPos(matrix[i][j]);
          cost += Math.abs(goalPos.row - i) + Math.abs(goalPos.col - j);
        }
      }
    }
    return cost;
  }
  function getGoalPos(tile) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === tile) {
          return { row: i, col: j };
        }
      }
    }
  }
  function generate() {
    let mat = JSON.parse(JSON.stringify(matrix));
    for (let i = 0; i < 100; i++) {
      let poss = getPossibleMoves(mat);
      let picked = Math.floor(Math.random() * poss.possibilities.length);
      mat = replace(
        poss.positionX,
        poss.positionY,
        poss.possibilities[picked].x,
        poss.possibilities[picked].y,
        mat
      );
    }
    return mat;
  }
  function getPossibleMoves(matrix) {
    if (matrix[0][0] == 0) {
      return new Possibility(0, 0, [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
      ]);
    } else if (matrix[0][1] == 0) {
      return new Possibility(0, 1, [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 2 },
      ]);
    } else if (matrix[0][2] == 0) {
      return new Possibility(0, 2, [
        { x: 0, y: 1 },
        { x: 1, y: 2 },
      ]);
    } else if (matrix[1][0] == 0) {
      return new Possibility(1, 0, [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 0 },
      ]);
    } else if (matrix[1][1] == 0) {
      return new Possibility(1, 1, [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 1 },
      ]);
    } else if (matrix[1][2] == 0) {
      return new Possibility(1, 2, [
        { x: 0, y: 2 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ]);
    } else if (matrix[2][0] == 0) {
      return new Possibility(2, 0, [
        { x: 1, y: 0 },
        { x: 2, y: 1 },
      ]);
    } else if (matrix[2][1] == 0) {
      return new Possibility(2, 1, [
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ]);
    } else if (matrix[2][2] == 0) {
      return new Possibility(2, 2, [
        { x: 2, y: 1 },
        { x: 1, y: 2 },
      ]);
    }
  }
  
  function replace(x1, y1, x2, y2, matrix) {
    let matrix2 = matrix.map((arr) => arr.slice());
    let mid = matrix2[x1][y1];
    matrix2[x1][y1] = matrix2[x2][y2];
    matrix2[x2][y2] = mid;
    return matrix2;
  }
  
  function draw(matrix) {
    document.getElementById("tier1").innerHTML = matrix[0][0];
    document.getElementById("tier2").innerHTML = matrix[0][1];
    document.getElementById("tier3").innerHTML = matrix[0][2];
    document.getElementById("tier4").innerHTML = matrix[1][0];
    document.getElementById("tier5").innerHTML = matrix[1][1];
    document.getElementById("tier6").innerHTML = matrix[1][2];
    document.getElementById("tier7").innerHTML = matrix[2][0];
    document.getElementById("tier8").innerHTML = matrix[2][1];
    document.getElementById("tier9").innerHTML = matrix[2][2];
    for(let i = 1; i<10; i++){
      let elem = document.getElementById("tier"+i);
      if(elem.innerHTML == 0){
        elem.classList.add("zero")
        elem.classList.remove("notzero")
      }else{
        elem.classList.remove("zero")
        elem.classList.add("notzero")
      }
    }
  }  

  function Astar(m) {
    console.log(m)
    //initialisation
    let n = new Node(m, 0, null);
    let completed = [];
    let uncompleted = [n];
    let final = null;
    let nodenb = 0;
    let begin = new Date();
    let end;
    while (true) {
      nodenb++;
      //get the node with the least f (first entry)
      let node = uncompleted[0];
      //if this node is the final one
      if (node.h == 0) {
        end = new Date() - begin
        final = node;
        break;
      }
      //delete this node from uncompleted
      uncompleted.splice(0, 1);
      //get all possible moves
      let p = getPossibleMoves(node.value);
      for (let coord of p.possibilities) {
        //create node
        newMatrix = replace(
          p.positionX,
          p.positionY,
          coord.x,
          coord.y,
          node.value
        );
        //check if node is in the completed array
        let obj = completed.find((o) => isSame(newMatrix, o.value));
        if (!obj) {
          //if not add it to uncompleted array
          let newNode = new Node(newMatrix, node.g + 1, node);
          uncompleted.push(newNode);
          uncompleted = [...new Set(uncompleted.map((o) => o.value))].map(
            (val) => uncompleted.find((o) => o.value === val)
          );
        }
      }
      completed.push(node);
      uncompleted.sort((a, b) => a.f - b.f);
    }
    document.getElementById("exec").innerHTML = end + " ms";
    document.getElementById("nodes").innerHTML = nodenb;
    
    //get all moves in backward
    let steps = [];
    while (final.father) {
      steps.push(final.value);
      final = final.father;
    }
    steps.push(final.value);
    document.getElementById("it").innerHTML = steps.length;

    //show moves
    /*for (let i = steps.length - 1; i >= 0; i--) {
      draw(steps[i]);
    }*/
    let i = steps.length - 1;
    setInterval(()=>{
      if(i < 0) clearInterval();
      draw(steps[i]);
      i--;
      }, 1000)
    }


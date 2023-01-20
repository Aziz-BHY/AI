const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
]

class Node{
    constructor(val, g, father){
        this.value = val;
        this.g = g
        this.h = heuristic(val)
        this.f = this.g+this.h;
        this.father = father
    }
    
}

class Possibility{
    constructor(x,y,possibilities){
        this.positionX = x
        this.positionY = y
        this.possibilities = possibilities;
    }
}
function isSame(mat1, mat2){
    if(mat1 == null || mat2 == null){
        return false
    }
    for(let i= 0; i<3; i++){
        for(let j= 0; j<3; j++){
            if(mat1[i][j] != mat2[i][j]) return false
        }
    }
    return true;
}
function getDiffrence(value){
        let diff = 0;
        for(let i = 0; i < 3;i++){
            for(let j = 0; j < 3;j++){
                if(value[i][j] != matrix[i][j]) diff++;
            }
        }
        return diff;
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
function getGoalPos(tile){
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          if (matrix[i][j] === tile) {
            return { row: i, col: j };
          }
        }
      }
}
function generate(){
    let array = [0,1,2,3,4,5,6,7,8]
    
    array = array.sort(function () {
    return Math.random() - 0.5;
    });
    let matrix = [
        [ array[0], array[1], array[2] ],
        [ array[3], array[4], array[5] ],
        [ array[6], array[7], array[8] ]
    ]
    console.log(matrix)
    return matrix;
}

function getPossibleMoves(matrix){
    if(matrix[0][0] == 0){
        return new Possibility(0,0,[{x:0,y:1},{x:1,y:0}])
    }else if(matrix[0][1] == 0){
        return new Possibility(0,1,[{x:0,y:0}, {x:1,y:1}, {x:0, y:2}])
    }else if(matrix[0][2] == 0){
        return new Possibility(0, 2, [{x: 0, y: 1}, {x: 1, y: 2}])
    }else if(matrix[1][0] == 0){
        return new Possibility(1, 0, [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y:0}])
    }else if(matrix[1][1] == 0){
        return new Possibility(1, 1, [{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y:2}, {x:2, y:1}])
    }else if(matrix[1][2] == 0){
        return new Possibility(1, 2, [{x: 0, y: 2}, {x: 1, y: 1}, {x: 2, y: 2}])
    }else if(matrix[2][0] == 0){
        return new Possibility(2,0, [{x:1, y:0}, {x:2, y:1}])
    }else if(matrix[2][1] == 0){
        return new Possibility(2,1, [{x:2,y:0}, {x:1,y:1}, {x:2, y:2}])
    }else if(matrix[2][2] == 0){
        return new Possibility(2,2 , [{x: 2, y: 1}, {x: 1, y:2}])
    }
}

function replace(x1,y1,x2,y2, matrix){
    let matrix2 = matrix.map(arr => arr.slice());
    let mid = matrix2[x1][y1]
    matrix2[x1][y1] = matrix2[x2][y2]
    matrix2[x2][y2] = mid
    return matrix2
}

function draw(matrix){
    const canvas = document.querySelector('#canvas');

    if (!canvas.getContext) {
        return;
    }

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.strokeRect(100, 100, 100, 100);
    ctx.strokeRect(210, 100, 100, 100);
    ctx.strokeRect(320, 100, 100, 100);
    ctx.strokeRect(100, 210, 100, 100);
    ctx.strokeRect(210, 210, 100, 100);
    ctx.strokeRect(320, 210, 100, 100);
    ctx.strokeRect(100, 320, 100, 100);
    ctx.strokeRect(210, 320, 100, 100);
    ctx.strokeRect(320, 320, 100, 100);

    ctx.strokeText(matrix[0][0], 150, 150);
    ctx.strokeText(matrix[0][1], 260, 150, 500);
    ctx.strokeText(matrix[0][2], 370, 150, 500);
    ctx.strokeText(matrix[1][0], 150, 260, 250);
    ctx.strokeText(matrix[1][1], 260, 260, 250);
    ctx.strokeText(matrix[1][2], 370, 260, 250);
    ctx.strokeText(matrix[2][0], 150, 370, 250);
    ctx.strokeText(matrix[2][1], 260, 370, 250);
    ctx.strokeText(matrix[2][2], 370, 370, 250);
}

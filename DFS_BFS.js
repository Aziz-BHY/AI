/*
La fonction generateNextStates(current) prend en entrée l'état actuel du puzzle, elle initialise un tableau vide nextStates qui contiendra les prochains états possibles, utilise indexOf(0) pour trouver l'index de la tuile vide dans le tableau d'état actuel, dx est un tableau qui contient les déplacements possibles en x et dy est un tableau qui contient les déplacements possibles en y.

La fonction utilise une boucle for pour parcourir les 4 directions possibles (haut, bas, gauche, droite) en utilisant les valeurs de dx et dy pour calculer les prochaines coordonnées (x, y) de la tuile vide. Si les coordonnées sont valides (c'est-à-dire si x est supérieur ou égal à 0, inférieur à 3 et y est supérieur ou égal à 0 et inférieur à 3), la fonction utilise la méthode slice() pour copier le tableau d'état actuel, puis utilise [next[blankIndex], next[x + y * 3]] = [next[x + y * 3], next[blankIndex]] pour échanger la tuile vide avec la tuile adjacente. Enfin, elle ajoute cet état modifié dans le tableau nextStates qui sera retourné à la fin de la fonction.
En somme, cette fonction génère tous les états suivants possibles en déplaçant la tuile vide dans les 4 directions possibles en utilisant des calculs mathématiques pour déterminer les prochaines positions valides et en utilisant des méthodes de tableau pour copier et modifier le tableau d'état actuel.

La fonction generateNextStates(current) est donc une fonction utile pour les algorithmes de recherche tels que DFS, BFS, et A*, car elle permet de générer tous les états suivants possibles à partir d'un état donné, ce qui est nécessaire pour explorer l'espace de recherche et trouver la solution. Cette fonction est généralement utilisée en conjonction avec une fonction de coût pour évaluer les états et une fonction de détection de solution pour vérifier si une solution a été trouvée.
*/

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

/*
La fonction hasSolution(state) vérifie si l'état de puzzle donné (un tableau d'entiers représentant les tuiles dans le puzzle) a une solution. Il le fait en comptant le nombre de retournements dans l'état et en déterminant la rangée de la tuile vide (également connue sous le nom d'espace vide ou de tuile zéro).

Un retournement est défini comme une paire de tuiles (i, j) telles que i apparaît avant j dans le tableau d'état, mais i est supérieur à j. Par exemple, dans l'état [1, 2, 3, 4, 5, 6, 7, 8, 0], il n'y a pas de retournements (car le tableau est déjà trié par ordre croissant). Mais dans l'état [1, 2, 3, 8, 6, 4, 7, 5, 0], il y a 8 retournements (8 avant 6, 8 avant 4, 8 avant 5, 6 avant 4, 6 avant 5, 4 avant 7, 4 avant 5 et 7 avant 5).

La fonction utilise deux boucles for imbriquées pour vérifier chaque paire de tuiles dans le tableau d'état, et incrémente la variable inversions si les conditions sont remplies (c'est-à-dire si la valeur de la première tuile est supérieure à la valeur de la seconde tuile et que ni la tuile n'est la tuile vide, représentée par la valeur 0).

Ensuite, il trouve la rangée de la tuile vide en utilisant la méthode indexOf(0) pour trouver l'index de la tuile vide dans le tableau d'état, et en le divisant par 3 (car il y a 3 tuiles par rangée), puis en utilisant Math.floor pour arrondir à l'entier inférieur. Cela donne le numéro de la rangée de la tuile vide (0-indexée).

Enfin, la fonction vérifie si le puzzle est résolvable en comparant la parité de la rangée de la tuile vide et du nombre de retournements, en utilisant la logique suivante:

Si la tuile vide est sur une rangée paire (0 ou 2), le puzzle est résolvable si le nombre de retournements est pair.
Si la tuile vide est sur une rangée impaire (1), le puzzle est résolvable si le nombre de retournements est impair.
Il renvoie une valeur booléenne de vrai si le puzzle est résolvable et de faux sinon.

Il est important de mentionner que cette fonction fonctionne pour le puzzle 8 3x3, et qu'elle repose sur le fait que pour qu'un puzzle soit résolvable, le nombre de retournements doit être pair si la tuile vide se trouve sur une rangée paire et impair si la tuile vide se trouve sur une rangée impaire.

En résumé, cette fonction utilise une combinaison de boucles for imbriquées et de calculs mathématiques pour vérifier si l'état de puzzle donné a une solution en comptant le nombre de retournements et en déterminant la rangée de la tuile vide. Elle utilise ensuite ces informations pour vérifier la parité de la rangée de la tuile vide et du nombre de retournements pour déterminer si le puzzle est résolvable ou non.
*/

function hasSolution(state) {
  var inversions = 0;
  for (var i = 0; i < state.length; i++) {
    for (var j = i + 1; j < state.length; j++) {
      if (state[i] > state[j] && state[i] != 0 && state[j] != 0) {
        inversions++;
      }
    }
  }
  var blankTileRow = Math.floor(state.indexOf(0) / 3);
  return blankTileRow % 2 == 0 ? inversions % 2 == 0 : inversions % 2 == 1;
}

// Recherche en profondeur d'abord
function DFS(start, goal) {
  let stack = [start];
  let visited = new Set();
  let begin = new Date();
  //if (hasSolution(start)) {
    while (stack.length > 0) {
      let current = stack.pop();
      if (JSON.stringify(current) === JSON.stringify(goal)) {
        console.log("Visited states: " + visited.size);
        document.getElementById("nodes").innerHTML = visited.size;
        document.getElementById("exec").innerHTML = (new Date() - begin) + " ms";
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
 /* } else {
    console.log("The puzzle has no solution!");
  }*/

  return null;
}

// Recherche en largeur d'abord
function BFS(start, goal) {
  let queue = [start];
  let visited = new Set();
  let begin = new Date();
  if (hasSolution(start)) {
    while (queue.length > 0) {
      let current = queue.shift();
      //    console.log("Current state: " + current);
      //    console.log("Visited states: " + visited.size);
      if (JSON.stringify(current) === JSON.stringify(goal)) {
        console.log("Visited states: " + visited.size);
        document.getElementById("nodes").innerHTML = visited.size;
        document.getElementById("exec").innerHTML = (new Date() - begin) + " ms";
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
  } else {
    console.log("The puzzle has no solution!");
  }
  return null;
}

// define the initial state and goal state of the puzzle
let initialState = [1, 0, 2, 3, 4, 5, 6, 7, 8];
let goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0];

/*// start timer
let start = new Date();
console.log("Using DFS: ");
let result = DFS(initialState, goalState);
if (result) {
  console.log("Found goal state: " + result);
}
// stop timer
let end = new Date();
console.log("Time taken DFS: " + (end - start) + "ms");

// start timer
start = new Date();
console.log("Using BFS: ");
result = BFS(initialState, goalState);
if (result) {
  console.log("Found goal state: " + result);
}

// stop timer
end = new Date();
console.log("Time taken BFS: " + (end - start) + "ms");
*/
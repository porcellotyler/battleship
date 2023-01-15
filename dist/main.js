/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkForShips": () => (/* binding */ checkForShips),
/* harmony export */   "displayBoard": () => (/* binding */ displayBoard),
/* harmony export */   "displayHits": () => (/* binding */ displayHits),
/* harmony export */   "displayMiss": () => (/* binding */ displayMiss),
/* harmony export */   "displayName": () => (/* binding */ displayName),
/* harmony export */   "displayShips": () => (/* binding */ displayShips),
/* harmony export */   "removeForm": () => (/* binding */ removeForm)
/* harmony export */ });
const playerDiv = document.getElementById('playerDiv');
const computerDiv = document.getElementById('computerDiv');
let form = document.getElementById("form");
let nameInput = document.getElementById('name');

const displayBoard = (player) => {
    //Determine whose board it
    let parentDiv = document.getElementById(`${player}Div`);
    
    //Create board container
    let boardContainer = document.createElement('div');
    boardContainer.className = 'boardContainer';

    //Create board of 100 divisions
    for (let i = 1; i < 101; i++) {
        let square = document.createElement('div');
        //Set each square's ID to i so they're numbered 1 - 100
        square.setAttribute("id", `${i}`);
        square.className = "board";
        //Specify which board each div is a part of
        if (parentDiv.id == 'playerDiv') {
            square.classList.add('player');
        } else {
            square.classList.add('computer');
        };

        boardContainer.appendChild(square);
    };

    parentDiv.appendChild(boardContainer);

    return;
};

function removeForm() {
    form.remove();
};

function displayName() { 
    playerDiv.innerText = `${nameInput.value}`;
    computerDiv.innerText = "Computer";
    return
};

function displayShips(boardName, locations, shipName) {
    while (locations.length > 0) {
        //Find target div
        let target = document.getElementsByClassName(`${boardName}`)[locations[0]];

        //Add ship and shipName classes
        target.classList.add('ship');
        target.classList.add(`${shipName}`);

        locations.shift();
    };
    return
};

function displayHits(boardName, locations) {
    while (locations.length > 0) {
        //Find target div
        let target = document.getElementsByClassName(`${boardName}`)[locations[0]];

        //Remove ship class
        target.classList.remove('ship');

        //Add hit class 
        target.classList.add('hit');

        locations.shift();
    };
    return 
};

function displayMiss(location, boardName) {
    while (location.length > 0) {
        //Add miss class, [location - 1] seems buggy. Not investigating rn but could cause issues down the road.
        document.getElementsByClassName(`${boardName}`)[location - 1].classList.add('miss');
        location.shift();
    };
    return 
};

function checkForShips(boardName) {
    let board = document.getElementsByClassName(`board ${boardName}`);
    //console.log(boardName);
    //console.log(board);

    for (let i = 0; i < 100; i++) {
        let checkDiv = board[i];
        //console.log(checkDiv);

        if (checkDiv.classList.contains('ship')) {
            return //console.log('ship found');
        };
    };
    return gameOver();
};

function gameOver() {
    const container = document.getElementById('result');
    let display = document.createElement('div');
    display.innerText = 'Game over!';

    return container.appendChild(display);
}




/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./src/index.js");



class Gameboard {
    constructor(name) {
        this.name = name;
        this.coordinates = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
            61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
            71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
            81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
            91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
        ];
        this.shipCoords = [];
        this.hitCoords = [];
        this.missedShots = [];
    }

    //Place ships at specific coordinates
    placeShip = (startPoint, length, shipName) => {
        while (length > 0) {
            this.shipCoords.push(startPoint);//shipCoords not a master list
            startPoint++;
            length--;
        };
        //Add coords to ship as well? not needed i think 
        //ships are being added at startPoint + 1 for some reason rn, investigate later
        return (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.displayShips)(this.name, this.shipCoords, shipName);
    };

    receiveAttack(location) {
        let target = document.getElementsByClassName(`board ${this.name}`)[location];
        //console.log(location); //coming in as 1 less than whats clicked, unsure why
        //console.log(target);

        //Determines if a ship is hit -> target undef rn
        if (target.classList.contains('ship')) {
            //If a ship was hit, send hit to ship and record location
            this.hitCoords.push(location);
            (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.displayHits)(this.name, this.hitCoords);

            //Check which ship it is
            if (target.classList.contains("playerBattleship")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.battleship.hit(1);
            } else if (target.classList.contains("playerCruiser1")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Cruiser1.hit(1);
            } else if (target.classList.contains("playerCruiser2")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Cruiser2.hit(1);
            } else if (target.classList.contains("playerSub1")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Sub1.hit(1);
            } else if (target.classList.contains("playerSub2")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Sub2.hit(1);
            } else if (target.classList.contains("playerSub3")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Sub3.hit(1);
            } else if (target.classList.contains("playerDestroyer1")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Destroyer1.hit(1);
            } else if (target.classList.contains("playerDestroyer2")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Destroyer2.hit(1);
            } else if (target.classList.contains("playerDestroyer3")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Destroyer3.hit(1);
            } else if (target.classList.contains("playerDestroyer4")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Destroyer4.hit(1);
            } else if (target.classList.contains("computerBattleship")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.battleship.hit(1);
            } else if (target.classList.contains("computerCruiser1")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.Cruiser1.hit(1);
            } else if (target.classList.contains("computerCruiser2")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.Cruiser2.hit(1);
            } else if (target.classList.contains("computerSub1")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.Sub1.hit(1);
            } else if (target.classList.contains("computerSub2")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.Sub2.hit(1);
            } else if (target.classList.contains("computerSub3")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.Sub3.hit(1);
            } else if (target.classList.contains("computerDestroyer1")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.Destroyer1.hit(1);
            } else if (target.classList.contains("computerDestroyer2")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.Destroyer2.hit(1);
            } else if (target.classList.contains("computerDestroyer3")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.Destroyer3.hit(1);
            } else if (target.classList.contains("computerDestroyer4")) {
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.Destroyer4.hit(1);
            } else {
                return console.log('hmm')
            };
        } else {
            //If ship is not hit, add to missedShots
            this.missedShots.push(location);
            (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.displayMiss)(this.missedShots, `board ${this.name}`);
        };
        //After attack received, check for game over
        return this.findShips();
    };

    //Finds non-sunk ships on board, if none, reports game over
    findShips = () => {
        (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.checkForShips)(this.name);
    }; //need to fix
};




/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computerBoard": () => (/* binding */ computerBoard),
/* harmony export */   "gameLoop": () => (/* binding */ gameLoop),
/* harmony export */   "playerBoard": () => (/* binding */ playerBoard)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");



const startButton = document.getElementById("start");
let nameInput = document.getElementById('name');
let playerBoard;
let computerBoard;

startButton.addEventListener("click", () => {
    (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.displayName)();
    (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.displayBoard)('player');
    (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.displayBoard)('computer');
    gameLoop(nameInput.value);
    (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.removeForm)();
});

const gameLoop = (name) => {
    playerBoard = new _player__WEBPACK_IMPORTED_MODULE_1__.Player(name);
    computerBoard = new _player__WEBPACK_IMPORTED_MODULE_1__.computer('computer');

    //Manually addShips for now
    function computerShips() {
        computerBoard.board.placeShip(51, 4, "computerBattleship");
        computerBoard.board.placeShip(27, 3, "computerCruiser1");
        computerBoard.board.placeShip(1, 3, "computerCruiser2");
        computerBoard.board.placeShip(88, 2, "computerSub1");
        computerBoard.board.placeShip(91, 2, "computerSub2");
        computerBoard.board.placeShip(34, 2, "computerSub3");
        computerBoard.board.placeShip(64, 1, "computerDestroyer1");
        computerBoard.board.placeShip(49, 1, "computerDestroyer2");
        computerBoard.board.placeShip(50, 1, "computerDestroyer3");
        computerBoard.board.placeShip(77, 1, "computerDestroyer4");
    };

    computerShips();

    function playerShips() {
        playerBoard.board.placeShip(51, 4, "playerBattleship");
        playerBoard.board.placeShip(27, 3, "playerCruiser1");
        playerBoard.board.placeShip(1, 3, "playerCruiser2");
        playerBoard.board.placeShip(88, 2, "playerSub1");
        playerBoard.board.placeShip(91, 2, "playerSub2");
        playerBoard.board.placeShip(34, 2, "playerSub3");
        playerBoard.board.placeShip(64, 1, "playerDestroyer1");
        playerBoard.board.placeShip(49, 1, "playerDestroyer2");
        playerBoard.board.placeShip(50, 1, "playerDestroyer3");
        playerBoard.board.placeShip(77, 1, "playerDestroyer4");
    };

    playerShips();
    
    let turnCounter = 2;
    function runTurns(count) {
        let localCount = count;
        /* waiting until step 5 in top instructions
        if (turnCounter === 0) {
           //place ships then increase turnCounter 
        }*/
        //while game not over
        const checkTurn = (count) => {
            if (count % 2 === 0) {
                playerTurn();
            } else {
                computerTurn();
            };
        };
    
        const playerTurn = () => {
            localCount++;
            //Check for boards loaded
            if (document.getElementsByClassName('board computer') != null) {
                for (let i = 1; i < 100; i++) {
                    let square = document.getElementsByClassName('board computer')[i];

                    //Make computer board able to be attacked on click
                    square.onclick = function allowAttack() {
                        //Send attack
                        computerBoard.board.receiveAttack(i);
                        //Check for game over
                        computerBoard.board.findShips();
                        return checkTurn(localCount);
                    };
                }; 
            } else {
                return console.log('error in player attack flow')
            };
        }
    
        const computerTurn = () => {
            localCount++;
            //Check for board loaded
            /*if (document.getElementsByClassName('board computer') != null) {
                for (let i = 1; i < 100; i++) {
                    let square = document.getElementsByClassName('board computer')[i];
                    //RemoveEventListeners for player
                    square.removeEventListener('click', allowAttack); //allowAttack not defined, going to focus on getting turn flow to work and then come back to fix this
                };
                return
            };*/
            let randomAttack = computerBoard.randomMove();

            //Send attack
            playerBoard.board.receiveAttack(randomAttack);
            //Check for game over
            playerBoard.board.findShips();
            return checkTurn(localCount);
        }

        if (localCount === 2) checkTurn(localCount);
    };
    runTurns(turnCounter);
    //first place ships
    //comp places randomly, places picks
    /*if (turnCounter % 2 === 0) {
        //player's turn
        turnCounter++;
            //Check for boards loaded
            if (document.getElementsByClassName(' board computer') != null) {
                for (let i = 1; i < 100; i++) {
                    let square = document.getElementsByClassName('board computer')[i];

                    /*square.addEventListener('click', () => {
                        computerBoard.board.receiveAttack(i);
                        return turnCounter++;
                    });
                    const allowAttack = () => {
                        //turnCounter++;
                        console.log(turnCounter);
                        return computerBoard.board.receiveAttack(i);
                    }
                    square.addEventListener('click', allowAttack);
                };
                return 
            } else {
                return console.log('error in attack flow')
            };
    } else if (turnCounter % 2 != 0) {
        console.log('made it to comp turn');
            //computer turn
            //on computer turn, removeEventListeners
            if (document.getElementsByClassName(' board computer') != null) {
                for (let i = 1; i < 100; i++) {
                    let square = document.getElementsByClassName('board computer')[i];

                    square.removeEventListener('click', allowAttack);
                };
                return
            }
            let randomAttack = computerBoard.randomMove();
            console.log(randomAttack);

            return playerBoard.board.receiveAttack(randomAttack)   
    }*/
    return
}




/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player),
/* harmony export */   "computer": () => (/* binding */ computer)
/* harmony export */ });
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");



class Player {
    constructor(name) {
        this.name = name;
        //this.board = new Gameboard(name);
        this.board = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard('player');
        this.battleship = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Battleship('player');
        this.Cruiser1 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Cruiser('player', 1);
        this.Cruiser2 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Cruiser('player', 2);
        this.Sub1 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Sub('player', 1);
        this.Sub2 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Sub('player', 2);
        this.Sub3 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Sub('player', 3);
        this.Destroyer1 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Destroyer('player', 1);
        this.Destroyer2 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Destroyer('player', 2);
        this.Destroyer3 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Destroyer('player', 3);
        this.Destroyer4 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Destroyer('player', 4);
    };

    getName = () => this.name;

    playerBoard = () => this.board;

    attack = (location) => this.board.receiveAttack(location);
};

class computer extends Player {
    constructor(name) {
        //Create name and board using name input
        super(name);
        this.board = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard(name);
        this.battleship = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Battleship('computer');
        this.Cruiser1 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Cruiser('computer', 1);
        this.Cruiser2 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Cruiser('computer', 2);
        this.Sub1 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Sub('computer', 1);
        this.Sub2 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Sub('computer', 2);
        this.Sub3 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Sub('computer', 3);
        this.Destroyer1 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Destroyer('computer', 1);
        this.Destroyer2 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Destroyer('computer', 2);
        this.Destroyer3 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Destroyer('computer', 3);
        this.Destroyer4 = new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Destroyer('computer', 4);
        //Store played moves for future reference
        this.oldMoves = [];
    };

    randomMove = () => {
        //Generate number between 0 - 100 
        //let move = Math.floor(Math.random() * 101);
        let move = Math.floor(Math.random() * 100) + 1;


        //Checking that the random move is not contained in the oldMoves array
        /*if (this.oldMoves.filter(loc => loc === move).length > 0) {
            //Call itself to make another move if the random move is illegal
            return this.randomMove();
        }*/

        //Assuming move is legal, add it to the oldMoves array, call Player().attack(move);
        this.oldMoves.push(move);
        //console.log(this.oldMoves);
        console.log(move);
        return move //super.attack(move);
    };
};




/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Battleship": () => (/* binding */ Battleship),
/* harmony export */   "Cruiser": () => (/* binding */ Cruiser),
/* harmony export */   "Destroyer": () => (/* binding */ Destroyer),
/* harmony export */   "Ship": () => (/* binding */ Ship),
/* harmony export */   "Sub": () => (/* binding */ Sub)
/* harmony export */ });
class Ship {
    constructor(length, name) {
        this.length = length;
        this.name = name;
        //Ships initialize with 0 hits
        this.hitNumber = 0;
        this.coords = [];
    }

    lengthOfShip = () => this.length;

    currentHits = () => this.hitNumber;

    //Increase the hitNumber for a ship
    hit = (hit) => {
        if (hit == 1) return this.hitNumber++;
        console.log(this.hitNumber);
        return
    };

    //Check if the ship has been sunk by comparing hitNumber to length
    isSunk = () => {
        if (this.hitNumber < this.length) {
            console.log('not sunk');
            return false;
        } else {
            console.log('sunk');
            return true;
        };
    };
};

class Battleship extends Ship {
    constructor(whose) {
        super(4, 'Battleship');
        this.owner = whose;
    };
};

class Cruiser extends Ship {
    constructor(whose, shipID) {
        super(3, 'Cruiser');
        this.owner = whose;
        this.shipID = shipID;
    };
};

class Sub extends Ship {
    constructor(whose, shipID) {
        super(2, 'Sub');
        this.owner = whose;
        this.shipID = shipID;
    };
};

class Destroyer extends Ship {
    constructor(whose, shipID) {
        super(1, 'Destroyer');
        this.owner = whose;
        this.shipID = shipID;
    };
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwbGF5ZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyRGl2Jyk7XG5jb25zdCBjb21wdXRlckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlckRpdicpO1xubGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1cIik7XG5sZXQgbmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKTtcblxuY29uc3QgZGlzcGxheUJvYXJkID0gKHBsYXllcikgPT4ge1xuICAgIC8vRGV0ZXJtaW5lIHdob3NlIGJvYXJkIGl0XG4gICAgbGV0IHBhcmVudERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3BsYXllcn1EaXZgKTtcbiAgICBcbiAgICAvL0NyZWF0ZSBib2FyZCBjb250YWluZXJcbiAgICBsZXQgYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBib2FyZENvbnRhaW5lci5jbGFzc05hbWUgPSAnYm9hcmRDb250YWluZXInO1xuXG4gICAgLy9DcmVhdGUgYm9hcmQgb2YgMTAwIGRpdmlzaW9uc1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMTAxOyBpKyspIHtcbiAgICAgICAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAvL1NldCBlYWNoIHNxdWFyZSdzIElEIHRvIGkgc28gdGhleSdyZSBudW1iZXJlZCAxIC0gMTAwXG4gICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpfWApO1xuICAgICAgICBzcXVhcmUuY2xhc3NOYW1lID0gXCJib2FyZFwiO1xuICAgICAgICAvL1NwZWNpZnkgd2hpY2ggYm9hcmQgZWFjaCBkaXYgaXMgYSBwYXJ0IG9mXG4gICAgICAgIGlmIChwYXJlbnREaXYuaWQgPT0gJ3BsYXllckRpdicpIHtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdwbGF5ZXInKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdjb21wdXRlcicpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfTtcblxuICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChib2FyZENvbnRhaW5lcik7XG5cbiAgICByZXR1cm47XG59O1xuXG5mdW5jdGlvbiByZW1vdmVGb3JtKCkge1xuICAgIGZvcm0ucmVtb3ZlKCk7XG59O1xuXG5mdW5jdGlvbiBkaXNwbGF5TmFtZSgpIHsgXG4gICAgcGxheWVyRGl2LmlubmVyVGV4dCA9IGAke25hbWVJbnB1dC52YWx1ZX1gO1xuICAgIGNvbXB1dGVyRGl2LmlubmVyVGV4dCA9IFwiQ29tcHV0ZXJcIjtcbiAgICByZXR1cm5cbn07XG5cbmZ1bmN0aW9uIGRpc3BsYXlTaGlwcyhib2FyZE5hbWUsIGxvY2F0aW9ucywgc2hpcE5hbWUpIHtcbiAgICB3aGlsZSAobG9jYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy9GaW5kIHRhcmdldCBkaXZcbiAgICAgICAgbGV0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7Ym9hcmROYW1lfWApW2xvY2F0aW9uc1swXV07XG5cbiAgICAgICAgLy9BZGQgc2hpcCBhbmQgc2hpcE5hbWUgY2xhc3Nlc1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChgJHtzaGlwTmFtZX1gKTtcblxuICAgICAgICBsb2NhdGlvbnMuc2hpZnQoKTtcbiAgICB9O1xuICAgIHJldHVyblxufTtcblxuZnVuY3Rpb24gZGlzcGxheUhpdHMoYm9hcmROYW1lLCBsb2NhdGlvbnMpIHtcbiAgICB3aGlsZSAobG9jYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy9GaW5kIHRhcmdldCBkaXZcbiAgICAgICAgbGV0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7Ym9hcmROYW1lfWApW2xvY2F0aW9uc1swXV07XG5cbiAgICAgICAgLy9SZW1vdmUgc2hpcCBjbGFzc1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpO1xuXG4gICAgICAgIC8vQWRkIGhpdCBjbGFzcyBcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuXG4gICAgICAgIGxvY2F0aW9ucy5zaGlmdCgpO1xuICAgIH07XG4gICAgcmV0dXJuIFxufTtcblxuZnVuY3Rpb24gZGlzcGxheU1pc3MobG9jYXRpb24sIGJvYXJkTmFtZSkge1xuICAgIHdoaWxlIChsb2NhdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vQWRkIG1pc3MgY2xhc3MsIFtsb2NhdGlvbiAtIDFdIHNlZW1zIGJ1Z2d5LiBOb3QgaW52ZXN0aWdhdGluZyBybiBidXQgY291bGQgY2F1c2UgaXNzdWVzIGRvd24gdGhlIHJvYWQuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7Ym9hcmROYW1lfWApW2xvY2F0aW9uIC0gMV0uY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgICAgICBsb2NhdGlvbi5zaGlmdCgpO1xuICAgIH07XG4gICAgcmV0dXJuIFxufTtcblxuZnVuY3Rpb24gY2hlY2tGb3JTaGlwcyhib2FyZE5hbWUpIHtcbiAgICBsZXQgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGBib2FyZCAke2JvYXJkTmFtZX1gKTtcbiAgICAvL2NvbnNvbGUubG9nKGJvYXJkTmFtZSk7XG4gICAgLy9jb25zb2xlLmxvZyhib2FyZCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgIGxldCBjaGVja0RpdiA9IGJvYXJkW2ldO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGNoZWNrRGl2KTtcblxuICAgICAgICBpZiAoY2hlY2tEaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaGlwJykpIHtcbiAgICAgICAgICAgIHJldHVybiAvL2NvbnNvbGUubG9nKCdzaGlwIGZvdW5kJyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gZ2FtZU92ZXIoKTtcbn07XG5cbmZ1bmN0aW9uIGdhbWVPdmVyKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKTtcbiAgICBsZXQgZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpc3BsYXkuaW5uZXJUZXh0ID0gJ0dhbWUgb3ZlciEnO1xuXG4gICAgcmV0dXJuIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXNwbGF5KTtcbn1cblxuZXhwb3J0IHsgZGlzcGxheUJvYXJkLCByZW1vdmVGb3JtLCBkaXNwbGF5TmFtZSwgZGlzcGxheVNoaXBzLCBkaXNwbGF5SGl0cywgZGlzcGxheU1pc3MsIGNoZWNrRm9yU2hpcHMgfTtcbiIsImltcG9ydCB7IGRpc3BsYXlTaGlwcywgZGlzcGxheUhpdHMsIGRpc3BsYXlNaXNzLCBjaGVja0ZvclNoaXBzIH0gZnJvbSBcIi4vRE9NXCJcbmltcG9ydCB7IHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkIH0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY29vcmRpbmF0ZXMgPSBbXG4gICAgICAgICAgICAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCxcbiAgICAgICAgICAgIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTksIDIwLFxuICAgICAgICAgICAgMjEsIDIyLCAyMywgMjQsIDI1LCAyNiwgMjcsIDI4LCAyOSwgMzAsXG4gICAgICAgICAgICAzMSwgMzIsIDMzLCAzNCwgMzUsIDM2LCAzNywgMzgsIDM5LCA0MCxcbiAgICAgICAgICAgIDQxLCA0MiwgNDMsIDQ0LCA0NSwgNDYsIDQ3LCA0OCwgNDksIDUwLFxuICAgICAgICAgICAgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDU4LCA1OSwgNjAsXG4gICAgICAgICAgICA2MSwgNjIsIDYzLCA2NCwgNjUsIDY2LCA2NywgNjgsIDY5LCA3MCxcbiAgICAgICAgICAgIDcxLCA3MiwgNzMsIDc0LCA3NSwgNzYsIDc3LCA3OCwgNzksIDgwLFxuICAgICAgICAgICAgODEsIDgyLCA4MywgODQsIDg1LCA4NiwgODcsIDg4LCA4OSwgOTAsXG4gICAgICAgICAgICA5MSwgOTIsIDkzLCA5NCwgOTUsIDk2LCA5NywgOTgsIDk5LCAxMDAsXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuc2hpcENvb3JkcyA9IFtdO1xuICAgICAgICB0aGlzLmhpdENvb3JkcyA9IFtdO1xuICAgICAgICB0aGlzLm1pc3NlZFNob3RzID0gW107XG4gICAgfVxuXG4gICAgLy9QbGFjZSBzaGlwcyBhdCBzcGVjaWZpYyBjb29yZGluYXRlc1xuICAgIHBsYWNlU2hpcCA9IChzdGFydFBvaW50LCBsZW5ndGgsIHNoaXBOYW1lKSA9PiB7XG4gICAgICAgIHdoaWxlIChsZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNoaXBDb29yZHMucHVzaChzdGFydFBvaW50KTsvL3NoaXBDb29yZHMgbm90IGEgbWFzdGVyIGxpc3RcbiAgICAgICAgICAgIHN0YXJ0UG9pbnQrKztcbiAgICAgICAgICAgIGxlbmd0aC0tO1xuICAgICAgICB9O1xuICAgICAgICAvL0FkZCBjb29yZHMgdG8gc2hpcCBhcyB3ZWxsPyBub3QgbmVlZGVkIGkgdGhpbmsgXG4gICAgICAgIC8vc2hpcHMgYXJlIGJlaW5nIGFkZGVkIGF0IHN0YXJ0UG9pbnQgKyAxIGZvciBzb21lIHJlYXNvbiBybiwgaW52ZXN0aWdhdGUgbGF0ZXJcbiAgICAgICAgcmV0dXJuIGRpc3BsYXlTaGlwcyh0aGlzLm5hbWUsIHRoaXMuc2hpcENvb3Jkcywgc2hpcE5hbWUpO1xuICAgIH07XG5cbiAgICByZWNlaXZlQXR0YWNrKGxvY2F0aW9uKSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGBib2FyZCAke3RoaXMubmFtZX1gKVtsb2NhdGlvbl07XG4gICAgICAgIC8vY29uc29sZS5sb2cobG9jYXRpb24pOyAvL2NvbWluZyBpbiBhcyAxIGxlc3MgdGhhbiB3aGF0cyBjbGlja2VkLCB1bnN1cmUgd2h5XG4gICAgICAgIC8vY29uc29sZS5sb2codGFyZ2V0KTtcblxuICAgICAgICAvL0RldGVybWluZXMgaWYgYSBzaGlwIGlzIGhpdCAtPiB0YXJnZXQgdW5kZWYgcm5cbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NoaXAnKSkge1xuICAgICAgICAgICAgLy9JZiBhIHNoaXAgd2FzIGhpdCwgc2VuZCBoaXQgdG8gc2hpcCBhbmQgcmVjb3JkIGxvY2F0aW9uXG4gICAgICAgICAgICB0aGlzLmhpdENvb3Jkcy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGRpc3BsYXlIaXRzKHRoaXMubmFtZSwgdGhpcy5oaXRDb29yZHMpO1xuXG4gICAgICAgICAgICAvL0NoZWNrIHdoaWNoIHNoaXAgaXQgaXNcbiAgICAgICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyQmF0dGxlc2hpcFwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJCb2FyZC5iYXR0bGVzaGlwLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckNydWlzZXIxXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckJvYXJkLkNydWlzZXIxLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckNydWlzZXIyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckJvYXJkLkNydWlzZXIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllclN1YjFcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyQm9hcmQuU3ViMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJTdWIyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckJvYXJkLlN1YjIuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyU3ViM1wiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJCb2FyZC5TdWIzLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckRlc3Ryb3llcjFcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyQm9hcmQuRGVzdHJveWVyMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJEZXN0cm95ZXIyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckJvYXJkLkRlc3Ryb3llcjIuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyRGVzdHJveWVyM1wiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJCb2FyZC5EZXN0cm95ZXIzLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckRlc3Ryb3llcjRcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyQm9hcmQuRGVzdHJveWVyNC5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlckJhdHRsZXNoaXBcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJCb2FyZC5iYXR0bGVzaGlwLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyQ3J1aXNlcjFcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJCb2FyZC5DcnVpc2VyMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlckNydWlzZXIyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQuQ3J1aXNlcjIuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJTdWIxXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQuU3ViMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlclN1YjJcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJCb2FyZC5TdWIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyU3ViM1wiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlckJvYXJkLlN1YjMuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJEZXN0cm95ZXIxXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQuRGVzdHJveWVyMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlckRlc3Ryb3llcjJcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJCb2FyZC5EZXN0cm95ZXIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyRGVzdHJveWVyM1wiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlckJvYXJkLkRlc3Ryb3llcjMuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJEZXN0cm95ZXI0XCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQuRGVzdHJveWVyNC5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZygnaG1tJylcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL0lmIHNoaXAgaXMgbm90IGhpdCwgYWRkIHRvIG1pc3NlZFNob3RzXG4gICAgICAgICAgICB0aGlzLm1pc3NlZFNob3RzLnB1c2gobG9jYXRpb24pO1xuICAgICAgICAgICAgZGlzcGxheU1pc3ModGhpcy5taXNzZWRTaG90cywgYGJvYXJkICR7dGhpcy5uYW1lfWApO1xuICAgICAgICB9O1xuICAgICAgICAvL0FmdGVyIGF0dGFjayByZWNlaXZlZCwgY2hlY2sgZm9yIGdhbWUgb3ZlclxuICAgICAgICByZXR1cm4gdGhpcy5maW5kU2hpcHMoKTtcbiAgICB9O1xuXG4gICAgLy9GaW5kcyBub24tc3VuayBzaGlwcyBvbiBib2FyZCwgaWYgbm9uZSwgcmVwb3J0cyBnYW1lIG92ZXJcbiAgICBmaW5kU2hpcHMgPSAoKSA9PiB7XG4gICAgICAgIGNoZWNrRm9yU2hpcHModGhpcy5uYW1lKTtcbiAgICB9OyAvL25lZWQgdG8gZml4XG59O1xuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsImltcG9ydCB7IGRpc3BsYXlCb2FyZCwgcmVtb3ZlRm9ybSwgZGlzcGxheU5hbWUgfSBmcm9tIFwiLi9ET01cIjtcbmltcG9ydCB7IFBsYXllciwgY29tcHV0ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpO1xubGV0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJyk7XG5sZXQgcGxheWVyQm9hcmQ7XG5sZXQgY29tcHV0ZXJCb2FyZDtcblxuc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkaXNwbGF5TmFtZSgpO1xuICAgIGRpc3BsYXlCb2FyZCgncGxheWVyJyk7XG4gICAgZGlzcGxheUJvYXJkKCdjb21wdXRlcicpO1xuICAgIGdhbWVMb29wKG5hbWVJbnB1dC52YWx1ZSk7XG4gICAgcmVtb3ZlRm9ybSgpO1xufSk7XG5cbmNvbnN0IGdhbWVMb29wID0gKG5hbWUpID0+IHtcbiAgICBwbGF5ZXJCb2FyZCA9IG5ldyBQbGF5ZXIobmFtZSk7XG4gICAgY29tcHV0ZXJCb2FyZCA9IG5ldyBjb21wdXRlcignY29tcHV0ZXInKTtcblxuICAgIC8vTWFudWFsbHkgYWRkU2hpcHMgZm9yIG5vd1xuICAgIGZ1bmN0aW9uIGNvbXB1dGVyU2hpcHMoKSB7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKDUxLCA0LCBcImNvbXB1dGVyQmF0dGxlc2hpcFwiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoMjcsIDMsIFwiY29tcHV0ZXJDcnVpc2VyMVwiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoMSwgMywgXCJjb21wdXRlckNydWlzZXIyXCIpO1xuICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkLnBsYWNlU2hpcCg4OCwgMiwgXCJjb21wdXRlclN1YjFcIik7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKDkxLCAyLCBcImNvbXB1dGVyU3ViMlwiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoMzQsIDIsIFwiY29tcHV0ZXJTdWIzXCIpO1xuICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkLnBsYWNlU2hpcCg2NCwgMSwgXCJjb21wdXRlckRlc3Ryb3llcjFcIik7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKDQ5LCAxLCBcImNvbXB1dGVyRGVzdHJveWVyMlwiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoNTAsIDEsIFwiY29tcHV0ZXJEZXN0cm95ZXIzXCIpO1xuICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkLnBsYWNlU2hpcCg3NywgMSwgXCJjb21wdXRlckRlc3Ryb3llcjRcIik7XG4gICAgfTtcblxuICAgIGNvbXB1dGVyU2hpcHMoKTtcblxuICAgIGZ1bmN0aW9uIHBsYXllclNoaXBzKCkge1xuICAgICAgICBwbGF5ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoNTEsIDQsIFwicGxheWVyQmF0dGxlc2hpcFwiKTtcbiAgICAgICAgcGxheWVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKDI3LCAzLCBcInBsYXllckNydWlzZXIxXCIpO1xuICAgICAgICBwbGF5ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoMSwgMywgXCJwbGF5ZXJDcnVpc2VyMlwiKTtcbiAgICAgICAgcGxheWVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKDg4LCAyLCBcInBsYXllclN1YjFcIik7XG4gICAgICAgIHBsYXllckJvYXJkLmJvYXJkLnBsYWNlU2hpcCg5MSwgMiwgXCJwbGF5ZXJTdWIyXCIpO1xuICAgICAgICBwbGF5ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoMzQsIDIsIFwicGxheWVyU3ViM1wiKTtcbiAgICAgICAgcGxheWVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKDY0LCAxLCBcInBsYXllckRlc3Ryb3llcjFcIik7XG4gICAgICAgIHBsYXllckJvYXJkLmJvYXJkLnBsYWNlU2hpcCg0OSwgMSwgXCJwbGF5ZXJEZXN0cm95ZXIyXCIpO1xuICAgICAgICBwbGF5ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoNTAsIDEsIFwicGxheWVyRGVzdHJveWVyM1wiKTtcbiAgICAgICAgcGxheWVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKDc3LCAxLCBcInBsYXllckRlc3Ryb3llcjRcIik7XG4gICAgfTtcblxuICAgIHBsYXllclNoaXBzKCk7XG4gICAgXG4gICAgbGV0IHR1cm5Db3VudGVyID0gMjtcbiAgICBmdW5jdGlvbiBydW5UdXJucyhjb3VudCkge1xuICAgICAgICBsZXQgbG9jYWxDb3VudCA9IGNvdW50O1xuICAgICAgICAvKiB3YWl0aW5nIHVudGlsIHN0ZXAgNSBpbiB0b3AgaW5zdHJ1Y3Rpb25zXG4gICAgICAgIGlmICh0dXJuQ291bnRlciA9PT0gMCkge1xuICAgICAgICAgICAvL3BsYWNlIHNoaXBzIHRoZW4gaW5jcmVhc2UgdHVybkNvdW50ZXIgXG4gICAgICAgIH0qL1xuICAgICAgICAvL3doaWxlIGdhbWUgbm90IG92ZXJcbiAgICAgICAgY29uc3QgY2hlY2tUdXJuID0gKGNvdW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoY291bnQgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyVHVybigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb21wdXRlclR1cm4oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIGNvbnN0IHBsYXllclR1cm4gPSAoKSA9PiB7XG4gICAgICAgICAgICBsb2NhbENvdW50Kys7XG4gICAgICAgICAgICAvL0NoZWNrIGZvciBib2FyZHMgbG9hZGVkXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmQgY29tcHV0ZXInKSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmQgY29tcHV0ZXInKVtpXTtcblxuICAgICAgICAgICAgICAgICAgICAvL01ha2UgY29tcHV0ZXIgYm9hcmQgYWJsZSB0byBiZSBhdHRhY2tlZCBvbiBjbGlja1xuICAgICAgICAgICAgICAgICAgICBzcXVhcmUub25jbGljayA9IGZ1bmN0aW9uIGFsbG93QXR0YWNrKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9TZW5kIGF0dGFja1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5yZWNlaXZlQXR0YWNrKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9DaGVjayBmb3IgZ2FtZSBvdmVyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkLmZpbmRTaGlwcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoZWNrVHVybihsb2NhbENvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9OyBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdlcnJvciBpbiBwbGF5ZXIgYXR0YWNrIGZsb3cnKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBjb21wdXRlclR1cm4gPSAoKSA9PiB7XG4gICAgICAgICAgICBsb2NhbENvdW50Kys7XG4gICAgICAgICAgICAvL0NoZWNrIGZvciBib2FyZCBsb2FkZWRcbiAgICAgICAgICAgIC8qaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkIGNvbXB1dGVyJykgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkIGNvbXB1dGVyJylbaV07XG4gICAgICAgICAgICAgICAgICAgIC8vUmVtb3ZlRXZlbnRMaXN0ZW5lcnMgZm9yIHBsYXllclxuICAgICAgICAgICAgICAgICAgICBzcXVhcmUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhbGxvd0F0dGFjayk7IC8vYWxsb3dBdHRhY2sgbm90IGRlZmluZWQsIGdvaW5nIHRvIGZvY3VzIG9uIGdldHRpbmcgdHVybiBmbG93IHRvIHdvcmsgYW5kIHRoZW4gY29tZSBiYWNrIHRvIGZpeCB0aGlzXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH07Ki9cbiAgICAgICAgICAgIGxldCByYW5kb21BdHRhY2sgPSBjb21wdXRlckJvYXJkLnJhbmRvbU1vdmUoKTtcblxuICAgICAgICAgICAgLy9TZW5kIGF0dGFja1xuICAgICAgICAgICAgcGxheWVyQm9hcmQuYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21BdHRhY2spO1xuICAgICAgICAgICAgLy9DaGVjayBmb3IgZ2FtZSBvdmVyXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZC5ib2FyZC5maW5kU2hpcHMoKTtcbiAgICAgICAgICAgIHJldHVybiBjaGVja1R1cm4obG9jYWxDb3VudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9jYWxDb3VudCA9PT0gMikgY2hlY2tUdXJuKGxvY2FsQ291bnQpO1xuICAgIH07XG4gICAgcnVuVHVybnModHVybkNvdW50ZXIpO1xuICAgIC8vZmlyc3QgcGxhY2Ugc2hpcHNcbiAgICAvL2NvbXAgcGxhY2VzIHJhbmRvbWx5LCBwbGFjZXMgcGlja3NcbiAgICAvKmlmICh0dXJuQ291bnRlciAlIDIgPT09IDApIHtcbiAgICAgICAgLy9wbGF5ZXIncyB0dXJuXG4gICAgICAgIHR1cm5Db3VudGVyKys7XG4gICAgICAgICAgICAvL0NoZWNrIGZvciBib2FyZHMgbG9hZGVkXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnIGJvYXJkIGNvbXB1dGVyJykgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkIGNvbXB1dGVyJylbaV07XG5cbiAgICAgICAgICAgICAgICAgICAgLypzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkLnJlY2VpdmVBdHRhY2soaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHVybkNvdW50ZXIrKztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbG93QXR0YWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy90dXJuQ291bnRlcisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codHVybkNvdW50ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQuYm9hcmQucmVjZWl2ZUF0dGFjayhpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhbGxvd0F0dGFjayk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZygnZXJyb3IgaW4gYXR0YWNrIGZsb3cnKVxuICAgICAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR1cm5Db3VudGVyICUgMiAhPSAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdtYWRlIGl0IHRvIGNvbXAgdHVybicpO1xuICAgICAgICAgICAgLy9jb21wdXRlciB0dXJuXG4gICAgICAgICAgICAvL29uIGNvbXB1dGVyIHR1cm4sIHJlbW92ZUV2ZW50TGlzdGVuZXJzXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnIGJvYXJkIGNvbXB1dGVyJykgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkIGNvbXB1dGVyJylbaV07XG5cbiAgICAgICAgICAgICAgICAgICAgc3F1YXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWxsb3dBdHRhY2spO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmFuZG9tQXR0YWNrID0gY29tcHV0ZXJCb2FyZC5yYW5kb21Nb3ZlKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyYW5kb21BdHRhY2spO1xuXG4gICAgICAgICAgICByZXR1cm4gcGxheWVyQm9hcmQuYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21BdHRhY2spICAgXG4gICAgfSovXG4gICAgcmV0dXJuXG59XG5cbmV4cG9ydCB7IGdhbWVMb29wLCBwbGF5ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZCB9O1xuIiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgeyBCYXR0bGVzaGlwLCBDcnVpc2VyLCBEZXN0cm95ZXIsIFN1YiB9IGZyb20gXCIuL3NoaXAuanNcIjtcblxuY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIC8vdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQobmFtZSk7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCdwbGF5ZXInKTtcbiAgICAgICAgdGhpcy5iYXR0bGVzaGlwID0gbmV3IEJhdHRsZXNoaXAoJ3BsYXllcicpO1xuICAgICAgICB0aGlzLkNydWlzZXIxID0gbmV3IENydWlzZXIoJ3BsYXllcicsIDEpO1xuICAgICAgICB0aGlzLkNydWlzZXIyID0gbmV3IENydWlzZXIoJ3BsYXllcicsIDIpO1xuICAgICAgICB0aGlzLlN1YjEgPSBuZXcgU3ViKCdwbGF5ZXInLCAxKTtcbiAgICAgICAgdGhpcy5TdWIyID0gbmV3IFN1YigncGxheWVyJywgMik7XG4gICAgICAgIHRoaXMuU3ViMyA9IG5ldyBTdWIoJ3BsYXllcicsIDMpO1xuICAgICAgICB0aGlzLkRlc3Ryb3llcjEgPSBuZXcgRGVzdHJveWVyKCdwbGF5ZXInLCAxKTtcbiAgICAgICAgdGhpcy5EZXN0cm95ZXIyID0gbmV3IERlc3Ryb3llcigncGxheWVyJywgMik7XG4gICAgICAgIHRoaXMuRGVzdHJveWVyMyA9IG5ldyBEZXN0cm95ZXIoJ3BsYXllcicsIDMpO1xuICAgICAgICB0aGlzLkRlc3Ryb3llcjQgPSBuZXcgRGVzdHJveWVyKCdwbGF5ZXInLCA0KTtcbiAgICB9O1xuXG4gICAgZ2V0TmFtZSA9ICgpID0+IHRoaXMubmFtZTtcblxuICAgIHBsYXllckJvYXJkID0gKCkgPT4gdGhpcy5ib2FyZDtcblxuICAgIGF0dGFjayA9IChsb2NhdGlvbikgPT4gdGhpcy5ib2FyZC5yZWNlaXZlQXR0YWNrKGxvY2F0aW9uKTtcbn07XG5cbmNsYXNzIGNvbXB1dGVyIGV4dGVuZHMgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIC8vQ3JlYXRlIG5hbWUgYW5kIGJvYXJkIHVzaW5nIG5hbWUgaW5wdXRcbiAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgR2FtZWJvYXJkKG5hbWUpO1xuICAgICAgICB0aGlzLmJhdHRsZXNoaXAgPSBuZXcgQmF0dGxlc2hpcCgnY29tcHV0ZXInKTtcbiAgICAgICAgdGhpcy5DcnVpc2VyMSA9IG5ldyBDcnVpc2VyKCdjb21wdXRlcicsIDEpO1xuICAgICAgICB0aGlzLkNydWlzZXIyID0gbmV3IENydWlzZXIoJ2NvbXB1dGVyJywgMik7XG4gICAgICAgIHRoaXMuU3ViMSA9IG5ldyBTdWIoJ2NvbXB1dGVyJywgMSk7XG4gICAgICAgIHRoaXMuU3ViMiA9IG5ldyBTdWIoJ2NvbXB1dGVyJywgMik7XG4gICAgICAgIHRoaXMuU3ViMyA9IG5ldyBTdWIoJ2NvbXB1dGVyJywgMyk7XG4gICAgICAgIHRoaXMuRGVzdHJveWVyMSA9IG5ldyBEZXN0cm95ZXIoJ2NvbXB1dGVyJywgMSk7XG4gICAgICAgIHRoaXMuRGVzdHJveWVyMiA9IG5ldyBEZXN0cm95ZXIoJ2NvbXB1dGVyJywgMik7XG4gICAgICAgIHRoaXMuRGVzdHJveWVyMyA9IG5ldyBEZXN0cm95ZXIoJ2NvbXB1dGVyJywgMyk7XG4gICAgICAgIHRoaXMuRGVzdHJveWVyNCA9IG5ldyBEZXN0cm95ZXIoJ2NvbXB1dGVyJywgNCk7XG4gICAgICAgIC8vU3RvcmUgcGxheWVkIG1vdmVzIGZvciBmdXR1cmUgcmVmZXJlbmNlXG4gICAgICAgIHRoaXMub2xkTW92ZXMgPSBbXTtcbiAgICB9O1xuXG4gICAgcmFuZG9tTW92ZSA9ICgpID0+IHtcbiAgICAgICAgLy9HZW5lcmF0ZSBudW1iZXIgYmV0d2VlbiAwIC0gMTAwIFxuICAgICAgICAvL2xldCBtb3ZlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAxKTtcbiAgICAgICAgbGV0IG1vdmUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMTtcblxuXG4gICAgICAgIC8vQ2hlY2tpbmcgdGhhdCB0aGUgcmFuZG9tIG1vdmUgaXMgbm90IGNvbnRhaW5lZCBpbiB0aGUgb2xkTW92ZXMgYXJyYXlcbiAgICAgICAgLyppZiAodGhpcy5vbGRNb3Zlcy5maWx0ZXIobG9jID0+IGxvYyA9PT0gbW92ZSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy9DYWxsIGl0c2VsZiB0byBtYWtlIGFub3RoZXIgbW92ZSBpZiB0aGUgcmFuZG9tIG1vdmUgaXMgaWxsZWdhbFxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFuZG9tTW92ZSgpO1xuICAgICAgICB9Ki9cblxuICAgICAgICAvL0Fzc3VtaW5nIG1vdmUgaXMgbGVnYWwsIGFkZCBpdCB0byB0aGUgb2xkTW92ZXMgYXJyYXksIGNhbGwgUGxheWVyKCkuYXR0YWNrKG1vdmUpO1xuICAgICAgICB0aGlzLm9sZE1vdmVzLnB1c2gobW92ZSk7XG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5vbGRNb3Zlcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKG1vdmUpO1xuICAgICAgICByZXR1cm4gbW92ZSAvL3N1cGVyLmF0dGFjayhtb3ZlKTtcbiAgICB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyLCBjb21wdXRlciB9O1xuIiwiY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobGVuZ3RoLCBuYW1lKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICAvL1NoaXBzIGluaXRpYWxpemUgd2l0aCAwIGhpdHNcbiAgICAgICAgdGhpcy5oaXROdW1iZXIgPSAwO1xuICAgICAgICB0aGlzLmNvb3JkcyA9IFtdO1xuICAgIH1cblxuICAgIGxlbmd0aE9mU2hpcCA9ICgpID0+IHRoaXMubGVuZ3RoO1xuXG4gICAgY3VycmVudEhpdHMgPSAoKSA9PiB0aGlzLmhpdE51bWJlcjtcblxuICAgIC8vSW5jcmVhc2UgdGhlIGhpdE51bWJlciBmb3IgYSBzaGlwXG4gICAgaGl0ID0gKGhpdCkgPT4ge1xuICAgICAgICBpZiAoaGl0ID09IDEpIHJldHVybiB0aGlzLmhpdE51bWJlcisrO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmhpdE51bWJlcik7XG4gICAgICAgIHJldHVyblxuICAgIH07XG5cbiAgICAvL0NoZWNrIGlmIHRoZSBzaGlwIGhhcyBiZWVuIHN1bmsgYnkgY29tcGFyaW5nIGhpdE51bWJlciB0byBsZW5ndGhcbiAgICBpc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmhpdE51bWJlciA8IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbm90IHN1bmsnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdW5rJyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICB9O1xufTtcblxuY2xhc3MgQmF0dGxlc2hpcCBleHRlbmRzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKHdob3NlKSB7XG4gICAgICAgIHN1cGVyKDQsICdCYXR0bGVzaGlwJyk7XG4gICAgICAgIHRoaXMub3duZXIgPSB3aG9zZTtcbiAgICB9O1xufTtcblxuY2xhc3MgQ3J1aXNlciBleHRlbmRzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKHdob3NlLCBzaGlwSUQpIHtcbiAgICAgICAgc3VwZXIoMywgJ0NydWlzZXInKTtcbiAgICAgICAgdGhpcy5vd25lciA9IHdob3NlO1xuICAgICAgICB0aGlzLnNoaXBJRCA9IHNoaXBJRDtcbiAgICB9O1xufTtcblxuY2xhc3MgU3ViIGV4dGVuZHMgU2hpcCB7XG4gICAgY29uc3RydWN0b3Iod2hvc2UsIHNoaXBJRCkge1xuICAgICAgICBzdXBlcigyLCAnU3ViJyk7XG4gICAgICAgIHRoaXMub3duZXIgPSB3aG9zZTtcbiAgICAgICAgdGhpcy5zaGlwSUQgPSBzaGlwSUQ7XG4gICAgfTtcbn07XG5cbmNsYXNzIERlc3Ryb3llciBleHRlbmRzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKHdob3NlLCBzaGlwSUQpIHtcbiAgICAgICAgc3VwZXIoMSwgJ0Rlc3Ryb3llcicpO1xuICAgICAgICB0aGlzLm93bmVyID0gd2hvc2U7XG4gICAgICAgIHRoaXMuc2hpcElEID0gc2hpcElEO1xuICAgIH07XG59O1xuXG5cbmV4cG9ydCB7IFNoaXAsIEJhdHRsZXNoaXAsIENydWlzZXIsIFN1YiwgRGVzdHJveWVyIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
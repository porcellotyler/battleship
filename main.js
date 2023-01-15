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
                //return playerBattleship.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.battleship.hit(1);
            } else if (target.classList.contains("playerCruiser1")) {
                //return playerCruiser1.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Cruiser1.hit(1);
            } else if (target.classList.contains("playerCruiser2")) {
                //return playerCruiser2.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Cruiser2.hit(1);
            } else if (target.classList.contains("playerSub1")) {
                //return playerSub1.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Sub1.hit(1);
            } else if (target.classList.contains("playerSub2")) {
                //return playerSub2.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Sub2.hit(1);
            } else if (target.classList.contains("playerSub3")) {
                //return playerSub3.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Sub3.hit(1);
            } else if (target.classList.contains("playerDestroyer1")) {
                //return playerDestroyer1.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Destroyer1.hit(1);
            } else if (target.classList.contains("playerDestroyer2")) {
                //return playerDestroyer2.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Destroyer2.hit(1);
            } else if (target.classList.contains("playerDestroyer3")) {
                //return playerDestroyer3.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Destroyer3.hit(1);
            } else if (target.classList.contains("playerDestroyer4")) {
                //return playerDestroyer4.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.playerBoard.Destroyer4.hit(1);
            } else if (target.classList.contains("computerBattleship")) {
                //return computerBattleship.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.battleship.hit(1);
            } else if (target.classList.contains("computerCruiser1")) {
                //return computerCruiser1.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.Cruiser1.hit(1);
            } else if (target.classList.contains("computerCruiser2")) {
                //return computerCruiser2.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.Cruiser2.hit(1);
            } else if (target.classList.contains("computerSub1")) {
                //return computerSub1.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.Sub1.hit(1);
            } else if (target.classList.contains("computerSub2")) {
                //return computerSub2.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.Sub2.hit(1);
            } else if (target.classList.contains("computerSub3")) {
                //return computerSub3.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.Sub3.hit(1);
            } else if (target.classList.contains("computerDestroyer1")) {
                //return computerDestroyer1.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.Destroyer1.hit(1);
            } else if (target.classList.contains("computerDestroyer2")) {
                //return computerDestroyer2.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.Destroyer2.hit(1);
            } else if (target.classList.contains("computerDestroyer3")) {
                //return computerDestroyer3.hit(1);
                return _index_js__WEBPACK_IMPORTED_MODULE_1__.computerBoard.Destroyer3.hit(1);
            } else if (target.classList.contains("computerDestroyer4")) {
                //return computerDestroyer4.hit(1);
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
        if (this.shipCoords.length == this.hitCoords.length) return "Game over!"
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

    /* waiting until step 5 in top instructions
    if (turnCounter === 0) {
       //place ships then increase turnCounter 
    }*/

    //while game not over
        //first place ships
        //comp places randomly, places picks
        if (turnCounter % 2 === 0) {
            //Check for grids loaded
            if (document.getElementsByClassName(' board computer') != null) {
                for (let i = 1; i < 100; i++) {
                    let square = document.getElementsByClassName('board computer')[i];

                    square.addEventListener('click', () => {
                        computerBoard.board.receiveAttack(i);
                    });
                };
            } else {
                console.log('error in attack flow')
            };            
        } else {
            //computer turn
            //on computer turn, removeEventListeners
            //return playerBoard.board.receiveAttack(location, 'board player');
            //let randomAttack = computerBoard.randomMove();
            //console.log(randomAttack);

            //return playerBoard.board.receiveAttack(randomAttack)
        }

    //After ships are placed, allow players to attack
    /*const attackComputer = (location) => {
        //return computerBoard.receiveAttack(location, 'board computer');
        return computerBoard.board.receiveAttack(location, 'board computer');
    };

    const attackPlayer = (location) => {
        //return playerBoard.receiveAttack(location, 'board player');
        return playerBoard.board.receiveAttack(location, 'board player');
    };*/

    //add turn counter?
    return //{ attackComputer, attackPlayer };
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
        let move = Math.floor(Math.random() * 101);

        //Checking that the random move is not contained in the oldMoves array
        if (this.oldMoves.filter(loc => loc === move).length > 0) {
            //Call itself to make another move if the random move is illegal
            return this.randomMove();
        }

        //Assuming move is legal, add it to the oldMoves array, call Player().attack(move);
        this.oldMoves.push(move);
        return super.attack(move);
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
        if (hit == true) return this.hitNumber++;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OEIsK0NBQVM7QUFDdkMsOEJBQThCLCtDQUFTO0FBQ3ZDLDhCQUE4QiwrQ0FBUztBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFNEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5RDVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdxRDs7Ozs7OztVQ2hFckQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvRE9NLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHBsYXllckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXJEaXYnKTtcbmNvbnN0IGNvbXB1dGVyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbXB1dGVyRGl2Jyk7XG5sZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybVwiKTtcbmxldCBuYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZScpO1xuXG5jb25zdCBkaXNwbGF5Qm9hcmQgPSAocGxheWVyKSA9PiB7XG4gICAgLy9EZXRlcm1pbmUgd2hvc2UgYm9hcmQgaXRcbiAgICBsZXQgcGFyZW50RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cGxheWVyfURpdmApO1xuICAgIFxuICAgIC8vQ3JlYXRlIGJvYXJkIGNvbnRhaW5lclxuICAgIGxldCBib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJvYXJkQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdib2FyZENvbnRhaW5lcic7XG5cbiAgICAvL0NyZWF0ZSBib2FyZCBvZiAxMDAgZGl2aXNpb25zXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMDE7IGkrKykge1xuICAgICAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIC8vU2V0IGVhY2ggc3F1YXJlJ3MgSUQgdG8gaSBzbyB0aGV5J3JlIG51bWJlcmVkIDEgLSAxMDBcbiAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2l9YCk7XG4gICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBcImJvYXJkXCI7XG4gICAgICAgIC8vU3BlY2lmeSB3aGljaCBib2FyZCBlYWNoIGRpdiBpcyBhIHBhcnQgb2ZcbiAgICAgICAgaWYgKHBhcmVudERpdi5pZCA9PSAncGxheWVyRGl2Jykge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ3BsYXllcicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2NvbXB1dGVyJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9O1xuXG4gICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKGJvYXJkQ29udGFpbmVyKTtcblxuICAgIHJldHVybjtcbn07XG5cbmZ1bmN0aW9uIHJlbW92ZUZvcm0oKSB7XG4gICAgZm9ybS5yZW1vdmUoKTtcbn07XG5cbmZ1bmN0aW9uIGRpc3BsYXlOYW1lKCkgeyBcbiAgICBwbGF5ZXJEaXYuaW5uZXJUZXh0ID0gYCR7bmFtZUlucHV0LnZhbHVlfWA7XG4gICAgY29tcHV0ZXJEaXYuaW5uZXJUZXh0ID0gXCJDb21wdXRlclwiO1xuICAgIHJldHVyblxufTtcblxuZnVuY3Rpb24gZGlzcGxheVNoaXBzKGJvYXJkTmFtZSwgbG9jYXRpb25zLCBzaGlwTmFtZSkge1xuICAgIHdoaWxlIChsb2NhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAvL0ZpbmQgdGFyZ2V0IGRpdlxuICAgICAgICBsZXQgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtib2FyZE5hbWV9YClbbG9jYXRpb25zWzBdXTtcblxuICAgICAgICAvL0FkZCBzaGlwIGFuZCBzaGlwTmFtZSBjbGFzc2VzXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKGAke3NoaXBOYW1lfWApO1xuICAgICAgICBcbiAgICAgICAgbG9jYXRpb25zLnNoaWZ0KCk7XG4gICAgfTtcbiAgICByZXR1cm5cbn07XG5cbmZ1bmN0aW9uIGRpc3BsYXlIaXRzKGJvYXJkTmFtZSwgbG9jYXRpb25zKSB7XG4gICAgd2hpbGUgKGxvY2F0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vRmluZCB0YXJnZXQgZGl2XG4gICAgICAgIGxldCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke2JvYXJkTmFtZX1gKVtsb2NhdGlvbnNbMF1dO1xuXG4gICAgICAgIC8vUmVtb3ZlIHNoaXAgY2xhc3NcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKTtcblxuICAgICAgICAvL0FkZCBoaXQgY2xhc3MgXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcblxuICAgICAgICBsb2NhdGlvbnMuc2hpZnQoKTtcbiAgICB9O1xuICAgIHJldHVybiBcbn07XG5cbmZ1bmN0aW9uIGRpc3BsYXlNaXNzKGxvY2F0aW9uLCBib2FyZE5hbWUpIHtcbiAgICB3aGlsZSAobG9jYXRpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAvL0FkZCBtaXNzIGNsYXNzLCBbbG9jYXRpb24gLSAxXSBzZWVtcyBidWdneS4gTm90IGludmVzdGlnYXRpbmcgcm4gYnV0IGNvdWxkIGNhdXNlIGlzc3VlcyBkb3duIHRoZSByb2FkLlxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke2JvYXJkTmFtZX1gKVtsb2NhdGlvbiAtIDFdLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgICAgbG9jYXRpb24uc2hpZnQoKTtcbiAgICB9O1xuICAgIHJldHVybiBcbn07XG5cbmV4cG9ydCB7IGRpc3BsYXlCb2FyZCwgcmVtb3ZlRm9ybSwgZGlzcGxheU5hbWUsIGRpc3BsYXlTaGlwcywgZGlzcGxheUhpdHMsIGRpc3BsYXlNaXNzIH07XG4iLCJpbXBvcnQgeyBkaXNwbGF5U2hpcHMsIGRpc3BsYXlIaXRzLCBkaXNwbGF5TWlzcyB9IGZyb20gXCIuL0RPTVwiXG5pbXBvcnQgeyBwbGF5ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZCB9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNvb3JkaW5hdGVzID0gW1xuICAgICAgICAgICAgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsXG4gICAgICAgICAgICAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCxcbiAgICAgICAgICAgIDIxLCAyMiwgMjMsIDI0LCAyNSwgMjYsIDI3LCAyOCwgMjksIDMwLFxuICAgICAgICAgICAgMzEsIDMyLCAzMywgMzQsIDM1LCAzNiwgMzcsIDM4LCAzOSwgNDAsXG4gICAgICAgICAgICA0MSwgNDIsIDQzLCA0NCwgNDUsIDQ2LCA0NywgNDgsIDQ5LCA1MCxcbiAgICAgICAgICAgIDUxLCA1MiwgNTMsIDU0LCA1NSwgNTYsIDU3LCA1OCwgNTksIDYwLFxuICAgICAgICAgICAgNjEsIDYyLCA2MywgNjQsIDY1LCA2NiwgNjcsIDY4LCA2OSwgNzAsXG4gICAgICAgICAgICA3MSwgNzIsIDczLCA3NCwgNzUsIDc2LCA3NywgNzgsIDc5LCA4MCxcbiAgICAgICAgICAgIDgxLCA4MiwgODMsIDg0LCA4NSwgODYsIDg3LCA4OCwgODksIDkwLFxuICAgICAgICAgICAgOTEsIDkyLCA5MywgOTQsIDk1LCA5NiwgOTcsIDk4LCA5OSwgMTAwLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLnNoaXBDb29yZHMgPSBbXTtcbiAgICAgICAgdGhpcy5oaXRDb29yZHMgPSBbXTtcbiAgICAgICAgdGhpcy5taXNzZWRTaG90cyA9IFtdO1xuICAgIH1cblxuICAgIC8vUGxhY2Ugc2hpcHMgYXQgc3BlY2lmaWMgY29vcmRpbmF0ZXNcbiAgICBwbGFjZVNoaXAgPSAoc3RhcnRQb2ludCwgbGVuZ3RoLCBzaGlwTmFtZSkgPT4ge1xuICAgICAgICB3aGlsZSAobGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zaGlwQ29vcmRzLnB1c2goc3RhcnRQb2ludCk7Ly9zaGlwQ29vcmRzIG5vdCBhIG1hc3RlciBsaXN0XG4gICAgICAgICAgICBzdGFydFBvaW50Kys7XG4gICAgICAgICAgICBsZW5ndGgtLTtcbiAgICAgICAgfTtcbiAgICAgICAgLy9BZGQgY29vcmRzIHRvIHNoaXAgYXMgd2VsbD8gbm90IG5lZWRlZCBpIHRoaW5rIFxuICAgICAgICAvL3NoaXBzIGFyZSBiZWluZyBhZGRlZCBhdCBzdGFydFBvaW50ICsgMSBmb3Igc29tZSByZWFzb24gcm4sIGludmVzdGlnYXRlIGxhdGVyXG4gICAgICAgIHJldHVybiBkaXNwbGF5U2hpcHModGhpcy5uYW1lLCB0aGlzLnNoaXBDb29yZHMsIHNoaXBOYW1lKTtcbiAgICB9O1xuXG4gICAgcmVjZWl2ZUF0dGFjayhsb2NhdGlvbikge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgYm9hcmQgJHt0aGlzLm5hbWV9YClbbG9jYXRpb25dO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGxvY2F0aW9uKTsgLy9jb21pbmcgaW4gYXMgMSBsZXNzIHRoYW4gd2hhdHMgY2xpY2tlZCwgdW5zdXJlIHdoeVxuICAgICAgICAvL2NvbnNvbGUubG9nKHRhcmdldCk7XG5cbiAgICAgICAgLy9EZXRlcm1pbmVzIGlmIGEgc2hpcCBpcyBoaXQgLT4gdGFyZ2V0IHVuZGVmIHJuXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaGlwJykpIHtcbiAgICAgICAgICAgIC8vSWYgYSBzaGlwIHdhcyBoaXQsIHNlbmQgaGl0IHRvIHNoaXAgYW5kIHJlY29yZCBsb2NhdGlvblxuICAgICAgICAgICAgdGhpcy5oaXRDb29yZHMucHVzaChsb2NhdGlvbik7XG4gICAgICAgICAgICBkaXNwbGF5SGl0cyh0aGlzLm5hbWUsIHRoaXMuaGl0Q29vcmRzKTtcblxuICAgICAgICAgICAgLy9DaGVjayB3aGljaCBzaGlwIGl0IGlzXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckJhdHRsZXNoaXBcIikpIHtcbiAgICAgICAgICAgICAgICAvL3JldHVybiBwbGF5ZXJCYXR0bGVzaGlwLmhpdCgxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyQm9hcmQuYmF0dGxlc2hpcC5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJDcnVpc2VyMVwiKSkge1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHBsYXllckNydWlzZXIxLmhpdCgxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyQm9hcmQuQ3J1aXNlcjEuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyQ3J1aXNlcjJcIikpIHtcbiAgICAgICAgICAgICAgICAvL3JldHVybiBwbGF5ZXJDcnVpc2VyMi5oaXQoMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckJvYXJkLkNydWlzZXIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllclN1YjFcIikpIHtcbiAgICAgICAgICAgICAgICAvL3JldHVybiBwbGF5ZXJTdWIxLmhpdCgxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyQm9hcmQuU3ViMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJTdWIyXCIpKSB7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gcGxheWVyU3ViMi5oaXQoMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckJvYXJkLlN1YjIuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyU3ViM1wiKSkge1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHBsYXllclN1YjMuaGl0KDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJCb2FyZC5TdWIzLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckRlc3Ryb3llcjFcIikpIHtcbiAgICAgICAgICAgICAgICAvL3JldHVybiBwbGF5ZXJEZXN0cm95ZXIxLmhpdCgxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyQm9hcmQuRGVzdHJveWVyMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJEZXN0cm95ZXIyXCIpKSB7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gcGxheWVyRGVzdHJveWVyMi5oaXQoMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckJvYXJkLkRlc3Ryb3llcjIuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyRGVzdHJveWVyM1wiKSkge1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHBsYXllckRlc3Ryb3llcjMuaGl0KDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJCb2FyZC5EZXN0cm95ZXIzLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckRlc3Ryb3llcjRcIikpIHtcbiAgICAgICAgICAgICAgICAvL3JldHVybiBwbGF5ZXJEZXN0cm95ZXI0LmhpdCgxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyQm9hcmQuRGVzdHJveWVyNC5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlckJhdHRsZXNoaXBcIikpIHtcbiAgICAgICAgICAgICAgICAvL3JldHVybiBjb21wdXRlckJhdHRsZXNoaXAuaGl0KDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlckJvYXJkLmJhdHRsZXNoaXAuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJDcnVpc2VyMVwiKSkge1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIGNvbXB1dGVyQ3J1aXNlcjEuaGl0KDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlckJvYXJkLkNydWlzZXIxLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyQ3J1aXNlcjJcIikpIHtcbiAgICAgICAgICAgICAgICAvL3JldHVybiBjb21wdXRlckNydWlzZXIyLmhpdCgxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJCb2FyZC5DcnVpc2VyMi5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlclN1YjFcIikpIHtcbiAgICAgICAgICAgICAgICAvL3JldHVybiBjb21wdXRlclN1YjEuaGl0KDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlckJvYXJkLlN1YjEuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJTdWIyXCIpKSB7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gY29tcHV0ZXJTdWIyLmhpdCgxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJCb2FyZC5TdWIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyU3ViM1wiKSkge1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIGNvbXB1dGVyU3ViMy5oaXQoMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQuU3ViMy5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlckRlc3Ryb3llcjFcIikpIHtcbiAgICAgICAgICAgICAgICAvL3JldHVybiBjb21wdXRlckRlc3Ryb3llcjEuaGl0KDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlckJvYXJkLkRlc3Ryb3llcjEuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJEZXN0cm95ZXIyXCIpKSB7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gY29tcHV0ZXJEZXN0cm95ZXIyLmhpdCgxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJCb2FyZC5EZXN0cm95ZXIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyRGVzdHJveWVyM1wiKSkge1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIGNvbXB1dGVyRGVzdHJveWVyMy5oaXQoMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQuRGVzdHJveWVyMy5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlckRlc3Ryb3llcjRcIikpIHtcbiAgICAgICAgICAgICAgICAvL3JldHVybiBjb21wdXRlckRlc3Ryb3llcjQuaGl0KDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlckJvYXJkLkRlc3Ryb3llcjQuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coJ2htbScpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9JZiBzaGlwIGlzIG5vdCBoaXQsIGFkZCB0byBtaXNzZWRTaG90c1xuICAgICAgICAgICAgdGhpcy5taXNzZWRTaG90cy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGRpc3BsYXlNaXNzKHRoaXMubWlzc2VkU2hvdHMsIGBib2FyZCAke3RoaXMubmFtZX1gKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy9BZnRlciBhdHRhY2sgcmVjZWl2ZWQsIGNoZWNrIGZvciBnYW1lIG92ZXJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZFNoaXBzKCk7XG4gICAgfTtcblxuICAgIC8vRmluZHMgbm9uLXN1bmsgc2hpcHMgb24gYm9hcmQsIGlmIG5vbmUsIHJlcG9ydHMgZ2FtZSBvdmVyXG4gICAgZmluZFNoaXBzID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zaGlwQ29vcmRzLmxlbmd0aCA9PSB0aGlzLmhpdENvb3Jkcy5sZW5ndGgpIHJldHVybiBcIkdhbWUgb3ZlciFcIlxuICAgIH07IC8vbmVlZCB0byBmaXhcbn07XG5cbmV4cG9ydCB7IEdhbWVib2FyZCB9O1xuIiwiaW1wb3J0IHsgZGlzcGxheUJvYXJkLCByZW1vdmVGb3JtLCBkaXNwbGF5TmFtZSB9IGZyb20gXCIuL0RPTVwiO1xuaW1wb3J0IHsgUGxheWVyLCBjb21wdXRlciB9IGZyb20gXCIuL3BsYXllclwiO1xuXG5jb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRcIik7XG5sZXQgbmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKTtcbmxldCBwbGF5ZXJCb2FyZDtcbmxldCBjb21wdXRlckJvYXJkO1xuXG5zdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRpc3BsYXlOYW1lKCk7XG4gICAgZGlzcGxheUJvYXJkKCdwbGF5ZXInKTtcbiAgICBkaXNwbGF5Qm9hcmQoJ2NvbXB1dGVyJyk7XG4gICAgZ2FtZUxvb3AobmFtZUlucHV0LnZhbHVlKTtcbiAgICByZW1vdmVGb3JtKCk7XG59KTtcblxuY29uc3QgZ2FtZUxvb3AgPSAobmFtZSkgPT4ge1xuICAgIHBsYXllckJvYXJkID0gbmV3IFBsYXllcihuYW1lKTtcbiAgICBjb21wdXRlckJvYXJkID0gbmV3IGNvbXB1dGVyKCdjb21wdXRlcicpO1xuXG4gICAgLy9NYW51YWxseSBhZGRTaGlwcyBmb3Igbm93XG4gICAgZnVuY3Rpb24gY29tcHV0ZXJTaGlwcygpIHtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoNTEsIDQsIFwiY29tcHV0ZXJCYXR0bGVzaGlwXCIpO1xuICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkLnBsYWNlU2hpcCgyNywgMywgXCJjb21wdXRlckNydWlzZXIxXCIpO1xuICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkLnBsYWNlU2hpcCgxLCAzLCBcImNvbXB1dGVyQ3J1aXNlcjJcIik7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKDg4LCAyLCBcImNvbXB1dGVyU3ViMVwiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoOTEsIDIsIFwiY29tcHV0ZXJTdWIyXCIpO1xuICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkLnBsYWNlU2hpcCgzNCwgMiwgXCJjb21wdXRlclN1YjNcIik7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKDY0LCAxLCBcImNvbXB1dGVyRGVzdHJveWVyMVwiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoNDksIDEsIFwiY29tcHV0ZXJEZXN0cm95ZXIyXCIpO1xuICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkLnBsYWNlU2hpcCg1MCwgMSwgXCJjb21wdXRlckRlc3Ryb3llcjNcIik7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKDc3LCAxLCBcImNvbXB1dGVyRGVzdHJveWVyNFwiKTtcbiAgICB9O1xuXG4gICAgY29tcHV0ZXJTaGlwcygpO1xuXG4gICAgZnVuY3Rpb24gcGxheWVyU2hpcHMoKSB7XG4gICAgICAgIHBsYXllckJvYXJkLmJvYXJkLnBsYWNlU2hpcCg1MSwgNCwgXCJwbGF5ZXJCYXR0bGVzaGlwXCIpO1xuICAgICAgICBwbGF5ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoMjcsIDMsIFwicGxheWVyQ3J1aXNlcjFcIik7XG4gICAgICAgIHBsYXllckJvYXJkLmJvYXJkLnBsYWNlU2hpcCgxLCAzLCBcInBsYXllckNydWlzZXIyXCIpO1xuICAgICAgICBwbGF5ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoODgsIDIsIFwicGxheWVyU3ViMVwiKTtcbiAgICAgICAgcGxheWVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKDkxLCAyLCBcInBsYXllclN1YjJcIik7XG4gICAgICAgIHBsYXllckJvYXJkLmJvYXJkLnBsYWNlU2hpcCgzNCwgMiwgXCJwbGF5ZXJTdWIzXCIpO1xuICAgICAgICBwbGF5ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoNjQsIDEsIFwicGxheWVyRGVzdHJveWVyMVwiKTtcbiAgICAgICAgcGxheWVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKDQ5LCAxLCBcInBsYXllckRlc3Ryb3llcjJcIik7XG4gICAgICAgIHBsYXllckJvYXJkLmJvYXJkLnBsYWNlU2hpcCg1MCwgMSwgXCJwbGF5ZXJEZXN0cm95ZXIzXCIpO1xuICAgICAgICBwbGF5ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoNzcsIDEsIFwicGxheWVyRGVzdHJveWVyNFwiKTtcbiAgICB9O1xuXG4gICAgcGxheWVyU2hpcHMoKTtcbiAgICBcbiAgICBsZXQgdHVybkNvdW50ZXIgPSAyO1xuXG4gICAgLyogd2FpdGluZyB1bnRpbCBzdGVwIDUgaW4gdG9wIGluc3RydWN0aW9uc1xuICAgIGlmICh0dXJuQ291bnRlciA9PT0gMCkge1xuICAgICAgIC8vcGxhY2Ugc2hpcHMgdGhlbiBpbmNyZWFzZSB0dXJuQ291bnRlciBcbiAgICB9Ki9cblxuICAgIC8vd2hpbGUgZ2FtZSBub3Qgb3ZlclxuICAgICAgICAvL2ZpcnN0IHBsYWNlIHNoaXBzXG4gICAgICAgIC8vY29tcCBwbGFjZXMgcmFuZG9tbHksIHBsYWNlcyBwaWNrc1xuICAgICAgICBpZiAodHVybkNvdW50ZXIgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAvL0NoZWNrIGZvciBncmlkcyBsb2FkZWRcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCcgYm9hcmQgY29tcHV0ZXInKSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmQgY29tcHV0ZXInKVtpXTtcblxuICAgICAgICAgICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkLnJlY2VpdmVBdHRhY2soaSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBpbiBhdHRhY2sgZmxvdycpXG4gICAgICAgICAgICB9OyAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9jb21wdXRlciB0dXJuXG4gICAgICAgICAgICAvL29uIGNvbXB1dGVyIHR1cm4sIHJlbW92ZUV2ZW50TGlzdGVuZXJzXG4gICAgICAgICAgICAvL3JldHVybiBwbGF5ZXJCb2FyZC5ib2FyZC5yZWNlaXZlQXR0YWNrKGxvY2F0aW9uLCAnYm9hcmQgcGxheWVyJyk7XG4gICAgICAgICAgICAvL2xldCByYW5kb21BdHRhY2sgPSBjb21wdXRlckJvYXJkLnJhbmRvbU1vdmUoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmFuZG9tQXR0YWNrKTtcblxuICAgICAgICAgICAgLy9yZXR1cm4gcGxheWVyQm9hcmQuYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21BdHRhY2spXG4gICAgICAgIH1cblxuICAgIC8vQWZ0ZXIgc2hpcHMgYXJlIHBsYWNlZCwgYWxsb3cgcGxheWVycyB0byBhdHRhY2tcbiAgICAvKmNvbnN0IGF0dGFja0NvbXB1dGVyID0gKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIC8vcmV0dXJuIGNvbXB1dGVyQm9hcmQucmVjZWl2ZUF0dGFjayhsb2NhdGlvbiwgJ2JvYXJkIGNvbXB1dGVyJyk7XG4gICAgICAgIHJldHVybiBjb21wdXRlckJvYXJkLmJvYXJkLnJlY2VpdmVBdHRhY2sobG9jYXRpb24sICdib2FyZCBjb21wdXRlcicpO1xuICAgIH07XG5cbiAgICBjb25zdCBhdHRhY2tQbGF5ZXIgPSAobG9jYXRpb24pID0+IHtcbiAgICAgICAgLy9yZXR1cm4gcGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhsb2NhdGlvbiwgJ2JvYXJkIHBsYXllcicpO1xuICAgICAgICByZXR1cm4gcGxheWVyQm9hcmQuYm9hcmQucmVjZWl2ZUF0dGFjayhsb2NhdGlvbiwgJ2JvYXJkIHBsYXllcicpO1xuICAgIH07Ki9cblxuICAgIC8vYWRkIHR1cm4gY291bnRlcj9cbiAgICByZXR1cm4gLy97IGF0dGFja0NvbXB1dGVyLCBhdHRhY2tQbGF5ZXIgfTtcbn1cblxuZXhwb3J0IHsgZ2FtZUxvb3AsIHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkIH07XG4iLCJpbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIjtcbmltcG9ydCB7IEJhdHRsZXNoaXAsIENydWlzZXIsIERlc3Ryb3llciwgU3ViIH0gZnJvbSBcIi4vc2hpcC5qc1wiO1xuXG5jbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgLy90aGlzLmJvYXJkID0gbmV3IEdhbWVib2FyZChuYW1lKTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQoJ3BsYXllcicpO1xuICAgICAgICB0aGlzLmJhdHRsZXNoaXAgPSBuZXcgQmF0dGxlc2hpcCgncGxheWVyJyk7XG4gICAgICAgIHRoaXMuQ3J1aXNlcjEgPSBuZXcgQ3J1aXNlcigncGxheWVyJywgMSk7XG4gICAgICAgIHRoaXMuQ3J1aXNlcjIgPSBuZXcgQ3J1aXNlcigncGxheWVyJywgMik7XG4gICAgICAgIHRoaXMuU3ViMSA9IG5ldyBTdWIoJ3BsYXllcicsIDEpO1xuICAgICAgICB0aGlzLlN1YjIgPSBuZXcgU3ViKCdwbGF5ZXInLCAyKTtcbiAgICAgICAgdGhpcy5TdWIzID0gbmV3IFN1YigncGxheWVyJywgMyk7XG4gICAgICAgIHRoaXMuRGVzdHJveWVyMSA9IG5ldyBEZXN0cm95ZXIoJ3BsYXllcicsIDEpO1xuICAgICAgICB0aGlzLkRlc3Ryb3llcjIgPSBuZXcgRGVzdHJveWVyKCdwbGF5ZXInLCAyKTtcbiAgICAgICAgdGhpcy5EZXN0cm95ZXIzID0gbmV3IERlc3Ryb3llcigncGxheWVyJywgMyk7XG4gICAgICAgIHRoaXMuRGVzdHJveWVyNCA9IG5ldyBEZXN0cm95ZXIoJ3BsYXllcicsIDQpO1xuICAgIH07XG5cbiAgICBnZXROYW1lID0gKCkgPT4gdGhpcy5uYW1lO1xuXG4gICAgcGxheWVyQm9hcmQgPSAoKSA9PiB0aGlzLmJvYXJkO1xuXG4gICAgYXR0YWNrID0gKGxvY2F0aW9uKSA9PiB0aGlzLmJvYXJkLnJlY2VpdmVBdHRhY2sobG9jYXRpb24pO1xufTtcblxuY2xhc3MgY29tcHV0ZXIgZXh0ZW5kcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgLy9DcmVhdGUgbmFtZSBhbmQgYm9hcmQgdXNpbmcgbmFtZSBpbnB1dFxuICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQobmFtZSk7XG4gICAgICAgIHRoaXMuYmF0dGxlc2hpcCA9IG5ldyBCYXR0bGVzaGlwKCdjb21wdXRlcicpO1xuICAgICAgICB0aGlzLkNydWlzZXIxID0gbmV3IENydWlzZXIoJ2NvbXB1dGVyJywgMSk7XG4gICAgICAgIHRoaXMuQ3J1aXNlcjIgPSBuZXcgQ3J1aXNlcignY29tcHV0ZXInLCAyKTtcbiAgICAgICAgdGhpcy5TdWIxID0gbmV3IFN1YignY29tcHV0ZXInLCAxKTtcbiAgICAgICAgdGhpcy5TdWIyID0gbmV3IFN1YignY29tcHV0ZXInLCAyKTtcbiAgICAgICAgdGhpcy5TdWIzID0gbmV3IFN1YignY29tcHV0ZXInLCAzKTtcbiAgICAgICAgdGhpcy5EZXN0cm95ZXIxID0gbmV3IERlc3Ryb3llcignY29tcHV0ZXInLCAxKTtcbiAgICAgICAgdGhpcy5EZXN0cm95ZXIyID0gbmV3IERlc3Ryb3llcignY29tcHV0ZXInLCAyKTtcbiAgICAgICAgdGhpcy5EZXN0cm95ZXIzID0gbmV3IERlc3Ryb3llcignY29tcHV0ZXInLCAzKTtcbiAgICAgICAgdGhpcy5EZXN0cm95ZXI0ID0gbmV3IERlc3Ryb3llcignY29tcHV0ZXInLCA0KTtcbiAgICAgICAgLy9TdG9yZSBwbGF5ZWQgbW92ZXMgZm9yIGZ1dHVyZSByZWZlcmVuY2VcbiAgICAgICAgdGhpcy5vbGRNb3ZlcyA9IFtdO1xuICAgIH07XG5cbiAgICByYW5kb21Nb3ZlID0gKCkgPT4ge1xuICAgICAgICAvL0dlbmVyYXRlIG51bWJlciBiZXR3ZWVuIDAgLSAxMDAgXG4gICAgICAgIGxldCBtb3ZlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAxKTtcblxuICAgICAgICAvL0NoZWNraW5nIHRoYXQgdGhlIHJhbmRvbSBtb3ZlIGlzIG5vdCBjb250YWluZWQgaW4gdGhlIG9sZE1vdmVzIGFycmF5XG4gICAgICAgIGlmICh0aGlzLm9sZE1vdmVzLmZpbHRlcihsb2MgPT4gbG9jID09PSBtb3ZlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvL0NhbGwgaXRzZWxmIHRvIG1ha2UgYW5vdGhlciBtb3ZlIGlmIHRoZSByYW5kb20gbW92ZSBpcyBpbGxlZ2FsXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5kb21Nb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0Fzc3VtaW5nIG1vdmUgaXMgbGVnYWwsIGFkZCBpdCB0byB0aGUgb2xkTW92ZXMgYXJyYXksIGNhbGwgUGxheWVyKCkuYXR0YWNrKG1vdmUpO1xuICAgICAgICB0aGlzLm9sZE1vdmVzLnB1c2gobW92ZSk7XG4gICAgICAgIHJldHVybiBzdXBlci5hdHRhY2sobW92ZSk7XG4gICAgfTtcbn07XG5cbmV4cG9ydCB7IFBsYXllciwgY29tcHV0ZXIgfTtcbiIsImNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKGxlbmd0aCwgbmFtZSkge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgLy9TaGlwcyBpbml0aWFsaXplIHdpdGggMCBoaXRzXG4gICAgICAgIHRoaXMuaGl0TnVtYmVyID0gMDtcbiAgICAgICAgdGhpcy5jb29yZHMgPSBbXTtcbiAgICB9XG5cbiAgICBsZW5ndGhPZlNoaXAgPSAoKSA9PiB0aGlzLmxlbmd0aDtcblxuICAgIGN1cnJlbnRIaXRzID0gKCkgPT4gdGhpcy5oaXROdW1iZXI7XG5cbiAgICAvL0luY3JlYXNlIHRoZSBoaXROdW1iZXIgZm9yIGEgc2hpcFxuICAgIGhpdCA9IChoaXQpID0+IHtcbiAgICAgICAgaWYgKGhpdCA9PSB0cnVlKSByZXR1cm4gdGhpcy5oaXROdW1iZXIrKztcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5oaXROdW1iZXIpO1xuICAgICAgICByZXR1cm5cbiAgICB9O1xuXG4gICAgLy9DaGVjayBpZiB0aGUgc2hpcCBoYXMgYmVlbiBzdW5rIGJ5IGNvbXBhcmluZyBoaXROdW1iZXIgdG8gbGVuZ3RoXG4gICAgaXNTdW5rID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5oaXROdW1iZXIgPCB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ25vdCBzdW5rJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc3VuaycpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgfTtcbn07XG5cbmNsYXNzIEJhdHRsZXNoaXAgZXh0ZW5kcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3Rvcih3aG9zZSkge1xuICAgICAgICBzdXBlcig0LCAnQmF0dGxlc2hpcCcpO1xuICAgICAgICB0aGlzLm93bmVyID0gd2hvc2U7XG4gICAgfTtcbn07XG5cbmNsYXNzIENydWlzZXIgZXh0ZW5kcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3Rvcih3aG9zZSwgc2hpcElEKSB7XG4gICAgICAgIHN1cGVyKDMsICdDcnVpc2VyJyk7XG4gICAgICAgIHRoaXMub3duZXIgPSB3aG9zZTtcbiAgICAgICAgdGhpcy5zaGlwSUQgPSBzaGlwSUQ7XG4gICAgfTtcbn07XG5cbmNsYXNzIFN1YiBleHRlbmRzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKHdob3NlLCBzaGlwSUQpIHtcbiAgICAgICAgc3VwZXIoMiwgJ1N1YicpO1xuICAgICAgICB0aGlzLm93bmVyID0gd2hvc2U7XG4gICAgICAgIHRoaXMuc2hpcElEID0gc2hpcElEO1xuICAgIH07XG59O1xuXG5jbGFzcyBEZXN0cm95ZXIgZXh0ZW5kcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3Rvcih3aG9zZSwgc2hpcElEKSB7XG4gICAgICAgIHN1cGVyKDEsICdEZXN0cm95ZXInKTtcbiAgICAgICAgdGhpcy5vd25lciA9IHdob3NlO1xuICAgICAgICB0aGlzLnNoaXBJRCA9IHNoaXBJRDtcbiAgICB9O1xufTtcblxuXG5leHBvcnQgeyBTaGlwLCBCYXR0bGVzaGlwLCBDcnVpc2VyLCBTdWIsIERlc3Ryb3llciB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
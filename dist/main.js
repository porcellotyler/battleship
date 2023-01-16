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
/* harmony export */   "removeForm": () => (/* binding */ removeForm),
/* harmony export */   "shipYard": () => (/* binding */ shipYard)
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

function shipYard() {
    const yard = document.getElementById('yard');
    yard.classList.toggle('hide');
}

function checkForShips(boardName) {
    let board = document.getElementsByClassName(`board ${boardName}`);

    for (let i = 0; i < 100; i++) {
        let checkDiv = board[i];

        if (checkDiv.classList.contains('ship')) {
            //Game not over if a ship is found
            return
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
    (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.shipYard)();
    (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.removeForm)();
});

const gameLoop = (name) => {
    playerBoard = new _player__WEBPACK_IMPORTED_MODULE_1__.Player(name);
    computerBoard = new _player__WEBPACK_IMPORTED_MODULE_1__.computer('computer');

    //Manually addShips for now
    function computerShips() {
        computerBoard.board.placeShip(4, 4, "computerBattleship");
        computerBoard.board.placeShip(43, 3, "computerCruiser1");
        computerBoard.board.placeShip(82, 3, "computerCruiser2");
        computerBoard.board.placeShip(17, 2, "computerSub1");
        computerBoard.board.placeShip(64, 2, "computerSub2");
        computerBoard.board.placeShip(94, 2, "computerSub3");
        computerBoard.board.placeShip(34, 1, "computerDestroyer1");
        computerBoard.board.placeShip(49, 1, "computerDestroyer2");
        computerBoard.board.placeShip(77, 1, "computerDestroyer3");
        computerBoard.board.placeShip(22, 1, "computerDestroyer4");
    };

    computerShips();

    function playerShips() {
        const placeBattleship = document.getElementById('placeBattleship');
        placeBattleship.addEventListener('click', () => {
            document.getElementById('battleshipList').classList.add('clicked');

            let coords = document.getElementById('battleshipCoords').value;

            playerBoard.board.placeShip(coords, 4, "playerBattleship");
        });

        const placeCruiser1 = document.getElementById('placeCruiser1');
        placeCruiser1.addEventListener('click', () => {
            document.getElementById('cruiser1List').classList.add('clicked');

            let coords = document.getElementById('cruiser1Coords').value;

            playerBoard.board.placeShip(coords, 3, "playerCruiser1");
        });

        const placeCruiser2 = document.getElementById('placeCruiser2');
        placeCruiser2.addEventListener('click', () => {
            document.getElementById('cruiser2List').classList.add('clicked');

            let coords = document.getElementById('cruiser2Coords').value;

            playerBoard.board.placeShip(coords, 3, "playerCruiser2");
        });

        const placeSub1 = document.getElementById('placeSub1');
        placeSub1.addEventListener('click', () => {
            document.getElementById('sub1List').classList.add('clicked');

            let coords = document.getElementById('sub1Coords').value;

            playerBoard.board.placeShip(coords, 2, "playerSub1");
        });

        const placeSub2 = document.getElementById('placeSub2');
        placeSub2.addEventListener('click', () => {
            document.getElementById('sub2List').classList.add('clicked');

            let coords = document.getElementById('sub2Coords').value;

            playerBoard.board.placeShip(coords, 2, "playerSub2");
        });

        const placeSub3 = document.getElementById('placeSub3');
        placeSub3.addEventListener('click', () => {
            document.getElementById('sub3List').classList.add('clicked');

            let coords = document.getElementById('sub3Coords').value;

            playerBoard.board.placeShip(coords, 2, "playerSub3");
        });

        const placeDestroyer1 = document.getElementById('placeDestroyer1');
        placeDestroyer1.addEventListener('click', () => {
            document.getElementById('destroyer1List').classList.add('clicked');

            let coords = document.getElementById('destroyer1Coords').value;

            playerBoard.board.placeShip(coords, 1, "playerDestroyer1");
        });

        const placeDestroyer2 = document.getElementById('placeDestroyer2');
        placeDestroyer2.addEventListener('click', () => {
            document.getElementById('destroyer2List').classList.add('clicked');

            let coords = document.getElementById('destroyer2Coords').value;

            playerBoard.board.placeShip(coords, 1, "playerDestroyer2");
        });

        const placeDestroyer3 = document.getElementById('placeDestroyer3');
        placeDestroyer3.addEventListener('click', () => {
            document.getElementById('destroyer3List').classList.add('clicked');

            let coords = document.getElementById('destroyer3Coords').value;

            playerBoard.board.placeShip(coords, 1, "playerDestroyer3");
        });

        const placeDestroyer4 = document.getElementById('placeDestroyer4');
        placeDestroyer4.addEventListener('click', () => {
            document.getElementById('destroyer4List').classList.add('clicked');

            let coords = document.getElementById('destroyer4Coords').value;

            playerBoard.board.placeShip(coords, 1, "playerDestroyer4");
        });
    };

    playerShips();
    
    let turnCounter;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHcUQ7Ozs7Ozs7VUNoRXJEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwbGF5ZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyRGl2Jyk7XG5jb25zdCBjb21wdXRlckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlckRpdicpO1xubGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1cIik7XG5sZXQgbmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKTtcblxuY29uc3QgZGlzcGxheUJvYXJkID0gKHBsYXllcikgPT4ge1xuICAgIC8vRGV0ZXJtaW5lIHdob3NlIGJvYXJkIGl0XG4gICAgbGV0IHBhcmVudERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3BsYXllcn1EaXZgKTtcbiAgICBcbiAgICAvL0NyZWF0ZSBib2FyZCBjb250YWluZXJcbiAgICBsZXQgYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBib2FyZENvbnRhaW5lci5jbGFzc05hbWUgPSAnYm9hcmRDb250YWluZXInO1xuXG4gICAgLy9DcmVhdGUgYm9hcmQgb2YgMTAwIGRpdmlzaW9uc1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMTAxOyBpKyspIHtcbiAgICAgICAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAvL1NldCBlYWNoIHNxdWFyZSdzIElEIHRvIGkgc28gdGhleSdyZSBudW1iZXJlZCAxIC0gMTAwXG4gICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpfWApO1xuICAgICAgICBzcXVhcmUuY2xhc3NOYW1lID0gXCJib2FyZFwiO1xuICAgICAgICAvL1NwZWNpZnkgd2hpY2ggYm9hcmQgZWFjaCBkaXYgaXMgYSBwYXJ0IG9mXG4gICAgICAgIGlmIChwYXJlbnREaXYuaWQgPT0gJ3BsYXllckRpdicpIHtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdwbGF5ZXInKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdjb21wdXRlcicpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfTtcblxuICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChib2FyZENvbnRhaW5lcik7XG5cbiAgICByZXR1cm47XG59O1xuXG5mdW5jdGlvbiByZW1vdmVGb3JtKCkge1xuICAgIGZvcm0ucmVtb3ZlKCk7XG59O1xuXG5mdW5jdGlvbiBkaXNwbGF5TmFtZSgpIHsgXG4gICAgcGxheWVyRGl2LmlubmVyVGV4dCA9IGAke25hbWVJbnB1dC52YWx1ZX1gO1xuICAgIGNvbXB1dGVyRGl2LmlubmVyVGV4dCA9IFwiQ29tcHV0ZXJcIjtcbiAgICByZXR1cm5cbn07XG5cbmZ1bmN0aW9uIGRpc3BsYXlTaGlwcyhib2FyZE5hbWUsIGxvY2F0aW9ucywgc2hpcE5hbWUpIHtcbiAgICB3aGlsZSAobG9jYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy9GaW5kIHRhcmdldCBkaXZcbiAgICAgICAgbGV0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7Ym9hcmROYW1lfWApW2xvY2F0aW9uc1swXV07XG5cbiAgICAgICAgLy9BZGQgc2hpcCBhbmQgc2hpcE5hbWUgY2xhc3Nlc1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChgJHtzaGlwTmFtZX1gKTtcblxuICAgICAgICBsb2NhdGlvbnMuc2hpZnQoKTtcbiAgICB9O1xuICAgIHJldHVyblxufTtcblxuZnVuY3Rpb24gZGlzcGxheUhpdHMoYm9hcmROYW1lLCBsb2NhdGlvbnMpIHtcbiAgICB3aGlsZSAobG9jYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy9GaW5kIHRhcmdldCBkaXZcbiAgICAgICAgbGV0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7Ym9hcmROYW1lfWApW2xvY2F0aW9uc1swXV07XG5cbiAgICAgICAgLy9SZW1vdmUgc2hpcCBjbGFzc1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpO1xuXG4gICAgICAgIC8vQWRkIGhpdCBjbGFzcyBcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuXG4gICAgICAgIGxvY2F0aW9ucy5zaGlmdCgpO1xuICAgIH07XG4gICAgcmV0dXJuIFxufTtcblxuZnVuY3Rpb24gZGlzcGxheU1pc3MobG9jYXRpb24sIGJvYXJkTmFtZSkge1xuICAgIHdoaWxlIChsb2NhdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vQWRkIG1pc3MgY2xhc3MsIFtsb2NhdGlvbiAtIDFdIHNlZW1zIGJ1Z2d5LiBOb3QgaW52ZXN0aWdhdGluZyBybiBidXQgY291bGQgY2F1c2UgaXNzdWVzIGRvd24gdGhlIHJvYWQuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7Ym9hcmROYW1lfWApW2xvY2F0aW9uIC0gMV0uY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgICAgICBsb2NhdGlvbi5zaGlmdCgpO1xuICAgIH07XG4gICAgcmV0dXJuIFxufTtcblxuZnVuY3Rpb24gc2hpcFlhcmQoKSB7XG4gICAgY29uc3QgeWFyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5YXJkJyk7XG4gICAgeWFyZC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRm9yU2hpcHMoYm9hcmROYW1lKSB7XG4gICAgbGV0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgYm9hcmQgJHtib2FyZE5hbWV9YCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgIGxldCBjaGVja0RpdiA9IGJvYXJkW2ldO1xuXG4gICAgICAgIGlmIChjaGVja0Rpdi5jbGFzc0xpc3QuY29udGFpbnMoJ3NoaXAnKSkge1xuICAgICAgICAgICAgLy9HYW1lIG5vdCBvdmVyIGlmIGEgc2hpcCBpcyBmb3VuZFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gZ2FtZU92ZXIoKTtcbn07XG5cbmZ1bmN0aW9uIGdhbWVPdmVyKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKTtcbiAgICBsZXQgZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpc3BsYXkuaW5uZXJUZXh0ID0gJ0dhbWUgb3ZlciEnO1xuXG4gICAgcmV0dXJuIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXNwbGF5KTtcbn1cblxuZXhwb3J0IHsgZGlzcGxheUJvYXJkLCByZW1vdmVGb3JtLCBkaXNwbGF5TmFtZSwgZGlzcGxheVNoaXBzLCBkaXNwbGF5SGl0cywgZGlzcGxheU1pc3MsIHNoaXBZYXJkLCBjaGVja0ZvclNoaXBzIH07XG4iLCJpbXBvcnQgeyBkaXNwbGF5U2hpcHMsIGRpc3BsYXlIaXRzLCBkaXNwbGF5TWlzcywgY2hlY2tGb3JTaGlwcyB9IGZyb20gXCIuL0RPTVwiXG5pbXBvcnQgeyBwbGF5ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZCB9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNvb3JkaW5hdGVzID0gW1xuICAgICAgICAgICAgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsXG4gICAgICAgICAgICAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCxcbiAgICAgICAgICAgIDIxLCAyMiwgMjMsIDI0LCAyNSwgMjYsIDI3LCAyOCwgMjksIDMwLFxuICAgICAgICAgICAgMzEsIDMyLCAzMywgMzQsIDM1LCAzNiwgMzcsIDM4LCAzOSwgNDAsXG4gICAgICAgICAgICA0MSwgNDIsIDQzLCA0NCwgNDUsIDQ2LCA0NywgNDgsIDQ5LCA1MCxcbiAgICAgICAgICAgIDUxLCA1MiwgNTMsIDU0LCA1NSwgNTYsIDU3LCA1OCwgNTksIDYwLFxuICAgICAgICAgICAgNjEsIDYyLCA2MywgNjQsIDY1LCA2NiwgNjcsIDY4LCA2OSwgNzAsXG4gICAgICAgICAgICA3MSwgNzIsIDczLCA3NCwgNzUsIDc2LCA3NywgNzgsIDc5LCA4MCxcbiAgICAgICAgICAgIDgxLCA4MiwgODMsIDg0LCA4NSwgODYsIDg3LCA4OCwgODksIDkwLFxuICAgICAgICAgICAgOTEsIDkyLCA5MywgOTQsIDk1LCA5NiwgOTcsIDk4LCA5OSwgMTAwLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLnNoaXBDb29yZHMgPSBbXTtcbiAgICAgICAgdGhpcy5oaXRDb29yZHMgPSBbXTtcbiAgICAgICAgdGhpcy5taXNzZWRTaG90cyA9IFtdO1xuICAgIH1cblxuICAgIC8vUGxhY2Ugc2hpcHMgYXQgc3BlY2lmaWMgY29vcmRpbmF0ZXNcbiAgICBwbGFjZVNoaXAgPSAoc3RhcnRQb2ludCwgbGVuZ3RoLCBzaGlwTmFtZSkgPT4ge1xuICAgICAgICB3aGlsZSAobGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zaGlwQ29vcmRzLnB1c2goc3RhcnRQb2ludCk7Ly9zaGlwQ29vcmRzIG5vdCBhIG1hc3RlciBsaXN0XG4gICAgICAgICAgICBzdGFydFBvaW50Kys7XG4gICAgICAgICAgICBsZW5ndGgtLTtcbiAgICAgICAgfTtcbiAgICAgICAgLy9BZGQgY29vcmRzIHRvIHNoaXAgYXMgd2VsbD8gbm90IG5lZWRlZCBpIHRoaW5rIFxuICAgICAgICAvL3NoaXBzIGFyZSBiZWluZyBhZGRlZCBhdCBzdGFydFBvaW50ICsgMSBmb3Igc29tZSByZWFzb24gcm4sIGludmVzdGlnYXRlIGxhdGVyXG4gICAgICAgIHJldHVybiBkaXNwbGF5U2hpcHModGhpcy5uYW1lLCB0aGlzLnNoaXBDb29yZHMsIHNoaXBOYW1lKTtcbiAgICB9O1xuXG4gICAgcmVjZWl2ZUF0dGFjayhsb2NhdGlvbikge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgYm9hcmQgJHt0aGlzLm5hbWV9YClbbG9jYXRpb25dO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGxvY2F0aW9uKTsgLy9jb21pbmcgaW4gYXMgMSBsZXNzIHRoYW4gd2hhdHMgY2xpY2tlZCwgdW5zdXJlIHdoeVxuICAgICAgICAvL2NvbnNvbGUubG9nKHRhcmdldCk7XG5cbiAgICAgICAgLy9EZXRlcm1pbmVzIGlmIGEgc2hpcCBpcyBoaXQgLT4gdGFyZ2V0IHVuZGVmIHJuXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaGlwJykpIHtcbiAgICAgICAgICAgIC8vSWYgYSBzaGlwIHdhcyBoaXQsIHNlbmQgaGl0IHRvIHNoaXAgYW5kIHJlY29yZCBsb2NhdGlvblxuICAgICAgICAgICAgdGhpcy5oaXRDb29yZHMucHVzaChsb2NhdGlvbik7XG4gICAgICAgICAgICBkaXNwbGF5SGl0cyh0aGlzLm5hbWUsIHRoaXMuaGl0Q29vcmRzKTtcblxuICAgICAgICAgICAgLy9DaGVjayB3aGljaCBzaGlwIGl0IGlzXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckJhdHRsZXNoaXBcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyQm9hcmQuYmF0dGxlc2hpcC5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJDcnVpc2VyMVwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJCb2FyZC5DcnVpc2VyMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJDcnVpc2VyMlwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJCb2FyZC5DcnVpc2VyMi5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJTdWIxXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckJvYXJkLlN1YjEuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyU3ViMlwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJCb2FyZC5TdWIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllclN1YjNcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyQm9hcmQuU3ViMy5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJEZXN0cm95ZXIxXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckJvYXJkLkRlc3Ryb3llcjEuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyRGVzdHJveWVyMlwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJCb2FyZC5EZXN0cm95ZXIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckRlc3Ryb3llcjNcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyQm9hcmQuRGVzdHJveWVyMy5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJEZXN0cm95ZXI0XCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckJvYXJkLkRlc3Ryb3llcjQuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJCYXR0bGVzaGlwXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQuYmF0dGxlc2hpcC5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlckNydWlzZXIxXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQuQ3J1aXNlcjEuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJDcnVpc2VyMlwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlckJvYXJkLkNydWlzZXIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyU3ViMVwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlckJvYXJkLlN1YjEuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJTdWIyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQuU3ViMi5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlclN1YjNcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJCb2FyZC5TdWIzLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyRGVzdHJveWVyMVwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlckJvYXJkLkRlc3Ryb3llcjEuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJEZXN0cm95ZXIyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQuRGVzdHJveWVyMi5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlckRlc3Ryb3llcjNcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJCb2FyZC5EZXN0cm95ZXIzLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyRGVzdHJveWVyNFwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlckJvYXJkLkRlc3Ryb3llcjQuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coJ2htbScpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9JZiBzaGlwIGlzIG5vdCBoaXQsIGFkZCB0byBtaXNzZWRTaG90c1xuICAgICAgICAgICAgdGhpcy5taXNzZWRTaG90cy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGRpc3BsYXlNaXNzKHRoaXMubWlzc2VkU2hvdHMsIGBib2FyZCAke3RoaXMubmFtZX1gKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy9BZnRlciBhdHRhY2sgcmVjZWl2ZWQsIGNoZWNrIGZvciBnYW1lIG92ZXJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZFNoaXBzKCk7XG4gICAgfTtcblxuICAgIC8vRmluZHMgbm9uLXN1bmsgc2hpcHMgb24gYm9hcmQsIGlmIG5vbmUsIHJlcG9ydHMgZ2FtZSBvdmVyXG4gICAgZmluZFNoaXBzID0gKCkgPT4ge1xuICAgICAgICBjaGVja0ZvclNoaXBzKHRoaXMubmFtZSk7XG4gICAgfTsgLy9uZWVkIHRvIGZpeFxufTtcblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCJpbXBvcnQgeyBkaXNwbGF5Qm9hcmQsIHJlbW92ZUZvcm0sIGRpc3BsYXlOYW1lLCBzaGlwWWFyZCB9IGZyb20gXCIuL0RPTVwiO1xuaW1wb3J0IHsgUGxheWVyLCBjb21wdXRlciB9IGZyb20gXCIuL3BsYXllclwiO1xuXG5jb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRcIik7XG5sZXQgbmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKTtcbmxldCBwbGF5ZXJCb2FyZDtcbmxldCBjb21wdXRlckJvYXJkO1xuXG5zdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRpc3BsYXlOYW1lKCk7XG4gICAgZGlzcGxheUJvYXJkKCdwbGF5ZXInKTtcbiAgICBkaXNwbGF5Qm9hcmQoJ2NvbXB1dGVyJyk7XG4gICAgZ2FtZUxvb3AobmFtZUlucHV0LnZhbHVlKTtcbiAgICBzaGlwWWFyZCgpO1xuICAgIHJlbW92ZUZvcm0oKTtcbn0pO1xuXG5jb25zdCBnYW1lTG9vcCA9IChuYW1lKSA9PiB7XG4gICAgcGxheWVyQm9hcmQgPSBuZXcgUGxheWVyKG5hbWUpO1xuICAgIGNvbXB1dGVyQm9hcmQgPSBuZXcgY29tcHV0ZXIoJ2NvbXB1dGVyJyk7XG5cbiAgICAvL01hbnVhbGx5IGFkZFNoaXBzIGZvciBub3dcbiAgICBmdW5jdGlvbiBjb21wdXRlclNoaXBzKCkge1xuICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkLnBsYWNlU2hpcCg0LCA0LCBcImNvbXB1dGVyQmF0dGxlc2hpcFwiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoNDMsIDMsIFwiY29tcHV0ZXJDcnVpc2VyMVwiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoODIsIDMsIFwiY29tcHV0ZXJDcnVpc2VyMlwiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoMTcsIDIsIFwiY29tcHV0ZXJTdWIxXCIpO1xuICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkLnBsYWNlU2hpcCg2NCwgMiwgXCJjb21wdXRlclN1YjJcIik7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKDk0LCAyLCBcImNvbXB1dGVyU3ViM1wiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoMzQsIDEsIFwiY29tcHV0ZXJEZXN0cm95ZXIxXCIpO1xuICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkLnBsYWNlU2hpcCg0OSwgMSwgXCJjb21wdXRlckRlc3Ryb3llcjJcIik7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKDc3LCAxLCBcImNvbXB1dGVyRGVzdHJveWVyM1wiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoMjIsIDEsIFwiY29tcHV0ZXJEZXN0cm95ZXI0XCIpO1xuICAgIH07XG5cbiAgICBjb21wdXRlclNoaXBzKCk7XG5cbiAgICBmdW5jdGlvbiBwbGF5ZXJTaGlwcygpIHtcbiAgICAgICAgY29uc3QgcGxhY2VCYXR0bGVzaGlwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlQmF0dGxlc2hpcCcpO1xuICAgICAgICBwbGFjZUJhdHRsZXNoaXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmF0dGxlc2hpcExpc3QnKS5jbGFzc0xpc3QuYWRkKCdjbGlja2VkJyk7XG5cbiAgICAgICAgICAgIGxldCBjb29yZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmF0dGxlc2hpcENvb3JkcycpLnZhbHVlO1xuXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoY29vcmRzLCA0LCBcInBsYXllckJhdHRsZXNoaXBcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHBsYWNlQ3J1aXNlcjEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2VDcnVpc2VyMScpO1xuICAgICAgICBwbGFjZUNydWlzZXIxLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NydWlzZXIxTGlzdCcpLmNsYXNzTGlzdC5hZGQoJ2NsaWNrZWQnKTtcblxuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcnVpc2VyMUNvb3JkcycpLnZhbHVlO1xuXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoY29vcmRzLCAzLCBcInBsYXllckNydWlzZXIxXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBwbGFjZUNydWlzZXIyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlQ3J1aXNlcjInKTtcbiAgICAgICAgcGxhY2VDcnVpc2VyMi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcnVpc2VyMkxpc3QnKS5jbGFzc0xpc3QuYWRkKCdjbGlja2VkJyk7XG5cbiAgICAgICAgICAgIGxldCBjb29yZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3J1aXNlcjJDb29yZHMnKS52YWx1ZTtcblxuICAgICAgICAgICAgcGxheWVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKGNvb3JkcywgMywgXCJwbGF5ZXJDcnVpc2VyMlwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcGxhY2VTdWIxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlU3ViMScpO1xuICAgICAgICBwbGFjZVN1YjEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ViMUxpc3QnKS5jbGFzc0xpc3QuYWRkKCdjbGlja2VkJyk7XG5cbiAgICAgICAgICAgIGxldCBjb29yZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ViMUNvb3JkcycpLnZhbHVlO1xuXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoY29vcmRzLCAyLCBcInBsYXllclN1YjFcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHBsYWNlU3ViMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZVN1YjInKTtcbiAgICAgICAgcGxhY2VTdWIyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YjJMaXN0JykuY2xhc3NMaXN0LmFkZCgnY2xpY2tlZCcpO1xuXG4gICAgICAgICAgICBsZXQgY29vcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YjJDb29yZHMnKS52YWx1ZTtcblxuICAgICAgICAgICAgcGxheWVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKGNvb3JkcywgMiwgXCJwbGF5ZXJTdWIyXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBwbGFjZVN1YjMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2VTdWIzJyk7XG4gICAgICAgIHBsYWNlU3ViMy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWIzTGlzdCcpLmNsYXNzTGlzdC5hZGQoJ2NsaWNrZWQnKTtcblxuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWIzQ29vcmRzJykudmFsdWU7XG5cbiAgICAgICAgICAgIHBsYXllckJvYXJkLmJvYXJkLnBsYWNlU2hpcChjb29yZHMsIDIsIFwicGxheWVyU3ViM1wiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcGxhY2VEZXN0cm95ZXIxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlRGVzdHJveWVyMScpO1xuICAgICAgICBwbGFjZURlc3Ryb3llcjEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzdHJveWVyMUxpc3QnKS5jbGFzc0xpc3QuYWRkKCdjbGlja2VkJyk7XG5cbiAgICAgICAgICAgIGxldCBjb29yZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzdHJveWVyMUNvb3JkcycpLnZhbHVlO1xuXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoY29vcmRzLCAxLCBcInBsYXllckRlc3Ryb3llcjFcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHBsYWNlRGVzdHJveWVyMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZURlc3Ryb3llcjInKTtcbiAgICAgICAgcGxhY2VEZXN0cm95ZXIyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc3Ryb3llcjJMaXN0JykuY2xhc3NMaXN0LmFkZCgnY2xpY2tlZCcpO1xuXG4gICAgICAgICAgICBsZXQgY29vcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc3Ryb3llcjJDb29yZHMnKS52YWx1ZTtcblxuICAgICAgICAgICAgcGxheWVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKGNvb3JkcywgMSwgXCJwbGF5ZXJEZXN0cm95ZXIyXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBwbGFjZURlc3Ryb3llcjMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2VEZXN0cm95ZXIzJyk7XG4gICAgICAgIHBsYWNlRGVzdHJveWVyMy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXN0cm95ZXIzTGlzdCcpLmNsYXNzTGlzdC5hZGQoJ2NsaWNrZWQnKTtcblxuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXN0cm95ZXIzQ29vcmRzJykudmFsdWU7XG5cbiAgICAgICAgICAgIHBsYXllckJvYXJkLmJvYXJkLnBsYWNlU2hpcChjb29yZHMsIDEsIFwicGxheWVyRGVzdHJveWVyM1wiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcGxhY2VEZXN0cm95ZXI0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlRGVzdHJveWVyNCcpO1xuICAgICAgICBwbGFjZURlc3Ryb3llcjQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzdHJveWVyNExpc3QnKS5jbGFzc0xpc3QuYWRkKCdjbGlja2VkJyk7XG5cbiAgICAgICAgICAgIGxldCBjb29yZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzdHJveWVyNENvb3JkcycpLnZhbHVlO1xuXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoY29vcmRzLCAxLCBcInBsYXllckRlc3Ryb3llcjRcIik7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBwbGF5ZXJTaGlwcygpO1xuICAgIFxuICAgIGxldCB0dXJuQ291bnRlcjtcbiAgICBmdW5jdGlvbiBydW5UdXJucyhjb3VudCkge1xuICAgICAgICBsZXQgbG9jYWxDb3VudCA9IGNvdW50O1xuICAgICAgICAvKiB3YWl0aW5nIHVudGlsIHN0ZXAgNSBpbiB0b3AgaW5zdHJ1Y3Rpb25zXG4gICAgICAgIGlmICh0dXJuQ291bnRlciA9PT0gMCkge1xuICAgICAgICAgICAvL3BsYWNlIHNoaXBzIHRoZW4gaW5jcmVhc2UgdHVybkNvdW50ZXIgXG4gICAgICAgIH0qL1xuICAgICAgICAvL3doaWxlIGdhbWUgbm90IG92ZXJcbiAgICAgICAgY29uc3QgY2hlY2tUdXJuID0gKGNvdW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoY291bnQgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyVHVybigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb21wdXRlclR1cm4oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIGNvbnN0IHBsYXllclR1cm4gPSAoKSA9PiB7XG4gICAgICAgICAgICBsb2NhbENvdW50Kys7XG4gICAgICAgICAgICAvL0NoZWNrIGZvciBib2FyZHMgbG9hZGVkXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmQgY29tcHV0ZXInKSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmQgY29tcHV0ZXInKVtpXTtcblxuICAgICAgICAgICAgICAgICAgICAvL01ha2UgY29tcHV0ZXIgYm9hcmQgYWJsZSB0byBiZSBhdHRhY2tlZCBvbiBjbGlja1xuICAgICAgICAgICAgICAgICAgICBzcXVhcmUub25jbGljayA9IGZ1bmN0aW9uIGFsbG93QXR0YWNrKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9TZW5kIGF0dGFja1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5yZWNlaXZlQXR0YWNrKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9DaGVjayBmb3IgZ2FtZSBvdmVyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkLmZpbmRTaGlwcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoZWNrVHVybihsb2NhbENvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9OyBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdlcnJvciBpbiBwbGF5ZXIgYXR0YWNrIGZsb3cnKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBjb21wdXRlclR1cm4gPSAoKSA9PiB7XG4gICAgICAgICAgICBsb2NhbENvdW50Kys7XG4gICAgICAgICAgICAvL0NoZWNrIGZvciBib2FyZCBsb2FkZWRcbiAgICAgICAgICAgIC8qaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkIGNvbXB1dGVyJykgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkIGNvbXB1dGVyJylbaV07XG4gICAgICAgICAgICAgICAgICAgIC8vUmVtb3ZlRXZlbnRMaXN0ZW5lcnMgZm9yIHBsYXllclxuICAgICAgICAgICAgICAgICAgICBzcXVhcmUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhbGxvd0F0dGFjayk7IC8vYWxsb3dBdHRhY2sgbm90IGRlZmluZWQsIGdvaW5nIHRvIGZvY3VzIG9uIGdldHRpbmcgdHVybiBmbG93IHRvIHdvcmsgYW5kIHRoZW4gY29tZSBiYWNrIHRvIGZpeCB0aGlzXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH07Ki9cbiAgICAgICAgICAgIGxldCByYW5kb21BdHRhY2sgPSBjb21wdXRlckJvYXJkLnJhbmRvbU1vdmUoKTtcblxuICAgICAgICAgICAgLy9TZW5kIGF0dGFja1xuICAgICAgICAgICAgcGxheWVyQm9hcmQuYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21BdHRhY2spO1xuICAgICAgICAgICAgLy9DaGVjayBmb3IgZ2FtZSBvdmVyXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZC5ib2FyZC5maW5kU2hpcHMoKTtcbiAgICAgICAgICAgIHJldHVybiBjaGVja1R1cm4obG9jYWxDb3VudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9jYWxDb3VudCA9PT0gMikgY2hlY2tUdXJuKGxvY2FsQ291bnQpO1xuICAgIH07XG4gICAgcnVuVHVybnModHVybkNvdW50ZXIpO1xuICAgIC8vZmlyc3QgcGxhY2Ugc2hpcHNcbiAgICAvL2NvbXAgcGxhY2VzIHJhbmRvbWx5LCBwbGFjZXMgcGlja3NcbiAgICByZXR1cm5cbn1cblxuZXhwb3J0IHsgZ2FtZUxvb3AsIHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkIH07XG4iLCJpbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIjtcbmltcG9ydCB7IEJhdHRsZXNoaXAsIENydWlzZXIsIERlc3Ryb3llciwgU3ViIH0gZnJvbSBcIi4vc2hpcC5qc1wiO1xuXG5jbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgLy90aGlzLmJvYXJkID0gbmV3IEdhbWVib2FyZChuYW1lKTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQoJ3BsYXllcicpO1xuICAgICAgICB0aGlzLmJhdHRsZXNoaXAgPSBuZXcgQmF0dGxlc2hpcCgncGxheWVyJyk7XG4gICAgICAgIHRoaXMuQ3J1aXNlcjEgPSBuZXcgQ3J1aXNlcigncGxheWVyJywgMSk7XG4gICAgICAgIHRoaXMuQ3J1aXNlcjIgPSBuZXcgQ3J1aXNlcigncGxheWVyJywgMik7XG4gICAgICAgIHRoaXMuU3ViMSA9IG5ldyBTdWIoJ3BsYXllcicsIDEpO1xuICAgICAgICB0aGlzLlN1YjIgPSBuZXcgU3ViKCdwbGF5ZXInLCAyKTtcbiAgICAgICAgdGhpcy5TdWIzID0gbmV3IFN1YigncGxheWVyJywgMyk7XG4gICAgICAgIHRoaXMuRGVzdHJveWVyMSA9IG5ldyBEZXN0cm95ZXIoJ3BsYXllcicsIDEpO1xuICAgICAgICB0aGlzLkRlc3Ryb3llcjIgPSBuZXcgRGVzdHJveWVyKCdwbGF5ZXInLCAyKTtcbiAgICAgICAgdGhpcy5EZXN0cm95ZXIzID0gbmV3IERlc3Ryb3llcigncGxheWVyJywgMyk7XG4gICAgICAgIHRoaXMuRGVzdHJveWVyNCA9IG5ldyBEZXN0cm95ZXIoJ3BsYXllcicsIDQpO1xuICAgIH07XG5cbiAgICBnZXROYW1lID0gKCkgPT4gdGhpcy5uYW1lO1xuXG4gICAgcGxheWVyQm9hcmQgPSAoKSA9PiB0aGlzLmJvYXJkO1xuXG4gICAgYXR0YWNrID0gKGxvY2F0aW9uKSA9PiB0aGlzLmJvYXJkLnJlY2VpdmVBdHRhY2sobG9jYXRpb24pO1xufTtcblxuY2xhc3MgY29tcHV0ZXIgZXh0ZW5kcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgLy9DcmVhdGUgbmFtZSBhbmQgYm9hcmQgdXNpbmcgbmFtZSBpbnB1dFxuICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQobmFtZSk7XG4gICAgICAgIHRoaXMuYmF0dGxlc2hpcCA9IG5ldyBCYXR0bGVzaGlwKCdjb21wdXRlcicpO1xuICAgICAgICB0aGlzLkNydWlzZXIxID0gbmV3IENydWlzZXIoJ2NvbXB1dGVyJywgMSk7XG4gICAgICAgIHRoaXMuQ3J1aXNlcjIgPSBuZXcgQ3J1aXNlcignY29tcHV0ZXInLCAyKTtcbiAgICAgICAgdGhpcy5TdWIxID0gbmV3IFN1YignY29tcHV0ZXInLCAxKTtcbiAgICAgICAgdGhpcy5TdWIyID0gbmV3IFN1YignY29tcHV0ZXInLCAyKTtcbiAgICAgICAgdGhpcy5TdWIzID0gbmV3IFN1YignY29tcHV0ZXInLCAzKTtcbiAgICAgICAgdGhpcy5EZXN0cm95ZXIxID0gbmV3IERlc3Ryb3llcignY29tcHV0ZXInLCAxKTtcbiAgICAgICAgdGhpcy5EZXN0cm95ZXIyID0gbmV3IERlc3Ryb3llcignY29tcHV0ZXInLCAyKTtcbiAgICAgICAgdGhpcy5EZXN0cm95ZXIzID0gbmV3IERlc3Ryb3llcignY29tcHV0ZXInLCAzKTtcbiAgICAgICAgdGhpcy5EZXN0cm95ZXI0ID0gbmV3IERlc3Ryb3llcignY29tcHV0ZXInLCA0KTtcbiAgICAgICAgLy9TdG9yZSBwbGF5ZWQgbW92ZXMgZm9yIGZ1dHVyZSByZWZlcmVuY2VcbiAgICAgICAgdGhpcy5vbGRNb3ZlcyA9IFtdO1xuICAgIH07XG5cbiAgICByYW5kb21Nb3ZlID0gKCkgPT4ge1xuICAgICAgICAvL0dlbmVyYXRlIG51bWJlciBiZXR3ZWVuIDAgLSAxMDAgXG4gICAgICAgIC8vbGV0IG1vdmUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDEpO1xuICAgICAgICBsZXQgbW92ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgKyAxO1xuXG5cbiAgICAgICAgLy9DaGVja2luZyB0aGF0IHRoZSByYW5kb20gbW92ZSBpcyBub3QgY29udGFpbmVkIGluIHRoZSBvbGRNb3ZlcyBhcnJheVxuICAgICAgICAvKmlmICh0aGlzLm9sZE1vdmVzLmZpbHRlcihsb2MgPT4gbG9jID09PSBtb3ZlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvL0NhbGwgaXRzZWxmIHRvIG1ha2UgYW5vdGhlciBtb3ZlIGlmIHRoZSByYW5kb20gbW92ZSBpcyBpbGxlZ2FsXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5kb21Nb3ZlKCk7XG4gICAgICAgIH0qL1xuXG4gICAgICAgIC8vQXNzdW1pbmcgbW92ZSBpcyBsZWdhbCwgYWRkIGl0IHRvIHRoZSBvbGRNb3ZlcyBhcnJheSwgY2FsbCBQbGF5ZXIoKS5hdHRhY2sobW92ZSk7XG4gICAgICAgIHRoaXMub2xkTW92ZXMucHVzaChtb3ZlKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLm9sZE1vdmVzKTtcbiAgICAgICAgY29uc29sZS5sb2cobW92ZSk7XG4gICAgICAgIHJldHVybiBtb3ZlIC8vc3VwZXIuYXR0YWNrKG1vdmUpO1xuICAgIH07XG59O1xuXG5leHBvcnQgeyBQbGF5ZXIsIGNvbXB1dGVyIH07XG4iLCJjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihsZW5ndGgsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIC8vU2hpcHMgaW5pdGlhbGl6ZSB3aXRoIDAgaGl0c1xuICAgICAgICB0aGlzLmhpdE51bWJlciA9IDA7XG4gICAgICAgIHRoaXMuY29vcmRzID0gW107XG4gICAgfVxuXG4gICAgbGVuZ3RoT2ZTaGlwID0gKCkgPT4gdGhpcy5sZW5ndGg7XG5cbiAgICBjdXJyZW50SGl0cyA9ICgpID0+IHRoaXMuaGl0TnVtYmVyO1xuXG4gICAgLy9JbmNyZWFzZSB0aGUgaGl0TnVtYmVyIGZvciBhIHNoaXBcbiAgICBoaXQgPSAoaGl0KSA9PiB7XG4gICAgICAgIGlmIChoaXQgPT0gMSkgcmV0dXJuIHRoaXMuaGl0TnVtYmVyKys7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaGl0TnVtYmVyKTtcbiAgICAgICAgcmV0dXJuXG4gICAgfTtcblxuICAgIC8vQ2hlY2sgaWYgdGhlIHNoaXAgaGFzIGJlZW4gc3VuayBieSBjb21wYXJpbmcgaGl0TnVtYmVyIHRvIGxlbmd0aFxuICAgIGlzU3VuayA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaGl0TnVtYmVyIDwgdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub3Qgc3VuaycpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1bmsnKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgIH07XG59O1xuXG5jbGFzcyBCYXR0bGVzaGlwIGV4dGVuZHMgU2hpcCB7XG4gICAgY29uc3RydWN0b3Iod2hvc2UpIHtcbiAgICAgICAgc3VwZXIoNCwgJ0JhdHRsZXNoaXAnKTtcbiAgICAgICAgdGhpcy5vd25lciA9IHdob3NlO1xuICAgIH07XG59O1xuXG5jbGFzcyBDcnVpc2VyIGV4dGVuZHMgU2hpcCB7XG4gICAgY29uc3RydWN0b3Iod2hvc2UsIHNoaXBJRCkge1xuICAgICAgICBzdXBlcigzLCAnQ3J1aXNlcicpO1xuICAgICAgICB0aGlzLm93bmVyID0gd2hvc2U7XG4gICAgICAgIHRoaXMuc2hpcElEID0gc2hpcElEO1xuICAgIH07XG59O1xuXG5jbGFzcyBTdWIgZXh0ZW5kcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3Rvcih3aG9zZSwgc2hpcElEKSB7XG4gICAgICAgIHN1cGVyKDIsICdTdWInKTtcbiAgICAgICAgdGhpcy5vd25lciA9IHdob3NlO1xuICAgICAgICB0aGlzLnNoaXBJRCA9IHNoaXBJRDtcbiAgICB9O1xufTtcblxuY2xhc3MgRGVzdHJveWVyIGV4dGVuZHMgU2hpcCB7XG4gICAgY29uc3RydWN0b3Iod2hvc2UsIHNoaXBJRCkge1xuICAgICAgICBzdXBlcigxLCAnRGVzdHJveWVyJyk7XG4gICAgICAgIHRoaXMub3duZXIgPSB3aG9zZTtcbiAgICAgICAgdGhpcy5zaGlwSUQgPSBzaGlwSUQ7XG4gICAgfTtcbn07XG5cblxuZXhwb3J0IHsgU2hpcCwgQmF0dGxlc2hpcCwgQ3J1aXNlciwgU3ViLCBEZXN0cm95ZXIgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
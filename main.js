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
        square.innerText = i;
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

    function computerShips() {
        //Generate random placement for computer's ships
        //Need to consider checking to avoid duplicate placements
        function randIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        };
        
        computerBoard.board.placeShip(randIntFromInterval(0, 100), 4, "computerBattleship");
        computerBoard.board.placeShip(randIntFromInterval(0, 100), 3, "computerCruiser1");
        computerBoard.board.placeShip(randIntFromInterval(0, 100), 3, "computerCruiser2");
        computerBoard.board.placeShip(randIntFromInterval(0, 100), 2, "computerSub1");
        computerBoard.board.placeShip(randIntFromInterval(0, 100), 2, "computerSub2");
        computerBoard.board.placeShip(randIntFromInterval(0, 100), 2, "computerSub3");
        computerBoard.board.placeShip(randIntFromInterval(0, 100), 1, "computerDestroyer1");
        computerBoard.board.placeShip(randIntFromInterval(0, 100), 1, "computerDestroyer2");
        computerBoard.board.placeShip(randIntFromInterval(0, 100), 1, "computerDestroyer3");
        computerBoard.board.placeShip(randIntFromInterval(0, 100), 1, "computerDestroyer4");
    };

    computerShips();

    async function playerShips() {
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

        return
    };
    
    let turnCounter = 2;

    async function runTurns(count) {
        await playerShips();
        let localCount = count;
        
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
                        computerBoard.board.receiveAttack(i + 1);
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

    return
};




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0NBQStDLE9BQU87QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0EscUNBQXFDLEVBQUU7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsZ0JBQWdCO0FBQzdDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsVUFBVTs7QUFFbEU7QUFDQTtBQUNBLGdDQUFnQyxTQUFTOztBQUV6QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsVUFBVTs7QUFFbEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxVQUFVO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseURBQXlELFVBQVU7O0FBRW5FLG9CQUFvQixTQUFTO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRWtIOzs7Ozs7Ozs7Ozs7Ozs7OztBQy9HckM7QUFDckI7O0FBRXhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxrREFBWTtBQUMzQjs7QUFFQTtBQUNBLDhEQUE4RCxVQUFVO0FBQ3hFLGlDQUFpQztBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksaURBQVc7O0FBRXZCO0FBQ0E7QUFDQSx1QkFBdUIsaUVBQTBCO0FBQ2pELGNBQWM7QUFDZCx1QkFBdUIsK0RBQXdCO0FBQy9DLGNBQWM7QUFDZCx1QkFBdUIsK0RBQXdCO0FBQy9DLGNBQWM7QUFDZCx1QkFBdUIsMkRBQW9CO0FBQzNDLGNBQWM7QUFDZCx1QkFBdUIsMkRBQW9CO0FBQzNDLGNBQWM7QUFDZCx1QkFBdUIsMkRBQW9CO0FBQzNDLGNBQWM7QUFDZCx1QkFBdUIsaUVBQTBCO0FBQ2pELGNBQWM7QUFDZCx1QkFBdUIsaUVBQTBCO0FBQ2pELGNBQWM7QUFDZCx1QkFBdUIsaUVBQTBCO0FBQ2pELGNBQWM7QUFDZCx1QkFBdUIsaUVBQTBCO0FBQ2pELGNBQWM7QUFDZCx1QkFBdUIsbUVBQTRCO0FBQ25ELGNBQWM7QUFDZCx1QkFBdUIsaUVBQTBCO0FBQ2pELGNBQWM7QUFDZCx1QkFBdUIsaUVBQTBCO0FBQ2pELGNBQWM7QUFDZCx1QkFBdUIsNkRBQXNCO0FBQzdDLGNBQWM7QUFDZCx1QkFBdUIsNkRBQXNCO0FBQzdDLGNBQWM7QUFDZCx1QkFBdUIsNkRBQXNCO0FBQzdDLGNBQWM7QUFDZCx1QkFBdUIsbUVBQTRCO0FBQ25ELGNBQWM7QUFDZCx1QkFBdUIsbUVBQTRCO0FBQ25ELGNBQWM7QUFDZCx1QkFBdUIsbUVBQTRCO0FBQ25ELGNBQWM7QUFDZCx1QkFBdUIsbUVBQTRCO0FBQ25ELGNBQWM7QUFDZDtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxZQUFZLGlEQUFXLDRCQUE0QixVQUFVO0FBQzdEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLG1EQUFhO0FBQ3JCLE9BQU87QUFDUDs7QUFFcUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6R21EO0FBQzVCOztBQUU1QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksaURBQVc7QUFDZixJQUFJLGtEQUFZO0FBQ2hCLElBQUksa0RBQVk7QUFDaEI7QUFDQSxJQUFJLDhDQUFRO0FBQ1osSUFBSSxnREFBVTtBQUNkLENBQUM7O0FBRUQ7QUFDQSxzQkFBc0IsMkNBQU07QUFDNUIsd0JBQXdCLDZDQUFROztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsU0FBUztBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFZ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlMTDtBQUNxQjs7QUFFaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsb0RBQVM7QUFDbEMsOEJBQThCLGdEQUFVO0FBQ3hDLDRCQUE0Qiw2Q0FBTztBQUNuQyw0QkFBNEIsNkNBQU87QUFDbkMsd0JBQXdCLHlDQUFHO0FBQzNCLHdCQUF3Qix5Q0FBRztBQUMzQix3QkFBd0IseUNBQUc7QUFDM0IsOEJBQThCLCtDQUFTO0FBQ3ZDLDhCQUE4QiwrQ0FBUztBQUN2Qyw4QkFBOEIsK0NBQVM7QUFDdkMsOEJBQThCLCtDQUFTO0FBQ3ZDOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsb0RBQVM7QUFDbEMsOEJBQThCLGdEQUFVO0FBQ3hDLDRCQUE0Qiw2Q0FBTztBQUNuQyw0QkFBNEIsNkNBQU87QUFDbkMsd0JBQXdCLHlDQUFHO0FBQzNCLHdCQUF3Qix5Q0FBRztBQUMzQix3QkFBd0IseUNBQUc7QUFDM0IsOEJBQThCLCtDQUFTO0FBQ3ZDLDhCQUE4QiwrQ0FBUztBQUN2Qyw4QkFBOEIsK0NBQVM7QUFDdkMsOEJBQThCLCtDQUFTO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUU0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR3FEOzs7Ozs7O1VDaEVyRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcGxheWVyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllckRpdicpO1xuY29uc3QgY29tcHV0ZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcHV0ZXJEaXYnKTtcbmxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtXCIpO1xubGV0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJyk7XG5cbmNvbnN0IGRpc3BsYXlCb2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgICAvL0RldGVybWluZSB3aG9zZSBib2FyZCBpdFxuICAgIGxldCBwYXJlbnREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwbGF5ZXJ9RGl2YCk7XG4gICAgXG4gICAgLy9DcmVhdGUgYm9hcmQgY29udGFpbmVyXG4gICAgbGV0IGJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYm9hcmRDb250YWluZXIuY2xhc3NOYW1lID0gJ2JvYXJkQ29udGFpbmVyJztcblxuICAgIC8vQ3JlYXRlIGJvYXJkIG9mIDEwMCBkaXZpc2lvbnNcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IDEwMTsgaSsrKSB7XG4gICAgICAgIGxldCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgLy9TZXQgZWFjaCBzcXVhcmUncyBJRCB0byBpIHNvIHRoZXkncmUgbnVtYmVyZWQgMSAtIDEwMFxuICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aX1gKTtcbiAgICAgICAgc3F1YXJlLmlubmVyVGV4dCA9IGk7XG4gICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBcImJvYXJkXCI7XG4gICAgICAgIC8vU3BlY2lmeSB3aGljaCBib2FyZCBlYWNoIGRpdiBpcyBhIHBhcnQgb2ZcbiAgICAgICAgaWYgKHBhcmVudERpdi5pZCA9PSAncGxheWVyRGl2Jykge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ3BsYXllcicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2NvbXB1dGVyJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9O1xuXG4gICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKGJvYXJkQ29udGFpbmVyKTtcblxuICAgIHJldHVybjtcbn07XG5cbmZ1bmN0aW9uIHJlbW92ZUZvcm0oKSB7XG4gICAgZm9ybS5yZW1vdmUoKTtcbn07XG5cbmZ1bmN0aW9uIGRpc3BsYXlOYW1lKCkgeyBcbiAgICBwbGF5ZXJEaXYuaW5uZXJUZXh0ID0gYCR7bmFtZUlucHV0LnZhbHVlfWA7XG4gICAgY29tcHV0ZXJEaXYuaW5uZXJUZXh0ID0gXCJDb21wdXRlclwiO1xuICAgIHJldHVyblxufTtcblxuZnVuY3Rpb24gZGlzcGxheVNoaXBzKGJvYXJkTmFtZSwgbG9jYXRpb25zLCBzaGlwTmFtZSkge1xuICAgIHdoaWxlIChsb2NhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAvL0ZpbmQgdGFyZ2V0IGRpdlxuICAgICAgICBsZXQgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtib2FyZE5hbWV9YClbbG9jYXRpb25zWzBdXTtcblxuICAgICAgICAvL0FkZCBzaGlwIGFuZCBzaGlwTmFtZSBjbGFzc2VzXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKGAke3NoaXBOYW1lfWApO1xuXG4gICAgICAgIGxvY2F0aW9ucy5zaGlmdCgpO1xuICAgIH07XG4gICAgcmV0dXJuXG59O1xuXG5mdW5jdGlvbiBkaXNwbGF5SGl0cyhib2FyZE5hbWUsIGxvY2F0aW9ucykge1xuICAgIHdoaWxlIChsb2NhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAvL0ZpbmQgdGFyZ2V0IGRpdlxuICAgICAgICBsZXQgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtib2FyZE5hbWV9YClbbG9jYXRpb25zWzBdXTtcblxuICAgICAgICAvL1JlbW92ZSBzaGlwIGNsYXNzXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJyk7XG5cbiAgICAgICAgLy9BZGQgaGl0IGNsYXNzIFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG5cbiAgICAgICAgbG9jYXRpb25zLnNoaWZ0KCk7XG4gICAgfTtcbiAgICByZXR1cm4gXG59O1xuXG5mdW5jdGlvbiBkaXNwbGF5TWlzcyhsb2NhdGlvbiwgYm9hcmROYW1lKSB7XG4gICAgd2hpbGUgKGxvY2F0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy9BZGQgbWlzcyBjbGFzcywgW2xvY2F0aW9uIC0gMV0gc2VlbXMgYnVnZ3kuIE5vdCBpbnZlc3RpZ2F0aW5nIHJuIGJ1dCBjb3VsZCBjYXVzZSBpc3N1ZXMgZG93biB0aGUgcm9hZC5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtib2FyZE5hbWV9YClbbG9jYXRpb24gLSAxXS5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgICAgIGxvY2F0aW9uLnNoaWZ0KCk7XG4gICAgfTtcbiAgICByZXR1cm4gXG59O1xuXG5mdW5jdGlvbiBzaGlwWWFyZCgpIHtcbiAgICBjb25zdCB5YXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lhcmQnKTtcbiAgICB5YXJkLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JTaGlwcyhib2FyZE5hbWUpIHtcbiAgICBsZXQgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGBib2FyZCAke2JvYXJkTmFtZX1gKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgbGV0IGNoZWNrRGl2ID0gYm9hcmRbaV07XG5cbiAgICAgICAgaWYgKGNoZWNrRGl2LmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpKSB7XG4gICAgICAgICAgICAvL0dhbWUgbm90IG92ZXIgaWYgYSBzaGlwIGlzIGZvdW5kXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBnYW1lT3ZlcigpO1xufTtcblxuZnVuY3Rpb24gZ2FtZU92ZXIoKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdCcpO1xuICAgIGxldCBkaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGlzcGxheS5pbm5lclRleHQgPSAnR2FtZSBvdmVyISc7XG5cbiAgICByZXR1cm4gY29udGFpbmVyLmFwcGVuZENoaWxkKGRpc3BsYXkpO1xufVxuXG5leHBvcnQgeyBkaXNwbGF5Qm9hcmQsIHJlbW92ZUZvcm0sIGRpc3BsYXlOYW1lLCBkaXNwbGF5U2hpcHMsIGRpc3BsYXlIaXRzLCBkaXNwbGF5TWlzcywgc2hpcFlhcmQsIGNoZWNrRm9yU2hpcHMgfTtcbiIsImltcG9ydCB7IGRpc3BsYXlTaGlwcywgZGlzcGxheUhpdHMsIGRpc3BsYXlNaXNzLCBjaGVja0ZvclNoaXBzIH0gZnJvbSBcIi4vRE9NXCJcbmltcG9ydCB7IHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkIH0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY29vcmRpbmF0ZXMgPSBbXG4gICAgICAgICAgICAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCxcbiAgICAgICAgICAgIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTksIDIwLFxuICAgICAgICAgICAgMjEsIDIyLCAyMywgMjQsIDI1LCAyNiwgMjcsIDI4LCAyOSwgMzAsXG4gICAgICAgICAgICAzMSwgMzIsIDMzLCAzNCwgMzUsIDM2LCAzNywgMzgsIDM5LCA0MCxcbiAgICAgICAgICAgIDQxLCA0MiwgNDMsIDQ0LCA0NSwgNDYsIDQ3LCA0OCwgNDksIDUwLFxuICAgICAgICAgICAgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDU4LCA1OSwgNjAsXG4gICAgICAgICAgICA2MSwgNjIsIDYzLCA2NCwgNjUsIDY2LCA2NywgNjgsIDY5LCA3MCxcbiAgICAgICAgICAgIDcxLCA3MiwgNzMsIDc0LCA3NSwgNzYsIDc3LCA3OCwgNzksIDgwLFxuICAgICAgICAgICAgODEsIDgyLCA4MywgODQsIDg1LCA4NiwgODcsIDg4LCA4OSwgOTAsXG4gICAgICAgICAgICA5MSwgOTIsIDkzLCA5NCwgOTUsIDk2LCA5NywgOTgsIDk5LCAxMDAsXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuc2hpcENvb3JkcyA9IFtdO1xuICAgICAgICB0aGlzLmhpdENvb3JkcyA9IFtdO1xuICAgICAgICB0aGlzLm1pc3NlZFNob3RzID0gW107XG4gICAgfVxuXG4gICAgLy9QbGFjZSBzaGlwcyBhdCBzcGVjaWZpYyBjb29yZGluYXRlc1xuICAgIHBsYWNlU2hpcCA9IChzdGFydFBvaW50LCBsZW5ndGgsIHNoaXBOYW1lKSA9PiB7XG4gICAgICAgIHdoaWxlIChsZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNoaXBDb29yZHMucHVzaChzdGFydFBvaW50KTsvL3NoaXBDb29yZHMgbm90IGEgbWFzdGVyIGxpc3RcbiAgICAgICAgICAgIHN0YXJ0UG9pbnQrKztcbiAgICAgICAgICAgIGxlbmd0aC0tO1xuICAgICAgICB9O1xuICAgICAgICAvL0FkZCBjb29yZHMgdG8gc2hpcCBhcyB3ZWxsPyBub3QgbmVlZGVkIGkgdGhpbmsgXG4gICAgICAgIC8vc2hpcHMgYXJlIGJlaW5nIGFkZGVkIGF0IHN0YXJ0UG9pbnQgKyAxIGZvciBzb21lIHJlYXNvbiBybiwgaW52ZXN0aWdhdGUgbGF0ZXJcbiAgICAgICAgcmV0dXJuIGRpc3BsYXlTaGlwcyh0aGlzLm5hbWUsIHRoaXMuc2hpcENvb3Jkcywgc2hpcE5hbWUpO1xuICAgIH07XG5cbiAgICByZWNlaXZlQXR0YWNrKGxvY2F0aW9uKSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGBib2FyZCAke3RoaXMubmFtZX1gKVtsb2NhdGlvbl07XG4gICAgICAgIC8vY29uc29sZS5sb2cobG9jYXRpb24pOyAvL2NvbWluZyBpbiBhcyAxIGxlc3MgdGhhbiB3aGF0cyBjbGlja2VkLCB1bnN1cmUgd2h5XG4gICAgICAgIC8vY29uc29sZS5sb2codGFyZ2V0KTtcblxuICAgICAgICAvL0RldGVybWluZXMgaWYgYSBzaGlwIGlzIGhpdCAtPiB0YXJnZXQgdW5kZWYgcm5cbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NoaXAnKSkge1xuICAgICAgICAgICAgLy9JZiBhIHNoaXAgd2FzIGhpdCwgc2VuZCBoaXQgdG8gc2hpcCBhbmQgcmVjb3JkIGxvY2F0aW9uXG4gICAgICAgICAgICB0aGlzLmhpdENvb3Jkcy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGRpc3BsYXlIaXRzKHRoaXMubmFtZSwgdGhpcy5oaXRDb29yZHMpO1xuXG4gICAgICAgICAgICAvL0NoZWNrIHdoaWNoIHNoaXAgaXQgaXNcbiAgICAgICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyQmF0dGxlc2hpcFwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJCb2FyZC5iYXR0bGVzaGlwLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckNydWlzZXIxXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckJvYXJkLkNydWlzZXIxLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckNydWlzZXIyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckJvYXJkLkNydWlzZXIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllclN1YjFcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyQm9hcmQuU3ViMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJTdWIyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckJvYXJkLlN1YjIuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyU3ViM1wiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJCb2FyZC5TdWIzLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckRlc3Ryb3llcjFcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyQm9hcmQuRGVzdHJveWVyMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJEZXN0cm95ZXIyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckJvYXJkLkRlc3Ryb3llcjIuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyRGVzdHJveWVyM1wiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJCb2FyZC5EZXN0cm95ZXIzLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckRlc3Ryb3llcjRcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyQm9hcmQuRGVzdHJveWVyNC5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlckJhdHRsZXNoaXBcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJCb2FyZC5iYXR0bGVzaGlwLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyQ3J1aXNlcjFcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJCb2FyZC5DcnVpc2VyMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlckNydWlzZXIyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQuQ3J1aXNlcjIuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJTdWIxXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQuU3ViMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlclN1YjJcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJCb2FyZC5TdWIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyU3ViM1wiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlckJvYXJkLlN1YjMuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJEZXN0cm95ZXIxXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQuRGVzdHJveWVyMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlckRlc3Ryb3llcjJcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJCb2FyZC5EZXN0cm95ZXIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyRGVzdHJveWVyM1wiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlckJvYXJkLkRlc3Ryb3llcjMuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJEZXN0cm95ZXI0XCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQuRGVzdHJveWVyNC5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZygnaG1tJylcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL0lmIHNoaXAgaXMgbm90IGhpdCwgYWRkIHRvIG1pc3NlZFNob3RzXG4gICAgICAgICAgICB0aGlzLm1pc3NlZFNob3RzLnB1c2gobG9jYXRpb24pO1xuICAgICAgICAgICAgZGlzcGxheU1pc3ModGhpcy5taXNzZWRTaG90cywgYGJvYXJkICR7dGhpcy5uYW1lfWApO1xuICAgICAgICB9O1xuICAgICAgICAvL0FmdGVyIGF0dGFjayByZWNlaXZlZCwgY2hlY2sgZm9yIGdhbWUgb3ZlclxuICAgICAgICByZXR1cm4gdGhpcy5maW5kU2hpcHMoKTtcbiAgICB9O1xuXG4gICAgLy9GaW5kcyBub24tc3VuayBzaGlwcyBvbiBib2FyZCwgaWYgbm9uZSwgcmVwb3J0cyBnYW1lIG92ZXJcbiAgICBmaW5kU2hpcHMgPSAoKSA9PiB7XG4gICAgICAgIGNoZWNrRm9yU2hpcHModGhpcy5uYW1lKTtcbiAgICB9OyAvL25lZWQgdG8gZml4XG59O1xuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsImltcG9ydCB7IGRpc3BsYXlCb2FyZCwgcmVtb3ZlRm9ybSwgZGlzcGxheU5hbWUsIHNoaXBZYXJkIH0gZnJvbSBcIi4vRE9NXCI7XG5pbXBvcnQgeyBQbGF5ZXIsIGNvbXB1dGVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5cbmNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKTtcbmxldCBuYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZScpO1xubGV0IHBsYXllckJvYXJkO1xubGV0IGNvbXB1dGVyQm9hcmQ7XG5cbnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZGlzcGxheU5hbWUoKTtcbiAgICBkaXNwbGF5Qm9hcmQoJ3BsYXllcicpO1xuICAgIGRpc3BsYXlCb2FyZCgnY29tcHV0ZXInKTtcbiAgICBnYW1lTG9vcChuYW1lSW5wdXQudmFsdWUpO1xuICAgIHNoaXBZYXJkKCk7XG4gICAgcmVtb3ZlRm9ybSgpO1xufSk7XG5cbmNvbnN0IGdhbWVMb29wID0gKG5hbWUpID0+IHtcbiAgICBwbGF5ZXJCb2FyZCA9IG5ldyBQbGF5ZXIobmFtZSk7XG4gICAgY29tcHV0ZXJCb2FyZCA9IG5ldyBjb21wdXRlcignY29tcHV0ZXInKTtcblxuICAgIGZ1bmN0aW9uIGNvbXB1dGVyU2hpcHMoKSB7XG4gICAgICAgIC8vR2VuZXJhdGUgcmFuZG9tIHBsYWNlbWVudCBmb3IgY29tcHV0ZXIncyBzaGlwc1xuICAgICAgICAvL05lZWQgdG8gY29uc2lkZXIgY2hlY2tpbmcgdG8gYXZvaWQgZHVwbGljYXRlIHBsYWNlbWVudHNcbiAgICAgICAgZnVuY3Rpb24gcmFuZEludEZyb21JbnRlcnZhbChtaW4sIG1heCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGNvbXB1dGVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKHJhbmRJbnRGcm9tSW50ZXJ2YWwoMCwgMTAwKSwgNCwgXCJjb21wdXRlckJhdHRsZXNoaXBcIik7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKHJhbmRJbnRGcm9tSW50ZXJ2YWwoMCwgMTAwKSwgMywgXCJjb21wdXRlckNydWlzZXIxXCIpO1xuICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkLnBsYWNlU2hpcChyYW5kSW50RnJvbUludGVydmFsKDAsIDEwMCksIDMsIFwiY29tcHV0ZXJDcnVpc2VyMlwiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAocmFuZEludEZyb21JbnRlcnZhbCgwLCAxMDApLCAyLCBcImNvbXB1dGVyU3ViMVwiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAocmFuZEludEZyb21JbnRlcnZhbCgwLCAxMDApLCAyLCBcImNvbXB1dGVyU3ViMlwiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAocmFuZEludEZyb21JbnRlcnZhbCgwLCAxMDApLCAyLCBcImNvbXB1dGVyU3ViM1wiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAocmFuZEludEZyb21JbnRlcnZhbCgwLCAxMDApLCAxLCBcImNvbXB1dGVyRGVzdHJveWVyMVwiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAocmFuZEludEZyb21JbnRlcnZhbCgwLCAxMDApLCAxLCBcImNvbXB1dGVyRGVzdHJveWVyMlwiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAocmFuZEludEZyb21JbnRlcnZhbCgwLCAxMDApLCAxLCBcImNvbXB1dGVyRGVzdHJveWVyM1wiKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAocmFuZEludEZyb21JbnRlcnZhbCgwLCAxMDApLCAxLCBcImNvbXB1dGVyRGVzdHJveWVyNFwiKTtcbiAgICB9O1xuXG4gICAgY29tcHV0ZXJTaGlwcygpO1xuXG4gICAgYXN5bmMgZnVuY3Rpb24gcGxheWVyU2hpcHMoKSB7XG4gICAgICAgIGNvbnN0IHBsYWNlQmF0dGxlc2hpcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZUJhdHRsZXNoaXAnKTtcbiAgICAgICAgcGxhY2VCYXR0bGVzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhdHRsZXNoaXBMaXN0JykuY2xhc3NMaXN0LmFkZCgnY2xpY2tlZCcpO1xuXG4gICAgICAgICAgICBsZXQgY29vcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhdHRsZXNoaXBDb29yZHMnKS52YWx1ZTtcblxuICAgICAgICAgICAgcGxheWVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKGNvb3JkcywgNCwgXCJwbGF5ZXJCYXR0bGVzaGlwXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBwbGFjZUNydWlzZXIxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlQ3J1aXNlcjEnKTtcbiAgICAgICAgcGxhY2VDcnVpc2VyMS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcnVpc2VyMUxpc3QnKS5jbGFzc0xpc3QuYWRkKCdjbGlja2VkJyk7XG5cbiAgICAgICAgICAgIGxldCBjb29yZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3J1aXNlcjFDb29yZHMnKS52YWx1ZTtcblxuICAgICAgICAgICAgcGxheWVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKGNvb3JkcywgMywgXCJwbGF5ZXJDcnVpc2VyMVwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcGxhY2VDcnVpc2VyMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZUNydWlzZXIyJyk7XG4gICAgICAgIHBsYWNlQ3J1aXNlcjIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3J1aXNlcjJMaXN0JykuY2xhc3NMaXN0LmFkZCgnY2xpY2tlZCcpO1xuXG4gICAgICAgICAgICBsZXQgY29vcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NydWlzZXIyQ29vcmRzJykudmFsdWU7XG5cbiAgICAgICAgICAgIHBsYXllckJvYXJkLmJvYXJkLnBsYWNlU2hpcChjb29yZHMsIDMsIFwicGxheWVyQ3J1aXNlcjJcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHBsYWNlU3ViMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZVN1YjEnKTtcbiAgICAgICAgcGxhY2VTdWIxLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YjFMaXN0JykuY2xhc3NMaXN0LmFkZCgnY2xpY2tlZCcpO1xuXG4gICAgICAgICAgICBsZXQgY29vcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YjFDb29yZHMnKS52YWx1ZTtcblxuICAgICAgICAgICAgcGxheWVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKGNvb3JkcywgMiwgXCJwbGF5ZXJTdWIxXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBwbGFjZVN1YjIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2VTdWIyJyk7XG4gICAgICAgIHBsYWNlU3ViMi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWIyTGlzdCcpLmNsYXNzTGlzdC5hZGQoJ2NsaWNrZWQnKTtcblxuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWIyQ29vcmRzJykudmFsdWU7XG5cbiAgICAgICAgICAgIHBsYXllckJvYXJkLmJvYXJkLnBsYWNlU2hpcChjb29yZHMsIDIsIFwicGxheWVyU3ViMlwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcGxhY2VTdWIzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlU3ViMycpO1xuICAgICAgICBwbGFjZVN1YjMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ViM0xpc3QnKS5jbGFzc0xpc3QuYWRkKCdjbGlja2VkJyk7XG5cbiAgICAgICAgICAgIGxldCBjb29yZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ViM0Nvb3JkcycpLnZhbHVlO1xuXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoY29vcmRzLCAyLCBcInBsYXllclN1YjNcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHBsYWNlRGVzdHJveWVyMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZURlc3Ryb3llcjEnKTtcbiAgICAgICAgcGxhY2VEZXN0cm95ZXIxLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc3Ryb3llcjFMaXN0JykuY2xhc3NMaXN0LmFkZCgnY2xpY2tlZCcpO1xuXG4gICAgICAgICAgICBsZXQgY29vcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc3Ryb3llcjFDb29yZHMnKS52YWx1ZTtcblxuICAgICAgICAgICAgcGxheWVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKGNvb3JkcywgMSwgXCJwbGF5ZXJEZXN0cm95ZXIxXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBwbGFjZURlc3Ryb3llcjIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2VEZXN0cm95ZXIyJyk7XG4gICAgICAgIHBsYWNlRGVzdHJveWVyMi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXN0cm95ZXIyTGlzdCcpLmNsYXNzTGlzdC5hZGQoJ2NsaWNrZWQnKTtcblxuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXN0cm95ZXIyQ29vcmRzJykudmFsdWU7XG5cbiAgICAgICAgICAgIHBsYXllckJvYXJkLmJvYXJkLnBsYWNlU2hpcChjb29yZHMsIDEsIFwicGxheWVyRGVzdHJveWVyMlwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcGxhY2VEZXN0cm95ZXIzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlRGVzdHJveWVyMycpO1xuICAgICAgICBwbGFjZURlc3Ryb3llcjMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzdHJveWVyM0xpc3QnKS5jbGFzc0xpc3QuYWRkKCdjbGlja2VkJyk7XG5cbiAgICAgICAgICAgIGxldCBjb29yZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzdHJveWVyM0Nvb3JkcycpLnZhbHVlO1xuXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZC5ib2FyZC5wbGFjZVNoaXAoY29vcmRzLCAxLCBcInBsYXllckRlc3Ryb3llcjNcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHBsYWNlRGVzdHJveWVyNCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZURlc3Ryb3llcjQnKTtcbiAgICAgICAgcGxhY2VEZXN0cm95ZXI0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc3Ryb3llcjRMaXN0JykuY2xhc3NMaXN0LmFkZCgnY2xpY2tlZCcpO1xuXG4gICAgICAgICAgICBsZXQgY29vcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc3Ryb3llcjRDb29yZHMnKS52YWx1ZTtcblxuICAgICAgICAgICAgcGxheWVyQm9hcmQuYm9hcmQucGxhY2VTaGlwKGNvb3JkcywgMSwgXCJwbGF5ZXJEZXN0cm95ZXI0XCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm5cbiAgICB9O1xuICAgIFxuICAgIGxldCB0dXJuQ291bnRlciA9IDI7XG5cbiAgICBhc3luYyBmdW5jdGlvbiBydW5UdXJucyhjb3VudCkge1xuICAgICAgICBhd2FpdCBwbGF5ZXJTaGlwcygpO1xuICAgICAgICBsZXQgbG9jYWxDb3VudCA9IGNvdW50O1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY2hlY2tUdXJuID0gKGNvdW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoY291bnQgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyVHVybigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb21wdXRlclR1cm4oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIGNvbnN0IHBsYXllclR1cm4gPSAoKSA9PiB7XG4gICAgICAgICAgICBsb2NhbENvdW50Kys7XG4gICAgICAgICAgICAvL0NoZWNrIGZvciBib2FyZHMgbG9hZGVkXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmQgY29tcHV0ZXInKSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmQgY29tcHV0ZXInKVtpXTtcblxuICAgICAgICAgICAgICAgICAgICAvL01ha2UgY29tcHV0ZXIgYm9hcmQgYWJsZSB0byBiZSBhdHRhY2tlZCBvbiBjbGlja1xuICAgICAgICAgICAgICAgICAgICBzcXVhcmUub25jbGljayA9IGZ1bmN0aW9uIGFsbG93QXR0YWNrKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9TZW5kIGF0dGFja1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5yZWNlaXZlQXR0YWNrKGkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgZm9yIGdhbWUgb3ZlclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5maW5kU2hpcHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGVja1R1cm4obG9jYWxDb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdlcnJvciBpbiBwbGF5ZXIgYXR0YWNrIGZsb3cnKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBjb21wdXRlclR1cm4gPSAoKSA9PiB7XG4gICAgICAgICAgICBsb2NhbENvdW50Kys7XG4gICAgICAgICAgICBsZXQgcmFuZG9tQXR0YWNrID0gY29tcHV0ZXJCb2FyZC5yYW5kb21Nb3ZlKCk7XG5cbiAgICAgICAgICAgIC8vU2VuZCBhdHRhY2tcbiAgICAgICAgICAgIHBsYXllckJvYXJkLmJvYXJkLnJlY2VpdmVBdHRhY2socmFuZG9tQXR0YWNrKTtcbiAgICAgICAgICAgIC8vQ2hlY2sgZm9yIGdhbWUgb3ZlclxuICAgICAgICAgICAgcGxheWVyQm9hcmQuYm9hcmQuZmluZFNoaXBzKCk7XG4gICAgICAgICAgICByZXR1cm4gY2hlY2tUdXJuKGxvY2FsQ291bnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxvY2FsQ291bnQgPT09IDIpIGNoZWNrVHVybihsb2NhbENvdW50KTtcbiAgICB9O1xuXG4gICAgcnVuVHVybnModHVybkNvdW50ZXIpO1xuXG4gICAgcmV0dXJuXG59O1xuXG5leHBvcnQgeyBnYW1lTG9vcCwgcGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQgfTtcbiIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IHsgQmF0dGxlc2hpcCwgQ3J1aXNlciwgRGVzdHJveWVyLCBTdWIgfSBmcm9tIFwiLi9zaGlwLmpzXCI7XG5cbmNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICAvL3RoaXMuYm9hcmQgPSBuZXcgR2FtZWJvYXJkKG5hbWUpO1xuICAgICAgICB0aGlzLmJvYXJkID0gbmV3IEdhbWVib2FyZCgncGxheWVyJyk7XG4gICAgICAgIHRoaXMuYmF0dGxlc2hpcCA9IG5ldyBCYXR0bGVzaGlwKCdwbGF5ZXInKTtcbiAgICAgICAgdGhpcy5DcnVpc2VyMSA9IG5ldyBDcnVpc2VyKCdwbGF5ZXInLCAxKTtcbiAgICAgICAgdGhpcy5DcnVpc2VyMiA9IG5ldyBDcnVpc2VyKCdwbGF5ZXInLCAyKTtcbiAgICAgICAgdGhpcy5TdWIxID0gbmV3IFN1YigncGxheWVyJywgMSk7XG4gICAgICAgIHRoaXMuU3ViMiA9IG5ldyBTdWIoJ3BsYXllcicsIDIpO1xuICAgICAgICB0aGlzLlN1YjMgPSBuZXcgU3ViKCdwbGF5ZXInLCAzKTtcbiAgICAgICAgdGhpcy5EZXN0cm95ZXIxID0gbmV3IERlc3Ryb3llcigncGxheWVyJywgMSk7XG4gICAgICAgIHRoaXMuRGVzdHJveWVyMiA9IG5ldyBEZXN0cm95ZXIoJ3BsYXllcicsIDIpO1xuICAgICAgICB0aGlzLkRlc3Ryb3llcjMgPSBuZXcgRGVzdHJveWVyKCdwbGF5ZXInLCAzKTtcbiAgICAgICAgdGhpcy5EZXN0cm95ZXI0ID0gbmV3IERlc3Ryb3llcigncGxheWVyJywgNCk7XG4gICAgfTtcblxuICAgIGdldE5hbWUgPSAoKSA9PiB0aGlzLm5hbWU7XG5cbiAgICBwbGF5ZXJCb2FyZCA9ICgpID0+IHRoaXMuYm9hcmQ7XG5cbiAgICBhdHRhY2sgPSAobG9jYXRpb24pID0+IHRoaXMuYm9hcmQucmVjZWl2ZUF0dGFjayhsb2NhdGlvbik7XG59O1xuXG5jbGFzcyBjb21wdXRlciBleHRlbmRzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICAvL0NyZWF0ZSBuYW1lIGFuZCBib2FyZCB1c2luZyBuYW1lIGlucHV0XG4gICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICB0aGlzLmJvYXJkID0gbmV3IEdhbWVib2FyZChuYW1lKTtcbiAgICAgICAgdGhpcy5iYXR0bGVzaGlwID0gbmV3IEJhdHRsZXNoaXAoJ2NvbXB1dGVyJyk7XG4gICAgICAgIHRoaXMuQ3J1aXNlcjEgPSBuZXcgQ3J1aXNlcignY29tcHV0ZXInLCAxKTtcbiAgICAgICAgdGhpcy5DcnVpc2VyMiA9IG5ldyBDcnVpc2VyKCdjb21wdXRlcicsIDIpO1xuICAgICAgICB0aGlzLlN1YjEgPSBuZXcgU3ViKCdjb21wdXRlcicsIDEpO1xuICAgICAgICB0aGlzLlN1YjIgPSBuZXcgU3ViKCdjb21wdXRlcicsIDIpO1xuICAgICAgICB0aGlzLlN1YjMgPSBuZXcgU3ViKCdjb21wdXRlcicsIDMpO1xuICAgICAgICB0aGlzLkRlc3Ryb3llcjEgPSBuZXcgRGVzdHJveWVyKCdjb21wdXRlcicsIDEpO1xuICAgICAgICB0aGlzLkRlc3Ryb3llcjIgPSBuZXcgRGVzdHJveWVyKCdjb21wdXRlcicsIDIpO1xuICAgICAgICB0aGlzLkRlc3Ryb3llcjMgPSBuZXcgRGVzdHJveWVyKCdjb21wdXRlcicsIDMpO1xuICAgICAgICB0aGlzLkRlc3Ryb3llcjQgPSBuZXcgRGVzdHJveWVyKCdjb21wdXRlcicsIDQpO1xuICAgICAgICAvL1N0b3JlIHBsYXllZCBtb3ZlcyBmb3IgZnV0dXJlIHJlZmVyZW5jZVxuICAgICAgICB0aGlzLm9sZE1vdmVzID0gW107XG4gICAgfTtcblxuICAgIHJhbmRvbU1vdmUgPSAoKSA9PiB7XG4gICAgICAgIC8vR2VuZXJhdGUgbnVtYmVyIGJldHdlZW4gMCAtIDEwMCBcbiAgICAgICAgLy9sZXQgbW92ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMSk7XG4gICAgICAgIGxldCBtb3ZlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDE7XG5cblxuICAgICAgICAvL0NoZWNraW5nIHRoYXQgdGhlIHJhbmRvbSBtb3ZlIGlzIG5vdCBjb250YWluZWQgaW4gdGhlIG9sZE1vdmVzIGFycmF5XG4gICAgICAgIC8qaWYgKHRoaXMub2xkTW92ZXMuZmlsdGVyKGxvYyA9PiBsb2MgPT09IG1vdmUpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vQ2FsbCBpdHNlbGYgdG8gbWFrZSBhbm90aGVyIG1vdmUgaWYgdGhlIHJhbmRvbSBtb3ZlIGlzIGlsbGVnYWxcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmRvbU1vdmUoKTtcbiAgICAgICAgfSovXG5cbiAgICAgICAgLy9Bc3N1bWluZyBtb3ZlIGlzIGxlZ2FsLCBhZGQgaXQgdG8gdGhlIG9sZE1vdmVzIGFycmF5LCBjYWxsIFBsYXllcigpLmF0dGFjayhtb3ZlKTtcbiAgICAgICAgdGhpcy5vbGRNb3Zlcy5wdXNoKG1vdmUpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMub2xkTW92ZXMpO1xuICAgICAgICBjb25zb2xlLmxvZyhtb3ZlKTtcbiAgICAgICAgcmV0dXJuIG1vdmUgLy9zdXBlci5hdHRhY2sobW92ZSk7XG4gICAgfTtcbn07XG5cbmV4cG9ydCB7IFBsYXllciwgY29tcHV0ZXIgfTtcbiIsImNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKGxlbmd0aCwgbmFtZSkge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgLy9TaGlwcyBpbml0aWFsaXplIHdpdGggMCBoaXRzXG4gICAgICAgIHRoaXMuaGl0TnVtYmVyID0gMDtcbiAgICAgICAgdGhpcy5jb29yZHMgPSBbXTtcbiAgICB9XG5cbiAgICBsZW5ndGhPZlNoaXAgPSAoKSA9PiB0aGlzLmxlbmd0aDtcblxuICAgIGN1cnJlbnRIaXRzID0gKCkgPT4gdGhpcy5oaXROdW1iZXI7XG5cbiAgICAvL0luY3JlYXNlIHRoZSBoaXROdW1iZXIgZm9yIGEgc2hpcFxuICAgIGhpdCA9IChoaXQpID0+IHtcbiAgICAgICAgaWYgKGhpdCA9PSAxKSByZXR1cm4gdGhpcy5oaXROdW1iZXIrKztcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5oaXROdW1iZXIpO1xuICAgICAgICByZXR1cm5cbiAgICB9O1xuXG4gICAgLy9DaGVjayBpZiB0aGUgc2hpcCBoYXMgYmVlbiBzdW5rIGJ5IGNvbXBhcmluZyBoaXROdW1iZXIgdG8gbGVuZ3RoXG4gICAgaXNTdW5rID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5oaXROdW1iZXIgPCB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ25vdCBzdW5rJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc3VuaycpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgfTtcbn07XG5cbmNsYXNzIEJhdHRsZXNoaXAgZXh0ZW5kcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3Rvcih3aG9zZSkge1xuICAgICAgICBzdXBlcig0LCAnQmF0dGxlc2hpcCcpO1xuICAgICAgICB0aGlzLm93bmVyID0gd2hvc2U7XG4gICAgfTtcbn07XG5cbmNsYXNzIENydWlzZXIgZXh0ZW5kcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3Rvcih3aG9zZSwgc2hpcElEKSB7XG4gICAgICAgIHN1cGVyKDMsICdDcnVpc2VyJyk7XG4gICAgICAgIHRoaXMub3duZXIgPSB3aG9zZTtcbiAgICAgICAgdGhpcy5zaGlwSUQgPSBzaGlwSUQ7XG4gICAgfTtcbn07XG5cbmNsYXNzIFN1YiBleHRlbmRzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKHdob3NlLCBzaGlwSUQpIHtcbiAgICAgICAgc3VwZXIoMiwgJ1N1YicpO1xuICAgICAgICB0aGlzLm93bmVyID0gd2hvc2U7XG4gICAgICAgIHRoaXMuc2hpcElEID0gc2hpcElEO1xuICAgIH07XG59O1xuXG5jbGFzcyBEZXN0cm95ZXIgZXh0ZW5kcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3Rvcih3aG9zZSwgc2hpcElEKSB7XG4gICAgICAgIHN1cGVyKDEsICdEZXN0cm95ZXInKTtcbiAgICAgICAgdGhpcy5vd25lciA9IHdob3NlO1xuICAgICAgICB0aGlzLnNoaXBJRCA9IHNoaXBJRDtcbiAgICB9O1xufTtcblxuXG5leHBvcnQgeyBTaGlwLCBCYXR0bGVzaGlwLCBDcnVpc2VyLCBTdWIsIERlc3Ryb3llciB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
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
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.js");
//import { Gameboard } from "./gameboard";

//const container = document.getElementById('container');
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
        square.addEventListener('click', (event) => {
            //Check for who to send an attack to
            if (parentDiv.id == "computerDiv") {
                return  (0,_index__WEBPACK_IMPORTED_MODULE_0__.gameLoop)().attackComputer(i);
            } else {
                return (0,_index__WEBPACK_IMPORTED_MODULE_0__.gameLoop)().attackPlayer(i);
            };
        });
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

function displayShips(locations, shipName) {
    while (locations.length > 0) {
        document.getElementById(`${locations[0]}`).classList.add('ship');
        document.getElementById(`${locations[0]}`).classList.add(`${shipName}`);
        locations.shift();
    };
    return
};

function displayHits(locations) {
    while (locations.length > 0) {
        //Toggle off ship class
        document.getElementById(`${locations[0]}`).classList.toggle('ship');
        //Add hit class 
        document.getElementById(`${locations[0]}`).classList.add('hit');

        locations.shift();
    };
    return 
};

function displayMiss(location) {
    while (location.length > 0) {
        //Toggle on miss class
        document.getElementById(`${location[0]}`).classList.toggle('miss');
        location.shift();
    };
    return 
};

//module.exports = displayBoard;



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
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./src/index.js");




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
    placeShip = (startPoint, length, name) => {
        while (length) {
            this.shipCoords.push(startPoint);//shipCoords not a master list
            startPoint++;
            length--;
        };
        //Add coords to ship as well? not needed i think 
        //name.coords.push(this.shipCoords);
        return (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.displayShips)(this.shipCoords, name);
    };

    receiveAttack = (location) => {
        let target = document.getElementById(`${location}`);

        //Determines if a ship is hit
        if (target.classList.contains('ship')) {
            //If a ship was hit, send hit to ship and record location
            this.hitCoords.push(location);
            (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.displayHits)(this.hitCoords);

            //Check which ship it is
            if (target.classList.contains("playerBattleship")) {
                return playerBattleship.hit(1);
            } else if (target.classList.contains("playerCruiser1")) {
                return playerCruiser1.hit(1);
            } else if (target.classList.contains("playerCruiser2")) {
                return playerCruiser2.hit(1);
            } else if (target.classList.contains("playerSub1")) {
                return playerSub1.hit(1);
            } else if (target.classList.contains("playerSub2")) {
                return playerSub2.hit(1);
            } else if (target.classList.contains("playerSub3")) {
                return playerSub3.hit(1);
            } else if (target.classList.contains("playerDestroyer1")) {
                return playerDestroyer1.hit(1);
            } else if (target.classList.contains("playerDestroyer2")) {
                return playerDestroyer2.hit(1);
            } else if (target.classList.contains("playerDestroyer3")) {
                return playerDestroyer3.hit(1);
            } else if (target.classList.contains("playerDestroyer4")) {
                return playerDestroyer4.hit(1);
            } else if (target.classList.contains("computerBattleship")) {
                return computerBattleship.hit(1);
            } else if (target.classList.contains("computerCruiser1")) {
                return computerCruiser1.hit(1);
            } else if (target.classList.contains("computerCruiser2")) {
                return computerCruiser2.hit(1);
            } else if (target.classList.contains("computerSub1")) {
                return computerSub1.hit(1);
            } else if (target.classList.contains("computerSub2")) {
                return computerSub2.hit(1);
            } else if (target.classList.contains("computerSub3")) {
                return computerSub3.hit(1);
            } else if (target.classList.contains("computerDestroyer1")) {
                return computerDestroyer1.hit(1);
            } else if (target.classList.contains("computerDestroyer2")) {
                return computerDestroyer2.hit(1);
            } else if (target.classList.contains("computerDestroyer3")) {
                return computerDestroyer3.hit(1);
            } else if (target.classList.contains("computerDestroyer4")) {
                return computerDestroyer4.hit(1);
            } else {
                return console.log('hmm')
            };
        } else {
            //If ship is not hit, add to missedShots
            this.missedShots.push(location);
            (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.displayMiss)(this.missedShots);
        };
        //After attack received, check for game over
        return this.findShips();
    };

    //Finds non-sunk ships on board, if none, reports game over
    findShips = () => {
        if (this.shipCoords.length == this.hitCoords.length) return "Game over!"
    }; //need to fix
};

/*const Gameboard = (name) => {
    const coordinates = [
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

    const getName = () => name;

    let shipCoords = [];
    let hitCoords = [];

    //Place ships at specific coordinates
    const placeShip = (startPoint, length) => {
        while (length) {
            shipCoords.push(startPoint);
            startPoint++;
            length--;
        };
        //console.log(shipCoords);
        //Render ships in UI
        return shipCoords, displayShips(shipCoords);
    };

    //Determines whether or not a ship is hit at a location. If hit, it 'hits' the ship, or records location of missed shot
    const receiveAttack = (location) => {
        //console.log(location); works
        //console.log(shipCoords);
        //ship coords are not available in this function for some reason.... cant determine why

        //Determines if a ship is hit
        let hitShip = shipCoords.filter(loc => loc === location);

        //If a ship was hit, send hit to ship and record location
        if (hitShip.length != 0) {
            hitCoords.push(location);
            displayHits(hitCoords);
            return Ship().hit(1);
        }
        //how to ensure the correct ship records a hit?^

        //If ship is not hit, add to missedShots
        missedShots.push(location);

        //After attack received, check for game over
        return findShips();
    };

    //Log of missed shots
    let missedShots = [];

    //Finds non-sunk ships on board, if none, reports game over
    const findShips = () => {
        if (shipCoords.length == hitCoords.length) return "Game over!"
    };

    return { getName, placeShip, receiveAttack, shipCoords };
};*/




/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameLoop": () => (/* binding */ gameLoop)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ship */ "./src/ship.js");





const startButton = document.getElementById("start");
let nameInput = document.getElementById('name');

startButton.addEventListener("click", (event) => {
    (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.displayName)();
    (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.displayBoard)('player');
    (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.displayBoard)('computer');
    gameLoop(nameInput.value);
    (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.removeForm)();
});

const gameLoop = (name) => {
    const playerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_2__.Gameboard(name); //maybe define in gameboard?
    const computerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_2__.Gameboard("Computer");
    const human = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)(name);
    const comp = (0,_player__WEBPACK_IMPORTED_MODULE_1__.computer)();

    //Manually addShips for now
    function playerShips() {
        let playerBattleship = new _ship__WEBPACK_IMPORTED_MODULE_3__.Ship(4, "playerBattleship");
        playerBoard.placeShip(51, 4, "playerBattleship");
        playerBoard.placeShip(27, 3, "playerCruiser1");
        playerBoard.placeShip(1, 3, "playerCruiser2");
        playerBoard.placeShip(88, 2, "playerSub1");
        playerBoard.placeShip(91, 2, "playerSub2");
        playerBoard.placeShip(34, 2, "playerSub3");
        playerBoard.placeShip(64, 1, "playerDestroyer1");
        playerBoard.placeShip(49, 1, "playerDestroyer2");
        playerBoard.placeShip(50, 1, "playerDestroyer3");
        playerBoard.placeShip(77, 1, "playerDestroyer4");
        console.log(playerBoard.shipCoords);
    };
    function computerShips() {
        computerBoard.placeShip(51, 4);
        computerBoard.placeShip(27, 3);
        computerBoard.placeShip(1, 3);
        computerBoard.placeShip(88, 2);
        computerBoard.placeShip(91, 2);
        computerBoard.placeShip(34, 2);
        computerBoard.placeShip(64, 1);
        computerBoard.placeShip(49, 1);
        computerBoard.placeShip(50, 1);
        computerBoard.placeShip(77, 1);
        console.log(computerBoard.shipCoords);
    };
    playerShips();
    //computerShips();

    //After ships are placed, allow players to attack
    const attackComputer = (location) => {
        return computerBoard.receiveAttack(location);
    };

    const attackPlayer = (location) => {
        return playerBoard.receiveAttack(location);
    };

    //add turn counter?
    return { attackComputer, attackPlayer };
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


const Player = (name) => {
    const getName = name;

    const playerBoard = () => {
        (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();
    }

    const attack = (location) => {
        ;(0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard)().receiveAttack(location);
    };

    return { getName, playerBoard, attack };
};

const computer = () => {
    const prototype = Player("Computer");

    //Store played moves for future reference
    let oldMoves = [];

    const randomMove = () => {
        //Generate number between 0 - 100 
        let move = Math.floor(Math.random() * 101);

        //Checking that the random move is not contained in the oldMoves array
        if (oldMoves.filter(loc => loc === move).length > 0) {
            //Call itself to make another move if the random move is illegal
            return randomMove();
        }

        //Assuming move is legal, add it to the oldMoves array, call Player().attack(move);
        oldMoves.push(move);
        return prototype().attack(move);
    };
}

//module.exports = Player;



/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
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

        return this.hitNumber;
    };

    //Check if the ship has been sunk by comparing hitNumber to length
    isSunk = () => {
        if (this.hitNumber < this.length) {
            return false;
        } else {
            return true;
        };
    };
};
/*
const Ship = length => {
    //Length of the ship
    const lengthOfShip = () => length;
    
    //Ships initialize with 0 hits
    let hitNumber = 0;

    //Function to increase the hitNumber for a ship
    const hit = (hit) => {
        if (hit == true) return hitNumber++;

        return hitNumber;
    };

    //Check if the ship has been sunk by comparing hitNumber to length
    const isSunk = (hitNumber, length) => {
        if (hitNumber < length) return false;

        return true
    };

    return { isSunk };
};
*/
//module.exports = Ship;



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy9pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCB7IGdhbWVMb29wIH0gZnJvbSBcIi4vaW5kZXhcIjtcbi8vY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xuY29uc3QgcGxheWVyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllckRpdicpO1xuY29uc3QgY29tcHV0ZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcHV0ZXJEaXYnKTtcbmxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtXCIpO1xubGV0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJyk7XG5cbmNvbnN0IGRpc3BsYXlCb2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgICAvL0RldGVybWluZSB3aG9zZSBib2FyZCBpdFxuICAgIGxldCBwYXJlbnREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwbGF5ZXJ9RGl2YCk7XG4gICAgXG4gICAgLy9DcmVhdGUgYm9hcmQgY29udGFpbmVyXG4gICAgbGV0IGJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYm9hcmRDb250YWluZXIuY2xhc3NOYW1lID0gJ2JvYXJkQ29udGFpbmVyJztcblxuICAgIC8vQ3JlYXRlIGJvYXJkIG9mIDEwMCBkaXZpc2lvbnNcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IDEwMTsgaSsrKSB7XG4gICAgICAgIGxldCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgLy9TZXQgZWFjaCBzcXVhcmUncyBJRCB0byBpIHNvIHRoZXkncmUgbnVtYmVyZWQgMSAtIDEwMFxuICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aX1gKTtcbiAgICAgICAgc3F1YXJlLmNsYXNzTmFtZSA9IFwiYm9hcmRcIjtcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvL0NoZWNrIGZvciB3aG8gdG8gc2VuZCBhbiBhdHRhY2sgdG9cbiAgICAgICAgICAgIGlmIChwYXJlbnREaXYuaWQgPT0gXCJjb21wdXRlckRpdlwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICBnYW1lTG9vcCgpLmF0dGFja0NvbXB1dGVyKGkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2FtZUxvb3AoKS5hdHRhY2tQbGF5ZXIoaSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9O1xuICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChib2FyZENvbnRhaW5lcik7XG5cbiAgICByZXR1cm47XG59O1xuXG5mdW5jdGlvbiByZW1vdmVGb3JtKCkge1xuICAgIGZvcm0ucmVtb3ZlKCk7XG59O1xuXG5mdW5jdGlvbiBkaXNwbGF5TmFtZSgpIHsgXG4gICAgcGxheWVyRGl2LmlubmVyVGV4dCA9IGAke25hbWVJbnB1dC52YWx1ZX1gO1xuICAgIGNvbXB1dGVyRGl2LmlubmVyVGV4dCA9IFwiQ29tcHV0ZXJcIjtcbiAgICByZXR1cm5cbn07XG5cbmZ1bmN0aW9uIGRpc3BsYXlTaGlwcyhsb2NhdGlvbnMsIHNoaXBOYW1lKSB7XG4gICAgd2hpbGUgKGxvY2F0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2xvY2F0aW9uc1swXX1gKS5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2xvY2F0aW9uc1swXX1gKS5jbGFzc0xpc3QuYWRkKGAke3NoaXBOYW1lfWApO1xuICAgICAgICBsb2NhdGlvbnMuc2hpZnQoKTtcbiAgICB9O1xuICAgIHJldHVyblxufTtcblxuZnVuY3Rpb24gZGlzcGxheUhpdHMobG9jYXRpb25zKSB7XG4gICAgd2hpbGUgKGxvY2F0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vVG9nZ2xlIG9mZiBzaGlwIGNsYXNzXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2xvY2F0aW9uc1swXX1gKS5jbGFzc0xpc3QudG9nZ2xlKCdzaGlwJyk7XG4gICAgICAgIC8vQWRkIGhpdCBjbGFzcyBcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bG9jYXRpb25zWzBdfWApLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuXG4gICAgICAgIGxvY2F0aW9ucy5zaGlmdCgpO1xuICAgIH07XG4gICAgcmV0dXJuIFxufTtcblxuZnVuY3Rpb24gZGlzcGxheU1pc3MobG9jYXRpb24pIHtcbiAgICB3aGlsZSAobG9jYXRpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAvL1RvZ2dsZSBvbiBtaXNzIGNsYXNzXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2xvY2F0aW9uWzBdfWApLmNsYXNzTGlzdC50b2dnbGUoJ21pc3MnKTtcbiAgICAgICAgbG9jYXRpb24uc2hpZnQoKTtcbiAgICB9O1xuICAgIHJldHVybiBcbn07XG5cbi8vbW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5Qm9hcmQ7XG5leHBvcnQgeyBkaXNwbGF5Qm9hcmQsIHJlbW92ZUZvcm0sIGRpc3BsYXlOYW1lLCBkaXNwbGF5U2hpcHMsIGRpc3BsYXlIaXRzLCBkaXNwbGF5TWlzcyB9O1xuIiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXAuanNcIjtcbmltcG9ydCB7IGRpc3BsYXlTaGlwcywgZGlzcGxheUhpdHMsIGRpc3BsYXlNaXNzIH0gZnJvbSBcIi4vRE9NXCJcbmltcG9ydCB7IGdhbWVMb29wIH0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY29vcmRpbmF0ZXMgPSBbXG4gICAgICAgICAgICAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCxcbiAgICAgICAgICAgIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTksIDIwLFxuICAgICAgICAgICAgMjEsIDIyLCAyMywgMjQsIDI1LCAyNiwgMjcsIDI4LCAyOSwgMzAsXG4gICAgICAgICAgICAzMSwgMzIsIDMzLCAzNCwgMzUsIDM2LCAzNywgMzgsIDM5LCA0MCxcbiAgICAgICAgICAgIDQxLCA0MiwgNDMsIDQ0LCA0NSwgNDYsIDQ3LCA0OCwgNDksIDUwLFxuICAgICAgICAgICAgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDU4LCA1OSwgNjAsXG4gICAgICAgICAgICA2MSwgNjIsIDYzLCA2NCwgNjUsIDY2LCA2NywgNjgsIDY5LCA3MCxcbiAgICAgICAgICAgIDcxLCA3MiwgNzMsIDc0LCA3NSwgNzYsIDc3LCA3OCwgNzksIDgwLFxuICAgICAgICAgICAgODEsIDgyLCA4MywgODQsIDg1LCA4NiwgODcsIDg4LCA4OSwgOTAsXG4gICAgICAgICAgICA5MSwgOTIsIDkzLCA5NCwgOTUsIDk2LCA5NywgOTgsIDk5LCAxMDAsXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuc2hpcENvb3JkcyA9IFtdO1xuICAgICAgICB0aGlzLmhpdENvb3JkcyA9IFtdO1xuICAgICAgICB0aGlzLm1pc3NlZFNob3RzID0gW107XG4gICAgfVxuXG4gICAgLy9QbGFjZSBzaGlwcyBhdCBzcGVjaWZpYyBjb29yZGluYXRlc1xuICAgIHBsYWNlU2hpcCA9IChzdGFydFBvaW50LCBsZW5ndGgsIG5hbWUpID0+IHtcbiAgICAgICAgd2hpbGUgKGxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zaGlwQ29vcmRzLnB1c2goc3RhcnRQb2ludCk7Ly9zaGlwQ29vcmRzIG5vdCBhIG1hc3RlciBsaXN0XG4gICAgICAgICAgICBzdGFydFBvaW50Kys7XG4gICAgICAgICAgICBsZW5ndGgtLTtcbiAgICAgICAgfTtcbiAgICAgICAgLy9BZGQgY29vcmRzIHRvIHNoaXAgYXMgd2VsbD8gbm90IG5lZWRlZCBpIHRoaW5rIFxuICAgICAgICAvL25hbWUuY29vcmRzLnB1c2godGhpcy5zaGlwQ29vcmRzKTtcbiAgICAgICAgcmV0dXJuIGRpc3BsYXlTaGlwcyh0aGlzLnNoaXBDb29yZHMsIG5hbWUpO1xuICAgIH07XG5cbiAgICByZWNlaXZlQXR0YWNrID0gKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtsb2NhdGlvbn1gKTtcblxuICAgICAgICAvL0RldGVybWluZXMgaWYgYSBzaGlwIGlzIGhpdFxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpKSB7XG4gICAgICAgICAgICAvL0lmIGEgc2hpcCB3YXMgaGl0LCBzZW5kIGhpdCB0byBzaGlwIGFuZCByZWNvcmQgbG9jYXRpb25cbiAgICAgICAgICAgIHRoaXMuaGl0Q29vcmRzLnB1c2gobG9jYXRpb24pO1xuICAgICAgICAgICAgZGlzcGxheUhpdHModGhpcy5oaXRDb29yZHMpO1xuXG4gICAgICAgICAgICAvL0NoZWNrIHdoaWNoIHNoaXAgaXQgaXNcbiAgICAgICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyQmF0dGxlc2hpcFwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJCYXR0bGVzaGlwLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckNydWlzZXIxXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckNydWlzZXIxLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckNydWlzZXIyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckNydWlzZXIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllclN1YjFcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyU3ViMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJTdWIyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllclN1YjIuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyU3ViM1wiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJTdWIzLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckRlc3Ryb3llcjFcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyRGVzdHJveWVyMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJEZXN0cm95ZXIyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckRlc3Ryb3llcjIuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyRGVzdHJveWVyM1wiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJEZXN0cm95ZXIzLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckRlc3Ryb3llcjRcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyRGVzdHJveWVyNC5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlckJhdHRsZXNoaXBcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJCYXR0bGVzaGlwLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyQ3J1aXNlcjFcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJDcnVpc2VyMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlckNydWlzZXIyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQ3J1aXNlcjIuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJTdWIxXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyU3ViMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlclN1YjJcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJTdWIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyU3ViM1wiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlclN1YjMuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJEZXN0cm95ZXIxXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyRGVzdHJveWVyMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlckRlc3Ryb3llcjJcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJEZXN0cm95ZXIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyRGVzdHJveWVyM1wiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlckRlc3Ryb3llcjMuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJEZXN0cm95ZXI0XCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyRGVzdHJveWVyNC5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZygnaG1tJylcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL0lmIHNoaXAgaXMgbm90IGhpdCwgYWRkIHRvIG1pc3NlZFNob3RzXG4gICAgICAgICAgICB0aGlzLm1pc3NlZFNob3RzLnB1c2gobG9jYXRpb24pO1xuICAgICAgICAgICAgZGlzcGxheU1pc3ModGhpcy5taXNzZWRTaG90cyk7XG4gICAgICAgIH07XG4gICAgICAgIC8vQWZ0ZXIgYXR0YWNrIHJlY2VpdmVkLCBjaGVjayBmb3IgZ2FtZSBvdmVyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRTaGlwcygpO1xuICAgIH07XG5cbiAgICAvL0ZpbmRzIG5vbi1zdW5rIHNoaXBzIG9uIGJvYXJkLCBpZiBub25lLCByZXBvcnRzIGdhbWUgb3ZlclxuICAgIGZpbmRTaGlwcyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2hpcENvb3Jkcy5sZW5ndGggPT0gdGhpcy5oaXRDb29yZHMubGVuZ3RoKSByZXR1cm4gXCJHYW1lIG92ZXIhXCJcbiAgICB9OyAvL25lZWQgdG8gZml4XG59O1xuXG4vKmNvbnN0IEdhbWVib2FyZCA9IChuYW1lKSA9PiB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXG4gICAgICAgIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLFxuICAgICAgICAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCxcbiAgICAgICAgMjEsIDIyLCAyMywgMjQsIDI1LCAyNiwgMjcsIDI4LCAyOSwgMzAsXG4gICAgICAgIDMxLCAzMiwgMzMsIDM0LCAzNSwgMzYsIDM3LCAzOCwgMzksIDQwLFxuICAgICAgICA0MSwgNDIsIDQzLCA0NCwgNDUsIDQ2LCA0NywgNDgsIDQ5LCA1MCxcbiAgICAgICAgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDU4LCA1OSwgNjAsXG4gICAgICAgIDYxLCA2MiwgNjMsIDY0LCA2NSwgNjYsIDY3LCA2OCwgNjksIDcwLFxuICAgICAgICA3MSwgNzIsIDczLCA3NCwgNzUsIDc2LCA3NywgNzgsIDc5LCA4MCxcbiAgICAgICAgODEsIDgyLCA4MywgODQsIDg1LCA4NiwgODcsIDg4LCA4OSwgOTAsXG4gICAgICAgIDkxLCA5MiwgOTMsIDk0LCA5NSwgOTYsIDk3LCA5OCwgOTksIDEwMCxcbiAgICBdO1xuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG5cbiAgICBsZXQgc2hpcENvb3JkcyA9IFtdO1xuICAgIGxldCBoaXRDb29yZHMgPSBbXTtcblxuICAgIC8vUGxhY2Ugc2hpcHMgYXQgc3BlY2lmaWMgY29vcmRpbmF0ZXNcbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoc3RhcnRQb2ludCwgbGVuZ3RoKSA9PiB7XG4gICAgICAgIHdoaWxlIChsZW5ndGgpIHtcbiAgICAgICAgICAgIHNoaXBDb29yZHMucHVzaChzdGFydFBvaW50KTtcbiAgICAgICAgICAgIHN0YXJ0UG9pbnQrKztcbiAgICAgICAgICAgIGxlbmd0aC0tO1xuICAgICAgICB9O1xuICAgICAgICAvL2NvbnNvbGUubG9nKHNoaXBDb29yZHMpO1xuICAgICAgICAvL1JlbmRlciBzaGlwcyBpbiBVSVxuICAgICAgICByZXR1cm4gc2hpcENvb3JkcywgZGlzcGxheVNoaXBzKHNoaXBDb29yZHMpO1xuICAgIH07XG5cbiAgICAvL0RldGVybWluZXMgd2hldGhlciBvciBub3QgYSBzaGlwIGlzIGhpdCBhdCBhIGxvY2F0aW9uLiBJZiBoaXQsIGl0ICdoaXRzJyB0aGUgc2hpcCwgb3IgcmVjb3JkcyBsb2NhdGlvbiBvZiBtaXNzZWQgc2hvdFxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAobG9jYXRpb24pID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhsb2NhdGlvbik7IHdvcmtzXG4gICAgICAgIC8vY29uc29sZS5sb2coc2hpcENvb3Jkcyk7XG4gICAgICAgIC8vc2hpcCBjb29yZHMgYXJlIG5vdCBhdmFpbGFibGUgaW4gdGhpcyBmdW5jdGlvbiBmb3Igc29tZSByZWFzb24uLi4uIGNhbnQgZGV0ZXJtaW5lIHdoeVxuXG4gICAgICAgIC8vRGV0ZXJtaW5lcyBpZiBhIHNoaXAgaXMgaGl0XG4gICAgICAgIGxldCBoaXRTaGlwID0gc2hpcENvb3Jkcy5maWx0ZXIobG9jID0+IGxvYyA9PT0gbG9jYXRpb24pO1xuXG4gICAgICAgIC8vSWYgYSBzaGlwIHdhcyBoaXQsIHNlbmQgaGl0IHRvIHNoaXAgYW5kIHJlY29yZCBsb2NhdGlvblxuICAgICAgICBpZiAoaGl0U2hpcC5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgaGl0Q29vcmRzLnB1c2gobG9jYXRpb24pO1xuICAgICAgICAgICAgZGlzcGxheUhpdHMoaGl0Q29vcmRzKTtcbiAgICAgICAgICAgIHJldHVybiBTaGlwKCkuaGl0KDEpO1xuICAgICAgICB9XG4gICAgICAgIC8vaG93IHRvIGVuc3VyZSB0aGUgY29ycmVjdCBzaGlwIHJlY29yZHMgYSBoaXQ/XlxuXG4gICAgICAgIC8vSWYgc2hpcCBpcyBub3QgaGl0LCBhZGQgdG8gbWlzc2VkU2hvdHNcbiAgICAgICAgbWlzc2VkU2hvdHMucHVzaChsb2NhdGlvbik7XG5cbiAgICAgICAgLy9BZnRlciBhdHRhY2sgcmVjZWl2ZWQsIGNoZWNrIGZvciBnYW1lIG92ZXJcbiAgICAgICAgcmV0dXJuIGZpbmRTaGlwcygpO1xuICAgIH07XG5cbiAgICAvL0xvZyBvZiBtaXNzZWQgc2hvdHNcbiAgICBsZXQgbWlzc2VkU2hvdHMgPSBbXTtcblxuICAgIC8vRmluZHMgbm9uLXN1bmsgc2hpcHMgb24gYm9hcmQsIGlmIG5vbmUsIHJlcG9ydHMgZ2FtZSBvdmVyXG4gICAgY29uc3QgZmluZFNoaXBzID0gKCkgPT4ge1xuICAgICAgICBpZiAoc2hpcENvb3Jkcy5sZW5ndGggPT0gaGl0Q29vcmRzLmxlbmd0aCkgcmV0dXJuIFwiR2FtZSBvdmVyIVwiXG4gICAgfTtcblxuICAgIHJldHVybiB7IGdldE5hbWUsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgc2hpcENvb3JkcyB9O1xufTsqL1xuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsImltcG9ydCB7IGRpc3BsYXlCb2FyZCwgcmVtb3ZlRm9ybSwgZGlzcGxheU5hbWUgfSBmcm9tIFwiLi9ET01cIjtcbmltcG9ydCB7IFBsYXllciwgY29tcHV0ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpO1xubGV0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJyk7XG5cbnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBkaXNwbGF5TmFtZSgpO1xuICAgIGRpc3BsYXlCb2FyZCgncGxheWVyJyk7XG4gICAgZGlzcGxheUJvYXJkKCdjb21wdXRlcicpO1xuICAgIGdhbWVMb29wKG5hbWVJbnB1dC52YWx1ZSk7XG4gICAgcmVtb3ZlRm9ybSgpO1xufSk7XG5cbmNvbnN0IGdhbWVMb29wID0gKG5hbWUpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQobmFtZSk7IC8vbWF5YmUgZGVmaW5lIGluIGdhbWVib2FyZD9cbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gbmV3IEdhbWVib2FyZChcIkNvbXB1dGVyXCIpO1xuICAgIGNvbnN0IGh1bWFuID0gUGxheWVyKG5hbWUpO1xuICAgIGNvbnN0IGNvbXAgPSBjb21wdXRlcigpO1xuXG4gICAgLy9NYW51YWxseSBhZGRTaGlwcyBmb3Igbm93XG4gICAgZnVuY3Rpb24gcGxheWVyU2hpcHMoKSB7XG4gICAgICAgIGxldCBwbGF5ZXJCYXR0bGVzaGlwID0gbmV3IFNoaXAoNCwgXCJwbGF5ZXJCYXR0bGVzaGlwXCIpO1xuICAgICAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNTEsIDQsIFwicGxheWVyQmF0dGxlc2hpcFwiKTtcbiAgICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDI3LCAzLCBcInBsYXllckNydWlzZXIxXCIpO1xuICAgICAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoMSwgMywgXCJwbGF5ZXJDcnVpc2VyMlwiKTtcbiAgICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDg4LCAyLCBcInBsYXllclN1YjFcIik7XG4gICAgICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcCg5MSwgMiwgXCJwbGF5ZXJTdWIyXCIpO1xuICAgICAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoMzQsIDIsIFwicGxheWVyU3ViM1wiKTtcbiAgICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDY0LCAxLCBcInBsYXllckRlc3Ryb3llcjFcIik7XG4gICAgICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcCg0OSwgMSwgXCJwbGF5ZXJEZXN0cm95ZXIyXCIpO1xuICAgICAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNTAsIDEsIFwicGxheWVyRGVzdHJveWVyM1wiKTtcbiAgICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDc3LCAxLCBcInBsYXllckRlc3Ryb3llcjRcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHBsYXllckJvYXJkLnNoaXBDb29yZHMpO1xuICAgIH07XG4gICAgZnVuY3Rpb24gY29tcHV0ZXJTaGlwcygpIHtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoNTEsIDQpO1xuICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgyNywgMyk7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDEsIDMpO1xuICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg4OCwgMik7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDkxLCAyKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMzQsIDIpO1xuICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg2NCwgMSk7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDQ5LCAxKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoNTAsIDEpO1xuICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg3NywgMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmQuc2hpcENvb3Jkcyk7XG4gICAgfTtcbiAgICBwbGF5ZXJTaGlwcygpO1xuICAgIC8vY29tcHV0ZXJTaGlwcygpO1xuXG4gICAgLy9BZnRlciBzaGlwcyBhcmUgcGxhY2VkLCBhbGxvdyBwbGF5ZXJzIHRvIGF0dGFja1xuICAgIGNvbnN0IGF0dGFja0NvbXB1dGVyID0gKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBjb21wdXRlckJvYXJkLnJlY2VpdmVBdHRhY2sobG9jYXRpb24pO1xuICAgIH07XG5cbiAgICBjb25zdCBhdHRhY2tQbGF5ZXIgPSAobG9jYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIHBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2sobG9jYXRpb24pO1xuICAgIH07XG5cbiAgICAvL2FkZCB0dXJuIGNvdW50ZXI/XG4gICAgcmV0dXJuIHsgYXR0YWNrQ29tcHV0ZXIsIGF0dGFja1BsYXllciB9O1xufVxuXG5leHBvcnQgeyBnYW1lTG9vcCB9O1xuIiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5cbmNvbnN0IFBsYXllciA9IChuYW1lKSA9PiB7XG4gICAgY29uc3QgZ2V0TmFtZSA9IG5hbWU7XG5cbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9ICgpID0+IHtcbiAgICAgICAgR2FtZWJvYXJkKCk7XG4gICAgfVxuXG4gICAgY29uc3QgYXR0YWNrID0gKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIEdhbWVib2FyZCgpLnJlY2VpdmVBdHRhY2sobG9jYXRpb24pO1xuICAgIH07XG5cbiAgICByZXR1cm4geyBnZXROYW1lLCBwbGF5ZXJCb2FyZCwgYXR0YWNrIH07XG59O1xuXG5jb25zdCBjb21wdXRlciA9ICgpID0+IHtcbiAgICBjb25zdCBwcm90b3R5cGUgPSBQbGF5ZXIoXCJDb21wdXRlclwiKTtcblxuICAgIC8vU3RvcmUgcGxheWVkIG1vdmVzIGZvciBmdXR1cmUgcmVmZXJlbmNlXG4gICAgbGV0IG9sZE1vdmVzID0gW107XG5cbiAgICBjb25zdCByYW5kb21Nb3ZlID0gKCkgPT4ge1xuICAgICAgICAvL0dlbmVyYXRlIG51bWJlciBiZXR3ZWVuIDAgLSAxMDAgXG4gICAgICAgIGxldCBtb3ZlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAxKTtcblxuICAgICAgICAvL0NoZWNraW5nIHRoYXQgdGhlIHJhbmRvbSBtb3ZlIGlzIG5vdCBjb250YWluZWQgaW4gdGhlIG9sZE1vdmVzIGFycmF5XG4gICAgICAgIGlmIChvbGRNb3Zlcy5maWx0ZXIobG9jID0+IGxvYyA9PT0gbW92ZSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy9DYWxsIGl0c2VsZiB0byBtYWtlIGFub3RoZXIgbW92ZSBpZiB0aGUgcmFuZG9tIG1vdmUgaXMgaWxsZWdhbFxuICAgICAgICAgICAgcmV0dXJuIHJhbmRvbU1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQXNzdW1pbmcgbW92ZSBpcyBsZWdhbCwgYWRkIGl0IHRvIHRoZSBvbGRNb3ZlcyBhcnJheSwgY2FsbCBQbGF5ZXIoKS5hdHRhY2sobW92ZSk7XG4gICAgICAgIG9sZE1vdmVzLnB1c2gobW92ZSk7XG4gICAgICAgIHJldHVybiBwcm90b3R5cGUoKS5hdHRhY2sobW92ZSk7XG4gICAgfTtcbn1cblxuLy9tb2R1bGUuZXhwb3J0cyA9IFBsYXllcjtcbmV4cG9ydCB7IFBsYXllciwgY29tcHV0ZXIgfTtcbiIsImNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKGxlbmd0aCwgbmFtZSkge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgLy9TaGlwcyBpbml0aWFsaXplIHdpdGggMCBoaXRzXG4gICAgICAgIHRoaXMuaGl0TnVtYmVyID0gMDtcbiAgICAgICAgdGhpcy5jb29yZHMgPSBbXTtcbiAgICB9XG5cbiAgICBsZW5ndGhPZlNoaXAgPSAoKSA9PiB0aGlzLmxlbmd0aDtcblxuICAgIGN1cnJlbnRIaXRzID0gKCkgPT4gdGhpcy5oaXROdW1iZXI7XG5cbiAgICAvL0luY3JlYXNlIHRoZSBoaXROdW1iZXIgZm9yIGEgc2hpcFxuICAgIGhpdCA9IChoaXQpID0+IHtcbiAgICAgICAgaWYgKGhpdCA9PSB0cnVlKSByZXR1cm4gdGhpcy5oaXROdW1iZXIrKztcblxuICAgICAgICByZXR1cm4gdGhpcy5oaXROdW1iZXI7XG4gICAgfTtcblxuICAgIC8vQ2hlY2sgaWYgdGhlIHNoaXAgaGFzIGJlZW4gc3VuayBieSBjb21wYXJpbmcgaGl0TnVtYmVyIHRvIGxlbmd0aFxuICAgIGlzU3VuayA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaGl0TnVtYmVyIDwgdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgIH07XG59O1xuLypcbmNvbnN0IFNoaXAgPSBsZW5ndGggPT4ge1xuICAgIC8vTGVuZ3RoIG9mIHRoZSBzaGlwXG4gICAgY29uc3QgbGVuZ3RoT2ZTaGlwID0gKCkgPT4gbGVuZ3RoO1xuICAgIFxuICAgIC8vU2hpcHMgaW5pdGlhbGl6ZSB3aXRoIDAgaGl0c1xuICAgIGxldCBoaXROdW1iZXIgPSAwO1xuXG4gICAgLy9GdW5jdGlvbiB0byBpbmNyZWFzZSB0aGUgaGl0TnVtYmVyIGZvciBhIHNoaXBcbiAgICBjb25zdCBoaXQgPSAoaGl0KSA9PiB7XG4gICAgICAgIGlmIChoaXQgPT0gdHJ1ZSkgcmV0dXJuIGhpdE51bWJlcisrO1xuXG4gICAgICAgIHJldHVybiBoaXROdW1iZXI7XG4gICAgfTtcblxuICAgIC8vQ2hlY2sgaWYgdGhlIHNoaXAgaGFzIGJlZW4gc3VuayBieSBjb21wYXJpbmcgaGl0TnVtYmVyIHRvIGxlbmd0aFxuICAgIGNvbnN0IGlzU3VuayA9IChoaXROdW1iZXIsIGxlbmd0aCkgPT4ge1xuICAgICAgICBpZiAoaGl0TnVtYmVyIDwgbGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgaXNTdW5rIH07XG59O1xuKi9cbi8vbW9kdWxlLmV4cG9ydHMgPSBTaGlwO1xuZXhwb3J0IHsgU2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
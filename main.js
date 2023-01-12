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
        //Specify which board each div is a part of
        if (parentDiv.id == 'playerDiv') {
            square.classList.add('player');
        } else {
            square.classList.add('computer');
        };

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

    receiveAttack = (location, boardName) => {
        let target = document.getElementsByClassName(`${boardName}`)[location];

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
            (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.displayMiss)(this.missedShots, boardName);
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
        return computerBoard.receiveAttack(location, 'board computer');
    };

    const attackPlayer = (location) => {
        return playerBoard.receiveAttack(location, 'board player');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvRE9NLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBnYW1lTG9vcCB9IGZyb20gXCIuL2luZGV4XCI7XG4vL2NvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcbmNvbnN0IHBsYXllckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXJEaXYnKTtcbmNvbnN0IGNvbXB1dGVyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbXB1dGVyRGl2Jyk7XG5sZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybVwiKTtcbmxldCBuYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZScpO1xuXG5jb25zdCBkaXNwbGF5Qm9hcmQgPSAocGxheWVyKSA9PiB7XG4gICAgLy9EZXRlcm1pbmUgd2hvc2UgYm9hcmQgaXRcbiAgICBsZXQgcGFyZW50RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cGxheWVyfURpdmApO1xuICAgIFxuICAgIC8vQ3JlYXRlIGJvYXJkIGNvbnRhaW5lclxuICAgIGxldCBib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJvYXJkQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdib2FyZENvbnRhaW5lcic7XG5cbiAgICAvL0NyZWF0ZSBib2FyZCBvZiAxMDAgZGl2aXNpb25zXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMDE7IGkrKykge1xuICAgICAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIC8vU2V0IGVhY2ggc3F1YXJlJ3MgSUQgdG8gaSBzbyB0aGV5J3JlIG51bWJlcmVkIDEgLSAxMDBcbiAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2l9YCk7XG4gICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBcImJvYXJkXCI7XG4gICAgICAgIC8vU3BlY2lmeSB3aGljaCBib2FyZCBlYWNoIGRpdiBpcyBhIHBhcnQgb2ZcbiAgICAgICAgaWYgKHBhcmVudERpdi5pZCA9PSAncGxheWVyRGl2Jykge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ3BsYXllcicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2NvbXB1dGVyJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvL0NoZWNrIGZvciB3aG8gdG8gc2VuZCBhbiBhdHRhY2sgdG9cbiAgICAgICAgICAgIGlmIChwYXJlbnREaXYuaWQgPT0gXCJjb21wdXRlckRpdlwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICBnYW1lTG9vcCgpLmF0dGFja0NvbXB1dGVyKGkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2FtZUxvb3AoKS5hdHRhY2tQbGF5ZXIoaSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9O1xuICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChib2FyZENvbnRhaW5lcik7XG5cbiAgICByZXR1cm47XG59O1xuXG5mdW5jdGlvbiByZW1vdmVGb3JtKCkge1xuICAgIGZvcm0ucmVtb3ZlKCk7XG59O1xuXG5mdW5jdGlvbiBkaXNwbGF5TmFtZSgpIHsgXG4gICAgcGxheWVyRGl2LmlubmVyVGV4dCA9IGAke25hbWVJbnB1dC52YWx1ZX1gO1xuICAgIGNvbXB1dGVyRGl2LmlubmVyVGV4dCA9IFwiQ29tcHV0ZXJcIjtcbiAgICByZXR1cm5cbn07XG5cbmZ1bmN0aW9uIGRpc3BsYXlTaGlwcyhsb2NhdGlvbnMsIHNoaXBOYW1lKSB7XG4gICAgd2hpbGUgKGxvY2F0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2xvY2F0aW9uc1swXX1gKS5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2xvY2F0aW9uc1swXX1gKS5jbGFzc0xpc3QuYWRkKGAke3NoaXBOYW1lfWApO1xuICAgICAgICBsb2NhdGlvbnMuc2hpZnQoKTtcbiAgICB9O1xuICAgIHJldHVyblxufTtcblxuZnVuY3Rpb24gZGlzcGxheUhpdHMobG9jYXRpb25zKSB7XG4gICAgd2hpbGUgKGxvY2F0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vVG9nZ2xlIG9mZiBzaGlwIGNsYXNzXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2xvY2F0aW9uc1swXX1gKS5jbGFzc0xpc3QudG9nZ2xlKCdzaGlwJyk7XG4gICAgICAgIC8vQWRkIGhpdCBjbGFzcyBcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bG9jYXRpb25zWzBdfWApLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuXG4gICAgICAgIGxvY2F0aW9ucy5zaGlmdCgpO1xuICAgIH07XG4gICAgcmV0dXJuIFxufTtcblxuZnVuY3Rpb24gZGlzcGxheU1pc3MobG9jYXRpb24sIGJvYXJkTmFtZSkge1xuICAgIHdoaWxlIChsb2NhdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vQWRkIG1pc3MgY2xhc3MsIFtsb2NhdGlvbiAtIDFdIHNlZW1zIGJ1Z2d5LiBOb3QgaW52ZXN0aWdhdGluZyBybiBidXQgY291bGQgY2F1c2UgaXNzdWVzIGRvd24gdGhlIHJvYWQuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7Ym9hcmROYW1lfWApW2xvY2F0aW9uIC0gMV0uY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgICAgICBsb2NhdGlvbi5zaGlmdCgpO1xuICAgIH07XG4gICAgcmV0dXJuIFxufTtcblxuZXhwb3J0IHsgZGlzcGxheUJvYXJkLCByZW1vdmVGb3JtLCBkaXNwbGF5TmFtZSwgZGlzcGxheVNoaXBzLCBkaXNwbGF5SGl0cywgZGlzcGxheU1pc3MgfTtcbiIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwLmpzXCI7XG5pbXBvcnQgeyBkaXNwbGF5U2hpcHMsIGRpc3BsYXlIaXRzLCBkaXNwbGF5TWlzcyB9IGZyb20gXCIuL0RPTVwiXG5pbXBvcnQgeyBnYW1lTG9vcCB9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNvb3JkaW5hdGVzID0gW1xuICAgICAgICAgICAgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsXG4gICAgICAgICAgICAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCxcbiAgICAgICAgICAgIDIxLCAyMiwgMjMsIDI0LCAyNSwgMjYsIDI3LCAyOCwgMjksIDMwLFxuICAgICAgICAgICAgMzEsIDMyLCAzMywgMzQsIDM1LCAzNiwgMzcsIDM4LCAzOSwgNDAsXG4gICAgICAgICAgICA0MSwgNDIsIDQzLCA0NCwgNDUsIDQ2LCA0NywgNDgsIDQ5LCA1MCxcbiAgICAgICAgICAgIDUxLCA1MiwgNTMsIDU0LCA1NSwgNTYsIDU3LCA1OCwgNTksIDYwLFxuICAgICAgICAgICAgNjEsIDYyLCA2MywgNjQsIDY1LCA2NiwgNjcsIDY4LCA2OSwgNzAsXG4gICAgICAgICAgICA3MSwgNzIsIDczLCA3NCwgNzUsIDc2LCA3NywgNzgsIDc5LCA4MCxcbiAgICAgICAgICAgIDgxLCA4MiwgODMsIDg0LCA4NSwgODYsIDg3LCA4OCwgODksIDkwLFxuICAgICAgICAgICAgOTEsIDkyLCA5MywgOTQsIDk1LCA5NiwgOTcsIDk4LCA5OSwgMTAwLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLnNoaXBDb29yZHMgPSBbXTtcbiAgICAgICAgdGhpcy5oaXRDb29yZHMgPSBbXTtcbiAgICAgICAgdGhpcy5taXNzZWRTaG90cyA9IFtdO1xuICAgIH1cblxuICAgIC8vUGxhY2Ugc2hpcHMgYXQgc3BlY2lmaWMgY29vcmRpbmF0ZXNcbiAgICBwbGFjZVNoaXAgPSAoc3RhcnRQb2ludCwgbGVuZ3RoLCBuYW1lKSA9PiB7XG4gICAgICAgIHdoaWxlIChsZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2hpcENvb3Jkcy5wdXNoKHN0YXJ0UG9pbnQpOy8vc2hpcENvb3JkcyBub3QgYSBtYXN0ZXIgbGlzdFxuICAgICAgICAgICAgc3RhcnRQb2ludCsrO1xuICAgICAgICAgICAgbGVuZ3RoLS07XG4gICAgICAgIH07XG4gICAgICAgIC8vQWRkIGNvb3JkcyB0byBzaGlwIGFzIHdlbGw/IG5vdCBuZWVkZWQgaSB0aGluayBcbiAgICAgICAgLy9uYW1lLmNvb3Jkcy5wdXNoKHRoaXMuc2hpcENvb3Jkcyk7XG4gICAgICAgIHJldHVybiBkaXNwbGF5U2hpcHModGhpcy5zaGlwQ29vcmRzLCBuYW1lKTtcbiAgICB9O1xuXG4gICAgcmVjZWl2ZUF0dGFjayA9IChsb2NhdGlvbiwgYm9hcmROYW1lKSA9PiB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke2JvYXJkTmFtZX1gKVtsb2NhdGlvbl07XG5cbiAgICAgICAgLy9EZXRlcm1pbmVzIGlmIGEgc2hpcCBpcyBoaXRcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NoaXAnKSkge1xuICAgICAgICAgICAgLy9JZiBhIHNoaXAgd2FzIGhpdCwgc2VuZCBoaXQgdG8gc2hpcCBhbmQgcmVjb3JkIGxvY2F0aW9uXG4gICAgICAgICAgICB0aGlzLmhpdENvb3Jkcy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGRpc3BsYXlIaXRzKHRoaXMuaGl0Q29vcmRzKTtcblxuICAgICAgICAgICAgLy9DaGVjayB3aGljaCBzaGlwIGl0IGlzXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckJhdHRsZXNoaXBcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyQmF0dGxlc2hpcC5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJDcnVpc2VyMVwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJDcnVpc2VyMS5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJDcnVpc2VyMlwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJDcnVpc2VyMi5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJTdWIxXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllclN1YjEuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyU3ViMlwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJTdWIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllclN1YjNcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyU3ViMy5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJEZXN0cm95ZXIxXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckRlc3Ryb3llcjEuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyRGVzdHJveWVyMlwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJEZXN0cm95ZXIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllckRlc3Ryb3llcjNcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyRGVzdHJveWVyMy5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXJEZXN0cm95ZXI0XCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllckRlc3Ryb3llcjQuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJCYXR0bGVzaGlwXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQmF0dGxlc2hpcC5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlckNydWlzZXIxXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyQ3J1aXNlcjEuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJDcnVpc2VyMlwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlckNydWlzZXIyLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyU3ViMVwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlclN1YjEuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJTdWIyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyU3ViMi5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlclN1YjNcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJTdWIzLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyRGVzdHJveWVyMVwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlckRlc3Ryb3llcjEuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXJEZXN0cm95ZXIyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVyRGVzdHJveWVyMi5oaXQoMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlckRlc3Ryb3llcjNcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZXJEZXN0cm95ZXIzLmhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyRGVzdHJveWVyNFwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wdXRlckRlc3Ryb3llcjQuaGl0KDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coJ2htbScpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9JZiBzaGlwIGlzIG5vdCBoaXQsIGFkZCB0byBtaXNzZWRTaG90c1xuICAgICAgICAgICAgdGhpcy5taXNzZWRTaG90cy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGRpc3BsYXlNaXNzKHRoaXMubWlzc2VkU2hvdHMsIGJvYXJkTmFtZSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vQWZ0ZXIgYXR0YWNrIHJlY2VpdmVkLCBjaGVjayBmb3IgZ2FtZSBvdmVyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRTaGlwcygpO1xuICAgIH07XG5cbiAgICAvL0ZpbmRzIG5vbi1zdW5rIHNoaXBzIG9uIGJvYXJkLCBpZiBub25lLCByZXBvcnRzIGdhbWUgb3ZlclxuICAgIGZpbmRTaGlwcyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2hpcENvb3Jkcy5sZW5ndGggPT0gdGhpcy5oaXRDb29yZHMubGVuZ3RoKSByZXR1cm4gXCJHYW1lIG92ZXIhXCJcbiAgICB9OyAvL25lZWQgdG8gZml4XG59O1xuXG4vKmNvbnN0IEdhbWVib2FyZCA9IChuYW1lKSA9PiB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXG4gICAgICAgIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLFxuICAgICAgICAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCxcbiAgICAgICAgMjEsIDIyLCAyMywgMjQsIDI1LCAyNiwgMjcsIDI4LCAyOSwgMzAsXG4gICAgICAgIDMxLCAzMiwgMzMsIDM0LCAzNSwgMzYsIDM3LCAzOCwgMzksIDQwLFxuICAgICAgICA0MSwgNDIsIDQzLCA0NCwgNDUsIDQ2LCA0NywgNDgsIDQ5LCA1MCxcbiAgICAgICAgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDU4LCA1OSwgNjAsXG4gICAgICAgIDYxLCA2MiwgNjMsIDY0LCA2NSwgNjYsIDY3LCA2OCwgNjksIDcwLFxuICAgICAgICA3MSwgNzIsIDczLCA3NCwgNzUsIDc2LCA3NywgNzgsIDc5LCA4MCxcbiAgICAgICAgODEsIDgyLCA4MywgODQsIDg1LCA4NiwgODcsIDg4LCA4OSwgOTAsXG4gICAgICAgIDkxLCA5MiwgOTMsIDk0LCA5NSwgOTYsIDk3LCA5OCwgOTksIDEwMCxcbiAgICBdO1xuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG5cbiAgICBsZXQgc2hpcENvb3JkcyA9IFtdO1xuICAgIGxldCBoaXRDb29yZHMgPSBbXTtcblxuICAgIC8vUGxhY2Ugc2hpcHMgYXQgc3BlY2lmaWMgY29vcmRpbmF0ZXNcbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoc3RhcnRQb2ludCwgbGVuZ3RoKSA9PiB7XG4gICAgICAgIHdoaWxlIChsZW5ndGgpIHtcbiAgICAgICAgICAgIHNoaXBDb29yZHMucHVzaChzdGFydFBvaW50KTtcbiAgICAgICAgICAgIHN0YXJ0UG9pbnQrKztcbiAgICAgICAgICAgIGxlbmd0aC0tO1xuICAgICAgICB9O1xuICAgICAgICAvL2NvbnNvbGUubG9nKHNoaXBDb29yZHMpO1xuICAgICAgICAvL1JlbmRlciBzaGlwcyBpbiBVSVxuICAgICAgICByZXR1cm4gc2hpcENvb3JkcywgZGlzcGxheVNoaXBzKHNoaXBDb29yZHMpO1xuICAgIH07XG5cbiAgICAvL0RldGVybWluZXMgd2hldGhlciBvciBub3QgYSBzaGlwIGlzIGhpdCBhdCBhIGxvY2F0aW9uLiBJZiBoaXQsIGl0ICdoaXRzJyB0aGUgc2hpcCwgb3IgcmVjb3JkcyBsb2NhdGlvbiBvZiBtaXNzZWQgc2hvdFxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAobG9jYXRpb24pID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhsb2NhdGlvbik7IHdvcmtzXG4gICAgICAgIC8vY29uc29sZS5sb2coc2hpcENvb3Jkcyk7XG4gICAgICAgIC8vc2hpcCBjb29yZHMgYXJlIG5vdCBhdmFpbGFibGUgaW4gdGhpcyBmdW5jdGlvbiBmb3Igc29tZSByZWFzb24uLi4uIGNhbnQgZGV0ZXJtaW5lIHdoeVxuXG4gICAgICAgIC8vRGV0ZXJtaW5lcyBpZiBhIHNoaXAgaXMgaGl0XG4gICAgICAgIGxldCBoaXRTaGlwID0gc2hpcENvb3Jkcy5maWx0ZXIobG9jID0+IGxvYyA9PT0gbG9jYXRpb24pO1xuXG4gICAgICAgIC8vSWYgYSBzaGlwIHdhcyBoaXQsIHNlbmQgaGl0IHRvIHNoaXAgYW5kIHJlY29yZCBsb2NhdGlvblxuICAgICAgICBpZiAoaGl0U2hpcC5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgaGl0Q29vcmRzLnB1c2gobG9jYXRpb24pO1xuICAgICAgICAgICAgZGlzcGxheUhpdHMoaGl0Q29vcmRzKTtcbiAgICAgICAgICAgIHJldHVybiBTaGlwKCkuaGl0KDEpO1xuICAgICAgICB9XG4gICAgICAgIC8vaG93IHRvIGVuc3VyZSB0aGUgY29ycmVjdCBzaGlwIHJlY29yZHMgYSBoaXQ/XlxuXG4gICAgICAgIC8vSWYgc2hpcCBpcyBub3QgaGl0LCBhZGQgdG8gbWlzc2VkU2hvdHNcbiAgICAgICAgbWlzc2VkU2hvdHMucHVzaChsb2NhdGlvbik7XG5cbiAgICAgICAgLy9BZnRlciBhdHRhY2sgcmVjZWl2ZWQsIGNoZWNrIGZvciBnYW1lIG92ZXJcbiAgICAgICAgcmV0dXJuIGZpbmRTaGlwcygpO1xuICAgIH07XG5cbiAgICAvL0xvZyBvZiBtaXNzZWQgc2hvdHNcbiAgICBsZXQgbWlzc2VkU2hvdHMgPSBbXTtcblxuICAgIC8vRmluZHMgbm9uLXN1bmsgc2hpcHMgb24gYm9hcmQsIGlmIG5vbmUsIHJlcG9ydHMgZ2FtZSBvdmVyXG4gICAgY29uc3QgZmluZFNoaXBzID0gKCkgPT4ge1xuICAgICAgICBpZiAoc2hpcENvb3Jkcy5sZW5ndGggPT0gaGl0Q29vcmRzLmxlbmd0aCkgcmV0dXJuIFwiR2FtZSBvdmVyIVwiXG4gICAgfTtcblxuICAgIHJldHVybiB7IGdldE5hbWUsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgc2hpcENvb3JkcyB9O1xufTsqL1xuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsImltcG9ydCB7IGRpc3BsYXlCb2FyZCwgcmVtb3ZlRm9ybSwgZGlzcGxheU5hbWUgfSBmcm9tIFwiLi9ET01cIjtcbmltcG9ydCB7IFBsYXllciwgY29tcHV0ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpO1xubGV0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJyk7XG5cbnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBkaXNwbGF5TmFtZSgpO1xuICAgIGRpc3BsYXlCb2FyZCgncGxheWVyJyk7XG4gICAgZGlzcGxheUJvYXJkKCdjb21wdXRlcicpO1xuICAgIGdhbWVMb29wKG5hbWVJbnB1dC52YWx1ZSk7XG4gICAgcmVtb3ZlRm9ybSgpO1xufSk7XG5cbmNvbnN0IGdhbWVMb29wID0gKG5hbWUpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQobmFtZSk7IC8vbWF5YmUgZGVmaW5lIGluIGdhbWVib2FyZD9cbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gbmV3IEdhbWVib2FyZChcIkNvbXB1dGVyXCIpO1xuICAgIGNvbnN0IGh1bWFuID0gUGxheWVyKG5hbWUpO1xuICAgIGNvbnN0IGNvbXAgPSBjb21wdXRlcigpO1xuXG4gICAgLy9NYW51YWxseSBhZGRTaGlwcyBmb3Igbm93XG4gICAgZnVuY3Rpb24gcGxheWVyU2hpcHMoKSB7XG4gICAgICAgIGxldCBwbGF5ZXJCYXR0bGVzaGlwID0gbmV3IFNoaXAoNCwgXCJwbGF5ZXJCYXR0bGVzaGlwXCIpO1xuICAgICAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNTEsIDQsIFwicGxheWVyQmF0dGxlc2hpcFwiKTtcbiAgICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDI3LCAzLCBcInBsYXllckNydWlzZXIxXCIpO1xuICAgICAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoMSwgMywgXCJwbGF5ZXJDcnVpc2VyMlwiKTtcbiAgICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDg4LCAyLCBcInBsYXllclN1YjFcIik7XG4gICAgICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcCg5MSwgMiwgXCJwbGF5ZXJTdWIyXCIpO1xuICAgICAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoMzQsIDIsIFwicGxheWVyU3ViM1wiKTtcbiAgICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDY0LCAxLCBcInBsYXllckRlc3Ryb3llcjFcIik7XG4gICAgICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcCg0OSwgMSwgXCJwbGF5ZXJEZXN0cm95ZXIyXCIpO1xuICAgICAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNTAsIDEsIFwicGxheWVyRGVzdHJveWVyM1wiKTtcbiAgICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDc3LCAxLCBcInBsYXllckRlc3Ryb3llcjRcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHBsYXllckJvYXJkLnNoaXBDb29yZHMpO1xuICAgIH07XG4gICAgZnVuY3Rpb24gY29tcHV0ZXJTaGlwcygpIHtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoNTEsIDQpO1xuICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgyNywgMyk7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDEsIDMpO1xuICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg4OCwgMik7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDkxLCAyKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMzQsIDIpO1xuICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg2NCwgMSk7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDQ5LCAxKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoNTAsIDEpO1xuICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg3NywgMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmQuc2hpcENvb3Jkcyk7XG4gICAgfTtcbiAgICBwbGF5ZXJTaGlwcygpO1xuICAgIC8vY29tcHV0ZXJTaGlwcygpO1xuXG4gICAgLy9BZnRlciBzaGlwcyBhcmUgcGxhY2VkLCBhbGxvdyBwbGF5ZXJzIHRvIGF0dGFja1xuICAgIGNvbnN0IGF0dGFja0NvbXB1dGVyID0gKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBjb21wdXRlckJvYXJkLnJlY2VpdmVBdHRhY2sobG9jYXRpb24sICdib2FyZCBjb21wdXRlcicpO1xuICAgIH07XG5cbiAgICBjb25zdCBhdHRhY2tQbGF5ZXIgPSAobG9jYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIHBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2sobG9jYXRpb24sICdib2FyZCBwbGF5ZXInKTtcbiAgICB9O1xuXG4gICAgLy9hZGQgdHVybiBjb3VudGVyP1xuICAgIHJldHVybiB7IGF0dGFja0NvbXB1dGVyLCBhdHRhY2tQbGF5ZXIgfTtcbn1cblxuZXhwb3J0IHsgZ2FtZUxvb3AgfTtcbiIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuXG5jb25zdCBQbGF5ZXIgPSAobmFtZSkgPT4ge1xuICAgIGNvbnN0IGdldE5hbWUgPSBuYW1lO1xuXG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSAoKSA9PiB7XG4gICAgICAgIEdhbWVib2FyZCgpO1xuICAgIH1cblxuICAgIGNvbnN0IGF0dGFjayA9IChsb2NhdGlvbikgPT4ge1xuICAgICAgICBHYW1lYm9hcmQoKS5yZWNlaXZlQXR0YWNrKGxvY2F0aW9uKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgZ2V0TmFtZSwgcGxheWVyQm9hcmQsIGF0dGFjayB9O1xufTtcblxuY29uc3QgY29tcHV0ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvdG90eXBlID0gUGxheWVyKFwiQ29tcHV0ZXJcIik7XG5cbiAgICAvL1N0b3JlIHBsYXllZCBtb3ZlcyBmb3IgZnV0dXJlIHJlZmVyZW5jZVxuICAgIGxldCBvbGRNb3ZlcyA9IFtdO1xuXG4gICAgY29uc3QgcmFuZG9tTW92ZSA9ICgpID0+IHtcbiAgICAgICAgLy9HZW5lcmF0ZSBudW1iZXIgYmV0d2VlbiAwIC0gMTAwIFxuICAgICAgICBsZXQgbW92ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMSk7XG5cbiAgICAgICAgLy9DaGVja2luZyB0aGF0IHRoZSByYW5kb20gbW92ZSBpcyBub3QgY29udGFpbmVkIGluIHRoZSBvbGRNb3ZlcyBhcnJheVxuICAgICAgICBpZiAob2xkTW92ZXMuZmlsdGVyKGxvYyA9PiBsb2MgPT09IG1vdmUpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vQ2FsbCBpdHNlbGYgdG8gbWFrZSBhbm90aGVyIG1vdmUgaWYgdGhlIHJhbmRvbSBtb3ZlIGlzIGlsbGVnYWxcbiAgICAgICAgICAgIHJldHVybiByYW5kb21Nb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0Fzc3VtaW5nIG1vdmUgaXMgbGVnYWwsIGFkZCBpdCB0byB0aGUgb2xkTW92ZXMgYXJyYXksIGNhbGwgUGxheWVyKCkuYXR0YWNrKG1vdmUpO1xuICAgICAgICBvbGRNb3Zlcy5wdXNoKG1vdmUpO1xuICAgICAgICByZXR1cm4gcHJvdG90eXBlKCkuYXR0YWNrKG1vdmUpO1xuICAgIH07XG59XG5cbi8vbW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXI7XG5leHBvcnQgeyBQbGF5ZXIsIGNvbXB1dGVyIH07XG4iLCJjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihsZW5ndGgsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIC8vU2hpcHMgaW5pdGlhbGl6ZSB3aXRoIDAgaGl0c1xuICAgICAgICB0aGlzLmhpdE51bWJlciA9IDA7XG4gICAgICAgIHRoaXMuY29vcmRzID0gW107XG4gICAgfVxuXG4gICAgbGVuZ3RoT2ZTaGlwID0gKCkgPT4gdGhpcy5sZW5ndGg7XG5cbiAgICBjdXJyZW50SGl0cyA9ICgpID0+IHRoaXMuaGl0TnVtYmVyO1xuXG4gICAgLy9JbmNyZWFzZSB0aGUgaGl0TnVtYmVyIGZvciBhIHNoaXBcbiAgICBoaXQgPSAoaGl0KSA9PiB7XG4gICAgICAgIGlmIChoaXQgPT0gdHJ1ZSkgcmV0dXJuIHRoaXMuaGl0TnVtYmVyKys7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaGl0TnVtYmVyO1xuICAgIH07XG5cbiAgICAvL0NoZWNrIGlmIHRoZSBzaGlwIGhhcyBiZWVuIHN1bmsgYnkgY29tcGFyaW5nIGhpdE51bWJlciB0byBsZW5ndGhcbiAgICBpc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmhpdE51bWJlciA8IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICB9O1xufTtcbi8qXG5jb25zdCBTaGlwID0gbGVuZ3RoID0+IHtcbiAgICAvL0xlbmd0aCBvZiB0aGUgc2hpcFxuICAgIGNvbnN0IGxlbmd0aE9mU2hpcCA9ICgpID0+IGxlbmd0aDtcbiAgICBcbiAgICAvL1NoaXBzIGluaXRpYWxpemUgd2l0aCAwIGhpdHNcbiAgICBsZXQgaGl0TnVtYmVyID0gMDtcblxuICAgIC8vRnVuY3Rpb24gdG8gaW5jcmVhc2UgdGhlIGhpdE51bWJlciBmb3IgYSBzaGlwXG4gICAgY29uc3QgaGl0ID0gKGhpdCkgPT4ge1xuICAgICAgICBpZiAoaGl0ID09IHRydWUpIHJldHVybiBoaXROdW1iZXIrKztcblxuICAgICAgICByZXR1cm4gaGl0TnVtYmVyO1xuICAgIH07XG5cbiAgICAvL0NoZWNrIGlmIHRoZSBzaGlwIGhhcyBiZWVuIHN1bmsgYnkgY29tcGFyaW5nIGhpdE51bWJlciB0byBsZW5ndGhcbiAgICBjb25zdCBpc1N1bmsgPSAoaGl0TnVtYmVyLCBsZW5ndGgpID0+IHtcbiAgICAgICAgaWYgKGhpdE51bWJlciA8IGxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfTtcblxuICAgIHJldHVybiB7IGlzU3VuayB9O1xufTtcbiovXG4vL21vZHVsZS5leHBvcnRzID0gU2hpcDtcbmV4cG9ydCB7IFNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
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

function displayShips(locations) {
    while (locations.length > 0) {
        document.getElementById(`${locations[0]}`).classList.add('ship');
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
    placeShip = (startPoint, length) => {
        while (length) {
            this.shipCoords.push(startPoint);//shipCoords not a master list
            startPoint++;
            length--;
        };
        
        return (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.displayShips)(this.shipCoords);
    };

    receiveAttack = (location) => {
        //Determines if a ship is hit
        if (document.getElementById(`${location}`).classList.contains('ship')) {
            //If a ship was hit, send hit to ship and record location
            this.hitCoords.push(location);
            (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.displayHits)(this.hitCoords);
            return (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship)().hit(1); //need to make instances of ships
        } else {
            //If ship is not hit, add to missedShots
            this.missedShots.push(location);
        }

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



//const displayBoard = require('./DOM');

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
        playerBoard.placeShip(51, 4);
        playerBoard.placeShip(27, 3);
        playerBoard.placeShip(1, 3);
        playerBoard.placeShip(88, 2);
        playerBoard.placeShip(91, 2);
        playerBoard.placeShip(34, 2);
        playerBoard.placeShip(64, 1);
        playerBoard.placeShip(49, 1);
        playerBoard.placeShip(50, 1);
        playerBoard.placeShip(77, 1);
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
    computerShips();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O0FBRUE7QUFDNEI7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGFBQWE7QUFDYjs7QUFFQTtBQUNnQjs7Ozs7OztVQ3pCaEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvRE9NLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBnYW1lTG9vcCB9IGZyb20gXCIuL2luZGV4XCI7XG4vL2NvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcbmNvbnN0IHBsYXllckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXJEaXYnKTtcbmNvbnN0IGNvbXB1dGVyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbXB1dGVyRGl2Jyk7XG5sZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybVwiKTtcbmxldCBuYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZScpO1xuXG5jb25zdCBkaXNwbGF5Qm9hcmQgPSAocGxheWVyKSA9PiB7XG4gICAgLy9EZXRlcm1pbmUgd2hvc2UgYm9hcmQgaXRcbiAgICBsZXQgcGFyZW50RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cGxheWVyfURpdmApO1xuICAgIFxuICAgIC8vQ3JlYXRlIGJvYXJkIGNvbnRhaW5lclxuICAgIGxldCBib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJvYXJkQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdib2FyZENvbnRhaW5lcic7XG5cbiAgICAvL0NyZWF0ZSBib2FyZCBvZiAxMDAgZGl2aXNpb25zXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMDE7IGkrKykge1xuICAgICAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIC8vU2V0IGVhY2ggc3F1YXJlJ3MgSUQgdG8gaSBzbyB0aGV5J3JlIG51bWJlcmVkIDEgLSAxMDBcbiAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2l9YCk7XG4gICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBcImJvYXJkXCI7XG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgLy9DaGVjayBmb3Igd2hvIHRvIHNlbmQgYW4gYXR0YWNrIHRvXG4gICAgICAgICAgICBpZiAocGFyZW50RGl2LmlkID09IFwiY29tcHV0ZXJEaXZcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiAgZ2FtZUxvb3AoKS5hdHRhY2tDb21wdXRlcihpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdhbWVMb29wKCkuYXR0YWNrUGxheWVyKGkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfTtcbiAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQoYm9hcmRDb250YWluZXIpO1xuXG4gICAgcmV0dXJuO1xufTtcblxuZnVuY3Rpb24gcmVtb3ZlRm9ybSgpIHtcbiAgICBmb3JtLnJlbW92ZSgpO1xufTtcblxuZnVuY3Rpb24gZGlzcGxheU5hbWUoKSB7IFxuICAgIHBsYXllckRpdi5pbm5lclRleHQgPSBgJHtuYW1lSW5wdXQudmFsdWV9YDtcbiAgICBjb21wdXRlckRpdi5pbm5lclRleHQgPSBcIkNvbXB1dGVyXCI7XG4gICAgcmV0dXJuXG59O1xuXG5mdW5jdGlvbiBkaXNwbGF5U2hpcHMobG9jYXRpb25zKSB7XG4gICAgd2hpbGUgKGxvY2F0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2xvY2F0aW9uc1swXX1gKS5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgIGxvY2F0aW9ucy5zaGlmdCgpO1xuICAgIH07XG4gICAgcmV0dXJuXG59O1xuXG5mdW5jdGlvbiBkaXNwbGF5SGl0cyhsb2NhdGlvbnMpIHtcbiAgICB3aGlsZSAobG9jYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy9Ub2dnbGUgb2ZmIHNoaXAgY2xhc3NcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bG9jYXRpb25zWzBdfWApLmNsYXNzTGlzdC50b2dnbGUoJ3NoaXAnKTtcbiAgICAgICAgLy9BZGQgaGl0IGNsYXNzIFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtsb2NhdGlvbnNbMF19YCkuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG5cbiAgICAgICAgbG9jYXRpb25zLnNoaWZ0KCk7XG4gICAgfTtcbiAgICByZXR1cm4gXG59O1xuXG4vL21vZHVsZS5leHBvcnRzID0gZGlzcGxheUJvYXJkO1xuZXhwb3J0IHsgZGlzcGxheUJvYXJkLCByZW1vdmVGb3JtLCBkaXNwbGF5TmFtZSwgZGlzcGxheVNoaXBzLCBkaXNwbGF5SGl0cyB9O1xuIiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXAuanNcIjtcbmltcG9ydCB7IGRpc3BsYXlTaGlwcywgZGlzcGxheUhpdHMgfSBmcm9tIFwiLi9ET01cIlxuXG5jbGFzcyBHYW1lYm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jb29yZGluYXRlcyA9IFtcbiAgICAgICAgICAgIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLFxuICAgICAgICAgICAgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOSwgMjAsXG4gICAgICAgICAgICAyMSwgMjIsIDIzLCAyNCwgMjUsIDI2LCAyNywgMjgsIDI5LCAzMCxcbiAgICAgICAgICAgIDMxLCAzMiwgMzMsIDM0LCAzNSwgMzYsIDM3LCAzOCwgMzksIDQwLFxuICAgICAgICAgICAgNDEsIDQyLCA0MywgNDQsIDQ1LCA0NiwgNDcsIDQ4LCA0OSwgNTAsXG4gICAgICAgICAgICA1MSwgNTIsIDUzLCA1NCwgNTUsIDU2LCA1NywgNTgsIDU5LCA2MCxcbiAgICAgICAgICAgIDYxLCA2MiwgNjMsIDY0LCA2NSwgNjYsIDY3LCA2OCwgNjksIDcwLFxuICAgICAgICAgICAgNzEsIDcyLCA3MywgNzQsIDc1LCA3NiwgNzcsIDc4LCA3OSwgODAsXG4gICAgICAgICAgICA4MSwgODIsIDgzLCA4NCwgODUsIDg2LCA4NywgODgsIDg5LCA5MCxcbiAgICAgICAgICAgIDkxLCA5MiwgOTMsIDk0LCA5NSwgOTYsIDk3LCA5OCwgOTksIDEwMCxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5zaGlwQ29vcmRzID0gW107XG4gICAgICAgIHRoaXMuaGl0Q29vcmRzID0gW107XG4gICAgICAgIHRoaXMubWlzc2VkU2hvdHMgPSBbXTtcbiAgICB9XG5cbiAgICAvL1BsYWNlIHNoaXBzIGF0IHNwZWNpZmljIGNvb3JkaW5hdGVzXG4gICAgcGxhY2VTaGlwID0gKHN0YXJ0UG9pbnQsIGxlbmd0aCkgPT4ge1xuICAgICAgICB3aGlsZSAobGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNoaXBDb29yZHMucHVzaChzdGFydFBvaW50KTsvL3NoaXBDb29yZHMgbm90IGEgbWFzdGVyIGxpc3RcbiAgICAgICAgICAgIHN0YXJ0UG9pbnQrKztcbiAgICAgICAgICAgIGxlbmd0aC0tO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGRpc3BsYXlTaGlwcyh0aGlzLnNoaXBDb29yZHMpO1xuICAgIH07XG5cbiAgICByZWNlaXZlQXR0YWNrID0gKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIC8vRGV0ZXJtaW5lcyBpZiBhIHNoaXAgaXMgaGl0XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtsb2NhdGlvbn1gKS5jbGFzc0xpc3QuY29udGFpbnMoJ3NoaXAnKSkge1xuICAgICAgICAgICAgLy9JZiBhIHNoaXAgd2FzIGhpdCwgc2VuZCBoaXQgdG8gc2hpcCBhbmQgcmVjb3JkIGxvY2F0aW9uXG4gICAgICAgICAgICB0aGlzLmhpdENvb3Jkcy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGRpc3BsYXlIaXRzKHRoaXMuaGl0Q29vcmRzKTtcbiAgICAgICAgICAgIHJldHVybiBTaGlwKCkuaGl0KDEpOyAvL25lZWQgdG8gbWFrZSBpbnN0YW5jZXMgb2Ygc2hpcHNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vSWYgc2hpcCBpcyBub3QgaGl0LCBhZGQgdG8gbWlzc2VkU2hvdHNcbiAgICAgICAgICAgIHRoaXMubWlzc2VkU2hvdHMucHVzaChsb2NhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0FmdGVyIGF0dGFjayByZWNlaXZlZCwgY2hlY2sgZm9yIGdhbWUgb3ZlclxuICAgICAgICByZXR1cm4gdGhpcy5maW5kU2hpcHMoKTtcbiAgICB9O1xuXG4gICAgLy9GaW5kcyBub24tc3VuayBzaGlwcyBvbiBib2FyZCwgaWYgbm9uZSwgcmVwb3J0cyBnYW1lIG92ZXJcbiAgICBmaW5kU2hpcHMgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNoaXBDb29yZHMubGVuZ3RoID09IHRoaXMuaGl0Q29vcmRzLmxlbmd0aCkgcmV0dXJuIFwiR2FtZSBvdmVyIVwiXG4gICAgfTsgLy9uZWVkIHRvIGZpeFxufTtcblxuLypjb25zdCBHYW1lYm9hcmQgPSAobmFtZSkgPT4ge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW1xuICAgICAgICAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCxcbiAgICAgICAgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOSwgMjAsXG4gICAgICAgIDIxLCAyMiwgMjMsIDI0LCAyNSwgMjYsIDI3LCAyOCwgMjksIDMwLFxuICAgICAgICAzMSwgMzIsIDMzLCAzNCwgMzUsIDM2LCAzNywgMzgsIDM5LCA0MCxcbiAgICAgICAgNDEsIDQyLCA0MywgNDQsIDQ1LCA0NiwgNDcsIDQ4LCA0OSwgNTAsXG4gICAgICAgIDUxLCA1MiwgNTMsIDU0LCA1NSwgNTYsIDU3LCA1OCwgNTksIDYwLFxuICAgICAgICA2MSwgNjIsIDYzLCA2NCwgNjUsIDY2LCA2NywgNjgsIDY5LCA3MCxcbiAgICAgICAgNzEsIDcyLCA3MywgNzQsIDc1LCA3NiwgNzcsIDc4LCA3OSwgODAsXG4gICAgICAgIDgxLCA4MiwgODMsIDg0LCA4NSwgODYsIDg3LCA4OCwgODksIDkwLFxuICAgICAgICA5MSwgOTIsIDkzLCA5NCwgOTUsIDk2LCA5NywgOTgsIDk5LCAxMDAsXG4gICAgXTtcblxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuXG4gICAgbGV0IHNoaXBDb29yZHMgPSBbXTtcbiAgICBsZXQgaGl0Q29vcmRzID0gW107XG5cbiAgICAvL1BsYWNlIHNoaXBzIGF0IHNwZWNpZmljIGNvb3JkaW5hdGVzXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHN0YXJ0UG9pbnQsIGxlbmd0aCkgPT4ge1xuICAgICAgICB3aGlsZSAobGVuZ3RoKSB7XG4gICAgICAgICAgICBzaGlwQ29vcmRzLnB1c2goc3RhcnRQb2ludCk7XG4gICAgICAgICAgICBzdGFydFBvaW50Kys7XG4gICAgICAgICAgICBsZW5ndGgtLTtcbiAgICAgICAgfTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhzaGlwQ29vcmRzKTtcbiAgICAgICAgLy9SZW5kZXIgc2hpcHMgaW4gVUlcbiAgICAgICAgcmV0dXJuIHNoaXBDb29yZHMsIGRpc3BsYXlTaGlwcyhzaGlwQ29vcmRzKTtcbiAgICB9O1xuXG4gICAgLy9EZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IGEgc2hpcCBpcyBoaXQgYXQgYSBsb2NhdGlvbi4gSWYgaGl0LCBpdCAnaGl0cycgdGhlIHNoaXAsIG9yIHJlY29yZHMgbG9jYXRpb24gb2YgbWlzc2VkIHNob3RcbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2cobG9jYXRpb24pOyB3b3Jrc1xuICAgICAgICAvL2NvbnNvbGUubG9nKHNoaXBDb29yZHMpO1xuICAgICAgICAvL3NoaXAgY29vcmRzIGFyZSBub3QgYXZhaWxhYmxlIGluIHRoaXMgZnVuY3Rpb24gZm9yIHNvbWUgcmVhc29uLi4uLiBjYW50IGRldGVybWluZSB3aHlcblxuICAgICAgICAvL0RldGVybWluZXMgaWYgYSBzaGlwIGlzIGhpdFxuICAgICAgICBsZXQgaGl0U2hpcCA9IHNoaXBDb29yZHMuZmlsdGVyKGxvYyA9PiBsb2MgPT09IGxvY2F0aW9uKTtcblxuICAgICAgICAvL0lmIGEgc2hpcCB3YXMgaGl0LCBzZW5kIGhpdCB0byBzaGlwIGFuZCByZWNvcmQgbG9jYXRpb25cbiAgICAgICAgaWYgKGhpdFNoaXAubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgIGhpdENvb3Jkcy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGRpc3BsYXlIaXRzKGhpdENvb3Jkcyk7XG4gICAgICAgICAgICByZXR1cm4gU2hpcCgpLmhpdCgxKTtcbiAgICAgICAgfVxuICAgICAgICAvL2hvdyB0byBlbnN1cmUgdGhlIGNvcnJlY3Qgc2hpcCByZWNvcmRzIGEgaGl0P15cblxuICAgICAgICAvL0lmIHNoaXAgaXMgbm90IGhpdCwgYWRkIHRvIG1pc3NlZFNob3RzXG4gICAgICAgIG1pc3NlZFNob3RzLnB1c2gobG9jYXRpb24pO1xuXG4gICAgICAgIC8vQWZ0ZXIgYXR0YWNrIHJlY2VpdmVkLCBjaGVjayBmb3IgZ2FtZSBvdmVyXG4gICAgICAgIHJldHVybiBmaW5kU2hpcHMoKTtcbiAgICB9O1xuXG4gICAgLy9Mb2cgb2YgbWlzc2VkIHNob3RzXG4gICAgbGV0IG1pc3NlZFNob3RzID0gW107XG5cbiAgICAvL0ZpbmRzIG5vbi1zdW5rIHNoaXBzIG9uIGJvYXJkLCBpZiBub25lLCByZXBvcnRzIGdhbWUgb3ZlclxuICAgIGNvbnN0IGZpbmRTaGlwcyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHNoaXBDb29yZHMubGVuZ3RoID09IGhpdENvb3Jkcy5sZW5ndGgpIHJldHVybiBcIkdhbWUgb3ZlciFcIlxuICAgIH07XG5cbiAgICByZXR1cm4geyBnZXROYW1lLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIHNoaXBDb29yZHMgfTtcbn07Ki9cblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCJpbXBvcnQgeyBkaXNwbGF5Qm9hcmQsIHJlbW92ZUZvcm0sIGRpc3BsYXlOYW1lIH0gZnJvbSBcIi4vRE9NXCI7XG5pbXBvcnQgeyBQbGF5ZXIsIGNvbXB1dGVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbi8vY29uc3QgZGlzcGxheUJvYXJkID0gcmVxdWlyZSgnLi9ET00nKTtcblxuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpO1xubGV0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJyk7XG5cbnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBkaXNwbGF5TmFtZSgpO1xuICAgIGRpc3BsYXlCb2FyZCgncGxheWVyJyk7XG4gICAgZGlzcGxheUJvYXJkKCdjb21wdXRlcicpO1xuICAgIGdhbWVMb29wKG5hbWVJbnB1dC52YWx1ZSk7XG4gICAgcmVtb3ZlRm9ybSgpO1xufSk7XG5cbmNvbnN0IGdhbWVMb29wID0gKG5hbWUpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQobmFtZSk7IC8vbWF5YmUgZGVmaW5lIGluIGdhbWVib2FyZD9cbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gbmV3IEdhbWVib2FyZChcIkNvbXB1dGVyXCIpO1xuICAgIGNvbnN0IGh1bWFuID0gUGxheWVyKG5hbWUpO1xuICAgIGNvbnN0IGNvbXAgPSBjb21wdXRlcigpO1xuXG4gICAgLy9NYW51YWxseSBhZGRTaGlwcyBmb3Igbm93XG4gICAgZnVuY3Rpb24gcGxheWVyU2hpcHMoKSB7XG4gICAgICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcCg1MSwgNCk7XG4gICAgICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcCgyNywgMyk7XG4gICAgICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcCgxLCAzKTtcbiAgICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDg4LCAyKTtcbiAgICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDkxLCAyKTtcbiAgICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDM0LCAyKTtcbiAgICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDY0LCAxKTtcbiAgICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDQ5LCAxKTtcbiAgICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDUwLCAxKTtcbiAgICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDc3LCAxKTtcbiAgICAgICAgY29uc29sZS5sb2cocGxheWVyQm9hcmQuc2hpcENvb3Jkcyk7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBjb21wdXRlclNoaXBzKCkge1xuICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg1MSwgNCk7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDI3LCAzKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMSwgMyk7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDg4LCAyKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoOTEsIDIpO1xuICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgzNCwgMik7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDY0LCAxKTtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoNDksIDEpO1xuICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg1MCwgMSk7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDc3LCAxKTtcbiAgICAgICAgY29uc29sZS5sb2coY29tcHV0ZXJCb2FyZC5zaGlwQ29vcmRzKTtcbiAgICB9O1xuICAgIHBsYXllclNoaXBzKCk7XG4gICAgY29tcHV0ZXJTaGlwcygpO1xuXG4gICAgLy9BZnRlciBzaGlwcyBhcmUgcGxhY2VkLCBhbGxvdyBwbGF5ZXJzIHRvIGF0dGFja1xuICAgIGNvbnN0IGF0dGFja0NvbXB1dGVyID0gKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBjb21wdXRlckJvYXJkLnJlY2VpdmVBdHRhY2sobG9jYXRpb24pO1xuICAgIH07XG5cbiAgICBjb25zdCBhdHRhY2tQbGF5ZXIgPSAobG9jYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIHBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2sobG9jYXRpb24pO1xuICAgIH07XG5cbiAgICAvL2FkZCB0dXJuIGNvdW50ZXI/XG4gICAgcmV0dXJuIHsgYXR0YWNrQ29tcHV0ZXIsIGF0dGFja1BsYXllciB9O1xufVxuXG5leHBvcnQgeyBnYW1lTG9vcCB9O1xuIiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5cbmNvbnN0IFBsYXllciA9IChuYW1lKSA9PiB7XG4gICAgY29uc3QgZ2V0TmFtZSA9IG5hbWU7XG5cbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9ICgpID0+IHtcbiAgICAgICAgR2FtZWJvYXJkKCk7XG4gICAgfVxuXG4gICAgY29uc3QgYXR0YWNrID0gKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIEdhbWVib2FyZCgpLnJlY2VpdmVBdHRhY2sobG9jYXRpb24pO1xuICAgIH07XG5cbiAgICByZXR1cm4geyBnZXROYW1lLCBwbGF5ZXJCb2FyZCwgYXR0YWNrIH07XG59O1xuXG5jb25zdCBjb21wdXRlciA9ICgpID0+IHtcbiAgICBjb25zdCBwcm90b3R5cGUgPSBQbGF5ZXIoXCJDb21wdXRlclwiKTtcblxuICAgIC8vU3RvcmUgcGxheWVkIG1vdmVzIGZvciBmdXR1cmUgcmVmZXJlbmNlXG4gICAgbGV0IG9sZE1vdmVzID0gW107XG5cbiAgICBjb25zdCByYW5kb21Nb3ZlID0gKCkgPT4ge1xuICAgICAgICAvL0dlbmVyYXRlIG51bWJlciBiZXR3ZWVuIDAgLSAxMDAgXG4gICAgICAgIGxldCBtb3ZlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAxKTtcblxuICAgICAgICAvL0NoZWNraW5nIHRoYXQgdGhlIHJhbmRvbSBtb3ZlIGlzIG5vdCBjb250YWluZWQgaW4gdGhlIG9sZE1vdmVzIGFycmF5XG4gICAgICAgIGlmIChvbGRNb3Zlcy5maWx0ZXIobG9jID0+IGxvYyA9PT0gbW92ZSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy9DYWxsIGl0c2VsZiB0byBtYWtlIGFub3RoZXIgbW92ZSBpZiB0aGUgcmFuZG9tIG1vdmUgaXMgaWxsZWdhbFxuICAgICAgICAgICAgcmV0dXJuIHJhbmRvbU1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQXNzdW1pbmcgbW92ZSBpcyBsZWdhbCwgYWRkIGl0IHRvIHRoZSBvbGRNb3ZlcyBhcnJheSwgY2FsbCBQbGF5ZXIoKS5hdHRhY2sobW92ZSk7XG4gICAgICAgIG9sZE1vdmVzLnB1c2gobW92ZSk7XG4gICAgICAgIHJldHVybiBwcm90b3R5cGUoKS5hdHRhY2sobW92ZSk7XG4gICAgfTtcbn1cblxuLy9tb2R1bGUuZXhwb3J0cyA9IFBsYXllcjtcbmV4cG9ydCB7IFBsYXllciwgY29tcHV0ZXIgfTtcbiIsImNvbnN0IFNoaXAgPSBsZW5ndGggPT4ge1xuICAgIC8vTGVuZ3RoIG9mIHRoZSBzaGlwXG4gICAgY29uc3QgbGVuZ3RoT2ZTaGlwID0gKCkgPT4gbGVuZ3RoO1xuICAgIFxuICAgIC8vU2hpcHMgaW5pdGlhbGl6ZSB3aXRoIDAgaGl0c1xuICAgIGxldCBoaXROdW1iZXIgPSAwO1xuXG4gICAgLy9GdW5jdGlvbiB0byBpbmNyZWFzZSB0aGUgaGl0TnVtYmVyIGZvciBhIHNoaXBcbiAgICBjb25zdCBoaXQgPSAoaGl0KSA9PiB7XG4gICAgICAgIGlmIChoaXQgPT0gdHJ1ZSkgcmV0dXJuIGhpdE51bWJlcisrO1xuXG4gICAgICAgIHJldHVybiBoaXROdW1iZXI7XG4gICAgfTtcblxuICAgIC8vQ2hlY2sgaWYgdGhlIHNoaXAgaGFzIGJlZW4gc3VuayBieSBjb21wYXJpbmcgaGl0TnVtYmVyIHRvIGxlbmd0aFxuICAgIGNvbnN0IGlzU3VuayA9IChoaXROdW1iZXIsIGxlbmd0aCkgPT4ge1xuICAgICAgICBpZiAoaGl0TnVtYmVyIDwgbGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgaXNTdW5rIH07XG59O1xuXG4vL21vZHVsZS5leHBvcnRzID0gU2hpcDtcbmV4cG9ydCB7IFNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
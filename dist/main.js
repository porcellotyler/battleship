/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayBoard": () => (/* binding */ displayBoard),
/* harmony export */   "displayName": () => (/* binding */ displayName),
/* harmony export */   "removeForm": () => (/* binding */ removeForm)
/* harmony export */ });
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
}

//module.exports = displayBoard;



/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ship_js__WEBPACK_IMPORTED_MODULE_0__);


const Gameboard = (name) => {
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
            shipCoords.push(startPoint)
            startPoint++;
            length--;
        };
        return shipCoords;
    };

    //Determines whether or not a ship is hit at a location. If hit, it 'hits' the ship, or records location of missed shot
    const receiveAttack = (location) => {
        //Determines if a ship is hit
        let hitShip = shipCoords.filter(loc => loc === location);

        //If a ship was hit, send hit to ship and record location
        if (hitShip.length != 0) {
            hitCoords.push(location);
            return (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship)().hit(1);
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

    return { getName, placeShip };
}

//module.exports = Gameboard;

//game board is 10x10 - spaces numbered 0 - 100? 
//create game board in DOM in sep DOM module


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/***/ ((module) => {

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

module.exports = Ship;


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
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
    gameLoop(nameInput.innerText);
    (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.removeForm)();
});

function gameLoop(name) {
    const playerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_2__.Gameboard)(name);
    const computerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_2__.Gameboard)("Computer");
    const human = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)(name);
    const comp = (0,_player__WEBPACK_IMPORTED_MODULE_1__.computer)();

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
}

//4 1s
//3 2s
//2 3s
//1 4
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0NBQStDLE9BQU87O0FBRXREO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQSxxQ0FBcUMsRUFBRTtBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QixnQkFBZ0I7QUFDN0M7QUFDQTs7QUFFQTtBQUNpRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckNoQjs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDhDQUFJO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7O0FBRUE7QUFDcUI7QUFDckI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEUyQzs7QUFFM0M7QUFDQTs7QUFFQTtBQUNBLFFBQVEsd0RBQVM7QUFDakI7O0FBRUE7QUFDQSxRQUFRLHlEQUFTO0FBQ2pCOztBQUVBLGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUM0Qjs7Ozs7Ozs7Ozs7QUN2QzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7O0FBRUE7Ozs7Ozs7VUN4QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ044RDtBQUNsQjtBQUNKO0FBQ3hDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLGlEQUFXO0FBQ2YsSUFBSSxrREFBWTtBQUNoQixJQUFJLGtEQUFZO0FBQ2hCO0FBQ0EsSUFBSSxnREFBVTtBQUNkLENBQUM7O0FBRUQ7QUFDQSx3QkFBd0IscURBQVM7QUFDakMsMEJBQTBCLHFEQUFTO0FBQ25DLGtCQUFrQiwrQ0FBTTtBQUN4QixpQkFBaUIsaURBQVE7O0FBRXpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvRE9NLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xuY29uc3QgcGxheWVyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllckRpdicpO1xuY29uc3QgY29tcHV0ZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcHV0ZXJEaXYnKTtcbmxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtXCIpO1xubGV0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJyk7XG5cbmNvbnN0IGRpc3BsYXlCb2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgICAvL0RldGVybWluZSB3aG9zZSBib2FyZCBpdFxuICAgIGxldCBwYXJlbnREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwbGF5ZXJ9RGl2YCk7XG5cbiAgICAvL0NyZWF0ZSBib2FyZCBjb250YWluZXJcbiAgICBsZXQgYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBib2FyZENvbnRhaW5lci5jbGFzc05hbWUgPSAnYm9hcmRDb250YWluZXInO1xuXG4gICAgLy9DcmVhdGUgYm9hcmQgb2YgMTAwIGRpdmlzaW9uc1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMTAxOyBpKyspIHtcbiAgICAgICAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAvL1NldCBlYWNoIHNxdWFyZSdzIElEIHRvIGkgc28gdGhleSdyZSBudW1iZXJlZCAxIC0gMTAwXG4gICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpfWApO1xuICAgICAgICBzcXVhcmUuY2xhc3NOYW1lID0gXCJib2FyZFwiO1xuICAgICAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH07XG4gICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKGJvYXJkQ29udGFpbmVyKTtcblxuICAgIHJldHVybjtcbn07XG5cbmZ1bmN0aW9uIHJlbW92ZUZvcm0oKSB7XG4gICAgZm9ybS5yZW1vdmUoKTtcbn07XG5cbmZ1bmN0aW9uIGRpc3BsYXlOYW1lKCkgeyBcbiAgICBwbGF5ZXJEaXYuaW5uZXJUZXh0ID0gYCR7bmFtZUlucHV0LnZhbHVlfWA7XG4gICAgY29tcHV0ZXJEaXYuaW5uZXJUZXh0ID0gXCJDb21wdXRlclwiO1xufVxuXG4vL21vZHVsZS5leHBvcnRzID0gZGlzcGxheUJvYXJkO1xuZXhwb3J0IHsgZGlzcGxheUJvYXJkLCByZW1vdmVGb3JtLCBkaXNwbGF5TmFtZSB9O1xuIiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXAuanNcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gKG5hbWUpID0+IHtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IFtcbiAgICAgICAgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsXG4gICAgICAgIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTksIDIwLFxuICAgICAgICAyMSwgMjIsIDIzLCAyNCwgMjUsIDI2LCAyNywgMjgsIDI5LCAzMCxcbiAgICAgICAgMzEsIDMyLCAzMywgMzQsIDM1LCAzNiwgMzcsIDM4LCAzOSwgNDAsXG4gICAgICAgIDQxLCA0MiwgNDMsIDQ0LCA0NSwgNDYsIDQ3LCA0OCwgNDksIDUwLFxuICAgICAgICA1MSwgNTIsIDUzLCA1NCwgNTUsIDU2LCA1NywgNTgsIDU5LCA2MCxcbiAgICAgICAgNjEsIDYyLCA2MywgNjQsIDY1LCA2NiwgNjcsIDY4LCA2OSwgNzAsXG4gICAgICAgIDcxLCA3MiwgNzMsIDc0LCA3NSwgNzYsIDc3LCA3OCwgNzksIDgwLFxuICAgICAgICA4MSwgODIsIDgzLCA4NCwgODUsIDg2LCA4NywgODgsIDg5LCA5MCxcbiAgICAgICAgOTEsIDkyLCA5MywgOTQsIDk1LCA5NiwgOTcsIDk4LCA5OSwgMTAwLFxuICAgIF07XG5cbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcblxuICAgIGxldCBzaGlwQ29vcmRzID0gW107XG4gICAgbGV0IGhpdENvb3JkcyA9IFtdO1xuXG4gICAgLy9QbGFjZSBzaGlwcyBhdCBzcGVjaWZpYyBjb29yZGluYXRlc1xuICAgIGNvbnN0IHBsYWNlU2hpcCA9IChzdGFydFBvaW50LCBsZW5ndGgpID0+IHtcbiAgICAgICAgd2hpbGUgKGxlbmd0aCkge1xuICAgICAgICAgICAgc2hpcENvb3Jkcy5wdXNoKHN0YXJ0UG9pbnQpXG4gICAgICAgICAgICBzdGFydFBvaW50Kys7XG4gICAgICAgICAgICBsZW5ndGgtLTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHNoaXBDb29yZHM7XG4gICAgfTtcblxuICAgIC8vRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCBhIHNoaXAgaXMgaGl0IGF0IGEgbG9jYXRpb24uIElmIGhpdCwgaXQgJ2hpdHMnIHRoZSBzaGlwLCBvciByZWNvcmRzIGxvY2F0aW9uIG9mIG1pc3NlZCBzaG90XG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChsb2NhdGlvbikgPT4ge1xuICAgICAgICAvL0RldGVybWluZXMgaWYgYSBzaGlwIGlzIGhpdFxuICAgICAgICBsZXQgaGl0U2hpcCA9IHNoaXBDb29yZHMuZmlsdGVyKGxvYyA9PiBsb2MgPT09IGxvY2F0aW9uKTtcblxuICAgICAgICAvL0lmIGEgc2hpcCB3YXMgaGl0LCBzZW5kIGhpdCB0byBzaGlwIGFuZCByZWNvcmQgbG9jYXRpb25cbiAgICAgICAgaWYgKGhpdFNoaXAubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgIGhpdENvb3Jkcy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgICAgICAgIHJldHVybiBTaGlwKCkuaGl0KDEpO1xuICAgICAgICB9XG4gICAgICAgICAgICAvL2hvdyB0byBlbnN1cmUgdGhlIGNvcnJlY3Qgc2hpcCByZWNvcmRzIGEgaGl0P15cblxuICAgICAgICAvL0lmIHNoaXAgaXMgbm90IGhpdCwgYWRkIHRvIG1pc3NlZFNob3RzXG4gICAgICAgIG1pc3NlZFNob3RzLnB1c2gobG9jYXRpb24pO1xuXG4gICAgICAgIC8vQWZ0ZXIgYXR0YWNrIHJlY2VpdmVkLCBjaGVjayBmb3IgZ2FtZSBvdmVyXG4gICAgICAgIHJldHVybiBmaW5kU2hpcHMoKTtcbiAgICB9O1xuXG4gICAgLy9Mb2cgb2YgbWlzc2VkIHNob3RzXG4gICAgbGV0IG1pc3NlZFNob3RzID0gW107XG5cbiAgICAvL0ZpbmRzIG5vbi1zdW5rIHNoaXBzIG9uIGJvYXJkLCBpZiBub25lLCByZXBvcnRzIGdhbWUgb3ZlclxuICAgIGNvbnN0IGZpbmRTaGlwcyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHNoaXBDb29yZHMubGVuZ3RoID09IGhpdENvb3Jkcy5sZW5ndGgpIHJldHVybiBcIkdhbWUgb3ZlciFcIlxuICAgIH07XG5cbiAgICByZXR1cm4geyBnZXROYW1lLCBwbGFjZVNoaXAgfTtcbn1cblxuLy9tb2R1bGUuZXhwb3J0cyA9IEdhbWVib2FyZDtcbmV4cG9ydCB7IEdhbWVib2FyZCB9O1xuLy9nYW1lIGJvYXJkIGlzIDEweDEwIC0gc3BhY2VzIG51bWJlcmVkIDAgLSAxMDA/IFxuLy9jcmVhdGUgZ2FtZSBib2FyZCBpbiBET00gaW4gc2VwIERPTSBtb2R1bGVcbiIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuXG5jb25zdCBQbGF5ZXIgPSAobmFtZSkgPT4ge1xuICAgIGNvbnN0IGdldE5hbWUgPSBuYW1lO1xuXG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSAoKSA9PiB7XG4gICAgICAgIEdhbWVib2FyZCgpO1xuICAgIH1cblxuICAgIGNvbnN0IGF0dGFjayA9IChsb2NhdGlvbikgPT4ge1xuICAgICAgICBHYW1lYm9hcmQoKS5yZWNlaXZlQXR0YWNrKGxvY2F0aW9uKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgZ2V0TmFtZSwgcGxheWVyQm9hcmQsIGF0dGFjayB9O1xufTtcblxuY29uc3QgY29tcHV0ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvdG90eXBlID0gUGxheWVyKFwiQ29tcHV0ZXJcIik7XG5cbiAgICAvL1N0b3JlIHBsYXllZCBtb3ZlcyBmb3IgZnV0dXJlIHJlZmVyZW5jZVxuICAgIGxldCBvbGRNb3ZlcyA9IFtdO1xuXG4gICAgY29uc3QgcmFuZG9tTW92ZSA9ICgpID0+IHtcbiAgICAgICAgLy9HZW5lcmF0ZSBudW1iZXIgYmV0d2VlbiAwIC0gMTAwIFxuICAgICAgICBsZXQgbW92ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMSk7XG5cbiAgICAgICAgLy9DaGVja2luZyB0aGF0IHRoZSByYW5kb20gbW92ZSBpcyBub3QgY29udGFpbmVkIGluIHRoZSBvbGRNb3ZlcyBhcnJheVxuICAgICAgICBpZiAob2xkTW92ZXMuZmlsdGVyKGxvYyA9PiBsb2MgPT09IG1vdmUpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vQ2FsbCBpdHNlbGYgdG8gbWFrZSBhbm90aGVyIG1vdmUgaWYgdGhlIHJhbmRvbSBtb3ZlIGlzIGlsbGVnYWxcbiAgICAgICAgICAgIHJldHVybiByYW5kb21Nb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0Fzc3VtaW5nIG1vdmUgaXMgbGVnYWwsIGFkZCBpdCB0byB0aGUgb2xkTW92ZXMgYXJyYXksIGNhbGwgUGxheWVyKCkuYXR0YWNrKG1vdmUpO1xuICAgICAgICBvbGRNb3Zlcy5wdXNoKG1vdmUpO1xuICAgICAgICByZXR1cm4gcHJvdG90eXBlKCkuYXR0YWNrKG1vdmUpO1xuICAgIH07XG59XG5cbi8vbW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXI7XG5leHBvcnQgeyBQbGF5ZXIsIGNvbXB1dGVyIH07XG4iLCJjb25zdCBTaGlwID0gbGVuZ3RoID0+IHtcbiAgICAvL0xlbmd0aCBvZiB0aGUgc2hpcFxuICAgIGNvbnN0IGxlbmd0aE9mU2hpcCA9ICgpID0+IGxlbmd0aDtcbiAgICBcbiAgICAvL1NoaXBzIGluaXRpYWxpemUgd2l0aCAwIGhpdHNcbiAgICBsZXQgaGl0TnVtYmVyID0gMDtcblxuICAgIC8vRnVuY3Rpb24gdG8gaW5jcmVhc2UgdGhlIGhpdE51bWJlciBmb3IgYSBzaGlwXG4gICAgY29uc3QgaGl0ID0gKGhpdCkgPT4ge1xuICAgICAgICBpZiAoaGl0ID09IHRydWUpIHJldHVybiBoaXROdW1iZXIrKztcblxuICAgICAgICByZXR1cm4gaGl0TnVtYmVyO1xuICAgIH07XG5cbiAgICAvL0NoZWNrIGlmIHRoZSBzaGlwIGhhcyBiZWVuIHN1bmsgYnkgY29tcGFyaW5nIGhpdE51bWJlciB0byBsZW5ndGhcbiAgICBjb25zdCBpc1N1bmsgPSAoaGl0TnVtYmVyLCBsZW5ndGgpID0+IHtcbiAgICAgICAgaWYgKGhpdE51bWJlciA8IGxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfTtcblxuICAgIHJldHVybiB7IGlzU3VuayB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGRpc3BsYXlCb2FyZCwgcmVtb3ZlRm9ybSwgZGlzcGxheU5hbWUgfSBmcm9tIFwiLi9ET01cIjtcbmltcG9ydCB7IFBsYXllciwgY29tcHV0ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuLy9jb25zdCBkaXNwbGF5Qm9hcmQgPSByZXF1aXJlKCcuL0RPTScpO1xuXG5jb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRcIik7XG5sZXQgbmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKTtcblxuc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGRpc3BsYXlOYW1lKCk7XG4gICAgZGlzcGxheUJvYXJkKCdwbGF5ZXInKTtcbiAgICBkaXNwbGF5Qm9hcmQoJ2NvbXB1dGVyJyk7XG4gICAgZ2FtZUxvb3AobmFtZUlucHV0LmlubmVyVGV4dCk7XG4gICAgcmVtb3ZlRm9ybSgpO1xufSk7XG5cbmZ1bmN0aW9uIGdhbWVMb29wKG5hbWUpIHtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZChuYW1lKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gR2FtZWJvYXJkKFwiQ29tcHV0ZXJcIik7XG4gICAgY29uc3QgaHVtYW4gPSBQbGF5ZXIobmFtZSk7XG4gICAgY29uc3QgY29tcCA9IGNvbXB1dGVyKCk7XG5cbiAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNTEsIDQpO1xuICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcCgyNywgMyk7XG4gICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDEsIDMpO1xuICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcCg4OCwgMik7XG4gICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDkxLCAyKTtcbiAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoMzQsIDIpO1xuICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcCg2NCwgMSk7XG4gICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKDQ5LCAxKTtcbiAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNTAsIDEpO1xuICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcCg3NywgMSk7XG4gICAgXG4gICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoNTEsIDQpO1xuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDI3LCAzKTtcbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgxLCAzKTtcbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg4OCwgMik7XG4gICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoOTEsIDIpO1xuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDM0LCAyKTtcbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg2NCwgMSk7XG4gICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoNDksIDEpO1xuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDUwLCAxKTtcbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg3NywgMSk7XG59XG5cbi8vNCAxc1xuLy8zIDJzXG4vLzIgM3Ncbi8vMSA0Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
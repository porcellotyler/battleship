import { displayBoard, removeForm, displayName } from "./DOM";
import { Player, computer } from "./player";
import { Gameboard } from "./gameboard";
//const displayBoard = require('./DOM');

const startButton = document.getElementById("start");
let nameInput = document.getElementById('name');

startButton.addEventListener("click", (event) => {
    displayName();
    displayBoard('player');
    displayBoard('computer');
    gameLoop(nameInput.innerText);
    removeForm();
});

function gameLoop(name) {
    const playerBoard = Gameboard(name);
    const computerBoard = Gameboard("Computer");
    const human = Player(name);
    const comp = computer();

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

    //After ships are placed, allow user to attack
    

    //add turn counter?
}

//4 1s
//3 2s
//2 3s
//1 4
import { displayBoard, removeForm, displayName } from "./DOM";
import { Player, computer } from "./player";
import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

const startButton = document.getElementById("start");
let nameInput = document.getElementById('name');

startButton.addEventListener("click", (event) => {
    displayName();
    displayBoard('player');
    displayBoard('computer');
    gameLoop(nameInput.value);
    removeForm();
});

const gameLoop = (name) => {
    const playerBoard = new Gameboard(name); //maybe define in gameboard?
    const computerBoard = new Gameboard("Computer");
    const human = Player(name);
    const comp = computer();

    //Manually addShips for now
    function playerShips() {
        let playerBattleship = new Ship(4, "playerBattleship");
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

export { gameLoop };
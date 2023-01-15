import { displayBoard, removeForm, displayName } from "./DOM";
import { Player, computer } from "./player";

const startButton = document.getElementById("start");
let nameInput = document.getElementById('name');
let playerBoard;
let computerBoard;

startButton.addEventListener("click", () => {
    displayName();
    displayBoard('player');
    displayBoard('computer');
    gameLoop(nameInput.value);
    removeForm();
});

const gameLoop = (name) => {
    playerBoard = new Player(name);
    computerBoard = new computer('computer');

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

export { gameLoop, playerBoard, computerBoard };

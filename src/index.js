import { displayBoard, removeForm, displayName, shipYard } from "./DOM";
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
    shipYard();
    removeForm();
});

const gameLoop = (name) => {
    playerBoard = new Player(name);
    computerBoard = new computer('computer');

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

    //playerShips();
    
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

export { gameLoop, playerBoard, computerBoard };

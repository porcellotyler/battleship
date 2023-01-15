import { displayShips, displayHits, displayMiss, checkForShips } from "./DOM"
import { playerBoard, computerBoard } from "./index.js";

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
        return displayShips(this.name, this.shipCoords, shipName);
    };

    receiveAttack(location) {
        let target = document.getElementsByClassName(`board ${this.name}`)[location];
        //console.log(location); //coming in as 1 less than whats clicked, unsure why
        //console.log(target);

        //Determines if a ship is hit -> target undef rn
        if (target.classList.contains('ship')) {
            //If a ship was hit, send hit to ship and record location
            this.hitCoords.push(location);
            displayHits(this.name, this.hitCoords);

            //Check which ship it is
            if (target.classList.contains("playerBattleship")) {
                return playerBoard.battleship.hit(1);
            } else if (target.classList.contains("playerCruiser1")) {
                return playerBoard.Cruiser1.hit(1);
            } else if (target.classList.contains("playerCruiser2")) {
                return playerBoard.Cruiser2.hit(1);
            } else if (target.classList.contains("playerSub1")) {
                return playerBoard.Sub1.hit(1);
            } else if (target.classList.contains("playerSub2")) {
                return playerBoard.Sub2.hit(1);
            } else if (target.classList.contains("playerSub3")) {
                return playerBoard.Sub3.hit(1);
            } else if (target.classList.contains("playerDestroyer1")) {
                return playerBoard.Destroyer1.hit(1);
            } else if (target.classList.contains("playerDestroyer2")) {
                return playerBoard.Destroyer2.hit(1);
            } else if (target.classList.contains("playerDestroyer3")) {
                return playerBoard.Destroyer3.hit(1);
            } else if (target.classList.contains("playerDestroyer4")) {
                return playerBoard.Destroyer4.hit(1);
            } else if (target.classList.contains("computerBattleship")) {
                return computerBoard.battleship.hit(1);
            } else if (target.classList.contains("computerCruiser1")) {
                return computerBoard.Cruiser1.hit(1);
            } else if (target.classList.contains("computerCruiser2")) {
                return computerBoard.Cruiser2.hit(1);
            } else if (target.classList.contains("computerSub1")) {
                return computerBoard.Sub1.hit(1);
            } else if (target.classList.contains("computerSub2")) {
                return computerBoard.Sub2.hit(1);
            } else if (target.classList.contains("computerSub3")) {
                return computerBoard.Sub3.hit(1);
            } else if (target.classList.contains("computerDestroyer1")) {
                return computerBoard.Destroyer1.hit(1);
            } else if (target.classList.contains("computerDestroyer2")) {
                return computerBoard.Destroyer2.hit(1);
            } else if (target.classList.contains("computerDestroyer3")) {
                return computerBoard.Destroyer3.hit(1);
            } else if (target.classList.contains("computerDestroyer4")) {
                return computerBoard.Destroyer4.hit(1);
            } else {
                return console.log('hmm')
            };
        } else {
            //If ship is not hit, add to missedShots
            this.missedShots.push(location);
            displayMiss(this.missedShots, `board ${this.name}`);
        };
        //After attack received, check for game over
        return this.findShips();
    };

    //Finds non-sunk ships on board, if none, reports game over
    findShips = () => {
        checkForShips(this.name);
    }; //need to fix
};

export { Gameboard };

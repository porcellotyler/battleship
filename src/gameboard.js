import { Ship } from "./ship.js";
import { displayShips, displayHits, displayMiss } from "./DOM"
import { gameLoop } from "./index.js";

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
        return displayShips(this.shipCoords, name);
    };

    receiveAttack = (location) => {
        let target = document.getElementById(`${location}`);

        //Determines if a ship is hit
        if (target.classList.contains('ship')) {
            //If a ship was hit, send hit to ship and record location
            this.hitCoords.push(location);
            displayHits(this.hitCoords);

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
            displayMiss(this.missedShots);
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

export { Gameboard };

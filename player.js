import { Gameboard } from "./gameboard.js";

const Player = (name) => {
    const getName = name;

    const playerBoard = () => {
        Gameboard();
    }

    const attack = (location) => {
        Gameboard().receiveAttack(location);
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
        return attack(move);
    };
}


module.exports = Player;

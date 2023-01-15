import { Gameboard } from "./gameboard.js";
import { Battleship, Cruiser, Destroyer, Sub } from "./ship.js";

class Player {
    constructor(name) {
        this.name = name;
        //this.board = new Gameboard(name);
        this.board = new Gameboard('player');
        this.battleship = new Battleship('player');
        this.Cruiser1 = new Cruiser('player', 1);
        this.Cruiser2 = new Cruiser('player', 2);
        this.Sub1 = new Sub('player', 1);
        this.Sub2 = new Sub('player', 2);
        this.Sub3 = new Sub('player', 3);
        this.Destroyer1 = new Destroyer('player', 1);
        this.Destroyer2 = new Destroyer('player', 2);
        this.Destroyer3 = new Destroyer('player', 3);
        this.Destroyer4 = new Destroyer('player', 4);
    };

    getName = () => this.name;

    playerBoard = () => this.board;

    attack = (location) => this.board.receiveAttack(location);
};

class computer extends Player {
    constructor(name) {
        //Create name and board using name input
        super(name);
        this.board = new Gameboard(name);
        this.battleship = new Battleship('computer');
        this.Cruiser1 = new Cruiser('computer', 1);
        this.Cruiser2 = new Cruiser('computer', 2);
        this.Sub1 = new Sub('computer', 1);
        this.Sub2 = new Sub('computer', 2);
        this.Sub3 = new Sub('computer', 3);
        this.Destroyer1 = new Destroyer('computer', 1);
        this.Destroyer2 = new Destroyer('computer', 2);
        this.Destroyer3 = new Destroyer('computer', 3);
        this.Destroyer4 = new Destroyer('computer', 4);
        //Store played moves for future reference
        this.oldMoves = [];
    };

    randomMove = () => {
        //Generate number between 0 - 100 
        let move = Math.floor(Math.random() * 101);

        //Checking that the random move is not contained in the oldMoves array
        if (this.oldMoves.filter(loc => loc === move).length > 0) {
            //Call itself to make another move if the random move is illegal
            return this.randomMove();
        }

        //Assuming move is legal, add it to the oldMoves array, call Player().attack(move);
        this.oldMoves.push(move);
        return super.attack(move);
    };
};

export { Player, computer };

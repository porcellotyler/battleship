class Ship {
    constructor(length, name) {
        this.length = length;
        this.name = name;
        //Ships initialize with 0 hits
        this.hitNumber = 0;
        this.coords = [];
    }

    lengthOfShip = () => this.length;

    currentHits = () => this.hitNumber;

    //Increase the hitNumber for a ship
    hit = (hit) => {
        if (hit == 1) return this.hitNumber++;
        console.log(this.hitNumber);
        return
    };

    //Check if the ship has been sunk by comparing hitNumber to length
    isSunk = () => {
        if (this.hitNumber < this.length) {
            console.log('not sunk');
            return false;
        } else {
            console.log('sunk');
            return true;
        };
    };
};

class Battleship extends Ship {
    constructor(whose) {
        super(4, 'Battleship');
        this.owner = whose;
    };
};

class Cruiser extends Ship {
    constructor(whose, shipID) {
        super(3, 'Cruiser');
        this.owner = whose;
        this.shipID = shipID;
    };
};

class Sub extends Ship {
    constructor(whose, shipID) {
        super(2, 'Sub');
        this.owner = whose;
        this.shipID = shipID;
    };
};

class Destroyer extends Ship {
    constructor(whose, shipID) {
        super(1, 'Destroyer');
        this.owner = whose;
        this.shipID = shipID;
    };
};


export { Ship, Battleship, Cruiser, Sub, Destroyer };

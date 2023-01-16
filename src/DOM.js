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
        //Specify which board each div is a part of
        if (parentDiv.id == 'playerDiv') {
            square.classList.add('player');
        } else {
            square.classList.add('computer');
        };

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
    return
};

function displayShips(boardName, locations, shipName) {
    while (locations.length > 0) {
        //Find target div
        let target = document.getElementsByClassName(`${boardName}`)[locations[0]];

        //Add ship and shipName classes
        target.classList.add('ship');
        target.classList.add(`${shipName}`);

        locations.shift();
    };
    return
};

function displayHits(boardName, locations) {
    while (locations.length > 0) {
        //Find target div
        let target = document.getElementsByClassName(`${boardName}`)[locations[0]];

        //Remove ship class
        target.classList.remove('ship');

        //Add hit class 
        target.classList.add('hit');

        locations.shift();
    };
    return 
};

function displayMiss(location, boardName) {
    while (location.length > 0) {
        //Add miss class, [location - 1] seems buggy. Not investigating rn but could cause issues down the road.
        document.getElementsByClassName(`${boardName}`)[location - 1].classList.add('miss');
        location.shift();
    };
    return 
};

function shipYard() {
    const yard = document.getElementById('yard');
    yard.classList.toggle('hide');
}

function checkForShips(boardName) {
    let board = document.getElementsByClassName(`board ${boardName}`);

    for (let i = 0; i < 100; i++) {
        let checkDiv = board[i];

        if (checkDiv.classList.contains('ship')) {
            //Game not over if a ship is found
            return
        };
    };
    return gameOver();
};

function gameOver() {
    const container = document.getElementById('result');
    let display = document.createElement('div');
    display.innerText = 'Game over!';

    return container.appendChild(display);
}

export { displayBoard, removeForm, displayName, displayShips, displayHits, displayMiss, shipYard, checkForShips };

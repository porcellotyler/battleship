//const container = document.getElementById('container');
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
}

//module.exports = displayBoard;
export { displayBoard, removeForm, displayName };

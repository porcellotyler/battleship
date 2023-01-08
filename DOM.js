const container = document.getElementById('container');

const displayBoard = () => {
    //Create board of 100 divisions
    for (let i = 1; i < 100; i++) {
        let square = document.createElement('div');
        //Set each square's ID to i so they're numbered 1 - 100
        square.setAttribute("id", `${i}`);
        container.appendChild(square);
    };
    return; 
}

module.exports = displayBoard;

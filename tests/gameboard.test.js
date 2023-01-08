const gameboard = require('../src/gameboard');

test('Ships can be placed on the board', () => {
    expect(gameboard().placeShip(25, 4)).toEqual([25, 26, 27, 28]);
});

const ship = require('./ship');

test('Ship is not sunk by default', () => {
    expect(ship(5).isSunk(0, 5)).toBeFalsy();
});

const player = require('./player');

test('Players can be named', () => {
    expect(player('Bob').getName).toMatch(/Bob/);
});

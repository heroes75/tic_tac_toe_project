const Gameboard = (function()  {
    //markTheGameboard = (x, y, playerMarker) => {array[x][y] = playerMarker}
    array = [
        //["", "", ""],
        //["", "", ""],
        //["", "", ""],
    ]
    for (let i = 0; i < 3; i++) {
        array[i] = [];
        for (let j = 0; j < 3; j++) {
            array[i].push("")
        }        
    }
    getBoard = () => array
    return {array, getBoard}
})();
console.log(Gameboard.getBoard())
displayControler = (() => {
    
    markTheBoard = (x, y, playerMarker) => {
        array[x][y] = playerMarker
    };
    return {markTheBoard}
})()
function createPlayer(name, marker) {
    let score = 0;
    markTheGameboard = (x, y) => {
        displayControler.markTheBoard(x, y, marker);
        console.log(Gameboard.array);
        console.log({name, x, y});
        return
    }
    return {name, markTheGameboard}
}

const josh = createPlayer("josh", "O");
const mosh = createPlayer("mosh", "X");
josh.markTheGameboard(0, 0);
josh.markTheGameboard(1, 1);
mosh.markTheGameboard(2, 1);


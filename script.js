const Gameboard = (function()  {
    //markTheGameboard = (x, y, playerMarker) => {array[x][y] = playerMarker};
    /*const cell = (() => {
        const arrCell = [];
        const addToarrCell = (x, y, playerMarker) => {
            arrCell.push({x, y, playerMarker})
        };
        const fillBoard = (p, n) => {
                for (let k = 0; k < arrCell.length; k++) {
                    if (arrCell[k].x === p && arrCell[k].y === n)  {
                        return arrCell[k].playerMarker;
                    }
                }
            };
        return {addToarrCell, fillBoard}
})()*/
    const array = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]
    
    const getBoard = () => array
    return {array, getBoard}
})();
console.log(Gameboard.getBoard())
const displayControler = (function() {
    const arrayOfUser = [josh, mosh] = [createPlayer("josh", "O"), createPlayer("mosh", "X")]
    const playRound = (arrayOfUser) => {
        console.log(`${arrayOfUser[0].name}'s turn`)
    }
    return {}
})()
function createPlayer(name, marker) {
    let score = 0;
    const markTheGameboard = (x, y) => {
        Gameboard.array[x][y] = marker;
        console.log(Gameboard.array);
        console.log({name, x, y});
    }
    return {name, markTheGameboard}
}

//const josh = createPlayer("josh", "O");
//const mosh = createPlayer("mosh", "X");
//josh.markTheGameboard(0, 0);
//josh.markTheGameboard(1, 1);
//mosh.markTheGameboard(2, 1);


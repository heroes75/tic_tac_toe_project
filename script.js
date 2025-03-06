const Gameboard = (function()  {
    //markTheGameboard = (x, y, playerMarker) => {array[x][y] = playerMarker};
    const cell = (() => {
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
        return {addToarrCell, fillBoard, arrCell}
})()
    const array = [
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
    
    const getBoard = () => array
    return {array, getBoard, cell}
})();
console.log(Gameboard.getBoard())
const displayControler = (function() {
    const fillTheBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                Gameboard.array[i][j] = Gameboard.cell.fillBoard(i, j) || ""
            }        
        }
        return
    }
    const markTheBoard = (x, y, playerMarker) => {
        array[x][y] = playerMarker
    };
    return {markTheBoard, fillTheBoard}
})()
function createPlayer(name, marker) {
    let score = 0;
    const markTheGameboard = (x, y) => {
        Gameboard.cell.addToarrCell(x, y, marker);
        displayControler.fillTheBoard()
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
//mosh.markTheGameboard(2, 1);


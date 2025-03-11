const Gameboard = (function()  {
    const isAlreadyMarked = (x, y) => array[x][y] !== "";
    const array = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]
    
    const getBoard = () => array
    return {array, getBoard, isAlreadyMarked}
})();
console.log(Gameboard.getBoard())
const displayControler = (function() {
    const arrayOfUser = [josh, mosh] = [createPlayer("josh", "O"), createPlayer("mosh", "X")];
    let activeUser = arrayOfUser[0];
    const changeActiveUser = () => {
        return activeUser = activeUser === arrayOfUser[0] ? arrayOfUser[1] : arrayOfUser[0];
    }
    const playRound = () => {
        console.log(`${activeUser.name}'s turn`);
    }
    const getActiveUser = () => activeUser;
    const isWinner = (marker) => {
        if(Gameboard.array.some(el => el[0]=== el[1] && el[1] === el[2] && el[0] === marker)){
            console.log("Winner !!!!!!!!!")
        }
        for (let i = 0; i < 3; i++) {
            const j = 0;
            console.log(Gameboard.array[j][i] === Gameboard.array[j+1][i] && Gameboard.array[j+1][i] === Gameboard.array[j+2][i] && Gameboard.array[j][i] === marker)
            if (Gameboard.array[j][i] === Gameboard.array[j+1][i] && Gameboard.array[j+1][i] === Gameboard.array[j+2][i] && Gameboard.array[j][i] === marker) {
                console.log("Winner !!!!!!!!! vertival") 
            }
            
        }
    }
    playRound();

    return {playRound, changeActiveUser, getActiveUser, isWinner}
})()
function createPlayer(name, marker) {
    let score = 0;
    const markTheGameboard = (x, y) => {
        if (Gameboard.isAlreadyMarked(x, y)) {
            console.log("is Already Marked");
            displayControler.playRound();
            return
        }
        Gameboard.array[x][y] = marker;
        displayControler.isWinner(marker)
        displayControler.changeActiveUser();
        displayControler.playRound();
        console.log(Gameboard.array);
    }
    return {name, marker, markTheGameboard}
}

//const josh = createPlayer("josh", "O");
//const mosh = createPlayer("mosh", "X");
//josh.markTheGameboard(0, 0);
//josh.markTheGameboard(1, 1);
//mosh.markTheGameboard(2, 1);


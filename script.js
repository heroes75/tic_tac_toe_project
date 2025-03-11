const Gameboard = (function()  {
    const isAlreadyMarked = (x, y) => array[x][y] !== "";
    const array = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]
    const resetBoard = () => {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                array[i][j] = "";
                
            }
            
        }
    }
    const getBoard = () => array
    return {array, getBoard, isAlreadyMarked, resetBoard}
})();
console.log(Gameboard.getBoard())
const displayControler = (function() {
    const arrayOfUser = [josh, mosh] = [createPlayer("josh", "O"), createPlayer("mosh", "X")];
    let activeUser = arrayOfUser[0];
    const changeActiveUser = () => {
        return activeUser = activeUser === arrayOfUser[0] ? arrayOfUser[1] : arrayOfUser[0];
    }
    const playRound = () => {
        console.log(`${josh.name}: ${josh.getScore()} || ${mosh.name}: ${mosh.getScore()}`);
        console.log(`${activeUser.name}'s turn`);
    }
    const newRound = () => {
        Gameboard.resetBoard();
        activeUser = arrayOfUser[0];
        playRound();
    }
    const getActiveUser = () => activeUser;
    const isTie = () => {

    }
    const isWinner = (marker) => {
        if(Gameboard.array.some(el => el[0]=== el[1] && el[1] === el[2] && el[0] === marker)){
            return true;
        }
        for (let i = 0; i < 3; i++) {
            const j = 0;
            console.log(Gameboard.array[j][i] === Gameboard.array[j+1][i] && Gameboard.array[j+1][i] === Gameboard.array[j+2][i] && Gameboard.array[j][i] === marker)
            if (Gameboard.array[j][i] === Gameboard.array[j+1][i] && Gameboard.array[j+1][i] === Gameboard.array[j+2][i] && Gameboard.array[j][i] === marker) {
                return true; 
            }
        }
        if ((Gameboard.array[1][1] === Gameboard.array[2][2] && Gameboard.array[2][2] === Gameboard.array[0][0] && Gameboard.array[2][2] === marker) ||
         (Gameboard.array[0][2] === Gameboard.array[1][1] && Gameboard.array[1][1] === Gameboard.array[2][0] && Gameboard.array[1][1] === marker)) {
            return true;
        }
    }
    playRound();

    return {playRound, changeActiveUser, getActiveUser, isWinner, newRound}
})()
function createPlayer(name, marker) {
    let score = 0;
    const getScore = () => score;
    const markTheGameboard = (x, y) => {
        if (Gameboard.isAlreadyMarked(x, y)) {
            console.log("is Already Marked");
            displayControler.playRound();
            return
        }
        Gameboard.array[x][y] = marker;
        if (displayControler.isWinner(marker)) {
            console.log(`the winner of this round is ${name}`);
            score++;
            displayControler.newRound();
            return
        }
        displayControler.changeActiveUser();
        displayControler.playRound();
        console.log(Gameboard.array);
    }
    return {name, marker, markTheGameboard, getScore}
}

//const josh = createPlayer("josh", "O");
//const mosh = createPlayer("mosh", "X");
//josh.markTheGameboard(0, 0);
//josh.markTheGameboard(1, 1);
//mosh.markTheGameboard(2, 1);


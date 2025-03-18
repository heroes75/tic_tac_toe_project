const arrayContainer = document.querySelector(".array-container");
const Gameboard = (function()  {
    let round = 1;
    const getRound = () => round;
    const increaseRound = () => round++;
    const setRoundToZero = () => round = 1;
    const AllcellMarked = () => array.every(el => el.every(subEl => subEl !== ""))
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
    return {array, getBoard, isAlreadyMarked, resetBoard, AllcellMarked, getRound, increaseRound, setRoundToZero}
})();
console.log(Gameboard.getBoard())
const displayControler = (function() {
    const arrayOfUser = [josh, mosh] = [createPlayer("josh", "O"), createPlayer("mosh", "X")];
    let activeUser = arrayOfUser[0];
    let tie = 0;
    const increaseTie = () => tie++;
    const resetTie = () => tie = 0;
    const changeActiveUser = () => {
        return activeUser = activeUser === arrayOfUser[0] ? arrayOfUser[1] : arrayOfUser[0];
    }
    const playRound = () => {
        console.log(`Round ${Gameboard.getRound()} ${josh.name}: ${josh.getScore()} || ${mosh.name}: ${mosh.getScore()} || tie: ${tie}`);
        console.log(Gameboard.array);
        console.log(`${activeUser.name}'s turn`);
    }
    const newRound = () => {
        Gameboard.resetBoard();
        activeUser = arrayOfUser[0];
        playRound();
    }
    const getActiveUser = () => activeUser;
    const playNewGame = () => {
        arrayOfUser[0].setScoreToZero();
        arrayOfUser[1].setScoreToZero();

        Gameboard.setRoundToZero();
        newRound();
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

    return {playRound, changeActiveUser, getActiveUser, isWinner, newRound, playNewGame, resetTie, increaseTie}
})()
function createPlayer(name, marker) {
    let score = 0;
    const getScore = () => score;
    const setScoreToZero = () => score = 0;
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
            if (score === 3) {
                console.log(`${name} win this game`);
                displayControler.resetTie()
                displayControler.playNewGame();
                return
            }
            Gameboard.increaseRound();
            displayControler.newRound();
            return
        }
        if (Gameboard.AllcellMarked()) {
            console.log("this is a tie");
            displayControler.increaseTie()
            Gameboard.increaseRound();
            displayControler.newRound();
            return
        }
        displayControler.changeActiveUser();
        displayControler.playRound();
    }
    return {name, marker, markTheGameboard, getScore, setScoreToZero}
}

const DOMhandler = (() => {
    const playerOneName = document.querySelector("#player-one-name");
    const playerTwoName = document.querySelector("#player-two-name");
    const playersNames = document.querySelector("#players-names");
    const displayArray = ((arr) => {
        arrayContainer.textContent = ""
        arr.forEach((el, i) => el.forEach((subEl, j) => {
            const div = document.createElement("div");
            div.classList.add("grid-case");
            div.setAttribute("id", `x:${i}-y:${j}`);
            div.textContent = subEl;
            arrayContainer.appendChild(div);
        }));
    })
    displayArray(Gameboard.array);
    const markTheScreenBoard = (() => {
        arrayContainer.addEventListener("click", (e) => {
            displayControler.getActiveUser().markTheGameboard(e.target.id[2], e.target.id[6]);
            displayArray(Gameboard.array)
        })
    })()
})()

//const josh = createPlayer("josh", "O");
//const mosh = createPlayer("mosh", "X");
//josh.markTheGameboard(0, 0);
//josh.markTheGameboard(1, 1);
//mosh.markTheGameboard(2, 1);


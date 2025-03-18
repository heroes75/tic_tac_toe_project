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

const DOMhandler = (() => {
    const arrayContainer = document.querySelector(".array-container");
    const registrationContainer = document.querySelector(".registration-container");
    const GameboardContainer = document.querySelector(".Gameboard-container");
    const playerOneName = document.querySelector("#player-one-name");
    const playerTwoName = document.querySelector("#player-two-name");
    const playersNames = document.querySelector("#players-names");
    const players = [];
    let arrayOfUser =[];
    var activeUser = {active: ""};
    const setActiveUser = () => {
        return  activeUser = arrayOfUser[0]
    }
    let player1;
    let player2;
    playersNames.addEventListener("click", e => {
        e.preventDefault();
        players.push(playerOneName.value);
        players.push(playerTwoName.value);
        //arrayOfUser = [player1, player2] = [createPlayer(playerOneName.value, "O"), createPlayer(playerTwoName.value, "X")];
        arrayOfUser.push(player1 = createPlayer(playerOneName.value, "O"));
        arrayOfUser.push(player2 = createPlayer(playerTwoName.value, "X"));
        activeUser.active = arrayOfUser[0]
        console.log("activeusers on event", activeUser)
        registrationContainer.toggleAttribute("hidden");
        GameboardContainer.toggleAttribute("hidden");
    })
    console.log("out of event listener",arrayOfUser)
    //activeUser = arrayOfUser[0];
    console.log(" activeusers out of event listener",activeUser)
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
    return {players, arrayOfUser, activeUser}
})()

const displayControler = (function() {
    //if (!DOMhandler.players) return
    //const arrayOfUser = [player1, player2] = [createPlayer(DOMhandler.players[0] || "josh", "O"), createPlayer(DOMhandler.players[1] || "mosh", "X")];
    console.log(DOMhandler.arrayOfUser);
    //let activeUser = DOMhandler.arrayOfUser[0];
    let tie = 0;
    const increaseTie = () => tie++;
    const resetTie = () => tie = 0;
    const changeActiveUser = () => {
        return DOMhandler.activeUser.active = DOMhandler.activeUser.active === DOMhandler.arrayOfUser[0] || DOMhandler.activeUser.active === undefined ? DOMhandler.arrayOfUser[1] : DOMhandler.arrayOfUser[0];
    }
    const playRound = () => {
        console.log(`Round ${Gameboard.getRound()} ${DOMhandler.arrayOfUser[0].name}: ${DOMhandler.arrayOfUser[0].getScore()} || ${DOMhandler.arrayOfUser[1].name}: ${DOMhandler.arrayOfUser[1].getScore()} || tie: ${tie}`);
        console.log(Gameboard.array);
        console.log(`${DOMhandler.activeUser.active.name}'s turn`);
    }
    const newRound = () => {
        Gameboard.resetBoard();
        DOMhandler.activeUser.active = DOMhandler.arrayOfUser[0];
        playRound();
    }
    const getActiveUser = () => DOMhandler.activeUser.active;
    const playNewGame = () => {
        DOMhandler.arrayOfUser[0].setScoreToZero();
        DOMhandler.arrayOfUser[1].setScoreToZero();

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
    //playRound();

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



//const josh = createPlayer("josh", "O");
//const mosh = createPlayer("mosh", "X");
//josh.markTheGameboard(0, 0);
//josh.markTheGameboard(1, 1);
//mosh.markTheGameboard(2, 1);


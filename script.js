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
    const playerOneNameDisplay = document.querySelector(".player-one-name-display");
    const playerTwoNameDisplay = document.querySelector(".player-two-name-display");
    const playerTwoName = document.querySelector("#player-two-name");
    const playersNames = document.querySelector("#players-names");
    let arrayOfUser =[];
    let activeUser = {active: ""};
    let player1;
    let player2;
    playersNames.addEventListener("click", e => {
        e.preventDefault();
        arrayOfUser.push(player1 = createPlayer(playerOneName.value, "O"));
        arrayOfUser.push(player2 = createPlayer(playerTwoName.value, "X"));
        activeUser.active = arrayOfUser[0];
        registrationContainer.toggleAttribute("hidden");
        GameboardContainer.toggleAttribute("hidden");
        writeToDOM(".player-one-name-display", arrayOfUser[0].name || "");
        writeToDOM(".player-two-name-display", arrayOfUser[1].name || "");
        writeToDOM("#round-container", `ROUND ${Gameboard.getRound()}`);
        writeToDOM("#tie-score", `TIE: ${displayController.getTie()}`);
        writeToDOM(".player-one-score", arrayOfUser[0].getScore() || 0);
        writeToDOM(".player-two-score", arrayOfUser[1].getScore() || 0);
        writeToDOM("#state-game", `${activeUser.active.name}' turn`);
    })
    const writeToDOM = (selector, message = 0) => {
        document.querySelector(selector).textContent = message;
    }
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
    
    const restart = () => {
        document.getElementById("restart").addEventListener("click", () => {
            Gameboard.resetBoard();
            displayController.playNewGame();
            document.querySelector(".Gameboard-container").removeAttribute("inert");
            document.getElementById("end-game").setAttribute("hidden", "");
        });
        
    }
    const replay = () => {
        document.getElementById("replay").addEventListener("click", () => {
            Gameboard.resetBoard();
            displayController.playNewGame();
            arrayOfUser.pop();
            arrayOfUser.pop();
            registrationContainer.toggleAttribute("hidden");
            GameboardContainer.toggleAttribute("hidden");
            document.getElementById("end-game").setAttribute("hidden", "");
            document.querySelector(".Gameboard-container").removeAttribute("inert");
        })
    }

    displayArray(Gameboard.array);
    const markTheScreenBoard = (() => {
        arrayContainer.addEventListener("click", (e) => {
            displayController.getActiveUser().markTheGameboard(e.target.id[2], e.target.id[6]);
        })
    })()
    return {arrayOfUser, activeUser, writeToDOM, displayArray, restart, replay}
})()

const displayController = (function() {
    console.log(DOMhandler.arrayOfUser);
    let tie = 0;
    const getTie = () => tie;
    const increaseTie = () => tie++;
    const resetTie = () => tie = 0;
    const changeActiveUser = () => {
        return DOMhandler.activeUser.active = DOMhandler.activeUser.active === DOMhandler.arrayOfUser[0] || DOMhandler.activeUser.active === undefined ? DOMhandler.arrayOfUser[1] : DOMhandler.arrayOfUser[0];
    }
    const playRound = () => {
        DOMhandler.writeToDOM(".player-one-name-display", DOMhandler.arrayOfUser[0].name || "");
        DOMhandler.writeToDOM(".player-two-name-display", DOMhandler.arrayOfUser[1].name || "");
        DOMhandler.writeToDOM("#round-container", `ROUND ${Gameboard.getRound()}`);
        DOMhandler.writeToDOM("#tie-score", `TIE: ${tie}`);
        DOMhandler.writeToDOM(".player-one-score", DOMhandler.arrayOfUser[0].getScore() || 0);
        DOMhandler.writeToDOM(".player-two-score", DOMhandler.arrayOfUser[1].getScore() || 0);
        DOMhandler.writeToDOM("#state-game", `${DOMhandler.activeUser.active.name}'s turn`);
        DOMhandler.displayArray(Gameboard.array);
    }
    const newRound = () => {
        Gameboard.resetBoard();
        DOMhandler.activeUser.active = DOMhandler.arrayOfUser[0];
        playRound();
    }
    const getActiveUser = () => DOMhandler.activeUser.active;
    const playNewGame = () => {
        resetTie()
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
            if (Gameboard.array[j][i] === Gameboard.array[j+1][i] && Gameboard.array[j+1][i] === Gameboard.array[j+2][i] && Gameboard.array[j][i] === marker) {
                return true; 
            }
        }
        if ((Gameboard.array[1][1] === Gameboard.array[2][2] && Gameboard.array[2][2] === Gameboard.array[0][0] && Gameboard.array[2][2] === marker) ||
         (Gameboard.array[0][2] === Gameboard.array[1][1] && Gameboard.array[1][1] === Gameboard.array[2][0] && Gameboard.array[1][1] === marker)) {
            return true;
        }
    }

    return {playRound, changeActiveUser, getActiveUser, isWinner, newRound, playNewGame, resetTie, increaseTie, getTie}
})()
function createPlayer(name = "josh", marker) {
    let score = 0;
    const getScore = () => score;
    const setScoreToZero = () => score = 0;
    const markTheGameboard = (x, y) => {
        if (Gameboard.isAlreadyMarked(x, y)) {
            console.log("is Already Marked");
            displayController.playRound();
            return
        }
        Gameboard.array[x][y] = marker;
        if (displayController.isWinner(marker)) {
            DOMhandler.writeToDOM("#state-game", `the winner of this round is ${name}`);          
            score++;
            if (score === 3) {
                displayController.playRound();
                DOMhandler.writeToDOM("#winner", `${name} win the game`);
                document.getElementById("end-game").removeAttribute("hidden");
                document.querySelector(".Gameboard-container").setAttribute("inert", "");
                DOMhandler.restart();
                DOMhandler.replay();
                return
            }
            DOMhandler.displayArray(Gameboard.array)
            Gameboard.increaseRound();
            setTimeout(() => {
                displayController.newRound();
            }, 1500);
            return
        }
        if (Gameboard.AllcellMarked()) {
            DOMhandler.writeToDOM("#state-game", `this is a tie`);
            displayController.increaseTie()
            Gameboard.increaseRound();
            DOMhandler.displayArray(Gameboard.array);
            setTimeout(() => {
                displayController.newRound();
            }, 1500);
            return
        }
        displayController.changeActiveUser();
        displayController.playRound();
    }
    return {name, marker, markTheGameboard, getScore, setScoreToZero}
}

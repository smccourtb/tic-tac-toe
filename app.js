
const Gameboard = (() => {
    let gameboard = ["", "", "",
                     "", "", "",
                     "", "", ""];
    const winningCombinations = [[0,1,2], [0,3,6], [0,4,8], 
                                 [1,4,7], [2,4,6], [2,5,8], 
                                 [3,4,5], [6,7,8]];

    const clear = () => {
        for(let i = 0; i < gameboard.length; i++) {
            update(i, "");
        };
    };

    const update = (index, letter) => {
        gameboard[index] = letter;
        const x = document.getElementById(index);
        x.textContent = letter;
    };
 
    const initialize = ((size=9) => {
        const clearButton = document.querySelector(".clear");
        clearButton.addEventListener("click", clear);
        const container = document.querySelector(".grid");
        for(let i = 0; i < size; i++) {
            const cell = document.createElement('div');
            cell.classList.add("cell");
            cell.setAttribute("id", i);
            container.append(cell);
        };
    })();

    const state = (player) => {
        let index = []
        for(let i = 0; i < gameboard.length; i++) {
            if(gameboard[i] === player.letter) {
                index.push(i);
            };
        };
        for(combo of winningCombinations) {
            // make a copy of index
            let temp = index;
            let count = 0;
            if (temp.length > 2) {
            // go through each element of temp and check if that element appears in combo
                for(j of combo) {
                    if(temp.includes(j)) {
                        count += 1;
                        if (count > 2) {
                            alert(`${player.name} Wins!`);
                            clear();
                            return true
                        };
                    };
                };
            };
            if (tie()) {
                alert("It's a Tie!")
                return true
            };
        };
    };
    const tie = () => {
        if (!gameboard.includes("")) {
            alert("It's a Tie!")
            clear();
        }
    };

    return {update, state};
})();

const Player = ((representation, id) => {
    let name = ""
    let letter = representation;
    let gamesWon = 0;
    let playerID  = id
    const set_name = (() => {
        let nameChoice = prompt('Enter Your Name: ');
        name = nameChoice
    })();
    return {gamesWon, letter, name, playerID};  
});

const Game = (() => {
    //establish player 1 and player 2
    const player1 = Player("X", 1);
    const player2 = Player("O", 2);
    //establish gameboard
    const board = Gameboard;
    // set first player
    let currentPlayer = player1;
    // get DOM elemnts
    const player1Panel = document.getElementById("player1");
    const player2Panel = document.getElementById("player2");
    
    const setupPanels = (() => {
        const player1Title = document.createElement('h1');
        const player2Title = document.createElement('h1');
        const player1Score = document.createElement('h1');
        const player2Score = document.createElement('h1');
        player1Score.setAttribute('id', "player1Score")
        player2Score.setAttribute('id', "player2Score")
        player1Title.textContent = player1.name
        player2Title.textContent = player2.name
        player1Panel.append(player1Title, player1Score);
        player2Panel.append(player2Title, player2Score);
    })();
    // add click event listener to gameboard
    const addEvent = (() => {
        for(let i = 0; i < 9; i++){
            const cell = document.getElementById(i);
            cell.addEventListener('click', () => {
                if (cell.textContent === "") {
                    board.update(cell.getAttribute('id'), currentPlayer.letter);
                    var winCheck = (board.state(currentPlayer));
                    if (winCheck){
                        currentPlayer.gamesWon += 1
                        const scorePanel = document.getElementById(`player${currentPlayer.playerID}Score`)
                        scorePanel.textContent = currentPlayer.gamesWon
                    }
                    if(currentPlayer===player1) {
                        currentPlayer = player2;
                    }
                    else {
                        currentPlayer = player1;
                    };
                
                };
            });
        };
    })();
    return {player1, player2, board, currentPlayer};
})();
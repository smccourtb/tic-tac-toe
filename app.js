
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
            if(gameboard[i] === player) {
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
                        if (count> 2) {
                            alert(`${player} wins`);
                            clear();
                        };
                    };
                };
            };
            if (tie()) {
                alert("It's a Tie!")
            };
        };
    };
    const tie = () => {
        if (!gameboard.includes("")) {
            alert("It's a Tie!")
            clear();
        }
    };

    return {update, state, tie};
})();

const Player = ((representation) => {
    let letter = representation;
    let gamesWon = 0;
    return {gamesWon, letter};  
});

const GameState = (() => {
    //establish player 1 and player 2
    const player1 = Player("X");
    const player2 = Player("O");
    //establish gameboard
    const board = Gameboard;
    // set first player
    let current_player = player1;
    // add click event listener to gameboard
    const addEvent = (() => {
        for(let i = 0; i < 9; i++){
            const cell = document.getElementById(i);
            cell.addEventListener('click', () => {
                if (cell.textContent === "") {
                    board.update(cell.getAttribute('id'), current_player.letter);
                    board.state(current_player.letter);
                    
                    if(current_player===player1) {
                        current_player = player2;
                    } 
                    else {
                        current_player = player1;
                    }
                
                };
            });
        };
    })();
    return {player1, player2, board, current_player};
})();
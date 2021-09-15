
const Gameboard = (() => {
    let gameboard = ["", "", "",
                     "", "", "",
                     "", "", ""]
    const clear = () => {
        for(let i = 0; i < gameboard.length; i++){
            update(i, "");
        };
    };
    const update = (index, letter) => {
        gameboard[index] = letter;
        const x = document.getElementById(index)
        x.textContent = letter;
    };
    const initialize = (function(size=9) {
        const clearButton = document.querySelector(".clear")
        clearButton.addEventListener("click", clear)
        const container = document.querySelector(".grid")
        for(let i = 0; i < size; i++){
            const cell = document.createElement('div')
            cell.classList.add("cell")
            cell.setAttribute("id", i)
            container.append(cell)
        };
    })();
    return {update}
})()

const Player = ((representation) => {
    let letter = representation
    let gamesWon = 0

    return {gamesWon, letter} ;  
});

const GameState = (() => {
    //establish player 1 and player 2
    const player1 = Player("X");
    const player2 = Player("O");
    //establish gameboard
    const board = Gameboard;
    let turn = 0;
    let current_player = player1;
    const addEvent = (() => {
        for(let i = 0; i < 9; i++){
            const cell = document.getElementById(i)
            cell.addEventListener('click', () => {
                board.update(cell.getAttribute('id'), current_player.letter);
                turn += 1;
                if(current_player===player1) {
                    console.log(current_player)
                    current_player = player2;
                } 
                else {
                    console.log(current_player)
                    current_player = player1;
                }
                console.log(turn)
            });
    };
})();
    //listen for player 1 click
    //update gameboard on click
    //check for win state
    //listen for player 2 click
    return {player1, player2, board, turn, current_player}

})();
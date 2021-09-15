
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
            cell.addEventListener('click', () => {
                update(cell.getAttribute('id'), "X")})
            container.append(cell)

        };
    })();
    return {clear, update, gameboard}
})()

const Player = ((name, number) => {
    let name = name
    let number = number

    
})

const GameState = (() => {
    pass
})
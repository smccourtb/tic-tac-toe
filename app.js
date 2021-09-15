
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
    };

    const initialize = (function(size=9) {
        const container = document.querySelector(".grid")
        for(let i = 0; i < size; i++){
            const cell = document.createElement('div')
            cell.classList.add("cell")
            cell.addEventListener('click', () =>
            cell.textContent = "X")
            container.append(cell)

        };
    })();
    return {clear, update, initialize}
})()

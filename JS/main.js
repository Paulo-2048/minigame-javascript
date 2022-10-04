// import Board from "/js/class/board.js";
// import { Player, NPC } from "/js/class/characters.js";

const boardGrid = $(".boardGrid")[0];

const board = new Board(5, 5, 3, boardGrid);


const player = new Player("👨‍💻", board);

//intanciar npcs
for (let i = 0; i < 3; i++) {
    new NPC("🐞", board);
}




// verificar se o player ganhou
setInterval(() => {
    board.checkWin();
    }, 100);


import Board from "/js/class/board.js";
import { Player, NPC } from "/js/class/characters.js";

const boardGrid = document.querySelector(".boardGrid");

const board = new Board(15, 15, boardGrid);

const player = new Player("🐱", board);
const npc1 = new NPC("🐶", board);
const npc2 = new NPC("🐭", board);
const npc3 = new NPC("🐹", board);
const npc4 = new NPC("🐰", board);
const npc5 = new NPC("🐻", board);
const npc6 = new NPC("🐼", board);

// player.right()

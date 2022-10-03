class Character {
  constructor(face, posY, posX, board) {
    this.face = face;
    this.posY = posY;
    this.posX = posX;
    this.boardInfo = board;
    this.board = board.divBoard;
    this.createCharacter();
  }

  createCharacter() {
    this.cell = this.board.children[this.posX].children[this.posY];

    if (!this.cell.hasChildNodes()) {
      let content = document.createElement("p");
      content.classList.add("character");
      content.innerHTML = this.face;
      this.cell.appendChild(content);
    } else {
      location.reload();
      //console.warn("This page is reloaded because you are trying to create a character in a cell that already has a character");
    }
  }

  move() {
    let oldLocation = this.cell;
    let newLocation = this.board.children[this.posX].children[this.posY];
    

    if (!newLocation.hasChildNodes()) {
      oldLocation.removeChild(this.cell.children[0]);
      let content = document.createElement("p");
      content.classList.add("character");
      content.innerHTML = this.face;
      newLocation.appendChild(content);
      this.cell = newLocation;
    } else {
      this.posY = parseInt(oldLocation.classList[2].slice(1));
      this.posX = parseInt(oldLocation.classList[1].slice(1));
      this.cell = oldLocation;
      // console.log("X: " + this.posY + " Y: " + this.posX);
      // console.warn("You can't move to this cell");
    }
  }

  movimationStyle() {
    // How the character will move
  }

  up() {
    if (this.posY > 0) {
      this.posY--;
      this.move();
    }
  }

  down() {
    if (this.posY < this.boardInfo.cols - 1) {
      this.posY++;
      this.move();
    }
  }

  left() {
    if (this.posX > 0) {
      this.posX--;
      this.move();
    }
  }

  right() {
    if (this.posX < this.boardInfo.rows - 1) {
      this.posX++;
      this.move();
    }
  }
}

class Player extends Character {
  constructor(face, board) {
    super(face, 0, 0, board);

    this.movimationStyle();
  }

  movimationStyle() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.up();
          break;
        case "ArrowDown":
          this.down();
          break;
        case "ArrowLeft":
          this.left();
          break;
        case "ArrowRight":
          this.right();
          break;
      }
    });
  }
}

class NPC extends Character {
  constructor(face, board) {
    let randomX = Math.floor(Math.random() * board.rows);
    let randomY = Math.floor(Math.random() * board.cols);
    super(face, randomY, randomX, board);

    this.movimationStyle();
  }

  movimationStyle() {
    setInterval(() => {
      let randomDirection = Math.floor(Math.random() * 4);
      switch (randomDirection) {
        case 0:
          this.up();
          break;
        case 1:
          this.down();
          break;
        case 2:
          this.left();
          break;
        case 3:
          this.right();
          break;
      }
    }, 1000);
  }

}
export { NPC, Player };

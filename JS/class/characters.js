class Character {
  constructor(face, type, posY, posX, board) {
    this.face = face;
    this.posY = posY;
    this.posX = posX;
    this.type = type;
    this.boardInfo = board;
    this.board = board.divBoard;
    this.createCharacter();
  }

  createCharacter() {
    this.cell = this.board.children[this.posX].children[this.posY];

    if (!this.cell.hasChildNodes()) {
      let content = document.createElement("p");
      content.classList.add("character", this.type);
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

    if (!(this.type === "npc" && this.caught === true)) {
    if (!newLocation.hasChildNodes()) {
      this.cell.style.backgroundColor = "transparent";
      oldLocation.removeChild(this.cell.children[0]);
      let content = document.createElement("p");
      content.classList.add("character", this.type);
      content.innerHTML = this.face;
      newLocation.appendChild(content);
      this.cell = newLocation;
    } else {
      this.posY = parseInt(oldLocation.classList[2].slice(1));
      this.posX = parseInt(oldLocation.classList[1].slice(1));
      this.cell = oldLocation;

      this.cell.firstChild.classList.add("shake");
      setTimeout(() => {
        this.cell.firstChild.classList.remove("shake");
      }, 500);

      this.cell.style.backgroundColor = "red";
      setTimeout(() => {
        this.cell.style.backgroundColor = "transparent";
      }, 250);
    }
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
    super(face, "player", 0, 0, board);

    this.movimationStyle();

    setInterval(() => {
      this.cathNpc();
    }, 100);
  }

  cathNpc() {
    // celulas em volta do player
    let aroundCells = [];
    if (this.posX > 0) {
      aroundCells.push(this.board.children[this.posX - 1].children[this.posY]);
    }
    if (this.posX < this.boardInfo.rows - 1) {
      aroundCells.push(this.board.children[this.posX + 1].children[this.posY]);
    }
    if (this.posY > 0) {
      aroundCells.push(this.board.children[this.posX].children[this.posY - 1]);
    }
    if (this.posY < this.boardInfo.cols - 1) {
      aroundCells.push(this.board.children[this.posX].children[this.posY + 1]);
    }
    // verificar se existe um npc em alguma das celulas em volta do player
    aroundCells.forEach((cell) => {
      if (cell !== undefined) {
        if (cell.hasChildNodes()) {
          if (cell.firstChild.classList.contains("npc")) {
            cell.removeChild(cell.firstChild);
            //console.log("You caught a bug!");
            let score = document.querySelector(".score");
            score.innerHTML = parseInt(score.innerHTML) + 1;
            // mudar o fundo para verde por 0.5s
            this.cell.style.backgroundColor = "green";
            setTimeout(() => {
              this.cell.style.backgroundColor = "transparent";
            }, 250);
          }
        }
      }
    });
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
    super(face, "npc", randomY, randomX, board);
    this.caught = false;

    this.movimationStyle();

    this.npcCaught();
  }

  npcCaught() {
    // finalizar movimento do npc quando ele for capturado

    setInterval(() => {
      if (this.cell.firstChild === null) {
        this.caught = true;
        clearInterval(this.movimationStyle);
      }
    }, 100);
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
      if (this.caught) {
        clearInterval(this.movimationStyle);
      }
    }, 1000);
  }
}

// export { NPC, Player };

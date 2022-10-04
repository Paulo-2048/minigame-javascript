class Board {
  constructor(rows, cols, rocksQty, divBoard) {
    this.rows = rows;
    this.cols = cols;
    this.divBoard = divBoard;
    this.rocksQty = rocksQty;
    this.win = false;
    this.createBoard();
    this.createRock();
  }

  createBoard() {
    let cellFlag = 1;

    for (let i = 0; i < this.rows; i++) {
      let row = document.createElement("div");
      row.classList.add("row");
      row.setAttribute("id", `r${i}`);
      for (let j = 0; j < this.cols; j++) {
        let col = document.createElement("div");
        col.classList.add("cell", `r${i}`, `c${j}`);
        col.setAttribute("id", `cell${cellFlag}`);
        cellFlag++;
        row.appendChild(col);
      }
      this.divBoard.appendChild(row);
    }
  }

  createRock() {
    this.rock = document.createElement("p");
    this.rock.classList.add("rock");
    this.rock.innerHTML = "🗿";
    for (let i = 0; i < this.rocksQty; i++) {
      let randomCell = Math.floor(Math.random() * (this.rows * this.cols)) + 1;
      let cell = document.getElementById(`cell${randomCell}`); // Change

      if (cell.firstChild === null) {
        cell.appendChild(this.rock.cloneNode(true));
      } else {
        i--;
      }
    }
  }

  checkWin() {
    let bugs = document.querySelectorAll(".npc");
    if (bugs.length === 0 && this.win === false) {
      // delay de 500ms
      setTimeout(() => {
        alert("You win!");
        location.reload();
      }, 500);
      this.win = true;
    }
  }
}

// export default Board;

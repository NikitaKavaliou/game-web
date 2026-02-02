export function renderBoard(boardEl, rows, cols, onClick) {
  boardEl.innerHTML = "";

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.col = c;

      cell.addEventListener("click", () => onClick(c));

      // --- highlight on hover ---
      cell.addEventListener("mouseover", () => highlightColumn(boardEl, rows, cols, c));
      cell.addEventListener("mouseout", () => clearHighlight(boardEl));

      boardEl.appendChild(cell);
    }
  }
}

function highlightColumn(boardEl, rows, cols, col) {
  for (let r = 0; r < rows; r++) {
    const index = r * cols + col;
    boardEl.children[index].classList.add("highlight");
  }
}

function clearHighlight(boardEl) {
  [...boardEl.children].forEach(cell => cell.classList.remove("highlight"));
}

export function updateUI(boardEl, r, c, player) {
  const index = r * 7 + c;
  boardEl.children[index].classList.add(player);
}

export function setStatus(el, text) {
  el.textContent = text;
}

export function highlightWin(boardEl, cells) {
  cells.forEach(([r, c]) => {
    const index = r * 7 + c;
    boardEl.children[index].classList.add("win-cell");
  });
}

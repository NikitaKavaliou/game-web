export function renderBoard(boardEl, onClick) {
  boardEl.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => onClick(i));
    boardEl.appendChild(cell);
  }
}

export function updateCell(boardEl, index, value) {
  boardEl.children[index].textContent = value;
}

export function setStatus(el, text) {
  el.textContent = text;
}

export function highlightWin(boardEl, pattern) {
  pattern.forEach(i => {
    boardEl.children[i].classList.add("win");
  });
}

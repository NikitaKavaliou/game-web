import { getAvailableRow, checkWin } from "./board.js";

export function aiHardMove(board, player) {
  const cols = board[0].length;

  // 1. Попробовать выиграть
  for (let c = 0; c < cols; c++) {
    const r = getAvailableRow(board, c);
    if (r === -1) continue;

    board[r][c] = player;
    if (checkWin(board, r, c)) {
      board[r][c] = "";
      return c;
    }
    board[r][c] = "";
  }

  // 2. Заблокировать соперника
  const opp = player === "red" ? "yellow" : "red";

  for (let c = 0; c < cols; c++) {
    const r = getAvailableRow(board, c);
    if (r === -1) continue;

    board[r][c] = opp;
    if (checkWin(board, r, c)) {
      board[r][c] = "";
      return c;
    }
    board[r][c] = "";
  }

  // 3. Иначе — как easy
  let available = [];
  for (let c = 0; c < cols; c++) {
    if (board[0][c] === "") available.push(c);
  }

  return available[Math.floor(Math.random() * available.length)];
}

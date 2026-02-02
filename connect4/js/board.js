export function createBoard(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(""));
}

export function getAvailableRow(board, col) {
  for (let r = board.length - 1; r >= 0; r--) {
    if (board[r][col] === "") return r;
  }
  return -1;
}

export function dropPiece(board, r, c, player) {
  board[r][c] = player;
}

export function isBoardFull(board) {
  return board.every(row => row.every(cell => cell !== ""));
}

export function checkWin(board, r, c) {
  return (
    checkDir(board, r, c, 1, 0) ||   // V
    checkDir(board, r, c, 0, 1) ||   // H
    checkDir(board, r, c, 1, 1) ||   // D /
    checkDir(board, r, c, 1, -1)     // D \
  );
}

function checkDir(board, r, c, dr, dc) {
  let cells = [[r, c]];

  cells = cells.concat(collect(board, r, c, dr, dc));
  cells = cells.concat(collect(board, r, c, -dr, -dc));

  if (cells.length >= 4) {
    return { win: true, cells };
  }

  return false;
}

function collect(board, r, c, dr, dc) {
  let arr = [];
  let nr = r + dr;
  let nc = c + dc;

  while (
    nr >= 0 &&
    nr < board.length &&
    nc >= 0 &&
    nc < board[0].length &&
    board[nr][nc] === board[r][c]
  ) {
    arr.push([nr, nc]);
    nr += dr;
    nc += dc;
  }

  return arr;
}

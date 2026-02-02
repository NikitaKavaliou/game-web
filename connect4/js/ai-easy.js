export function aiEasyMove(board) {
  const cols = board[0].length;
  let available = [];

  for (let c = 0; c < cols; c++) {
    if (board[0][c] === "") available.push(c);
  }

  return available[Math.floor(Math.random() * available.length)];
}

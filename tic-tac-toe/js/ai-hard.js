export function aiHardMove(board) {
  let move = findWinningMove(board, 'O');
  if (move !== null) return move;

  move = findWinningMove(board, 'X');
  if (move !== null) return move;

  if (board[4] === '') return 4;

  const corners = [0,2,6,8];
  const emptyCorners = corners.filter(i => board[i] === '');
  if (emptyCorners.length) {
    return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
  }

  const empty = board
    .map((v, i) => v === '' ? i : null)
    .filter(i => i !== null);

  return empty[Math.floor(Math.random() * empty.length)];
}

function findWinningMove(board, player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    const values = [board[a], board[b], board[c]];

    const countPlayer = values.filter(v => v === player).length;
    const countEmpty = values.filter(v => v === '').length;

    if (countPlayer === 2 && countEmpty === 1) {
      if (board[a] === '') return a;
      if (board[b] === '') return b;
      if (board[c] === '') return c;
    }
  }

  return null;
}

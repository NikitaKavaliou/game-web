export function aiEasyMove(board) {
  const empty = board
    .map((v, i) => v === '' ? i : null)
    .filter(i => i !== null);

  return empty[Math.floor(Math.random() * empty.length)];
}

import { createBoard, checkWin, isDraw } from "./board.js";
import { renderBoard, updateCell, setStatus, highlightWin } from "./ui.js";
import { aiEasyMove } from "./ai-easy.js";
import { aiHardMove } from "./ai-hard.js";
import { play } from "./sounds.js";


const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const modeButtons = document.querySelectorAll(".mode-select button");

let board = [];
let currentPlayer = 'X';
let gameOver = false;
let gameMode = 'pvp';

modeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    gameMode = btn.dataset.mode;
    startGame();
    setStatus(statusEl, `Mode: ${btn.textContent}`);
  });
});

function startGame() {
  board = createBoard();
  gameOver = false;
  currentPlayer = 'X';

  renderBoard(boardEl, handleClick);
  setStatus(statusEl, "Player X's turn");
}

function handleClick(index) {
  if (gameOver) return;
  if (board[index] !== '') return;
  play("click");
  board[index] = currentPlayer;
  updateCell(boardEl, index, currentPlayer);

  const winLine = checkWin(board, currentPlayer);
if (winLine) {
  highlightWin(boardEl, winLine);
  play("win");
  setStatus(statusEl, `Player ${currentPlayer} wins!`);
  gameOver = true;
  return;
}


  if (isDraw(board)) {
    play("draw");
    setStatus(statusEl, "It's a draw!");
    gameOver = true;
    return;
  }

  if (gameMode === 'pvp') {
    switchPlayer();
    return;
  }

  currentPlayer = 'O';
  computerMove();
}

function computerMove() {
  if (gameOver) return;

  let index =
    gameMode === 'easy'
      ? aiEasyMove(board)
      : aiHardMove(board);

  board[index] = 'O';
  updateCell(boardEl, index, 'O');

  const winLine = checkWin(board, 'O');
  if (winLine) {
    highlightWin(boardEl, winLine);
    setStatus(statusEl, "Computer wins!");
    gameOver = true;
    return;
  }

  if (isDraw(board)) {
    setStatus(statusEl, "It's a draw!");
    gameOver = true;
    return;
  }

  currentPlayer = 'X';
  setStatus(statusEl, "Player X's turn");
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  setStatus(statusEl, `Player ${currentPlayer}'s turn`);
}

resetBtn.addEventListener("click", startGame);

startGame();

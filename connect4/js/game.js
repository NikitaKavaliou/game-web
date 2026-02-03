import { createBoard, dropPiece, getAvailableRow, checkWin, isBoardFull } from "./board.js";
import { updateUI, renderBoard, setStatus, highlightWin } from "./ui.js";
import { aiEasyMove } from "./ai-easy.js";
import { aiHardMove } from "./ai-hard.js";
import { play } from "./sounds.js";

const rows = 6;
const cols = 7;

let board = [];
let currentPlayer = "red";
let gameOver = false;
let mode = "pvp";
let playerTurn = true; // важно: чтобы AI не играл сам с собой

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const modeEl = document.getElementById("mode");
const resetBtn = document.getElementById("resetBtn");

function startGame() {
  board = createBoard(rows, cols);
  gameOver = false;
  currentPlayer = "red";
  mode = modeEl.value;
  playerTurn = true;

  renderBoard(boardEl, rows, cols, handleColumnClick);
  setStatus(statusEl, "Red's turn");
}

function handleColumnClick(col) {
  if (gameOver) return;

  // если AI ходит — игрок не может кликать
  if (mode !== "pvp" && !playerTurn) return;

  const row = getAvailableRow(board, col);
  if (row === -1) return;

  makeMove(row, col);

  if (gameOver) return;

  if (mode !== "pvp") {
    playerTurn = false;
    setTimeout(aiMove, 350);
  }
}

function aiMove() {
  if (gameOver) return;

  let col =
    mode === "easy"
      ? aiEasyMove(board)
      : aiHardMove(board, currentPlayer);

  const row = getAvailableRow(board, col);
  if (row === -1) return;

  makeMove(row, col);

  if (!gameOver) {
    playerTurn = true;
  }
}

function makeMove(row, col) {
  play("drop");
  dropPiece(board, row, col, currentPlayer);
  updateUI(boardEl, row, col, currentPlayer);

  const result = checkWin(board, row, col);

  if (result && result.win) {
    highlightWin(boardEl, result.cells);
    play("win");
    setStatus(statusEl, `${currentPlayer} wins!`);
    gameOver = true;
    return;
  }

  if (isBoardFull(board)) {
    setStatus(statusEl, "It's a draw!");
    gameOver = true;
    return;
  }

  switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === "red" ? "yellow" : "red";
  setStatus(statusEl, `${currentPlayer}'s turn`);
}

resetBtn.addEventListener("click", startGame);
modeEl.addEventListener("change", startGame);

startGame();

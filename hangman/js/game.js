import { play } from "hangman/js/sounds.js";
import { updateDrawing, resetDrawing } from "hangman/js/drawing.js";
import { initTheme } from "hangman/js/ui.js";

initTheme();

let selectedWord = "";
let revealed = [];
let wrong = 0;
const maxWrong = 10;

const wordEl = document.getElementById("word");
const lettersEl = document.getElementById("letters");
const statusEl = document.getElementById("status");
const categoryEl = document.getElementById("category");

const categories = {
  wiki: [
    "algorithm","biodiversity","civilization","democracy","evolution",
    "galaxy","hydrogen","infrastructure","jurisdiction","kinetic",
    "literature","migration","neuron","oxygen","philosophy",
    "quantum","renaissance","sociology","technology","universe",
    "volcano","wavelength","xenon","yacht","zeolite"
  ],
  animals: [
    "tiger","elephant","giraffe","kangaroo","dolphin",
    "penguin","alligator","buffalo","cheetah","raccoon"
  ],
  countries: [
    "canada","brazil","germany","france","japan",
    "mexico","sweden","norway","egypt","australia"
  ],
  tech: [
    "processor","internet","software","hardware","database",
    "robotics","encryption","algorithm","network","quantum"
  ]
};

function startGame() {
  const list = categories[categoryEl.value];
  selectedWord = list[Math.floor(Math.random() * list.length)];
  revealed = Array(selectedWord.length).fill("_");
  wrong = 0;

  wordEl.textContent = revealed.join(" ");
  statusEl.textContent = "";
  statusEl.className = "status";

  lettersEl.innerHTML = "";
  createButtons();

  resetDrawing();
}

function createButtons() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let char of alphabet) {
    const btn = document.createElement("button");
    btn.classList.add("letter-btn");
    btn.textContent = char;

    btn.addEventListener("click", () => {
      play("click");
      guess(char, btn);
    });

    lettersEl.appendChild(btn);
  }
}

function guess(letter, btn) {
  btn.disabled = true;

  let found = false;
  const lower = letter.toLowerCase();

  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === lower) {
      revealed[i] = letter;
      found = true;
    }
  }

  if (!found) {
    wrong++;
    play("wrong");
    updateDrawing(wrong);
    updateStatusColor();
  }

  wordEl.textContent = revealed.join(" ");

  if (!revealed.includes("_")) {
    play("win");
    statusEl.textContent = "You win!";
    statusEl.classList.add("win-animation");
    disableAll();
  }

  if (wrong >= maxWrong) {
    play("lose");
    statusEl.textContent = `You lose! Word was: ${selectedWord}`;
    statusEl.classList.add("lose-animation");
    disableAll();
  }
}

function updateStatusColor() {
  if (wrong <= 3) statusEl.className = "status green";
  else if (wrong <= 6) statusEl.className = "status yellow";
  else statusEl.className = "status red";
}

function disableAll() {
  document.querySelectorAll(".letter-btn").forEach(b => b.disabled = true);
}

document.getElementById("resetBtn").addEventListener("click", startGame);
categoryEl.addEventListener("change", startGame);

// --- PHYSICAL KEYBOARD SUPPORT ---
document.addEventListener("keydown", (e) => {
  const key = e.key.toUpperCase();

  // Разрешаем только A–Z
  if (!/^[A-Z]$/.test(key)) return;

  // Находим кнопку на экране
  const btn = [...document.querySelectorAll(".letter-btn")]
    .find(b => b.textContent === key);

  // Если кнопка уже нажата — игнорируем
  if (!btn || btn.disabled) return;

  // Имитируем клик
  btn.click();
});


startGame();

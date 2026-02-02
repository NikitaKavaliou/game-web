export const sounds = {
  click: new Audio("sounds/click.wav"),
  wrong: new Audio("sounds/wrong.wav"),
  win: new Audio("sounds/win.wav"),
  lose: new Audio("sounds/lose.wav")
};

export function play(sound) {
  sounds[sound].currentTime = 0;
  sounds[sound].play();
}

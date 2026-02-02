export const sounds = {
  click: new Audio("sounds/click.wav"),
  drop: new Audio("sounds/drop.wav"),
  win: new Audio("sounds/win.wav")
};

export function play(sound) {
  sounds[sound].currentTime = 0;
  sounds[sound].play();
}

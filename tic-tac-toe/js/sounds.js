export const sounds = {
  click: new Audio("sounds/click.wav"),
  win: new Audio("sounds/win.wav"),
  draw: new Audio("sounds/draw.wav")
};

export function play(sound) {
  sounds[sound].currentTime = 0;
  sounds[sound].play();
}

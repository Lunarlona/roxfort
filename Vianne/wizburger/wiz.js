const WORD = "WizBurger";
const LOOP_TIME = 10000;

const colors = [
  '#FBDB4A',
  '#F3934A',
  '#EB547D',
  '#9F6AA7',
  '#5476B3',
  '#2BB19B'
];

const text = document.getElementById("text");

let letters = [];
let fontSize = 80;

function resize() {
  fontSize = Math.min(window.innerWidth / (WORD.length + 2), 120);
  text.style.fontSize = fontSize + "px";
}

function clearWord() {
  letters.forEach(l => text.removeChild(l));
  letters = [];
}

function buildWord() {
  clearWord();
  resize();

  const spacing = fontSize * 0.65;
  const totalWidth = spacing * (WORD.length - 1);
  const startX = -totalWidth / 2;

  WORD.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.color = colors[i % colors.length];
    text.appendChild(span);
    letters.push(span);

    const targetX = startX + i * spacing;

    TweenLite.fromTo(
      span,
      0.6,
      {
        x: 0,
        y: -fontSize,
        opacity: 0,
        scale: 0
      },
      {
        x: targetX,
        y: 0,
        opacity: 1,
        scale: 1,
        delay: i * 0.06,
        ease: Back.easeOut
      }
    );
  });
}

window.addEventListener("resize", buildWord);
buildWord();
setInterval(buildWord, LOOP_TIME);

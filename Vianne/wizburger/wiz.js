const WORD = "WizBurger";
const LOOP_TIME = 10000;

const colors = [
  "#FBDB4A",
  "#F3934A",
  "#EB547D",
  "#9F6AA7",
  "#5476B3",
  "#2BB19B"
];

const logo = document.getElementById("logo");

function buildWord() {
  logo.innerHTML = "";

  WORD.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.className = "letter";
    span.textContent = char;
    span.style.color = colors[i % colors.length];

    span.style.animation = "none";
    logo.appendChild(span);

    /* force reflow */
    void span.offsetHeight;

    span.style.animation = "popIn 0.6s ease-out forwards";
    span.style.animationDelay = `${i * 0.08}s`;
  });
}

buildWord();
setInterval(buildWord, LOOP_TIME);

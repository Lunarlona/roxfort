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

const stage = document.getElementById("stage");

function buildWord() {
  stage.innerHTML = "";

  WORD.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.className = "letter";
    span.textContent = char;
    span.style.color = colors[i % colors.length];

    /* animáció reset */
    span.style.animation = "none";

    stage.appendChild(span);

    /* force reflow – EZ A KULCS */
    void span.offsetHeight;

    /* animáció indítása */
    span.style.animation = "popIn 0.6s ease-out forwards";
    span.style.animationDelay = `${i * 0.08}s`;
  });
}

/* első indítás */
buildWord();

/* ismétlés */
setInterval(buildWord, LOOP_TIME);

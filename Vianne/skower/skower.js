(() => {
  const root = document.querySelector('[data-skower-ad]');
  if (!root) return;

  const wipe = root.querySelector('.skowerAd-wipe');
  const LOOP_TIME = 10000;

  function runCycle() {
    // indulás: koszos
    root.classList.remove('is-clean');

    // wipe reset
    wipe.style.animation = 'none';
    void wipe.offsetWidth;

    // wipe indítás
    wipe.style.animation = 'skowerWipe 900ms ease-in-out forwards';

    // tiszta állapot a wipe közepén
    setTimeout(() => {
      root.classList.add('is-clean');
    }, 450);

    // lassú visszakoszolódás (nem ugrik)
    setTimeout(() => {
      root.classList.remove('is-clean');
    }, 4500);
  }

  runCycle();
  setInterval(runCycle, LOOP_TIME);
})();

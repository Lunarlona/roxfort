(() => {
  const root = document.querySelector('[data-skower-ad]');
  if (!root) return;

  const wipe = root.querySelector('.skowerAd-wipe');
  const LOOP_TIME = 10000;

  function runClean() {
    root.classList.remove('is-clean');

    wipe.style.animation = 'none';
    void wipe.offsetWidth;

    wipe.style.animation = 'skowerWipe 900ms ease-in-out forwards';

    setTimeout(() => {
      root.classList.add('is-clean');
    }, 450);
  }

  runClean();
  setInterval(runClean, LOOP_TIME);
})();

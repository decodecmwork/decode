const menu = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menu.focus(); } });
window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);

const decodeArt = document.querySelector(".decode-art");
if (decodeArt) {
  const activateArt = () => decodeArt.classList.add("is-active");
  if ("IntersectionObserver" in window) {
    const artObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.setTimeout(activateArt, 180);
          artObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    artObserver.observe(decodeArt);
  } else {
    activateArt();
  }
  decodeArt.addEventListener("touchstart", activateArt, { passive: true });
}

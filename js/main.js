// Basic interactions: nav toggle, gallery lightbox, year update
document.addEventListener('DOMContentLoaded', function () {
  // Year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Gallery/lightbox
  const gallery = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbClose = document.getElementById('lightboxClose');
  const lbCaption = document.getElementById('lightboxCaption');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lbCaption.textContent = alt || '';
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
    // trap focus could be added for accessibility
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    lbImg.alt = '';
  }

  if (gallery) {
    gallery.addEventListener('click', function (e) {
      const btn = e.target.closest('.gallery-item');
      if (!btn) return;
      const src = btn.getAttribute('data-src');
      const alt = btn.querySelector('img')?.alt || '';
      openLightbox(src, alt);
    });
  }
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  // close on background click
  if (lightbox) lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  // close on escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
});

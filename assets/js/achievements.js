// assets/js/achievements.js
// Filters, counters, and lightbox for Achievements page

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const chips = Array.from(document.querySelectorAll('.aa-chip'));
    const cards = Array.from(document.querySelectorAll('.aa-card'));
    const countAll = document.getElementById('aa-count-all');
    const countAch = document.getElementById('aa-count-achev');
    const countAct = document.getElementById('aa-count-activ');

    function updateCounts() {
      const visible = cards.filter(c => c.style.display !== 'none');
      if (countAll) countAll.textContent = visible.length;
      if (countAch) countAch.textContent = visible.filter(c => (c.dataset.tags || '').includes('achievement')).length;
      if (countAct) countAct.textContent = visible.filter(c => (c.dataset.tags || '').includes('activity')).length;
    }

    function setActiveChip(el) {
      chips.forEach(c => c.classList.remove('active'));
      el.classList.add('active');
    }

    function filterCards(key) {
      cards.forEach(card => {
        if (key === 'all') { card.style.display = ''; return; }
        const tags = (card.getAttribute('data-tags') || '').toLowerCase();
        card.style.display = tags.includes(key) ? '' : 'none';
      });
      updateCounts();
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        setActiveChip(chip);
        filterCards(chip.dataset.filter);
      });
    });

    // Lightbox
    const modal = document.getElementById('aa-modal');
    const modalImg = document.getElementById('aa-modal-img');
    const modalTitle = document.getElementById('aa-modal-title');
    const modalDesc = document.getElementById('aa-modal-desc');
    const closeBtn = document.getElementById('aa-close');

    function openModal(card) {
      const img = card.querySelector('img');
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalTitle.textContent = card.querySelector('.aa-title')?.textContent || '';
      modalDesc.textContent = card.querySelector('.aa-desc')?.textContent || '';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => { modalImg.src = ''; }, 200);
    }

    cards.forEach(card => card.addEventListener('click', () => openModal(card)));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // Reveal animation
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.animate(
            [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }],
            { duration: 450, easing: 'cubic-bezier(.2,.8,.2,1)' }
          );
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .15 });
    cards.forEach(c => io.observe(c));

    // Initial counts
    updateCounts();
  });
})();

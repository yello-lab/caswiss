(() => {
  'use strict';

  const section = document.getElementById('archive');
  const grid = document.getElementById('archiveGrid');
  const dialog = document.getElementById('archiveDialog');
  if (!section || !grid || !dialog) return;

  const items = [...grid.querySelectorAll('.archive-item')];
  const filterButtons = [...section.querySelectorAll('[data-archive-filter]')];
  const countLabel = document.getElementById('archiveCount');
  const status = document.getElementById('archiveStatus');
  const viewToggle = document.getElementById('archiveViewToggle');
  const total = items.length;

  const filterLabels = {
    all: 'photographs',
    timepieces: 'timepieces',
    leather: 'leather pieces',
    details: 'detail photographs',
    house: 'house photographs'
  };

  const visibleItems = () => items.filter((item) => !item.hidden);

  const updateCount = (filter) => {
    const shown = visibleItems().length;
    if (countLabel) {
      countLabel.textContent = filter === 'all'
        ? `${total} plates`
        : `${shown} of ${total} plates`;
    }
    if (status) {
      status.textContent = filter === 'all'
        ? `Showing all ${total} photographs in the archive.`
        : `Showing ${shown} ${filterLabels[filter] || 'photographs'} of ${total}.`;
    }
  };

  const applyFilter = (filter) => {
    filterButtons.forEach((button) => {
      const active = button.dataset.archiveFilter === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    items.forEach((item) => {
      item.hidden = filter !== 'all' && item.dataset.category !== filter;
    });
    updateCount(filter);
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.archiveFilter));
  });

  if (viewToggle) {
    viewToggle.addEventListener('click', () => {
      const compact = !grid.classList.contains('is-contact-sheet');
      grid.classList.toggle('is-contact-sheet', compact);
      viewToggle.setAttribute('aria-pressed', String(compact));
      viewToggle.textContent = compact ? 'Gallery view' : 'Contact sheet view';
      if (status) {
        status.textContent = compact
          ? 'Contact sheet view. Smaller thumbnails, captions hidden.'
          : 'Gallery view. Captions visible.';
      }
    });
  }

  /* -----------------------------------------------------------------------
     Archive lightbox
     ----------------------------------------------------------------------- */

  const mainImg = dialog.querySelector('[data-archive-main]');
  const mainSource = dialog.querySelector('[data-archive-source]');
  const title = dialog.querySelector('[data-archive-title]');
  const category = dialog.querySelector('[data-archive-category]');
  const position = dialog.querySelector('[data-archive-position]');
  const ref = dialog.querySelector('[data-archive-ref]');
  const enquiry = dialog.querySelector('[data-archive-enquire]');
  const appointment = dialog.querySelector('[data-archive-appointment]');

  let currentItem = null;
  let lastTrigger = null;

  const preload = (item) => {
    if (!item) return;
    const image = new Image();
    image.src = item.dataset.largeWebp || item.dataset.largeJpg;
  };

  const showPlate = (item) => {
    if (!item) return;
    currentItem = item;

    if (mainSource) mainSource.srcset = item.dataset.largeWebp;
    if (mainImg) {
      mainImg.src = item.dataset.largeJpg;
      const thumb = item.querySelector('img');
      mainImg.alt = thumb ? thumb.alt : item.dataset.title;
    }
    if (title) title.textContent = item.dataset.title;
    if (category) category.textContent = item.dataset.categoryLabel;
    if (position) position.textContent = `Plate ${item.dataset.plate} / ${total}`;
    if (ref) ref.textContent = `Plate ${item.dataset.plate} · ${item.dataset.categoryLabel} · 2026 archive`;

    if (enquiry) {
      const message = `Hello CASWISS, I'm interested in archive plate ${item.dataset.plate} — ${item.dataset.title}. Please share availability, price and condition.`;
      enquiry.href = window.CASWISS && typeof window.CASWISS.whatsappUrl === 'function'
        ? window.CASWISS.whatsappUrl(message)
        : '#appointment';
    }

    const shown = visibleItems();
    const at = shown.indexOf(item);
    preload(shown[(at + 1) % shown.length]);
    preload(shown[(at - 1 + shown.length) % shown.length]);
  };

  const openDialog = (item, trigger) => {
    lastTrigger = trigger || item;
    showPlate(item);

    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    document.body.classList.add('modal-open');
  };

  const cleanup = () => {
    document.body.classList.remove('modal-open');
    currentItem = null;
    if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
  };

  const closeDialog = () => {
    if (typeof dialog.close === 'function' && dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
      cleanup();
    }
  };

  const step = (direction) => {
    const shown = visibleItems();
    if (!shown.length) return;
    let at = currentItem ? shown.indexOf(currentItem) : -1;
    if (at < 0) at = 0;
    else at = (at + direction + shown.length) % shown.length;
    showPlate(shown[at]);
  };

  items.forEach((item) => {
    item.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openDialog(item, item);
    });
  });

  dialog.querySelectorAll('[data-archive-close]').forEach((button) => {
    button.addEventListener('click', closeDialog);
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
  });

  dialog.addEventListener('close', cleanup);

  const prev = dialog.querySelector('[data-archive-prev]');
  const next = dialog.querySelector('[data-archive-next]');
  if (prev) prev.addEventListener('click', () => step(-1));
  if (next) next.addEventListener('click', () => step(1));

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      const shown = visibleItems();
      if (shown.length) showPlate(shown[0]);
    } else if (event.key === 'End') {
      event.preventDefault();
      const shown = visibleItems();
      if (shown.length) showPlate(shown[shown.length - 1]);
    }
  });

  if (appointment) {
    appointment.addEventListener('click', () => {
      if (dialog.open) closeDialog();
    });
  }

  /* Initial state */
  applyFilter('all');
})();

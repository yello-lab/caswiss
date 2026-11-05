(() => {
  'use strict';

  const WA_NUMBER = '233249655888';
  const whatsappUrl = (message) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

  window.CASWISS = Object.assign(window.CASWISS || {}, {
    whatsappNumber: WA_NUMBER,
    whatsappUrl
  });

  document.querySelectorAll('[data-wa]').forEach((el) => {
    el.href = whatsappUrl(el.dataset.wa || 'Hello CASWISS, I would like to enquire about the collection.');
    el.target = '_blank';
    el.rel = 'noopener';
  });

  /* -----------------------------------------------------------------------
     Header + mobile menu
     ----------------------------------------------------------------------- */

  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  const advisor = document.querySelector('.client-advisor');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    if (advisor) advisor.classList.toggle('is-visible', window.scrollY > 280);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      if (open) {
        mobileMenu.style.top = `${header.getBoundingClientRect().bottom}px`;
      }
      menuToggle.setAttribute('aria-expanded', String(open));
      mobileMenu.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
    });
    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  /* -----------------------------------------------------------------------
     The Edit filters
     ----------------------------------------------------------------------- */

  const filterButtons = [...document.querySelectorAll('.filter')];
  const products = [...document.querySelectorAll('.product')];
  const filterStatus = document.getElementById('filterStatus');

  const labels = {
    all: 'all pieces',
    timepieces: 'timepieces',
    footwear: 'footwear'
  };

  const applyFilter = (filter, announce = true) => {
    filterButtons.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    products.forEach((product) => {
      const show = filter === 'all' || product.dataset.category === filter;
      product.hidden = !show;
    });
    if (announce && filterStatus) {
      const count = products.filter((product) => !product.hidden).length;
      filterStatus.textContent = filter === 'all'
        ? `Showing all ${count} pieces.`
        : `Showing ${count} ${labels[filter] || 'pieces'}.`;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter));
  });

  document.querySelectorAll('[data-filter-link]').forEach((link) => {
    link.addEventListener('click', () => {
      const button = document.querySelector(`.filter[data-filter="${link.dataset.filterLink}"]`);
      if (button) button.click();
    });
  });

  /* -----------------------------------------------------------------------
     Product catalogue
     ----------------------------------------------------------------------- */

  const catalog = {
    'seiko-blue-automatic': {
      brand: 'Seiko', name: 'Blue Dial Automatic', ref: 'CS-T-01',
      spec: 'Steel case · sunray blue dial · leather strap',
      materials: 'Stainless steel case, textured leather strap, automatic movement',
      description: 'A deep blue dial that shifts with the light, framed by a slim steel case and finished on a textured leather strap. Understated at a glance; quietly precise on the wrist.',
      image: 'assets/img/products/seiko-blue-automatic-large.webp',
      imageAlt: 'Seiko automatic watch with a blue dial and dark leather strap',
      detail: 'assets/img/products/detail-seiko-blue-large.webp',
      detailAlt: 'Angled view of the Seiko blue dial automatic'
    },
    'seiko-steel-chronograph': {
      brand: 'Seiko', name: 'Steel Chronograph', ref: 'CS-T-02',
      spec: 'Steel bracelet · black dial · chronograph',
      materials: 'Stainless steel case and bracelet, black dial, chronograph registers',
      description: 'A clean, architectural chronograph in brushed steel. The black dial keeps the registers legible and the silhouette calm — an everyday instrument with a formal edge.',
      image: 'assets/img/products/seiko-steel-chronograph-large.webp',
      imageAlt: 'Seiko steel chronograph with a black dial and linked bracelet',
      detail: 'assets/img/products/detail-seiko-steel-large.webp',
      detailAlt: 'Detail of the Seiko steel chronograph'
    },
    'longines-champagne': {
      brand: 'Longines', name: 'Champagne Chronograph', ref: 'CS-T-03',
      spec: 'Steel case · champagne dial · chronograph',
      materials: 'Stainless steel case and bracelet, champagne dial, chronograph registers',
      description: 'Warm champagne tones against polished steel. A classic chronograph with a measured, mid-century confidence — the kind of piece that works as easily with tailoring as with denim.',
      image: 'assets/img/products/longines-champagne-large.webp',
      imageAlt: 'Longines chronograph with a champagne dial and steel bracelet',
      detail: 'assets/img/products/detail-longines-large.webp',
      detailAlt: 'Close view of the Longines champagne dial'
    },
    'lacoste-gold-blue': {
      brand: 'Lacoste', name: 'Gold & Blue Chronograph', ref: 'CS-T-04',
      spec: 'Gold-tone steel · blue dial · chronograph',
      materials: 'Gold-tone stainless steel, blue dial, chronograph registers',
      description: 'A gold-tone bracelet, a deep blue dial and a sport-luxe attitude. It is a piece that does not whisper, but still knows exactly when to stop.',
      image: 'assets/img/products/lacoste-gold-blue-large.webp',
      imageAlt: 'Lacoste gold-tone chronograph with a deep blue dial',
      detail: 'assets/img/products/detail-lacoste-large.webp',
      detailAlt: 'Detail of the Lacoste gold-tone bracelet'
    },
    'boss-olive': {
      brand: 'BOSS', name: 'Olive Chronograph', ref: 'CS-T-05',
      spec: 'Olive dial · orange accents · rubber strap',
      materials: 'Steel case, olive dial, orange accents, rubber strap',
      description: 'Olive, orange and brushed steel. A modern field watch with a tailored edge — built for weekends, travel and the spaces in between.',
      image: 'assets/img/products/boss-olive-large.webp',
      imageAlt: 'BOSS chronograph with an olive dial, orange accents and olive strap',
      detail: 'assets/img/products/detail-boss-large.webp',
      detailAlt: 'The BOSS olive chronograph worn on the wrist'
    },
    'fossil-orange': {
      brand: 'Fossil', name: 'Orange Dive Chronograph', ref: 'CS-T-06',
      spec: 'Orange strap · olive dial · dive chronograph',
      materials: 'Steel case, olive dial, rotating bezel, orange rubber strap',
      description: 'A deliberate flash of orange against a muted olive dial. Sporty, graphic and unapologetically modern — the piece that gives a quiet wardrobe its point of tension.',
      image: 'assets/img/products/fossil-orange-large.webp',
      imageAlt: 'Fossil dive chronograph with an olive dial and orange rubber strap',
      detail: 'assets/img/products/detail-fossil-large.webp',
      detailAlt: 'The Fossil orange dive chronograph'
    },
    'dw-gold-rectangle': {
      brand: 'Daniel Wellington', name: 'Gold Rectangle', ref: 'CS-T-07',
      spec: 'Gold-tone case · mesh bracelet · rectangular dial',
      materials: 'Gold-tone stainless steel case and mesh bracelet, rectangular dial',
      description: 'A rectangle, a mesh bracelet and a warm gold tone. Reduced to the essentials, it reads more like jewellery than instrument — precise, slim and quietly formal.',
      image: 'assets/img/products/dw-gold-rectangle-large.webp',
      imageAlt: 'Daniel Wellington rectangular gold watch on a gold mesh bracelet',
      detail: 'assets/img/products/detail-dw-large.webp',
      detailAlt: 'The Daniel Wellington gold rectangle on a black surface'
    },
    'movado-bold': {
      brand: 'Movado', name: 'Bold Chronograph', ref: 'CS-T-08',
      spec: 'Steel bracelet · black dial · chronograph',
      materials: 'Stainless steel case and bracelet, black dial, chronograph registers',
      description: 'A sculptural steel chronograph with Movado\'s signature restraint. The black dial and clean bracelet make it a natural companion to both a suit and a plain white tee.',
      image: 'assets/img/products/movado-bold-large.webp',
      imageAlt: 'Movado Bold steel chronograph with a black dial',
      detail: 'assets/img/products/detail-movado-bold-large.webp',
      detailAlt: 'The caseback of the Movado Bold chronograph'
    },
    'movado-blue-diver': {
      brand: 'Movado', name: 'Blue Diver', ref: 'CS-T-09',
      spec: 'Steel bracelet · blue dial · diver',
      materials: 'Stainless steel case and bracelet, blue dial, diver-style bezel',
      description: 'A technical diver softened by a deep blue dial and a brushed steel bracelet. Legible, robust and quietly handsome — built for water, worn for everything else.',
      image: 'assets/img/products/movado-blue-diver-large.webp',
      imageAlt: 'Movado diver watch with a blue dial and steel bracelet',
      detail: 'assets/img/products/detail-movado-diver-large.webp',
      detailAlt: 'Detail of the Movado blue diver bracelet'
    },
    'black-loafer': {
      brand: 'The CASWISS edit', name: 'The Black Loafer', ref: 'CS-F-01',
      spec: 'Polished leather · leather lining · low profile',
      materials: 'Polished leather upper, leather lining, rubber sole',
      description: 'A clean black loafer with a low profile and a softly rounded toe. The kind of shoe that disappears into a good outfit and elevates it at the same time.',
      image: 'assets/img/products/black-loafer-large.webp',
      imageAlt: 'Polished black leather loafer',
      detail: 'assets/img/products/detail-black-loafer-large.webp',
      detailAlt: 'Side view of the black leather loafer'
    },
    'boat-shoe': {
      brand: 'The CASWISS edit', name: 'The Brown Boat Shoe', ref: 'CS-F-02',
      spec: 'Burnished leather · rawhide laces · rubber sole',
      materials: 'Burnished leather upper, rawhide laces, rubber sole',
      description: 'Burnished brown leather, rawhide laces and a relaxed silhouette. An easy weekend classic that looks better with a little wear.',
      image: 'assets/img/products/boat-shoe-large.webp',
      imageAlt: 'Brown leather boat shoe with rawhide laces',
      detail: 'assets/img/products/detail-boat-shoe-large.webp',
      detailAlt: 'Detail of the brown boat shoe lacing'
    },
    'navy-suede-loafer': {
      brand: 'The CASWISS edit', name: 'The Navy Suede Loafer', ref: 'CS-F-03',
      spec: 'Navy suede · leather lining · driving sole',
      materials: 'Navy suede upper, leather lining, rubber driving sole',
      description: 'Deep navy suede with a soft, unlined feel. Understated enough for the office, relaxed enough for a long lunch — a quiet alternative to black.',
      image: 'assets/img/products/navy-suede-loafer-large.webp',
      imageAlt: 'Pair of navy suede loafers',
      detail: 'assets/img/products/detail-navy-loafer-large.webp',
      detailAlt: 'Detail of the navy suede loafer'
    },
    'tan-brogue': {
      brand: 'The CASWISS edit', name: 'The Tan Brogue', ref: 'CS-F-04',
      spec: 'Burnished tan leather · brogue detail · leather sole',
      materials: 'Burnished tan leather upper, brogue detailing, leather sole',
      description: 'A proper brogue in burnished tan. Punched detailing, a clean welt and a colour that deepens with age — tailoring\'s most useful companion.',
      image: 'assets/img/products/tan-brogue-large.webp',
      imageAlt: 'Burnished tan leather brogue with punched detailing',
      detail: 'assets/img/products/detail-tan-brogue-large.webp',
      detailAlt: 'Detail of the tan brogue sole and heel'
    },
    'navy-driver': {
      brand: 'The CASWISS edit', name: 'The Navy Driver', ref: 'CS-F-05',
      spec: 'Navy suede · stitched toe · driving sole',
      materials: 'Navy suede upper, stitched toe, rubber driving sole',
      description: 'A low, flexible driver in navy suede. Made for movement — the shoe you keep by the door for weekends, road trips and everything unplanned.',
      image: 'assets/img/products/navy-driver-large.webp',
      imageAlt: 'Navy suede driving shoe with a stitched toe',
      detail: 'assets/img/products/detail-navy-driver-large.webp',
      detailAlt: 'Detail of the navy suede driver'
    },
    'tassel-loafer': {
      brand: 'The CASWISS edit', name: 'The Two-Tone Tassel Loafer', ref: 'CS-F-06',
      spec: 'Two-tone leather · tassel detail · leather sole',
      materials: 'Two-tone leather upper, tassel detail, leather sole',
      description: 'Brown and cognac leather, a soft tassel and a slightly raised profile. Old-world charm, worn with a light touch.',
      image: 'assets/img/products/tassel-loafer-large.webp',
      imageAlt: 'Pair of brown two-tone leather tassel loafers'
    }
  };

  const dialog = document.getElementById('productDialog');
  const dialogMain = dialog?.querySelector('[data-dialog-main]');
  const dialogDetailWrap = dialog?.querySelector('[data-dialog-detail-wrap]');
  const dialogDetail = dialog?.querySelector('[data-dialog-detail]');
  const dialogBrand = dialog?.querySelector('[data-dialog-brand]');
  const dialogName = dialog?.querySelector('[data-dialog-name]');
  const dialogSpec = dialog?.querySelector('[data-dialog-spec]');
  const dialogDescription = dialog?.querySelector('[data-dialog-description]');
  const dialogRef = dialog?.querySelector('[data-dialog-ref]');
  const dialogMaterials = dialog?.querySelector('[data-dialog-materials]');
  const dialogCondition = dialog?.querySelector('[data-dialog-condition]');
  const dialogWa = dialog?.querySelector('[data-dialog-wa]');
  const dialogAppointment = dialog?.querySelector('[data-dialog-appointment]');

  let lastTrigger = null;

  const openProduct = (id, trigger) => {
    const product = catalog[id];
    if (!product || !dialog) return;
    lastTrigger = trigger || null;

    dialogBrand.textContent = product.brand;
    dialogName.textContent = product.name;
    dialogSpec.textContent = product.spec;
    dialogDescription.textContent = product.description;
    dialogRef.textContent = product.ref;
    dialogMaterials.textContent = product.materials;
    dialogCondition.textContent = 'Available for inspection · full report on request';

    dialogMain.src = product.image;
    dialogMain.alt = product.imageAlt;
    if (product.detail) {
      dialogDetailWrap.hidden = false;
      dialogDetail.src = product.detail;
      dialogDetail.alt = product.detailAlt || product.imageAlt;
    } else {
      dialogDetailWrap.hidden = true;
      dialogDetail.removeAttribute('src');
      dialogDetail.alt = '';
    }

    dialogWa.href = whatsappUrl(`Hello CASWISS, I'm interested in the ${product.brand} ${product.name} (${product.ref}). Please share availability, price and condition.`);

    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    document.body.classList.add('modal-open');
  };

  const closeProduct = () => {
    if (!dialog) return;
    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else dialog.removeAttribute('open');
    document.body.classList.remove('modal-open');
  };

  document.querySelectorAll('[data-open-product]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      openProduct(link.dataset.openProduct, link);
    });
  });

  if (dialog) {
    dialog.querySelectorAll('[data-dialog-close]').forEach((button) => {
      button.addEventListener('click', closeProduct);
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeProduct();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      if (lastTrigger) lastTrigger.focus();
    });
    if (dialogAppointment) {
      dialogAppointment.addEventListener('click', () => {
        closeProduct();
      });
    }
  }

  /* -----------------------------------------------------------------------
     Appointment form → WhatsApp
     ----------------------------------------------------------------------- */

  const appointmentForm = document.getElementById('appointmentForm');
  const formStatus = document.getElementById('formStatus');
  const dateInput = document.getElementById('date');

  if (dateInput) {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - offset * 60000).toISOString().split('T')[0];
    dateInput.min = localToday;
  }

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const nameInput = document.getElementById('name');
      const phoneInput = document.getElementById('phone');
      const interestInput = document.getElementById('interest');
      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const interest = interestInput.value;
      const date = dateInput.value;

      if (!name) {
        nameInput.setAttribute('aria-invalid', 'true');
        nameInput.focus();
        formStatus.textContent = 'Please add your name so we know who to expect.';
        return;
      }

      nameInput.removeAttribute('aria-invalid');
      const message = [
        'Hello CASWISS, I would like to request a private viewing.',
        '',
        `Name: ${name}`,
        `Phone / WhatsApp: ${phone || '—'}`,
        `Interested in: ${interest}`,
        `Preferred date: ${date || 'Flexible'}`,
        '',
        'Please share available times and next steps.'
      ].join('\n');

      const link = document.createElement('a');
      link.href = whatsappUrl(message);
      link.target = '_blank';
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      link.remove();
      formStatus.textContent = 'Opening WhatsApp with your request…';
    });
  }

  /* -----------------------------------------------------------------------
     Scroll reveal
     ----------------------------------------------------------------------- */

  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min((index % 3) * 70, 140)}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  /* -----------------------------------------------------------------------
     Utilities
     ----------------------------------------------------------------------- */

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  window.CASWISS_READY = true;
})();

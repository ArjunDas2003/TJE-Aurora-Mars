/**
 * AURORA COSMETICS — MARS LIPSTICK COLLECTION
 * Modern Minimalist Interactive Controller (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. DATA STATE & MARS SHADES CATALOG
  // -------------------------------------------------------------------------
  const shadesData = {
    'cherry-red': {
      id: 'cherry-red',
      name: 'Cherry Red',
      code: 'AUR-MRS-01',
      price: 42,
      finish: 'Velvet Matte',
      undertone: 'Undertone: Cool Crimson',
      chroma: '98.4% Optical Purity',
      specFinish: 'Non-Drying Velvet Matte',
      wear: '12 Hours Tested',
      hex: '#8B1223',
      desc: 'A commanding, classic deep crimson red engineered with high-density blue-red pigments for unmistakable chromatic presence.',
      img: 'assets/images/shade-cherry-red.jpg'
    },
    'rosella': {
      id: 'rosella',
      name: 'Rosella',
      code: 'AUR-MRS-02',
      price: 42,
      finish: 'Luminous Satin',
      undertone: 'Undertone: Rose Coral Berry',
      chroma: '96.8% Optical Purity',
      specFinish: 'Light-Reflective Luminous Satin',
      wear: '10 Hours Tested',
      hex: '#C64A62',
      desc: 'A radiant, vibrant rose-coral berry imbued with warm coral undertones and micro-reflective botanical lipids for daylight radiance.',
      img: 'assets/images/shade-rosella.jpg'
    },
    'leading-lady': {
      id: 'leading-lady',
      name: 'Leading Lady',
      code: 'AUR-MRS-03',
      price: 42,
      finish: 'Velvet Matte',
      undertone: 'Undertone: Deep Plum Wine',
      chroma: '99.1% Optical Purity',
      specFinish: 'Ultra-Rich Velvet Matte',
      wear: '14 Hours Tested',
      hex: '#4A1222',
      desc: 'An alluring, iconic deep plum velvet berry. Formulated with saturated blackcurrant and violet undertones for theatrical depth.',
      img: 'assets/images/shade-leading-lady.jpg'
    }
  };

  let activeShadeId = 'cherry-red';
  let activeQty = 1;
  let cart = [];

  // Load saved cart from localStorage
  try {
    const savedCart = localStorage.getItem('aurora_mars_cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch (e) {
    console.warn('Storage unavailable', e);
  }

  // -------------------------------------------------------------------------
  // 2. DOM ELEMENTS
  // -------------------------------------------------------------------------
  // Header & Scroll
  const siteHeader = document.getElementById('siteHeader');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  // Shade Selector Elements
  const activeShadeImg = document.getElementById('activeShadeImg');
  const shadeZoomBadge = document.getElementById('shadeZoomBadge');
  const shadeCodeDisplay = document.getElementById('shadeCodeDisplay');
  const shadeNameDisplay = document.getElementById('shadeNameDisplay');
  const shadePriceDisplay = document.getElementById('shadePriceDisplay');
  const shadeFinishBadge = document.getElementById('shadeFinishBadge');
  const selectedUndertoneText = document.getElementById('selectedUndertoneText');
  const shadeDescDisplay = document.getElementById('shadeDescDisplay');
  const specChroma = document.getElementById('specChroma');
  const specFinish = document.getElementById('specFinish');
  const specWear = document.getElementById('specWear');
  const swatchButtons = document.querySelectorAll('.swatch-btn');
  const btnBagLabel = document.getElementById('btnBagLabel');
  const addToBagMain = document.getElementById('addToBagMain');
  const swatchDotIndicator = document.getElementById('swatchDotIndicator');
  const swatchHexIndicator = document.getElementById('swatchHexIndicator');

  // Quantity Elements
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const qtyVal = document.getElementById('qtyVal');

  // Mobile Sticky Bar
  const mobileStickyShadeName = document.getElementById('mobileStickyShadeName');
  const mobileStickyAddBtn = document.getElementById('mobileStickyAddBtn');
  const mobileStickySwatch = document.getElementById('mobileStickySwatch');

  // Mobile Navigation Drawer
  const menuToggle = document.getElementById('menuToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');

  // Bag Drawer Elements
  const bagBtn = document.getElementById('bagBtn');
  const bagDrawer = document.getElementById('bagDrawer');
  const bagOverlay = document.getElementById('bagOverlay');
  const bagCloseBtn = document.getElementById('bagCloseBtn');
  const bagBadge = document.getElementById('bagBadge');
  const bagDrawerCount = document.getElementById('bagDrawerCount');
  const bagItemsList = document.getElementById('bagItemsList');
  const bagSubtotal = document.getElementById('bagSubtotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // Toast & Newsletter
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');

  // FAQ Accordions
  const faqItems = document.querySelectorAll('.faq-item');

  // -------------------------------------------------------------------------
  // 3. SHADE SWITCHER LOGIC
  // -------------------------------------------------------------------------
  function setShade(shadeId) {
    const data = shadesData[shadeId];
    if (!data) return;

    activeShadeId = shadeId;

    // Smooth image transition
    activeShadeImg.style.opacity = '0';
    activeShadeImg.style.transform = 'scale(0.96)';

    setTimeout(() => {
      activeShadeImg.src = data.img;
      activeShadeImg.alt = `Aurora Mars Lipstick in ${data.name}`;
      activeShadeImg.style.opacity = '1';
      activeShadeImg.style.transform = 'scale(1)';
    }, 150);

    // Update Text Content
    if (shadeZoomBadge) shadeZoomBadge.textContent = `ACTIVE SPECIMEN // ${data.code}`;
    if (shadeCodeDisplay) shadeCodeDisplay.textContent = `CODE // ${data.code}`;
    if (shadeNameDisplay) shadeNameDisplay.textContent = data.name;
    if (shadePriceDisplay) shadePriceDisplay.textContent = `$${data.price.toFixed(2)}`;
    if (shadeFinishBadge) shadeFinishBadge.textContent = data.finish;
    if (selectedUndertoneText) selectedUndertoneText.textContent = data.undertone;
    if (shadeDescDisplay) shadeDescDisplay.textContent = data.desc;
    if (specChroma) specChroma.textContent = data.chroma;
    if (specFinish) specFinish.textContent = data.specFinish;
    if (specWear) specWear.textContent = data.wear;

    // Update Swatch Indicators
    if (swatchDotIndicator) swatchDotIndicator.style.backgroundColor = data.hex;
    if (swatchHexIndicator) swatchHexIndicator.textContent = `HEX: ${data.hex}`;

    // Mobile sticky bar sync
    if (mobileStickyShadeName) mobileStickyShadeName.textContent = data.name;
    if (mobileStickySwatch) mobileStickySwatch.style.backgroundColor = data.hex;

    // Update active swatch button
    swatchButtons.forEach(btn => {
      const match = btn.getAttribute('data-shade-id') === shadeId;
      btn.classList.toggle('is-active', match);
      btn.setAttribute('aria-checked', match ? 'true' : 'false');
    });

    updatePriceDisplay();
  }

  function updatePriceDisplay() {
    const currentPrice = shadesData[activeShadeId].price * activeQty;
    if (btnBagLabel) {
      btnBagLabel.textContent = `Add to Bag — $${currentPrice.toFixed(2)}`;
    }
    if (mobileStickyAddBtn) {
      mobileStickyAddBtn.innerHTML = `<span>Add — $${currentPrice.toFixed(2)}</span>`;
    }
  }

  // Global helper for comparison table buttons
  window.selectAndScrollToShade = function(shadeId) {
    setShade(shadeId);
    const collectionSec = document.getElementById('collection');
    if (collectionSec) {
      collectionSec.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Selected ${shadesData[shadeId].name}`);
  };

  // Bind Swatch Buttons
  swatchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const shadeId = btn.getAttribute('data-shade-id');
      setShade(shadeId);
    });
  });

  // -------------------------------------------------------------------------
  // 4. QUANTITY CONTROLS
  // -------------------------------------------------------------------------
  qtyMinus.addEventListener('click', () => {
    if (activeQty > 1) {
      activeQty -= 1;
      qtyVal.textContent = activeQty;
      updatePriceDisplay();
    }
  });

  qtyPlus.addEventListener('click', () => {
    if (activeQty < 10) {
      activeQty += 1;
      qtyVal.textContent = activeQty;
      updatePriceDisplay();
    }
  });

  // -------------------------------------------------------------------------
  // 5. SHOPPING BAG & CART DRAWER
  // -------------------------------------------------------------------------
  function saveCart() {
    try {
      localStorage.setItem('aurora_mars_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  }

  function renderCart() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    bagBadge.textContent = totalCount;
    bagDrawerCount.textContent = `(${totalCount})`;
    bagSubtotal.textContent = `$${subtotal.toFixed(2)}`;

    if (cart.length === 0) {
      bagItemsList.innerHTML = `
        <div class="bag-empty-notice">
          Your bag is currently empty.<br><br>
          <a href="#collection" class="btn btn-secondary" style="margin-top: 12px;" id="emptyCartExploreBtn">
            Discover The Mars Shades
          </a>
        </div>
      `;
      const exploreBtn = document.getElementById('emptyCartExploreBtn');
      if (exploreBtn) {
        exploreBtn.addEventListener('click', closeBagDrawer);
      }
      return;
    }

    bagItemsList.innerHTML = cart.map((item, index) => `
      <div class="bag-item-card" data-index="${index}">
        <img src="${item.img}" alt="${item.name}" class="bag-item-thumb">
        <div class="bag-item-details">
          <span class="bag-item-title">${item.name}</span>
          <span class="bag-item-shade">${item.code} • ${item.finish}</span>
          <span class="bag-item-price">$${item.price.toFixed(2)} × ${item.qty}</span>
        </div>
        <button class="bag-item-remove" data-index="${index}" aria-label="Remove ${item.name} from bag">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `).join('');

    // Attach remove event handlers
    const removeButtons = bagItemsList.querySelectorAll('.bag-item-remove');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        removeFromCart(idx);
      });
    });
  }

  function addToCart(shadeId, qty = 1) {
    const shade = shadesData[shadeId];
    if (!shade) return;

    const existingIndex = cart.findIndex(item => item.id === shadeId);
    if (existingIndex > -1) {
      cart[existingIndex].qty += qty;
    } else {
      cart.push({
        id: shade.id,
        name: shade.name,
        code: shade.code,
        price: shade.price,
        finish: shade.finish,
        img: shade.img,
        qty: qty
      });
    }

    saveCart();
    renderCart();
    openBagDrawer();
    showToast(`Added ${shade.name} (${qty}) to Bag`);
  }

  function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
      const removedName = cart[index].name;
      cart.splice(index, 1);
      saveCart();
      renderCart();
      showToast(`Removed ${removedName} from Bag`);
    }
  }

  function openBagDrawer() {
    bagDrawer.classList.add('open');
    bagOverlay.classList.add('open');
    bagDrawer.setAttribute('aria-hidden', 'false');
    bagOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
  }

  window.closeBagDrawer = function() {
    bagDrawer.classList.remove('open');
    bagOverlay.classList.remove('open');
    bagDrawer.setAttribute('aria-hidden', 'true');
    bagOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
  };

  // Hook bag events
  bagBtn.addEventListener('click', openBagDrawer);
  bagCloseBtn.addEventListener('click', closeBagDrawer);
  bagOverlay.addEventListener('click', closeBagDrawer);

  // Main Add to Bag button
  addToBagMain.addEventListener('click', () => {
    addToCart(activeShadeId, activeQty);
  });

  // Mobile Sticky Add button
  if (mobileStickyAddBtn) {
    mobileStickyAddBtn.addEventListener('click', () => {
      addToCart(activeShadeId, 1);
    });
  }

  // Quick Add buttons on product cards
  const quickAddButtons = document.querySelectorAll('.quick-add-btn');
  quickAddButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const shadeId = btn.getAttribute('data-shade-id');
      addToCart(shadeId, 1);
    });
  });

  // Checkout simulation
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Your bag is empty.');
      return;
    }
    showToast('Redirecting to Secure Swiss Checkout...');
    setTimeout(() => {
      alert(`[AURORA COSMETICS SECURE CHECKOUT]\nOrder Subtotal: ${bagSubtotal.textContent}\nComplimentary Temperature-Controlled Cold-Chain Courier Applied.\n\nThank you for choosing the Mars Collection.`);
      cart = [];
      saveCart();
      renderCart();
      closeBagDrawer();
    }, 600);
  });

  // -------------------------------------------------------------------------
  // 6. MOBILE NAVIGATION DRAWER
  // -------------------------------------------------------------------------
  function openMobileNav() {
    mobileNavDrawer.classList.add('open');
    if (mobileNavOverlay) mobileNavOverlay.classList.add('open');
    mobileNavDrawer.setAttribute('aria-hidden', 'false');
    menuToggle.classList.add('is-active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-open');
  }

  function closeMobileNav() {
    mobileNavDrawer.classList.remove('open');
    if (mobileNavOverlay) mobileNavOverlay.classList.remove('open');
    mobileNavDrawer.setAttribute('aria-hidden', 'true');
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-open');
  }

  menuToggle.addEventListener('click', () => {
    if (mobileNavDrawer.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
  if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNav);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // Close drawers on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (bagDrawer.classList.contains('open')) closeBagDrawer();
      if (mobileNavDrawer.classList.contains('open')) closeMobileNav();
    }
  });

  // -------------------------------------------------------------------------
  // 7. TOAST NOTIFICATIONS
  // -------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(msg) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage.textContent = msg;
    toastNotice.classList.add('show');

    toastTimer = setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3200);
  }

  // -------------------------------------------------------------------------
  // 8. NEWSLETTER DISPATCH FORM
  // -------------------------------------------------------------------------
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterEmail.value.trim();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.');
      newsletterEmail.focus();
      return;
    }
    showToast(`Dispatch registration confirmed for ${email}`);
    newsletterEmail.value = '';
  });

  // -------------------------------------------------------------------------
  // 9. FAQ ACCORDION INTERACTION
  // -------------------------------------------------------------------------
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other accordion items for clean accordion UX
      faqItems.forEach(other => {
        other.classList.remove('active');
        const btn = other.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // -------------------------------------------------------------------------
  // 10. SCROLL PROGRESS, STICKY HEADER & BACK TO TOP
  // -------------------------------------------------------------------------
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // 1. Scroll Progress Bar
    if (scrollProgressBar && docHeight > 0) {
      const progressPercent = (scrollY / docHeight) * 100;
      scrollProgressBar.style.width = `${progressPercent}%`;
    }

    // 2. Sticky Header Shadow
    if (siteHeader) {
      if (scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // 3. Back to Top Button
    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // 4. Active Nav Scrollspy
    const sections = document.querySelectorAll('section[id]');
    const desktopLinks = document.querySelectorAll('.nav-desktop .nav-link');
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    desktopLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Back to top click handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Initial render
  renderCart();
  setShade('cherry-red');
});

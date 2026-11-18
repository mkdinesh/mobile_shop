/* ============================================================
   MobiGear – app.js
   Interactive JS for the Drupal Mockup Prototype
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. Countdown Timer ---- */
  let totalSeconds = 8 * 3600 + 45 * 60 + 30;
  const hrsEl = document.getElementById('hrs');
  const minEl = document.getElementById('min');
  const secEl = document.getElementById('sec');

  function updateCountdown() {
    if (totalSeconds <= 0) return;
    totalSeconds--;
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (hrsEl) hrsEl.textContent = String(h).padStart(2, '0');
    if (minEl) minEl.textContent = String(m).padStart(2, '0');
    if (secEl) secEl.textContent = String(s).padStart(2, '0');
  }
  setInterval(updateCountdown, 1000);

  /* ---- 2. Product Filter Tabs ---- */
  const tabs = document.querySelectorAll('.tab');
  const products = document.querySelectorAll('.product-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      products.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn .35s ease';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ---- 3. Add to Cart ---- */
  const cartBtns = document.querySelectorAll('.btn-cart');
  const toast = document.getElementById('toast');
  const badge = document.querySelector('.cart-icon .badge');
  let cartCount = 3;

  cartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      cartCount++;
      if (badge) badge.textContent = cartCount;

      // Show toast
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2200);

      // Button flash
      btn.style.background = '#10B981';
      btn.style.borderColor = '#10B981';
      btn.style.color = 'white';
      btn.innerHTML = '<i class="fas fa-check"></i> Added!';
      setTimeout(() => {
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
        btn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
      }, 1500);
    });
  });

  /* ---- 4. Wishlist Toggle ---- */
  document.querySelectorAll('.product-actions button:first-child').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const icon = btn.querySelector('i');
      icon.classList.toggle('fas');
      icon.classList.toggle('far');
      btn.style.background = icon.classList.contains('fas') ? '#FF6B6B' : '';
      btn.style.color     = icon.classList.contains('fas') ? 'white'  : '';
    });
  });

  /* ---- 5. Back to Top ---- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- 6. Smooth Scroll for Nav ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- 7. Active nav link on scroll ---- */
  const navLinks = document.querySelectorAll('.navbar a');
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  /* ---- 8. Newsletter Form ---- */
  const nlBtn = document.querySelector('.nl-form button');
  const nlInput = document.querySelector('.nl-form input');
  if (nlBtn && nlInput) {
    nlBtn.addEventListener('click', () => {
      if (nlInput.value.includes('@')) {
        nlBtn.innerHTML = '✓ Subscribed!';
        nlBtn.style.background = '#10B981';
        nlInput.value = '';
        setTimeout(() => {
          nlBtn.innerHTML = 'Subscribe <i class="fas fa-paper-plane"></i>';
          nlBtn.style.background = '';
        }, 3000);
      } else {
        nlInput.style.border = '2px solid #FF6B6B';
        nlInput.placeholder = 'Please enter a valid email';
        setTimeout(() => { nlInput.style.border = ''; nlInput.placeholder = 'Enter your email address'; }, 2000);
      }
    });
  }

  /* ---- 9. Animate elements on scroll ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .category-card, .testimonial-card, .trust-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .4s ease, transform .4s ease';
    observer.observe(el);
  });

});

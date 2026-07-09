(function () {
  'use strict';

  var navbar = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      var spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        var spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = navbar.offsetHeight + 16;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var fadeEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  var sections = document.querySelectorAll('section[id]');
  var navAnchors = navLinks ? navLinks.querySelectorAll('a') : [];

  function highlightNav() {
    var scrollY = window.scrollY + navbar.offsetHeight + 80;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(function (a) {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + id) {
            a.style.color = 'var(--gold)';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.addEventListener('click', function () {
      item.classList.toggle('open');
    });
  });

  var form = document.getElementById('formCita');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nombre = document.getElementById('nombre').value;
      var telefono = document.getElementById('telefono').value;
      var email = document.getElementById('email').value;
      var categoria = document.getElementById('categoria').value;
      var presupuesto = document.getElementById('presupuesto').value;
      var detalle = document.getElementById('detalle').value;

      if (!nombre || !telefono || !email || !categoria) {
        alert('Por favor llena todos los campos obligatorios.');
        return;
      }

      var msg = 'Hola Rossy! 👋 Quiero agendar una cita.\n\n' +
        '*Nombre:* ' + nombre + '\n' +
        '*Teléfono:* ' + telefono + '\n' +
        '*Email:* ' + email + '\n' +
        '*Busco:* ' + categoria + '\n' +
        '*Presupuesto:* ' + presupuesto + '\n' +
        '*Detalles:* ' + (detalle || 'Sin detalles adicionales');

      if (typeof fbq !== 'undefined') { fbq('track', 'Lead'); }
      document.getElementById('successMsg').style.display = 'block';
      setTimeout(function () {
        window.open('https://wa.me/16024703727?text=' + encodeURIComponent(msg), '_blank');
      }, 800);
    });
  }

  var waFloat = document.querySelector('.wa-float');
  var footer = document.querySelector('.footer');

  if (waFloat && footer) {
    var floatObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        waFloat.style.opacity = entry.isIntersecting ? '0' : '1';
        waFloat.style.pointerEvents = entry.isIntersecting ? 'none' : '';
      });
    }, { threshold: 0.1 });

    floatObserver.observe(footer);
  }
})();

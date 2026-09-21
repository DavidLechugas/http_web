(function() {
  "use strict";

  /**
   * Helper selector
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Scroll listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header');
    let offset = header ? header.offsetHeight : 70;

    if (header && !header.classList.contains('header-scrolled')) {
      offset -= 16;
    }

    let targetEl = select(el);
    if (targetEl) {
      let elementPos = targetEl.offsetTop;
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      });
    }
  };

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header');
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top');
        if (nextElement) nextElement.classList.add('scrolled-offset');
      } else {
        selectHeader.classList.remove('fixed-top');
        if (nextElement) nextElement.classList.remove('scrolled-offset');
      }
    };
    window.addEventListener('load', headerFixed);
    onscroll(document, headerFixed);
  }

  /**
   * Mobile navigation toggle
   */
  document.addEventListener("DOMContentLoaded", function() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navbar = document.querySelector('#navbar');
    if (mobileToggle && navbar) {
      mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navbar.classList.toggle('navbar-mobile');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
      });

      // Close mobile menu when clicking a link
      navbar.querySelectorAll('.scrollto').forEach(link => {
        link.addEventListener('click', () => {
          if (navbar.classList.contains('navbar-mobile')) {
            navbar.classList.remove('navbar-mobile');
            mobileToggle.classList.add('bi-list');
            mobileToggle.classList.remove('bi-x');
          }
        });
      });
    }
  });

  /**
   * Scroll with offset on page load with hash links in url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader optimizado con salvaguarda de tiempo para Azure
   */
  let preloader = select('#preloader');
  if (preloader) {
    const dismissPreloader = () => {
      if (preloader && preloader.parentNode) {
        preloader.style.transition = 'opacity 0.25s ease';
        preloader.style.opacity = '0';
        setTimeout(() => {
          if (preloader && preloader.parentNode) preloader.remove();
        }, 250);
      }
    };
    window.addEventListener('load', dismissPreloader);
    setTimeout(dismissPreloader, 800);
  }

  /**
   * Mostrar / Ocultar Texto de Sobre Nosotros
   */
  document.addEventListener("DOMContentLoaded", function() {
    const btnMostrarOcultar = document.getElementById("mostrarOcultar");
    if (btnMostrarOcultar) {
      btnMostrarOcultar.addEventListener("click", function() {
        var texto = document.getElementById("textoOculto");
        if (texto.style.display === "none" || texto.style.display === "") {
          texto.style.display = "block";
          document.getElementById("tituloBienvenida").textContent = "¡Bienvenidos a 'Artesanías de Nuestra Tierra'!";
          this.textContent = "Ocultar Texto";
        } else {
          texto.style.display = "none";
          document.getElementById("tituloBienvenida").textContent = "¡Bienvenidos a 'Artesanías de Nuestra Tierra'!";
          this.textContent = "Mostrar Texto";
        }
      });
    }
  });

  /**
   * Cambiar Tonalidad (Modo Oscuro / Original limpio sin recargar)
   */
  var tonalidadOscura = false;

  function cambiarTonalidad() {
    if (tonalidadOscura) {
      restaurarTonalidadOriginal();
      tonalidadOscura = false;
    } else {
      cambiarTonalidadOscura();
      tonalidadOscura = true;
    }
  }

  function cambiarTonalidadOscura() {
    var header = document.getElementById('header');
    if (header) header.style.background = '#222';

    var logoText = document.querySelectorAll('#header .logo a');
    logoText.forEach(el => el.style.color = '#eee');

    var enlaces = document.querySelectorAll('.navbar a');
    enlaces.forEach(el => el.style.color = '#eee');

    var enlacesActivos = document.querySelectorAll('.navbar a:hover, .navbar .active, .navbar .active:focus, .navbar li:hover>a');
    enlacesActivos.forEach(el => el.style.color = '#03d406');

    var h1 = document.querySelector('#hero h1');
    if (h1) h1.style.color = '#eee';

    var h2 = document.querySelector('#hero h2');
    if (h2) h2.style.color = '#08961b';

    var btn = document.querySelector('#hero .btn-get-started');
    if (btn) btn.style.backgroundColor = '#08961b';

    var productos = document.getElementById('productos');
    if (productos) productos.style.backgroundColor = '#222';

    var tituloSeccion = document.querySelectorAll('.section-title h2');
    tituloSeccion.forEach(t => {
      t.style.backgroundColor = '#08961b';
      t.style.color = '#eee';
    });

    var members = document.querySelectorAll('.products .member');
    members.forEach(member => member.style.backgroundColor = '#111');

    var titulos = document.querySelectorAll('.products .member .member-info h4');
    titulos.forEach(titulo => titulo.style.color = '#eee');

    var nosotros = document.getElementById('nosotros');
    if (nosotros) nosotros.style.backgroundColor = '#222';

    var contacto = document.getElementById('contacto');
    if (contacto) contacto.style.backgroundColor = '#222';

    var contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
      card.style.backgroundColor = '#1a1a1a';
      card.style.borderColor = '#333';
    });

    var boton = document.getElementById('mostrarOcultar');
    if (boton) boton.style.backgroundColor = '#08961b';

    var textoOculto = document.getElementById('textoOculto');
    if (textoOculto) {
      textoOculto.style.backgroundColor = '#222';
      var parrafos = textoOculto.querySelectorAll('p');
      parrafos.forEach(p => p.style.color = '#eee');
    }

    var tituloBienvenida = document.getElementById('tituloBienvenida');
    if (tituloBienvenida) tituloBienvenida.style.color = '#eee';

    var footer = document.getElementById('footer');
    if (footer) footer.style.background = '#111';

    var footerTop = document.getElementById('footer-top');
    if (footerTop) footerTop.style.background = '#111';

    var footerLinks = document.querySelectorAll('#footer .footer-links h4, #footer .footer-links a, #footer .footer-links p');
    footerLinks.forEach(link => link.style.color = '#eee');

    var copyright = document.querySelector('#footer .copyright');
    if (copyright) copyright.style.color = '#eee';
  }

  function restaurarTonalidadOriginal() {
    var header = document.getElementById('header');
    if (header) header.style.background = '';

    var logoText = document.querySelectorAll('#header .logo a');
    logoText.forEach(el => el.style.color = '');

    var enlaces = document.querySelectorAll('.navbar a');
    enlaces.forEach(el => el.style.color = '');

    var enlacesActivos = document.querySelectorAll('.navbar a:hover, .navbar .active, .navbar .active:focus, .navbar li:hover>a');
    enlacesActivos.forEach(el => el.style.color = '');

    var h1 = document.querySelector('#hero h1');
    if (h1) h1.style.color = '';

    var h2 = document.querySelector('#hero h2');
    if (h2) h2.style.color = '';

    var btn = document.querySelector('#hero .btn-get-started');
    if (btn) btn.style.backgroundColor = '';

    var productos = document.getElementById('productos');
    if (productos) productos.style.backgroundColor = '';

    var tituloSeccion = document.querySelectorAll('.section-title h2');
    tituloSeccion.forEach(t => {
      t.style.backgroundColor = '';
      t.style.color = '';
    });

    var members = document.querySelectorAll('.products .member');
    members.forEach(member => member.style.backgroundColor = '');

    var titulos = document.querySelectorAll('.products .member .member-info h4');
    titulos.forEach(titulo => titulo.style.color = '');

    var nosotros = document.getElementById('nosotros');
    if (nosotros) nosotros.style.backgroundColor = '';

    var contacto = document.getElementById('contacto');
    if (contacto) contacto.style.backgroundColor = '';

    var contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
      card.style.backgroundColor = '';
      card.style.borderColor = '';
    });

    var boton = document.getElementById('mostrarOcultar');
    if (boton) boton.style.backgroundColor = '';

    var textoOculto = document.getElementById('textoOculto');
    if (textoOculto) {
      textoOculto.style.backgroundColor = '';
      var parrafos = textoOculto.querySelectorAll('p');
      parrafos.forEach(p => p.style.color = '');
    }

    var tituloBienvenida = document.getElementById('tituloBienvenida');
    if (tituloBienvenida) tituloBienvenida.style.color = '';

    var footer = document.getElementById('footer');
    if (footer) footer.style.background = '';

    var footerTop = document.getElementById('footer-top');
    if (footerTop) footerTop.style.background = '';

    var footerLinks = document.querySelectorAll('#footer .footer-links h4, #footer .footer-links a, #footer .footer-links p');
    footerLinks.forEach(link => link.style.color = '');

    var copyright = document.querySelector('#footer .copyright');
    if (copyright) copyright.style.color = '';
  }

  document.addEventListener("DOMContentLoaded", function() {
    var botonColor = document.getElementById("btnCambiarColor") || document.querySelector(".btn-get-started");
    if (botonColor) {
      botonColor.addEventListener("click", cambiarTonalidad);
    }
  });

  /*--------------------------------------------------------------
  # Sistema de Autenticación & Acceso a la Nueva Página de Panel
  --------------------------------------------------------------*/
  const CUENTAS_AUTORIZADAS = [
    {
      id: "admin",
      email: "admin@artesanias.com",
      password: "admin123",
      nombre: "Camila Restrepo",
      rol: "Administrador General",
      avatarLetter: "A"
    },
    {
      id: "artesano",
      email: "artesano@artesanias.com",
      password: "tierra2024",
      nombre: "Don Pedro Guachetá",
      rol: "Maestro Tejedor y Alfarero",
      avatarLetter: "P"
    }
  ];

  let usuarioActual = null;

  function obtenerInstanciaModalLogin() {
    const modalEl = document.getElementById('loginModal');
    if (!modalEl || typeof bootstrap === 'undefined') return null;
    return bootstrap.Modal.getOrCreateInstance(modalEl);
  }

  function mostrarModalLogin() {
    const modal = obtenerInstanciaModalLogin();
    if (modal) {
      const alertEl = document.getElementById('loginAlert');
      if (alertEl) alertEl.classList.add('d-none');
      modal.show();
    }
  }

  function ocultarModalLogin() {
    const modal = obtenerInstanciaModalLogin();
    if (modal) modal.hide();
  }

  function actualizarUIUsuario(usuario) {
    const userBtn = document.getElementById('userAuthBtn');
    const userIcon = document.getElementById('userIcon');
    const statusDot = document.getElementById('userStatusDot');
    const panelNavLink = document.getElementById('panelNavLink');

    if (usuario) {
      if (userBtn) {
        userBtn.title = "Sesión iniciada: " + usuario.nombre + " - Clic para ir a Mi Panel";
        userBtn.setAttribute('aria-label', "Panel de " + usuario.nombre);
      }
      if (userIcon) userIcon.className = "bi bi-person-check-fill text-success";
      if (statusDot) {
        statusDot.style.backgroundColor = "#03d406";
        statusDot.title = "Sesión activa";
      }
      if (panelNavLink) panelNavLink.classList.remove('d-none');
    } else {
      if (userBtn) {
        userBtn.title = "Iniciar sesión";
        userBtn.setAttribute('aria-label', "Iniciar sesión");
      }
      if (userIcon) userIcon.className = "bi bi-person-fill";
      if (statusDot) {
        statusDot.style.backgroundColor = "#adb5bd";
        statusDot.title = "Desconectado";
      }
      if (panelNavLink) panelNavLink.classList.add('d-none');
    }
  }

  function autenticarUsuario(email, password) {
    const limpiaEmail = email.trim().toLowerCase();
    const cuenta = CUENTAS_AUTORIZADAS.find(c => 
      c.email.trim().toLowerCase() === limpiaEmail && c.password === password
    );
    if (cuenta) return cuenta;

    if (limpiaEmail.includes('@') && password.length >= 4) {
      return {
        id: "usuario_local",
        email: limpiaEmail,
        password: password,
        nombre: limpiaEmail.split('@')[0],
        rol: "Artesano Registrado",
        avatarLetter: limpiaEmail.charAt(0).toUpperCase()
      };
    }
    return null;
  }

  function iniciarSesion(usuario) {
    usuarioActual = usuario;
    const datosSesion = JSON.stringify({ 
      email: usuario.email, 
      nombre: usuario.nombre, 
      rol: usuario.rol, 
      avatarLetter: usuario.avatarLetter 
    });

    sessionStorage.setItem('artesanias_session', datosSesion);
    localStorage.setItem('artesanias_session', datosSesion);

    ocultarModalLogin();
    window.location.href = "panel.html";
  }

  // Eventos principales
  document.addEventListener("DOMContentLoaded", function() {

    // 1. Restaurar sesión
    try {
      const sesionGuardada = sessionStorage.getItem('artesanias_session') || localStorage.getItem('artesanias_session');
      if (sesionGuardada) {
        const data = JSON.parse(sesionGuardada);
        const usuarioExistente = CUENTAS_AUTORIZADAS.find(c => c.email.toLowerCase() === data.email.toLowerCase()) || data;
        if (usuarioExistente) {
          usuarioActual = usuarioExistente;
          actualizarUIUsuario(usuarioExistente);
        }
      }
    } catch (err) {
      console.warn('No se pudo recuperar la sesión previa:', err);
    }

    // 2. Botón de usuario en el header
    const userBtn = document.getElementById('userAuthBtn');
    if (userBtn) {
      userBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (usuarioActual) {
          window.location.href = "panel.html";
        } else {
          mostrarModalLogin();
        }
      });
    }

    // 3. Botón de Área Artesanos en el Hero
    const heroLoginBtn = document.getElementById('heroLoginBtn');
    if (heroLoginBtn) {
      heroLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (usuarioActual) {
          window.location.href = "panel.html";
        } else {
          mostrarModalLogin();
        }
      });
    }

    // 4. Ver/Ocultar contraseña
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    if (togglePasswordBtn) {
      togglePasswordBtn.addEventListener('click', function() {
        const passInput = document.getElementById('loginPassword');
        const icon = this.querySelector('i');
        if (passInput) {
          if (passInput.type === 'password') {
            passInput.type = 'text';
            if (icon) {
              icon.classList.remove('bi-eye');
              icon.classList.add('bi-eye-slash');
            }
          } else {
            passInput.type = 'password';
            if (icon) {
              icon.classList.remove('bi-eye-slash');
              icon.classList.add('bi-eye');
            }
          }
        }
      });
    }

    // 5. Envío de Formulario de Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = document.getElementById('loginEmail');
        const passInput = document.getElementById('loginPassword');
        const alertEl = document.getElementById('loginAlert');
        const alertMsg = document.getElementById('loginAlertMsg');

        const email = emailInput ? emailInput.value : '';
        const pass = passInput ? passInput.value : '';

        const usuario = autenticarUsuario(email, pass);
        if (usuario) {
          if (alertEl) alertEl.classList.add('d-none');
          iniciarSesion(usuario);
        } else {
          if (alertEl && alertMsg) {
            alertMsg.textContent = 'Credenciales no válidas. Puedes ingresar con admin@artesanias.com / admin123 o artesano@artesanias.com / tierra2024';
            alertEl.classList.remove('d-none');
          }
        }
      });
    }

    // 6. Vista de Detalle de Productos
    const btnsDetalle = document.querySelectorAll('.btn-ver-detalle');
    btnsDetalle.forEach(btn => {
      btn.addEventListener('click', function() {
        const nombre = this.getAttribute('data-nombre');
        const origen = this.getAttribute('data-origen');
        const categoria = this.getAttribute('data-categoria');
        const material = this.getAttribute('data-material');
        const precio = this.getAttribute('data-precio');
        const desc = this.getAttribute('data-desc');
        const img = this.getAttribute('data-img');

        const modalEl = document.getElementById('modalDetalleProducto');
        if (modalEl) {
          const mImg = document.getElementById('modalProdImg');
          const mNombre = document.getElementById('modalProdNombre');
          const mOrigen = document.getElementById('modalProdOrigen');
          const mCategoria = document.getElementById('modalProdCategoria');
          const mMaterial = document.getElementById('modalProdMaterial');
          const mPrecio = document.getElementById('modalProdPrecio');
          const mDesc = document.getElementById('modalProdDesc');

          if (mImg) mImg.src = img;
          if (mNombre) mNombre.textContent = nombre;
          if (mOrigen) mOrigen.textContent = origen;
          if (mCategoria) mCategoria.textContent = categoria;
          if (mMaterial) mMaterial.textContent = material;
          if (mPrecio) mPrecio.textContent = precio;
          if (mDesc) mDesc.textContent = desc;

          const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
          modal.show();
        }
      });
    });

  });

})();

(function() {
  "use strict";

  

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }


  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }


  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("mostrarOcultar").addEventListener("click", function() {
      var texto = document.getElementById("textoOculto");
      if (texto.style.display === "none") {
        texto.style.display = "block"; // Mostrar el texto
        document.getElementById("tituloBienvenida").textContent = "¡Bienvenidos a 'Artesanías de Nuestra Tierra'!";
        this.textContent = "Ocultar Texto";
      } else {
        texto.style.display = "none"; // Ocultar el texto
        document.getElementById("tituloBienvenida").textContent = "¡Bienvenidos a 'Artesanías de Nuestra Tierra'!";
        this.textContent = "Mostrar Texto";
      }
    });
  });

  var tonalidadOscura = false;

function cambiarTonalidad() {
  // Verificar el estado actual de la tonalidad
  if (tonalidadOscura) {
    // Si la tonalidad actual es oscura, cambiar a la tonalidad original
    restaurarTonalidadOriginal();
    tonalidadOscura = false;
  } else {
    // Si la tonalidad actual es original, cambiar a la tonalidad oscura
    cambiarTonalidadOscura();
    tonalidadOscura = true;
  }
}

function cambiarTonalidadOscura() {

    /*--------------------------------------------------------------
    #TransForm header
    --------------------------------------------------------------*/

  // Modifica el fondo del header
  var header = document.getElementById('header');
  header.style.background = '#222'; // Tono oscuro

  // Modifica el color del texto del logo
  var logoText = document.querySelectorAll('#header .logo a');
  logoText.forEach(function(elemento) {
    elemento.style.color = '#eee'; // Blanco
  });

  // Modifica el color del texto de los enlaces
  var enlaces = document.querySelectorAll('.navbar a');
  enlaces.forEach(function(elemento) {
    elemento.style.color = '#eee'; // Blanco
  });

  // Modifica el color del color de resaltado de los enlaces activos y al pasar el mouse
  var enlacesActivos = document.querySelectorAll('.navbar a:hover, .navbar .active, .navbar .active:focus, .navbar li:hover>a');
  enlacesActivos.forEach(function(elemento) {
    elemento.style.color = '#03d406'; // Verde
  });

  // Modifica el color del color de resaltado de los enlaces al pasar el mouse
  var resaltadoBefore = document.querySelectorAll('.navbar>ul>li>a:before, .navbar a:hover:before, .navbar li:hover>a:before, .navbar .active:before');
  resaltadoBefore.forEach(function(elemento) {
    elemento.style.backgroundColor = '#03d406'; // Verde
  });

  /*--------------------------------------------------------------
    #TransForm hero
    --------------------------------------------------------------*/

  // Modifica el color del texto del h1
  var h1 = document.querySelector('#hero h1');
  h1.style.color = '#eee'; // Blanco

  // Modifica el color del texto del h2
  var h2 = document.querySelector('#hero h2');
  h2.style.color = '#08961b'; // Verde oscuro

  // Modifica el color del botón
  var btn = document.querySelector('#hero .btn-get-started');
  btn.style.backgroundColor = '#08961b'; // Verde oscuro

    /*--------------------------------------------------------------
    #TransForm Section general
    --------------------------------------------------------------*/

// Modifica el fondo de la sección
  var productos = document.getElementById('productos');
  productos.style.backgroundColor = '#222'; // Tono oscuro

  // Modifica el color de los títulos de las secciones
  var tituloSeccion = document.querySelector('#productos .section-title h2');
  tituloSeccion.style.backgroundColor = '#08961b'; // Verde oscuro
  tituloSeccion.style.color = '#eee'; // Blanco

  /*--------------------------------------------------------------
    #TransForm Section products
    --------------------------------------------------------------*/

    // Selecciona todos los elementos con la clase "member"
  var members = document.querySelectorAll('.products .member');

  // Itera sobre cada elemento y cambia su fondo
  members.forEach(function(member) {
    member.style.backgroundColor = '#111'; // Tono oscuro
  });

  // Modifica el color del texto de los títulos
  var titulos = document.querySelectorAll('.products .member .member-info h4');
  titulos.forEach(function(titulo) {
    titulo.style.color = '#eee'; // Blanco
  });

  /*--------------------------------------------------------------
    #TransForm Nosotros
    --------------------------------------------------------------*/

  // Modifica el fondo de la sección "Sobre Nosotros"
  var nosotros = document.getElementById('nosotros');
  nosotros.style.backgroundColor = '#222'; // Tono oscuro

  // Modifica el fondo del botón desplegable
  var boton = document.getElementById('mostrarOcultar');
  boton.style.backgroundColor = '#08961b'; // Verde oscuro

  // Modifica el fondo del texto oculto
  var textoOculto = document.getElementById('textoOculto');
  textoOculto.style.backgroundColor = '#222'; // Tono oscuro

  // Modifica el color del texto del texto oculto
  var parrafos = textoOculto.querySelectorAll('p');
  parrafos.forEach(function(parrafo) {
  parrafo.style.color = '#eee'; // Blanco

  // Modifica el color del título "¡Bienvenidos a "Artesanías de Nuestra Tierra"!"
  var tituloBienvenida = document.getElementById('tituloBienvenida');
  tituloBienvenida.style.color = '#eee'; // Blanco


  /*--------------------------------------------------------------
    #TransForm Footer
    --------------------------------------------------------------*/
  
  var footer = document.getElementById('footer');
  footer.style.background = '#111'; // Color oscuro
  
  var footerTop = document.getElementById('footer-top');
  footerTop.style.background = '#111'; // Color oscuro

    // Modifica el color del texto de los enlaces en el footer
  var footerLinks = document.querySelectorAll('#footer .footer-links h4');
  footerLinks.forEach(function(link) {
    link.style.color = '#eee'; // Color oscuro
  });

  // Modifica el color del texto del copyright
  var copyright = document.querySelector('#footer .copyright');
  copyright.style.color = '#eee'; // Color oscuro

  });
}

function restaurarTonalidadOriginal() {
  window.location.reload();
}

// Llamada a la función cuando se haga clic en el botón
document.addEventListener("DOMContentLoaded", function() {
  var botonIniciar = document.querySelector(".btn-get-started");
  botonIniciar.addEventListener("click", cambiarTonalidad);
});
  


})()
/**
 * Panel de Gestión y Taller Artesanal
 * Artesanías de Nuestra Tierra - Boyacá & Cundinamarca
 */
(function() {
  "use strict";

  // Cuentas autorizadas sincronizadas
  const CUENTAS = [
    {
      id: "admin",
      email: "admin@artesanias.com",
      password: "admin123",
      nombre: "Camila Restrepo",
      rol: "Administrador General",
      avatarLetter: "A",
      catalogo: 4,
      pedidos: 24
    },
    {
      id: "artesano",
      email: "artesano@artesanias.com",
      password: "tierra2024",
      nombre: "Don Pedro Guachetá",
      rol: "Maestro Tejedor y Alfarero",
      avatarLetter: "P",
      catalogo: 2,
      pedidos: 9
    }
  ];

  // Piezas artesanales iniciales
  const PIEZAS_INICIALES = [
    {
      id: 1,
      nombre: "Tapete en Fique",
      origen: "Boyacá",
      categoria: "Fique y Fibras",
      estado: "En exhibición",
      badge: "bg-success",
      precio: "120.000",
      progreso: 100,
      desc: "Tapete tejido con técnicas ancestrales en fique 100% natural y tintes vegetales de Boyacá."
    },
    {
      id: 2,
      nombre: "Manilla de Mostacilla",
      origen: "Cundinamarca",
      categoria: "Bisutería Ancestral",
      estado: "En exhibición",
      badge: "bg-success",
      precio: "28.000",
      progreso: 100,
      desc: "Brazalete con patrones geométricos muiscas elaborado hilo a hilo con mostacilla de alta resistencia."
    },
    {
      id: 3,
      nombre: "Muñeco Tejido en Lana",
      origen: "Nobsa, Boyacá",
      categoria: "Tejido y Textil",
      estado: "En almacén",
      badge: "bg-info text-dark",
      precio: "45.000",
      progreso: 85,
      desc: "Figura tradicional elaborada con lana virgen de oveja boyacense hilada y cardada en huso."
    },
    {
      id: 4,
      nombre: "Vasija de Barro Cocido",
      origen: "Ráquira, Boyacá",
      categoria: "Alfarería y Cerámica",
      estado: "En horneado",
      badge: "bg-warning text-dark",
      precio: "38.000",
      progreso: 65,
      desc: "Pieza clásica torneada a mano con arcilla de Ráquira y cocción artesanal en horno de leña."
    }
  ];

  // Estado en memoria
  let piezas = [];
  let filtroActual = "todos";
  let busquedaActual = "";
  let piezaSeleccionadaId = null;

  // Cargar piezas de LocalStorage o iniciales
  function cargarPiezas() {
    try {
      const guardadas = localStorage.getItem('artesanias_piezas');
      if (guardadas) {
        piezas = JSON.parse(guardadas);
      } else {
        piezas = [...PIEZAS_INICIALES];
        guardarPiezas();
      }
    } catch (e) {
      piezas = [...PIEZAS_INICIALES];
    }
  }

  function guardarPiezas() {
    try {
      localStorage.setItem('artesanias_piezas', JSON.stringify(piezas));
    } catch (e) {
      console.warn("No se pudo guardar en localStorage", e);
    }
  }

  // Cargar y mostrar usuario activo
  function cargarSesionUsuario() {
    let sesion = null;
    try {
      const sesionRaw = sessionStorage.getItem('artesanias_session') || localStorage.getItem('artesanias_session');
      if (sesionRaw) {
        sesion = JSON.parse(sesionRaw);
      }
    } catch (e) {
      console.warn(e);
    }

    // Buscar cuenta correspondiente o predeterminado
    let usuario = null;
    if (sesion && sesion.email) {
      usuario = CUENTAS.find(c => c.email.toLowerCase() === sesion.email.toLowerCase());
    }
    if (!usuario) {
      usuario = CUENTAS[0]; // Por defecto Camila Restrepo (Admin)
    }

    // Actualizar UI del usuario
    const nameEl = document.getElementById('dashUserName');
    const emailEl = document.getElementById('dashUserEmail');
    const roleEl = document.getElementById('dashUserRole');
    const initialEl = document.getElementById('dashAvatarInitial');

    if (nameEl) nameEl.textContent = usuario.nombre;
    if (emailEl) emailEl.textContent = usuario.email;
    if (roleEl) roleEl.textContent = usuario.rol;
    if (initialEl) initialEl.textContent = usuario.avatarLetter;
  }

  // Actualizar métricas del panel
  function actualizarMetricas() {
    const statProducts = document.getElementById('statProducts');
    if (statProducts) {
      statProducts.textContent = piezas.length;
    }
  }

  // Renderizar tabla con filtros
  function renderizarTabla() {
    const tbody = document.getElementById('panelTableBody');
    if (!tbody) return;

    let lista = piezas.filter(item => {
      // Filtro por estado
      if (filtroActual === "exhibicion" && item.estado !== "En exhibición") return false;
      if (filtroActual === "horneado" && item.estado !== "En horneado") return false;
      if (filtroActual === "almacen" && item.estado !== "En almacén") return false;

      // Filtro por búsqueda
      if (busquedaActual.trim() !== "") {
        const query = busquedaActual.toLowerCase();
        const texto = ${item.nombre}   .toLowerCase();
        if (!texto.includes(query)) return false;
      }
      return true;
    });

    if (lista.length === 0) {
      tbody.innerHTML = 
        <tr>
          <td colspan="4" class="text-center py-4 text-muted">
            <i class="bi bi-inbox fs-3 d-block mb-1"></i>
            No se encontraron piezas con los criterios seleccionados.
          </td>
        </tr>
      ;
      return;
    }

    tbody.innerHTML = lista.map(item => 
      <tr>
        <td>
          <div class="fw-bold text-dark"></div>
          <small class="text-muted"> &bull; {item.precio} COP</small>
        </td>
        <td>
          <span class="text-secondary"><i class="bi bi-geo-alt text-success me-1"></i></span>
        </td>
        <td>
          <span class="badge "></span>
        </td>
        <td class="text-end">
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-success btn-action-pill btn-ver-detalle-pieza" data-id="" title="Ver detalles y avance">
              <i class="bi bi-eye me-1"></i> Detalles
            </button>
            <button class="btn btn-outline-danger btn-action-pill btn-eliminar-pieza" data-id="" title="Eliminar pieza">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    ).join('');

    // Eventos a botones de la tabla
    tbody.querySelectorAll('.btn-ver-detalle-pieza').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        abrirModalDetalle(id);
      });
    });

    tbody.querySelectorAll('.btn-eliminar-pieza').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        eliminarPieza(id);
      });
    });

    actualizarMetricas();
  }

  // Modal Detalle de Pieza
  function abrirModalDetalle(id) {
    const pieza = piezas.find(p => p.id === id);
    if (!pieza) return;

    piezaSeleccionadaId = id;

    const nombreEl = document.getElementById('detPiezaNombre');
    const origenEl = document.getElementById('detPiezaOrigen');
    const badgeEl = document.getElementById('detPiezaEstadoBadge');
    const descEl = document.getElementById('detPiezaDesc');
    const catEl = document.getElementById('detPiezaCategoria');
    const precioEl = document.getElementById('detPiezaPrecio');
    const progTexto = document.getElementById('detProgresoTexto');
    const progBar = document.getElementById('detProgressBar');
    const selectEstado = document.getElementById('cambiarEstadoSelect');

    if (nombreEl) nombreEl.textContent = pieza.nombre;
    if (origenEl) origenEl.textContent = pieza.origen;
    if (badgeEl) {
      badgeEl.textContent = pieza.estado;
      badgeEl.className = adge ;
    }
    if (descEl) descEl.textContent = pieza.desc;
    if (catEl) catEl.textContent = pieza.categoria;
    if (precioEl) precioEl.textContent = $ COP;

    const progreso = pieza.progreso || (pieza.estado === "En exhibición" ? 100 : (pieza.estado === "En horneado" ? 65 : 85));
    if (progTexto) progTexto.textContent = ${progreso}%;
    if (progBar) {
      progBar.style.width = ${progreso}%;
      progBar.className = progress-bar ;
    }

    if (selectEstado) {
      selectEstado.value = pieza.estado;
    }

    const modalEl = document.getElementById('modalDetallesPieza');
    if (modalEl) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  }

  // Eliminar Pieza
  function eliminarPieza(id) {
    const pieza = piezas.find(p => p.id === id);
    if (!pieza) return;

    if (confirm(¿Estás seguro de que deseas retirar "" del catálogo de producción?)) {
      piezas = piezas.filter(p => p.id !== id);
      guardarPiezas();
      renderizarTabla();
    }
  }

  // Actualizar estado de pieza
  function actualizarEstadoPieza() {
    if (!piezaSeleccionadaId) return;
    const pieza = piezas.find(p => p.id === piezaSeleccionadaId);
    const select = document.getElementById('cambiarEstadoSelect');
    if (!pieza || !select) return;

    const nuevoEstado = select.value;
    pieza.estado = nuevoEstado;

    if (nuevoEstado === "En exhibición") {
      pieza.badge = "bg-success";
      pieza.progreso = 100;
    } else if (nuevoEstado === "En horneado") {
      pieza.badge = "bg-warning text-dark";
      pieza.progreso = 65;
    } else {
      pieza.badge = "bg-info text-dark";
      pieza.progreso = 85;
    }

    guardarPiezas();
    renderizarTabla();

    // Actualizar vista del modal
    const badgeEl = document.getElementById('detPiezaEstadoBadge');
    const progTexto = document.getElementById('detProgresoTexto');
    const progBar = document.getElementById('detProgressBar');

    if (badgeEl) {
      badgeEl.textContent = pieza.estado;
      badgeEl.className = adge ;
    }
    if (progTexto) progTexto.textContent = ${pieza.progreso}%;
    if (progBar) {
      progBar.style.width = ${pieza.progreso}%;
      progBar.className = progress-bar ;
    }

    alert(¡Estado de "" actualizado a "" con éxito!);
  }

  // Cargar Reporte de Taller
  function prepararReporte() {
    const reportDate = document.getElementById('reportDate');
    const totalEl = document.getElementById('repTotalPiezas');
    const exhEl = document.getElementById('repExhibicion');
    const procEl = document.getElementById('repProceso');
    const almEl = document.getElementById('repAlmacen');
    const tbody = document.getElementById('reportTableBody');

    const hoy = new Date().toLocaleDateString('es-CO', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    if (reportDate) reportDate.textContent = Generado: ;

    const exhCount = piezas.filter(p => p.estado === "En exhibición").length;
    const procCount = piezas.filter(p => p.estado === "En horneado").length;
    const almCount = piezas.filter(p => p.estado === "En almacén").length;

    if (totalEl) totalEl.textContent = piezas.length;
    if (exhEl) exhEl.textContent = exhCount;
    if (procEl) procEl.textContent = procCount;
    if (almEl) almEl.textContent = almCount;

    if (tbody) {
      tbody.innerHTML = piezas.map(p => 
        <tr>
          <td><strong></strong></td>
          <td></td>
          <td></td>
          <td><span class="badge "></span></td>
        </tr>
      ).join('');
    }
  }

  // Descargar CSV
  function descargarReporteCSV() {
    const encabezados = ["ID", "Pieza", "Origen", "Categoria", "Estado", "Precio_COP", "Descripcion"];
    const filas = piezas.map(p => [
      p.id,
      "",
      "",
      "",
      "",
      "",
      ""
    ]);

    const csvContent = "\uFEFF" + [encabezados.join(","), ...filas.map(f => f.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = Reporte_Produccion_Artesanias_.csv;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Inicialización de Eventos al Cargar DOM
  document.addEventListener("DOMContentLoaded", function() {
    cargarPiezas();
    cargarSesionUsuario();
    renderizarTabla();

    // 1. Buscador
    const searchInput = document.getElementById('buscarPiezaInput');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        busquedaActual = this.value;
        renderizarTabla();
      });
    }

    // 2. Filtros de Estado
    const filterBtns = document.querySelectorAll('.status-badge-filter');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filtroActual = this.getAttribute('data-filter');
        renderizarTabla();
      });
    });

    // 3. Formulario Nueva Artesanía
    const formNueva = document.getElementById('formNuevaArtesania');
    if (formNueva) {
      formNueva.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('craftName').value.trim();
        const origen = document.getElementById('craftRegion').value;
        const categoria = document.getElementById('craftCategory').value;
        const estado = document.getElementById('craftStatus').value;
        const precio = document.getElementById('craftPrice').value.trim();
        const desc = document.getElementById('craftDesc').value.trim();

        let badge = "bg-success";
        let progreso = 100;
        if (estado === "En horneado") {
          badge = "bg-warning text-dark";
          progreso = 65;
        } else if (estado === "En almacén") {
          badge = "bg-info text-dark";
          progreso = 85;
        }

        const nuevaPieza = {
          id: Date.now(),
          nombre: nombre,
          origen: origen,
          categoria: categoria,
          estado: estado,
          badge: badge,
          precio: Number(precio).toLocaleString('es-CO'),
          progreso: progreso,
          desc: desc
        };

        // Insertar al inicio de la lista
        piezas.unshift(nuevaPieza);
        guardarPiezas();
        renderizarTabla();

        // Cerrar modal
        const modalEl = document.getElementById('modalNuevaArtesania');
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();
        }

        // Resetear form
        formNueva.reset();
        alert(¡"" ha sido registrada exitosamente en el catálogo de producción!);
      });
    }

    // 4. Botón Actualizar Estado en Modal
    const btnGuardarEstado = document.getElementById('guardarNuevoEstadoBtn');
    if (btnGuardarEstado) {
      btnGuardarEstado.addEventListener('click', actualizarEstadoPieza);
    }

    // 5. Botón Modal Reporte
    const modalReporteEl = document.getElementById('modalReporteTaller');
    if (modalReporteEl) {
      modalReporteEl.addEventListener('show.bs.modal', prepararReporte);
    }

    // 6. Botón Descargar CSV
    const btnCsv = document.getElementById('descargarCsvBtn');
    if (btnCsv) {
      btnCsv.addEventListener('click', descargarReporteCSV);
    }

    // 7. Botón Cerrar Sesión
    const logoutBtn = document.getElementById('panelLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        if (confirm("¿Deseas cerrar tu sesión y volver a la página principal?")) {
          sessionStorage.removeItem('artesanias_session');
          localStorage.removeItem('artesanias_session');
          window.location.href = "index.html";
        }
      });
    }
  });

})();

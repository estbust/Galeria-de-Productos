/**
 * ==============================================================================
 * GALERÍA DE PRODUCTOS - MANIPULACIÓN DEL DOM Y MÉTODOS DE ARREGLOS
 * ==============================================================================
 */

// ==============================================================================
// PASO 1: Crear el arreglo de productos
// ==============================================================================
// Cada producto es un objeto con las propiedades requeridas: nombre, precio y categoria.
// Añadimos también un id y un emoji representativo para mejorar la presentación visual.
const productos = [
  {
    id: 1,
    nombre: "Laptop Gamer Pro",
    precio: 1200,
    categoria: "Tecnología",
    emoji: "💻",
  },
  {
    id: 2,
    nombre: "Smartphone 5G",
    precio: 850,
    categoria: "Tecnología",
    emoji: "📱",
  },
  {
    id: 3,
    nombre: "Auriculares Inalámbricos",
    precio: 120,
    categoria: "Tecnología",
    emoji: "🎧",
  },
  {
    id: 4,
    nombre: "Reloj Inteligente",
    precio: 199,
    categoria: "Tecnología",
    emoji: "⌚",
  },
  {
    id: 5,
    nombre: "Camiseta de Algodón",
    precio: 25,
    categoria: "Ropa",
    emoji: "👕",
  },
  {
    id: 6,
    nombre: "Jeans Clásicos",
    precio: 55,
    categoria: "Ropa",
    emoji: "👖",
  },
  {
    id: 7,
    nombre: "Chaqueta Impermeable",
    precio: 110,
    categoria: "Ropa",
    emoji: "🧥",
  },
  {
    id: 8,
    nombre: "Zapatillas Urbanas",
    precio: 85,
    categoria: "Ropa",
    emoji: "👟",
  },
  {
    id: 9,
    nombre: "Cafetera Espresso",
    precio: 95,
    categoria: "Hogar",
    emoji: "☕",
  },
  {
    id: 10,
    nombre: "Lámpara de Escritorio LED",
    precio: 40,
    categoria: "Hogar",
    emoji: "💡",
  },
  {
    id: 11,
    nombre: "Aspiradora Robot",
    precio: 280,
    categoria: "Hogar",
    emoji: "🤖",
  },
  {
    id: 12,
    nombre: "Juego de Sartenes Antiadherentes",
    precio: 70,
    categoria: "Hogar",
    emoji: "🍳",
  },
  {
    id: 13,
    nombre: "Pelota de Fútbol Oficial",
    precio: 35,
    categoria: "Deportes",
    emoji: "⚽",
  },
  {
    id: 14,
    nombre: "Mancuernas Ajustables",
    precio: 75,
    categoria: "Deportes",
    emoji: "🏋️",
  },
  {
    id: 15,
    nombre: "Bicicleta de Montaña",
    precio: 450,
    categoria: "Deportes",
    emoji: "🚲",
  },
  {
    id: 16,
    nombre: "Tapete de Yoga Antideslizante",
    precio: 30,
    categoria: "Deportes",
    emoji: "🧘",
  },
];

// ==============================================================================
// REFERENCIAS A ELEMENTOS DEL DOM
// ==============================================================================
const contenedorProductos = document.getElementById("contenedor-productos");
const botonesCategoria = document.querySelectorAll(".btn-category");
const inputPrecioMaximo = document.getElementById("precio-maximo");
const formPrecio = document.getElementById("form-precio");
const btnLimpiarFiltros = document.getElementById("btn-limpiar-filtros");
const contadorProductos = document.getElementById("contador-productos");
const indicadorFiltro = document.getElementById("indicador-filtro");

// Estado global de los filtros activos
let categoriaActiva = "Todas";
let precioMaximoActivo = null;

// ==============================================================================
// PASO 2: Mostrar los productos en pantalla
// ==============================================================================
/**
 * Genera el HTML de los productos utilizando el método map()
 * y actualiza dinámicamente el contenedor en el DOM.
 * @param {Array} lista - Arreglo de objetos de productos a renderizar.
 */
function renderizarProductos(lista) {
  // Verificamos si no hay productos que coincidan con los filtros aplicados
  if (!lista || lista.length === 0) {
    contenedorProductos.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">🔍</span>
        <h3 class="empty-title">No se encontraron productos</h3>
        <p class="empty-description">
          No hay artículos que coincidan con los filtros seleccionados. Intenta aumentar el precio máximo o elegir otra categoría.
        </p>
        <button type="button" class="btn-action btn-primary" onclick="restablecerFiltros()">
          Ver todos los productos
        </button>
      </div>
    `;
    actualizarBarraResultados(0);
    return;
  }

  // USO DE map():
  // Recorremos el arreglo de productos transformando cada objeto en una tarjeta HTML
  const tarjetasHTML = lista.map((producto) => {
    return `
      <article class="product-card" data-id="${producto.id}">
        <div class="product-media" aria-hidden="true">
          ${producto.emoji || "📦"}
        </div>
        <div class="product-body">
          <div class="product-header">
            <h2 class="product-title">${producto.nombre}</h2>
            <span class="category-badge" data-cat="${producto.categoria}">
              ${producto.categoria}
            </span>
          </div>
          <div class="product-footer">
            <div class="price-container">
              <span class="price-label">Precio</span>
              <span class="product-price">$${producto.precio.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
            </div>
            <button type="button" class="btn-card-buy" aria-label="Comprar ${producto.nombre}">
              Agregar 🛒
            </button>
          </div>
        </div>
      </article>
    `;
  });

  // Manipulación del DOM: Unimos el arreglo generado con .join('') y lo asignamos a innerHTML
  contenedorProductos.innerHTML = tarjetasHTML.join("");

  // Actualizamos el contador de resultados en la interfaz
  actualizarBarraResultados(lista.length);
}

/**
 * Actualiza el texto que indica la cantidad de productos visibles y los filtros aplicados.
 * @param {number} totalVisibles - Cantidad de productos mostrados actualmente.
 */
function actualizarBarraResultados(totalVisibles) {
  contadorProductos.innerHTML = `Mostrando <strong>${totalVisibles}</strong> de <strong>${productos.length}</strong> productos`;

  const filtrosTexto = [];
  if (categoriaActiva !== "Todas") {
    filtrosTexto.push(`Categoría: <em>${categoriaActiva}</em>`);
  }
  if (precioMaximoActivo !== null) {
    filtrosTexto.push(`Precio ≤ <em>$${precioMaximoActivo}</em>`);
  }

  if (filtrosTexto.length > 0) {
    indicadorFiltro.innerHTML = `Filtros: ${filtrosTexto.join(" | ")}`;
  } else {
    indicadorFiltro.textContent = "Mostrando catálogo completo";
  }
}

// ==============================================================================
// FUNCIÓN INTEGRADORA DE FILTROS (USA filter())
// ==============================================================================
/**
 * Aplica los filtros de categoría y/o precio máximo sobre el arreglo original
 * utilizando el método filter() de JavaScript.
 */
function aplicarFiltros() {
  // Iniciamos con la lista completa de productos
  let resultado = productos;

  // Paso 3: Filtrar por categoría usando filter()
  if (categoriaActiva !== "Todas") {
    resultado = resultado.filter((producto) => {
      return producto.categoria === categoriaActiva;
    });
  }

  // Paso 4: Filtrar por precio máximo usando filter()
  if (precioMaximoActivo !== null && !isNaN(precioMaximoActivo)) {
    resultado = resultado.filter((producto) => {
      return producto.precio <= precioMaximoActivo;
    });
  }

  // Renderizamos los productos filtrados en pantalla
  renderizarProductos(resultado);
}

// ==============================================================================
// PASO 3: Filtrar por categoría
// ==============================================================================
// Agregamos un escuchador de eventos a cada botón de categoría
botonesCategoria.forEach((boton) => {
  boton.addEventListener("click", () => {
    // 1. Obtenemos la categoría seleccionada desde el atributo data-categoria
    const categoriaSeleccionada = boton.getAttribute("data-categoria");
    categoriaActiva = categoriaSeleccionada;

    // 2. Actualizamos el estilo del botón activo para retroalimentación visual
    botonesCategoria.forEach((b) => b.classList.remove("active"));
    boton.classList.add("active");

    // 3. Ejecutamos el filtro usando filter()
    aplicarFiltros();
  });
});

// ==============================================================================
// PASO 4: Filtrar por precio máximo
// ==============================================================================
// Manejamos el envío del formulario para filtrar por precio
formPrecio.addEventListener("submit", (evento) => {
  evento.preventDefault(); // Evitamos recargar la página

  const valorIngresado = inputPrecioMaximo.value.trim();

  if (valorIngresado === "") {
    // Si el usuario dejó el campo vacío, se remueve el filtro de precio
    precioMaximoActivo = null;
  } else {
    const precio = parseFloat(valorIngresado);

    if (isNaN(precio) || precio < 0) {
      alert("Por favor, ingresa un precio válido y mayor o igual a 0.");
      return;
    }

    precioMaximoActivo = precio;
  }

  // Ejecutamos el filtro usando filter()
  aplicarFiltros();
});

// ==============================================================================
// FUNCIÓN PARA RESTABLECER / LIMPIAR FILTROS
// ==============================================================================
function restablecerFiltros() {
  categoriaActiva = "Todas";
  precioMaximoActivo = null;
  inputPrecioMaximo.value = "";

  // Restablecer botón activo a "Todas"
  botonesCategoria.forEach((b) => {
    if (b.getAttribute("data-categoria") === "Todas") {
      b.classList.add("active");
    } else {
      b.classList.remove("active");
    }
  });

  // Mostrar todos los productos originales
  aplicarFiltros();
}

// Asignar el restablecimiento al botón Limpiar Filtros
btnLimpiarFiltros.addEventListener("click", restablecerFiltros);

// Exponer la función restablecerFiltros globalmente para el botón del empty-state
window.restablecerFiltros = restablecerFiltros;

// ==============================================================================
// INICIALIZACIÓN: Cargar productos al iniciar la página
// ==============================================================================
// Al cargar el script, los productos aparecen visibles inmediatamente en pantalla
renderizarProductos(productos);

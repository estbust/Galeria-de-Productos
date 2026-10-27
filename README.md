# 🛍️ Galería Dinámica de Productos con JavaScript

Una aplicación web interactiva que demuestra el uso práctico de **manipulación del DOM** y métodos funcionales de arreglos (`map()` y `filter()`) en JavaScript Vanilla.

---

## 🚀 Cómo ejecutar el proyecto

Tienes varias opciones para visualizar y probar la página:

### Opción 1: Servidor de desarrollo Vite (Recomendada)
En la terminal dentro de esta carpeta, ejecuta:

```bash
# Con pnpm
pnpm dev

# O con npm
npm run dev
```

Luego abre en tu navegador el enlace local mostrado (por ejemplo: `http://localhost:5173`).

### Opción 2: Con la extensión Live Server de VS Code
1. Abre el archivo `index.html`.
2. Haz clic derecho y selecciona **"Open with Live Server"**.

---

## 📂 Estructura del Proyecto

```text
galeria-productos/
├── index.html        # Estructura semántica, controles de filtrado y contenedor del catálogo
├── src/
│   ├── main.js       # Lógica JavaScript (Arreglo, map(), filter() y manipulación del DOM)
│   └── style.css     # Estilos modernos, diseño responsivo de tarjetas y animaciones
├── package.json      # Configuración de dependencias y scripts de Vite
└── README.md         # Documentación del proyecto
```

---

## 🧩 Implementación Paso a Paso

### Paso 1: Creación del arreglo de productos
En [src/main.js](file:///home/estbust/web-frontend/galeria-productos/src/main.js), se definió una lista de objetos donde cada elemento contiene `nombre`, `precio` y `categoria`:

```javascript
const productos = [
  { id: 1, nombre: "Laptop Gamer Pro", precio: 1200, categoria: "Tecnología", emoji: "💻" },
  { id: 2, nombre: "Smartphone 5G", precio: 850, categoria: "Tecnología", emoji: "📱" },
  { id: 5, nombre: "Camiseta de Algodón", precio: 25, categoria: "Ropa", emoji: "👕" },
  // ... más productos
];
```

### Paso 2: Mostrar los productos en pantalla con `map()`
Se implementó la función `renderizarProductos()` que transforma cada objeto en una tarjeta HTML utilizando `map()` y luego actualiza el DOM mediante `innerHTML`:

```javascript
const tarjetasHTML = lista.map((producto) => {
  return `
    <article class="product-card">
      <div class="product-media">${producto.emoji}</div>
      <div class="product-body">
        <h2>${producto.nombre}</h2>
        <span class="category-badge">${producto.categoria}</span>
        <span class="product-price">$${producto.precio}</span>
      </div>
    </article>
  `;
});

contenedorProductos.innerHTML = tarjetasHTML.join("");
```

### Paso 3: Filtrar por categoría con `filter()`
Al hacer clic en los botones de categoría, se obtiene el valor seleccionado y se utiliza `filter()` para mostrar únicamente los productos pertenecientes a dicha categoría:

```javascript
resultado = resultado.filter((producto) => {
  return producto.categoria === categoriaActiva;
});
```

### Paso 4: Filtrar por precio máximo con `filter()`
A través de un campo de entrada numérico y un botón, se captura el valor ingresado y se filtran los productos cuyo precio sea menor o igual al valor ingresado:

```javascript
resultado = resultado.filter((producto) => {
  return producto.precio <= precioMaximoActivo;
});
```

---

## ✨ Características Adicionales
- **Filtros combinables**: Permite filtrar simultáneamente por categoría y precio máximo sin inconsistencias.
- **Sin recargas de página**: Todo el filtrado y renderizado ocurre dinámicamente en el cliente mediante manipulación del DOM.
- **Estado vacío amigable**: Si ningún producto coincide con los filtros, se presenta un mensaje informativo y un botón para restablecer.
- **Diseño 100% responsivo**: Se adapta fluidamente a pantallas móviles, tabletas y computadoras de escritorio.

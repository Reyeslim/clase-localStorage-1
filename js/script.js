const submenu = document.querySelector(".submenu-sticky")

// if (submenu) {
//   window.addEventListener("scroll", () => {
//     const currentScroll = window.pageYOffset

//     if (currentScroll > 170) {
//       submenu.classList.add("scrolled")
//     } else {
//       submenu.classList.remove("scrolled")
//     }
//   })
// }

// Mejora del evento que nos propone copilot:

// 1. Variable para controlar la ejecución.
// Evita que el evento de scroll se ejecute cientos de veces por segundo.
let ticking = false

window.addEventListener("scroll", () => {
  // 2. Si 'ticking' es falso, significa que no hay ninguna actualización visual pendiente.
  if (!ticking) {
    // 3. Solicitamos al navegador que ejecute esta función justo antes del próximo repintado.
    // Esto optimiza el rendimiento y evita saltos visuales.
    window.requestAnimationFrame(() => {
      // 4. Obtenemos la posición actual de desplazamiento vertical (píxeles desde arriba).
      const currentScroll = window.pageYOffset

      // 5. Si el usuario ha bajado más de 170px, añadimos la clase CSS 'scrolled'.
      if (currentScroll > 170) {
        submenu.classList.add("scrolled")
      } else {
        // Si está por encima de 170px, quitamos la clase.
        submenu.classList.remove("scrolled")
      }

      // 6. Una vez terminada la tarea, liberamos la variable para permitir el próximo scroll.
      ticking = false
    })

    // 7. Bloqueamos nuevas ejecuciones hasta que el requestAnimationFrame termine su trabajo.
    ticking = true
  }
})

const btnModoOscuro = document.getElementById("btnModoOscuro")
const body = document.body

// function aplicarModoOscuro(activar) {
//   if (activar) {
//     body.classList.add("modo-oscuro")
//     localStorage.setItem("modoOscuro", "true")
//   } else {
//     body.classList.remove("modo-oscuro")
//     localStorage.setItem("modoOscuro", "false")
//   }
// }

// function cargarPreferenciaModo() {
//   const modoGuardado = localStorage.getItem("modoOscuro")
//   if (modoGuardado === "true") {
//     aplicarModoOscuro(true)
//   }
// }

// Mejoras del modo oscuro que nos propone copilot:

// 1. La función se encarga de cambiar el aspecto y anotar el cambio
function aplicarModoOscuro(activar) {
  body.classList.toggle("modo-oscuro", activar) // Añade la clase "modo-oscuro" si 'activar' es true, o la quita si es false
  localStorage.setItem("modoOscuro", activar) // Guarda en localStorage el valor actual para recordarlo luego
}

// 2. La función se ejecuta al abrir la web para ver qué elegimos antes
function cargarPreferenciaModo() {
  const modoGuardado = localStorage.getItem("modoOscuro") === "true" // Mira en el localStorage si "modoOscuro" es igual al texto "true"
  aplicarModoOscuro(modoGuardado) // Aplica lo que haya encontrado (si no hay nada, será false por defecto)
}

btnModoOscuro.addEventListener("click", () => {
  const hayModoOscuro = body.classList.contains("modo-oscuro") // Revisa si el body ya tiene la clase de modo oscuro puesta

  // Si la tiene, le manda un "false" a la función para quitarla.
  // Si NO la tiene, le manda un "true" para ponerla.
  aplicarModoOscuro(!hayModoOscuro)
})

// function renderizarProductosPorCategoria() {
//   const categorias = {
//     Portatiles: "portatiles-container",
//     Accesorios: "accesorios-container",
//     Monitores: "monitores-container",
//   }

//   Object.keys(categorias).forEach((categoria) => {
//     const container = document.getElementById(categorias[categoria])
//     if (!container) return

//     const productosCategoria = productos.filter(
//       (productoFiltrado) => productoFiltrado.categoria === categoria,
//     )

//     if (productosCategoria.length === 0) {
//       container.innerHTML = `<p class="mensaje-vacio">No hay productos para esta categoría</p>`
//       return
//     }

//     container.innerHTML = productosCategoria
//       .map(({ nombre, precio, descripcion, stock }) => {
//
//         return `
//       <div class="producto-card">
//         <h4>${nombre}</h4>
//         <p class="producto-descripcion">${descripcion}</p>
//         <div class="producto-footer">
//           <span class="producto-precio">${precio.toFixed(2)}€</span>
//           <span class="producto-stock">Stock: ${stock}</span>
//         </div>
//       </div>
//       `
//       })
//       .join("")
//   })
// }

// Otra manera de hacerlo sin utilizar Object.keys

function renderizarProductosPorCategoria() {
  // 1. En lugar de un objeto, usamos un array de objetos.
  // Cada objeto tiene el nombre de la categoría y el id del contenedor.
  const categorias = [
    { nombre: "Portatiles", idContenedor: "portatiles-container" },
    { nombre: "Accesorios", idContenedor: "accesorios-container" },
    { nombre: "Monitores", idContenedor: "monitores-container" },
  ]

  // 2. Ahora recorremos el array directamente con forEach.
  // Ya no necesitamos Object.keys() porque esto ya es un array.
  categorias.forEach((categoria) => {
    const container = document.getElementById(categoria.idContenedor)
    if (!container) return

    // 3. Filtramos los productos que coinciden con el nombre de la categoría actual
    const productosCategoria = productos.filter(
      (p) => p.categoria === categoria.nombre,
    )

    // 4. Si no hay productos, mostramos el mensaje de aviso
    if (productosCategoria.length === 0) {
      container.innerHTML = `<p class="mensaje-vacio">No hay productos para esta categoría</p>`
      return
    }

    // 5. Renderizamos los productos dentro del contenedor
    container.innerHTML = productosCategoria
      .map(({ nombre, precio, descripcion, stock }) => {
        // const { nombre, precio, descripcion, stock } = producto
        return `
          <div class="producto-card">
            <h4>${nombre}</h4>
            <p class="producto-descripcion">${descripcion}</p>
            <div class="producto-footer">
              <span class="producto-precio">${precio.toFixed(2)}€</span>
              <span class="producto-stock">Stock: ${stock}</span>
            </div>
          </div>
        `
      })
      .join("")
  })
}

renderizarProductosPorCategoria()
cargarPreferenciaModo()

const submenu = document.querySelector(".submenu-sticky")

if (submenu) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 170) {
      submenu.classList.add("scrolled")
    } else {
      submenu.classList.remove("scrolled")
    }
  })
}

const btnModoOscuro = document.getElementById("btnModoOscuro")
const body = document.body

function aplicarModoOscuro(activar) {
  if (activar) {
    body.classList.add("modo-oscuro")
    localStorage.setItem("modoOscuro", "true")
  } else {
    body.classList.remove("modo-oscuro")
    localStorage.setItem("modoOscuro", "false")
  }
}

btnModoOscuro.addEventListener("click", () => {
  const hayModoOscuro = body.classList.contains("modo-oscuro")
  aplicarModoOscuro(!hayModoOscuro)
})

function cargarPreferenciaModo() {
  const modoGuardado = localStorage.getItem("modoOscuro")
  if (modoGuardado === "true") {
    aplicarModoOscuro(true)
  }
}

cargarPreferenciaModo()

function renderizarProductosPorCategoria() {
  const categorias = {
    Portatiles: "portatiles-container",
    Accesorios: "accesorios-container",
    Monitores: "monitores-container",
  }

  Object.keys(categorias).forEach((categoria) => {
    const container = document.getElementById(categorias[categoria])
    if (!container) return

    const productosCategoria = productos.filter(
      (productoFiltrado) => productoFiltrado.categoria === categoria,
    )

    if (productosCategoria.length === 0) {
      container.innerHTML = `<p class="mensaje-vacio">No hay productos para esta categoría</p>`
      return
    }

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

if (typeof productos !== "undefined") {
  renderizarProductosPorCategoria()
}

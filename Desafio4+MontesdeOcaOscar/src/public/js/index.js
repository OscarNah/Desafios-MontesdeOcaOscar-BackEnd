const socket = io();

socket.on("productos", (data) => {
  // console.log(data);
  renderProductos(data);
});

// Funcion para renderiazar nuestros productos

const renderProductos = (productos) => {
  const contenedorProductos = document.getElementById("contenedorProductos");
  contenedorProductos.innerHTML = "";

  productos.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <p>ID: ${item.id}</p>
        <p>Nombre: ${item.title}</p>
        <p>Descripcion: ${item.description}</p>
        <p>Precio: ${item.price}</p>
        <button> Eliminar </button>
        `;
    contenedorProductos.appendChild(card);
    // Agrtegamos el evento eliminar
    card.querySelector("button").addEventListener("click", () => {
      eliminarProducto(item.id);
    });
  });
};

const eliminarProducto = (id) => {
    socket.emit("eliminarProducto", id);
}

//Agregar producto del formulario
document.getElementById("btnEnviar").addEventListener("click", () =>{
    agregarProducto();
})

const agregarProducto = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value,
    };
    socket.emit("agregarProducto", producto);
}


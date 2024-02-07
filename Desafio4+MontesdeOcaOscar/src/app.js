const express = require("express"); // Se importa el módulo de express al archive app.js
const app = express(); //Se procede a crear la aplicación.
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const PUERTO = 8080; // Se asigna el puerto al que se quiere trabajar.

const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");
const viewsRouter = require("./routes/views.router.js");

//Middleware
//Para recibir datos complejos.
app.use(express.urlencoded({ extended: true }));
//Para manipular datos JSON
app.use(express.json());
//Carpeta public
app.use(express.static("./src/public"));

//Handlebars:
//Acá estamos configurando el motor de plantillas. le digo a express que cuando encuentre un archivo .handlebars, lo renderice con el motor de plantillas.
app.engine("handlebars", exphbs.engine());
//Acá también le decimos que el motor de plantillas a usar es Handlebars.
app.set("view engine", "handlebars");
//Acá le decimos donde se encuentran los archivos .handlebars
app.set("views", "./src/views");

//Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

//Escuchar puerto
const httpServer = app.listen(PUERTO, () => {
  console.log(`Escucuchando en http://localhost:${PUERTO}`);
  console.log(`Escucuchando en http://localhost:${PUERTO}/realtimeproducts`);
});

//Se obtiene el array de productos
const ProductManager = require("./controllers/product-manager.js");
const productManager = new ProductManager("./src/models/productos.json");

//Creamos el server de socket.io

const io = socket(httpServer);

io.on("connection", async (socket) => {
  console.log("Un cliente se conecto");
  // Enviamos los productos al cliente que se conecto
  socket.emit("productos", await productManager.getProducts());

  //Recibimos el evento eliminar desde el cliente
  socket.on("eliminarProducto", async (id) => {
    await productManager.deleteProduct(id);
    //Debo actualizar la lista
    io.socket.emit("productos", await productManager.getProducts());
  });

  //Agregar Producto
  socket.on("agregarProducto", async (producto) => {
    await productManager.addProduct(producto);
    io.socket.emit("productos", await productManager.getProducts());
  });
  
});

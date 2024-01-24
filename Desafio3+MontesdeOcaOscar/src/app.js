const express = require('express');
const PUERTO = 8080;
const app = express();

const ProductManager = require("./controllers/productManager");
const productManager = new ProductManager("./src/models/productos.json");

//Listar todos los productos:

app.get("/products", async (req, res) => {
    // La ruta “/” hace referencia a la ruta raíz de la aplicacion.
    try {
        const productos = await productManager.getProducts();
        const limit = req.query.limit;
        const limitNumber = limit ? parseInt(limit) : undefined;

        if (limitNumber && !isNaN(limitNumber)) {
            res.json(productos.slice(0, limitNumber));
        } else {
            res.json(productos);
        }

    } catch (error) {
        console.log("Error al obtener los productos", error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
})

//Traer solo 1 producto por ID:
app.get("/products/:pid", async (req, res) => {

    try {
        const id = req.params.pid
        const producto = await productManager.getProductById(parseInt(id))

        if (!producto) {
            res.json({ error: "El producto buscado no existe" });
        } else {
            res.json(producto);
        }

    } catch (error) {
        console.log('Error al obtener producto.', error)
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
})
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});


app.listen(PUERTO, () => {
    console.log(`Visitar http://localhost:${PUERTO}`);
    console.log(`Visualizar todos los productos en http://localhost:${PUERTO}/products`);
    console.log(`Visualizar los primeros 5 de los 10 productos http://localhost:${PUERTO}/products?limit=5 `);
    console.log(`Visualizar el producto con id=2 http://localhost:${PUERTO}/products/2`);
    console.log(`Visualizar cuando se busca un ID que no existe http://localhost:${PUERTO}/products/34123123`);
})

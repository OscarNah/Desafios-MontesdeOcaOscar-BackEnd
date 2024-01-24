const fs = require('fs').promises;
const path = "./productos.json";

class ProductManager {
    static lastId = 0;

    constructor(path) {
        this.path = path;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            console.error('Error al cargar productos:');
            this.products = [];
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
            console.log('Productos guardados correctamente.');
        } catch (error) {
            console.error('Error al guardar productos:', error.message);
        }
    }

    addProduct(title, description, price, img, code, stock) {
        //Validacion
        if (!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }
        //Se corrobora que no se repita el CODE
        if (this.products.some((item) => item.code === code)) {
            console.log("El code debe de ser unico");
            return;
        }
        //Creacion de un nuevo objeto:
        const newProduct = {
            id: ProductManager.lastId++,
            title,
            description,
            price,
            img,
            code,
            stock,
        };
        //Se agrega al array
        this.products.push(newProduct);
        // Después de agregar el producto al array, guardamos los productos en el archivo
        this.saveProducts();
    }
    
    getProducts() {
        return this.products;
      }
    
      getProductById(id) {
        const product = this.products.find((item) => item.id === id);
    
        if (!product) {
          console.error("Not Found!.");
        } else {
          console.log(product);
        }
      }
    
      updateProduct(id, updatedProduct) {
        const index = this.products.findIndex((item) => item.id === id);
    
        if (index === -1) {
          console.error("Producto no encontrado.");
          return;
        }
    
        // Actualizar el producto sin cambiar su id
        this.products[index] = { ...this.products[index], ...updatedProduct };
    
        console.log(`Producto con id ${id} actualizado:`);
        console.log(this.products[index]);
      }
    
      deleteProduct(id) {
        const productIndex = this.products.findIndex((item) => item.id === id);
    
        if (productIndex === -1) {
          console.error("Producto no encontrado.");
          return;
        }
    
        // Eliminar el producto del array usando splice
        this.products.splice(productIndex, 1);
    
        console.log("Producto eliminado:", id);
      }
}

module.exports = ProductManager;

// Testing.
// console.log("*****getProducts:*****");
// const testing = new ProductManager(path);
// console.log(testing.getProducts());
// console.log("************************************************************");

// console.log("************************************************************");
// console.log("Agregando un producto de prueba...");
// testing.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
// console.log("Productos después de agregar un producto:");
// console.log(testing.getProducts());
// console.log("************************************************************");

// console.log("************************************************************");
// console.log("Agregando más productos para las pruebas...");
// testing.addProduct("Teclado", "Gamer", 500, "Sin imagen", "tec01", 15);
// testing.addProduct("Raton", "Gamer", 800, "Sin imagen", "Rat01", 5);
// testing.addProduct("Monitor", "UltraHD", 1200, "Sin imagen", "Mon01", 2);
// console.log("Productos después de agregar más productos:");
// console.log(testing.getProducts());
// console.log("************************************************************");

// console.log("************************************************************");
// console.log("Buscando productos por ID:");
// testing.getProductById(1);
// testing.getProductById(5);
// console.log("************************************************************");

// console.log("************************************************************");
// console.log("Productos antes de la actualización:");
// console.log(testing.getProducts());

// console.log("Actualizando producto con id: 0");
// testing.updateProduct(0, {
//   title: "Producto Actualizado",
//   description: "Nueva descripción",
//   price: 400,
//   img: "Nueva imagen",
//   code: "update123",
//   stock: 15,
// });

// console.log("Productos después de la actualización:");
// console.log(testing.getProducts());
// console.log("************************************************************");

// console.log("************************************************************");
// console.log("Productos antes de la eliminación:");
// console.log(testing.getProducts());

// console.log("Eliminando producto con id: 2");
// testing.deleteProduct(2);

// console.log("Productos después de la eliminación:");
// console.log(testing.getProducts());

// console.log("Intentando eliminar producto con id: 5");
// testing.deleteProduct(5);

// console.log("Productos después de intento fallido de borrar un producto:");
// console.log(testing.getProducts());
// console.log("************************************************************");

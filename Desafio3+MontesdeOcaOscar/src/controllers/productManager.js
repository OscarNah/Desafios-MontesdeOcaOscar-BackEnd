const fs = require('fs');
// const path = "./productos.json";

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
          console.error('Error al cargar productos:', error.message);
          console.error('Ruta del archivo:', this.path);
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
          // console.error("Not Found!.");
        } else {
          // console.log(product);
          return product;
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
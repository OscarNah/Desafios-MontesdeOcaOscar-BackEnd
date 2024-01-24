class ProductManager {
    static lastId = 0;

    constructor(){
        this.products = [];
    }

    addProduct(title, description, price, img, code, stock){  

        //Validacion
         if(!title || !description || ! price || !img || ! code || !stock){
            console.log("Todos los campos son obligatorios");
            return;
         }
        
         //Se corrobora que no se repita el CODE
         if(this.products.some(item => item.code === code)){
            console.log("El code debe de ser unico")
            return;
         } 

         //Creacion de un nuevo objeto:
         const newProduct ={
            id: ProductManager.lastId++,
            title,
            description,
            price,
            img,
            code,
            stock
         }

         //Se agrega al array
         this.products.push(newProduct);
    }

    getProducts(){
        return this.products;

    }
    
    getProductById(id){
        const product = this.products.find(item => item.id === id);

        if(!product){
            console.error("Not Found!.")
        } else  {
            console.log(product);
        }

    }

}

//////////////////////////////////////////////////////////////////////
// Testing.

// 1) Se creará una instancia de la clase “ProductManager”

const testing = new ProductManager();

// 2) Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []

console.log(testing.getProducts());

// 3) Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25

testing.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

// 4) El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE

// 5) Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado

console.log(testing.getProducts());

// 6) Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
testing.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);


/////////////Inician pruebas de validaciones////////
// a) Validacion si falta un valor
testing.addProduct("Producto prueba", "Este es un producto prueba", 200, "abc123", 25);
// b) Validacion si el ID se va auto encrementando
//Producto 01
testing.addProduct("Teclado", "Gamer", 500, "Sin imagen", "tec01", 15);
//Producto 02
testing.addProduct("Raton", "Gamer", 800, "Sin imagen", "Rat01", 5);
//Producto 03
testing.addProduct("Monitor", "UltraHD", 1200, "Sin imagen", "Mon01", 2);
console.log(testing.getProducts());
/////////////////Terminan pruebas de validaciones

// 7) Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
console.log("Buscando producto con id:1")
testing.getProductById(1);
console.log("Buscando producto con id: 5")
testing.getProductById(5);



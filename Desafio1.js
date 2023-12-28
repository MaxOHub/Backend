// Definicion de la clase ProductManager y constructor
class ProductManager{
    constructor() {
        this.products = []
        this.addNextId = 1
    }

    addProduct(title, description, price, thumbnail, code, stock){
        // Validacion de campos obligatorios
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.error('Todos los campos son obligatorios')
            return
        }
       
        // Validacion del campo codigo
        if (this.products.some(product => product.code === code)) {
        console.error('Ya existe un producto con ese código.')
        return
        }
        
        //Propiedades de los productos 
        const product = {
            id : this.addNextId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        // Ingreso de nuevos productos al arreglo con nuevo ID
        this.products.push(product)
        this.addNextId++
    }
    // Metodo que devuelve los elementos actuales del arreglo
    getProducts(){
        console.log('Productos:', this.products)
    }
    // Metodo para buscar productos por ID
    getProductByID(id){
        console.log('Producto: ',this.products.filter(product => product.id == id))
    }


}
/* - Nueva instancia de la clase ProductManager 
    - Ingreso de productos y testeo del array
    - busqueda por ID*/
const productManager1 = new ProductManager()
/* productManager1.addProduct('Producto prueba','Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
productManager1.addProduct('Otro producto prueba','Este es otro producto prueba', 127, 'Sin imagen', 'abc124', 6) */
productManager1.getProducts()
productManager1.getProductByID(2)

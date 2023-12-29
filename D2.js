const fs = require('node:fs/promises')

class ProductManager {
    constructor() {
        this.products = []
        this.addNextId = 1
    }


    async addProduct(title, description, price, thumbnail, code, stock) {
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

        // Propiedades de los productos
        const product = {
            id: this.addNextId,
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

        // Almacenar productos como JSON de manera asincrónica
        await this.saveProductsToJson()

    
    }
    // Método asincrónico para guardar productos en un archivo JSON
    async saveProductsToJson() {
        try {
            const productsJSON = JSON.stringify(this.products, null, 2)
            await fs.writeFile('products.json', productsJSON, 'utf-8')
            console.log('Productos guardados en JSON correctamente.')
        } catch (error) {
            console.error('Error al guardar en el archivo JSON:', error.message)
        }
    }

    // Método Promise/Then
/*     saveProductsToJson() {
        fs.writeFile('products.json', JSON.stringify(this.products, null, 2), 'utf-8')
            .then(text => {
                console.log('Productos guardados en JSON correctamente.')
            })
            .catch(error => {
                console.error('Error al guardar en el archivo JSON:', error.message)
            })
    } */



    // Método asincrónico para obtener los productos desde un archivo JSON

    async getProducts() {
        try {
            const data = await fs.readFile('products.json', 'utf-8')
            const products = JSON.parse(data)
            console.log('Productos:', products)
        } catch (error) {
            console.error('Error al leer el archivo JSON:', error.message)
        }
    }




    // Metodo Promise/Then
/*     getProducts() {
        fs.readFile('products.json', 'utf-8')
            .then(data => {
                const products = JSON.parse(data)
                console.log('Productos:', products)
        })
        .catch (error => {
            console.error('Error al leer el archivo JSON:', error.message)
        })
    }  */




    // Método asincrónico para buscar productos por ID
    async getProductByID(id) {
        try {
            const data = await fs.readFile('products.json', 'utf-8')
            const products = JSON.parse(data)
            const product = products.filter(product => product.id == id)
            console.log('Producto:', product)
        } catch (error) {
            console.error('Error al leer el archivo JSON:', error.message)
        }
    }


    // Método asincrónico para modificar un producto por ID
    async modifyProductProperty(id, propertyName, updatedValue) {
        try {
            // Buscar producto por ID
            const index = this.products.findIndex(product => product.id === id);
            if (index === -1) {
                console.error('No se encontró un producto con ese ID.');
            }
    
            // Actualizar la propiedad específica del producto
            this.products[index][propertyName] = updatedValue;
    
            // Guardar la lista actualizada como JSON de manera asincrónica
            await this.saveProductsToJson();
    
        } catch (error) {
            console.error('Error al modificar la propiedad del producto:', error.message);
        }
    }



     // Método asincrónico para eliminar un producto por ID
    async deleteProduct(id) {
        try {
            const index = this.products.findIndex(product => product.id === id);
            if (index === -1) {
                console.log('No se encontró un producto con ese ID.');
            }

            // Eliminar el producto de la lista
            this.products.splice(index, 1);

            // Guardar la lista actualizada como JSON de manera asincrónica
            await this.saveProductsToJson();

            console.log('Producto eliminado correctamente.');
        } catch (error) {
            console.error('Error al eliminar el producto:', error.message);
        }
    } 
}


// Ejemplo de uso
const manager = new ProductManager()
manager.addProduct('Producto prueba 1', 'Este es un producto prueba', 150, 'Sin imagen', 'abc1', 100)
.then(() => manager.getProducts())
.then(() => manager.deleteProduct(1))
.then(() => manager.addProduct('Producto prueba 2', 'Este es un producto prueba', 150, 'Sin imagen', 'abc4', 100))
.then(() => manager.getProducts())
.then(()=> manager.modifyProductProperty(2,'title','MODIFICADO'))
.then(() => manager.getProducts())


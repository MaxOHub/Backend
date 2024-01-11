// Importa el módulo express para crear y configurar el servidor web
const express = require('express')
const ProductManager = require('./Desafio2')
const app = express()
const PORT = 8080

app.use(express.json())

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit

        const products = await ProductManager.getProducts()

        if (limit) {
            res.json(products.slice(0, limit))
        } else {
            res.json(products)
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' })
    }
})


app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid)

        const product = await ProductManager.getProductByID(productId)

        if (product) {

            res.json(product)
        } else {
            res.status(404).json({ error: 'Producto no encontrado' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' })
    }
})


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

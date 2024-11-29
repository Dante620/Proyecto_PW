import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import usuarioRouter from './src/routes/usuario.js';
import productoRouter from './src/routes/producto.js';  
import carritoRouter from './src/routes/carrito.js';
import itemCarritoRouter from './src/routes/itemcarrito.js';  
import pedidoRouter from './src/routes/pedido.js';
import imagenesproductosRouter from './src/routes/imagenesproductos.js';
import compraRouter from './src/routes/compra.js';
import categoriaRouter from './src/routes/categoria.js';
import marcaRouter from './src/routes/marca.js';
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, resp) => {
    return resp.send('Hello World');
})


app.use('/usuario', usuarioRouter);
app.use('/producto', productoRouter);
app.use('/carrito', carritoRouter);
app.use('/itemcarrito', itemCarritoRouter);
app.use('/pedido', pedidoRouter);
app.use('/imagenesproductos', imagenesproductosRouter);
app.use('/compra', compraRouter);
app.use('/categoria', categoriaRouter);
app.use('/marca', marcaRouter);
export default app;
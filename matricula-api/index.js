import app from './app.js';
import sequelize from './src/config/database.js';
import usuario from './src/models/usuario.js';  // Asegúrate de importar el modelo de Usuario
import carrito from './src/models/carrito.js'; 
import itemcarrito from './src/models/itemcarrito.js'; // Asegúrate de importar el modelo de Carrito
import producto from './src/models/producto.js';
import compra from './src/models/compra.js';
import imagenesproducto from './src/models/imagenesproducto.js';
import pedido from './src/models/pedido.js';
import categoria from './src/models/categoria.js';
import marca from './src/models/marca.js';

async function main() {
    try {
        const init = process.argv[2];  // Obtener argumento de línea de comandos
        const syncOptions = init ? { force: true } : { force: false };  // Establecer opciones de sincronización
        // Sincronizar los modelos en el orden correcto (primero Usuario, luego Carrito)
// eliminar tablas
await usuario.sync(syncOptions);  // Primero, asegúrate de crear la tabla de usuario
await marca.sync(syncOptions);
await categoria.sync(syncOptions); 
await producto.sync(syncOptions);
await carrito.sync(syncOptions); 
await itemcarrito.sync(syncOptions);
await compra.sync(syncOptions);
await imagenesproducto.sync(syncOptions);
await pedido.sync(syncOptions); 


        console.log('Database synchronized');

        // Iniciar el servidor
        app.listen(4001, () => {
            console.log('Server is running on port 4001');
        });

    } catch (error) {
        console.error('Error starting server:', error);
    }
}

main();
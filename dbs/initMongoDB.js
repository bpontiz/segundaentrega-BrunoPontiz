import { Schema, model, connect, disconnect } from 'mongoose';
import productos from '../config/productos.js';
import carritos from '../config/carritos.js';

const nombreBaseDeDatos = 'segundaentrega';
const insercionesProductos = [];
const insercionesCarritos = [];

const productoSchema = new Schema({
    codigo: {type: String, required: true},
    descripcion: {type: String, required: true},
    foto: {type: String, required: true},
    nombre: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true}
});

connect(`mongodb://localhost:27017/${nombreBaseDeDatos}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
});
console.log(`Conexión exitosa a la base de datos ${nombreBaseDeDatos}.`)

const ProductoDAO = model('productos', productoSchema);

console.log(`Documento Productos ha sido creado exitosamente!`)

for (const producto of productos) {
    insercionesProductos.push(ProductoDAO.create(producto));
};

const resultadosProducto = await Promise.allSettled(insercionesProductos);
const rechazadosProducto = resultadosProducto.filter(res => res.status === 'rejected');

if (rechazadosProducto.length == 0) {
    console.log('Productos agregados a la base de datos:');
    console.log(resultadosProducto);
} else {
    console.log(`Error al insertar productos\n${rechazadosProducto}`);
};

const carritoSchema = new Schema({
    carritoCodigo: {type: String, required: true},
    orden: [
        {
            codigo: String,
            descripcion: String,
            foto: String,
            nombre: String,
            precio: Number,
            stock: Number,
            quantity: Number
        }
    ]
});

const CarritoDAO = model('carritos', carritoSchema);

for (const carrito of carritos) {
    insercionesCarritos.push(CarritoDAO.create(carrito));
};

const resultadosCarrito = await Promise.allSettled(insercionesCarritos);
const rechazadosCarrito = resultadosCarrito.filter(res => res.status === 'rejected');

if (rechazadosCarrito.length == 0) {
    console.log('Productos agregados a la base de datos:');
    console.log(resultadosCarrito);
} else {
    console.log(`Error al insertar productos\n${rechazadosCarrito}`);
};

//await disconnect();

export default {ProductoDAO, CarritoDAO};
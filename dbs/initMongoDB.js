import { Schema, model, connect, disconnect } from 'mongoose';
import productos from '../config/productos.js';

const nombreBaseDeDatos = 'segundaentrega';
const inserciones = [];

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
    inserciones.push(ProductoDAO.create(producto));
};

const resultados = await Promise.allSettled(inserciones);
const rechazados = resultados.filter(res => res.status === 'rejected');

if (rechazados.length == 0) {
    console.log('Productos agregados a la base de datos:');
    console.log(resultados);
} else {
    console.log(`Error al insertar productos\n${rechazados}`);
};

//await disconnect();

export default ProductoDAO;
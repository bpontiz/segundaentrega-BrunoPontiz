import { Schema, model, connect, disconnect } from 'mongoose';

const nombreBaseDeDatos = 'segundaentrega';
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

const ProductoDAO = model('productos', productoSchema);

export default ProductoDAO;
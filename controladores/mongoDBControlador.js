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

class mongoDBControlador {
    constructor(){
    }

    async getDocuments() {
        try {
            const collections = await ProductoDAO.find();
            return collections;
        }
        catch (err) {
            console.log(`getAll method ERR! ${err}`)
        }
    }

    async deleteDocumentByCode(code) {
        const codeParam = code;
        try {
            const deleteDocumentByCode = await ProductoDAO.deleteOne({code: codeParam});
            return deleteDocumentByCode;
        }
        catch (err) {
            console.log(`deleteById method ERR! ${err}`);
        }
    }

    async updateDocumentByCode(code, body) {
        const codeParam = code;
        const {codigo,descripcion,foto,nombre,precio,stock} = body;
        try {
            const updateDocumentByCode = await ProductoDAO.updateOne({code: codeParam}, {$set: {
                "codigo": codigo,
                "descripcion": descripcion,
                "foto": foto,
                "nombre": nombre,
                "precio": precio,
                "stock": stock
            }});
            return updateDocumentByCode;
        }
        catch (err) {
            console.log(`updateByCode method ERR! ${err}`);
        }
    }

    async insertDocument(body) {
        const {codigo, descripcion, foto, nombre, precio, stock} = body;
        try {
            const createDocument = await ProductoDAO.create({
                "codigo": codigo,
                "descripcion": descripcion,
                "foto": foto,
                "nombre": nombre,
                "precio": precio,
                "stock": stock
            });
            return createDocument;
        }
        catch (err) {
            console.log(`insert document method ERR! ${err}`);
        }
    }

}

export default mongoDBControlador;
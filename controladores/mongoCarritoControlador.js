import { Schema, model, connect, disconnect } from 'mongoose';

const nombreBaseDeDatos = 'segundaentrega';

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

connect(`mongodb://localhost:27017/${nombreBaseDeDatos}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
});

const CarritoDAO = model('carritos', carritoSchema);

class mongoDBControlador {
    constructor(documento){
        this.documento = documento;
    }

    async getDocuments() {
        try {
            const collections = await CarritoDAO.find();
            return collections;
        }
        catch (err) {
            console.log(`getAll method ERR! ${err}`)
        }
    }

    async deleteDocumentByCode(code) {
        const codeParam = code;
        try {
            const deleteDocumentByCode = await CarritoDAO.deleteOne({code: codeParam});
            return deleteDocumentByCode;
        }
        catch (err) {
            console.log(`deleteById method ERR! ${err}`);
        }
    }

    async updateDocumentByCode(code, body) {
        const codeParam = code;
        const {carritoCodigo, orden} = body;
        try {
            const updateDocumentByCode = await CarritoDAO.updateOne({carritoCodigo: codeParam}, {$set: {
                "carritoCodigo": carritoCodigo,
                "orden": orden
            }});
            return updateDocumentByCode;
        }
        catch (err) {
            console.log(`updateByCode method ERR! ${err}`);
        }
    }

    async insertDocument(body) {
        const {carritoCodigo, orden} = body;
        try {
            const createDocument = await CarritoDAO.create({
                "carritoCodigo": carritoCodigo,
                "orden": orden
            });
            return createDocument;
        }
        catch (err) {
            console.log(`insert document method ERR! ${err}`);
        }
    }
}

export default mongoDBControlador;
//? CRUD PRODUCTOS

import { Router } from 'express';
import productoControlador from '../controladores/productoControlador.js';
import mongoDBControlador from '../controladores/mongoDBControlador.js';
const productoMongoContenedor = new mongoDBControlador();
const productoContenedor = new productoControlador();
const productoRoute = Router();

productoRoute.get("/", async (req, res) => {
    try {
        const getProductos = await productoContenedor.getAll();
        getProductos
            ? res.status(200).json(getProductos)
            : res.status(404).json({ message: "No hay productos disponibles" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

productoRoute.post("/", async (req, res) => {
        try {
            const nuevoProducto = await productoContenedor.insert(req.body);
            res.status(201).json({
                message: "Producto creado con éxito",
                producto: nuevoProducto,
            });
        } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

productoRoute.get("/:id", async (req, res) => {
    try {
        const getProductoById = await productoContenedor.getById(req.params.id);
        if(getProductoById.length > 0) {
            res.status(200).json(getProductoById);
        } else {
            res.status(404).json({ message: "Producto no encontrado: id "  + req.params.id });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

productoRoute.put("/:id", async (req, res) => {
    try {
        const modificarProducto = await productoContenedor.put(
            req.body,
            req.params.id
        );

        res.status(200).json({
            message: "Producto actualizado con éxito",
            producto: modificarProducto,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

productoRoute.delete("/:id", async (req, res) => {
    try {
        const borrarProducto = await productoContenedor.deleteById(req.params.id);
        borrarProducto
            ? res.status(200).json({ message: "Producto borrado con éxito", id: req.params.id })
            : res.status(404).json({ message: "Producto no encontrado: id "  + req.params.id });
    
    } catch (err) {
        return err.message;
    }
});

productoRoute.get("/mongo/documents", async (req, res) => {
    try {
        const getDocument = await productoMongoContenedor.getDocuments();
        getDocument
            ? res.status(200).json(getDocument)
            : res.status(404).json({ message: "No hay productos disponibles" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

productoRoute.post("/mongo/documents", async (req, res) => {
    try {
        const insertDocument = await productoMongoContenedor.insertDocument(req.body);
        res.status(201).json({
            message: "Producto creado con éxito",
            producto: insertDocument,
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

productoRoute.delete("/mongo/:code", async (req, res) => {
    try {
        const deleteDocumentByCode = await productoMongoContenedor.deleteDocumentByCode(req.params.code);
        deleteDocumentByCode
            ? res.status(200).json({ message: "Producto borrado con éxito", code: req.params.code })
            : res.status(404).json({ message: "Producto no encontrado: code "  + req.params.code });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

productoRoute.put("/mongo/:code", async (req, res) => {
    try {
        const updateDocumentByCode = await productoMongoContenedor.updateDocumentByCode(req.params.code, req.body);
        res.status(200).json({
            message: "Producto actualizado con éxito",
            producto: updateDocumentByCode,
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export default productoRoute;
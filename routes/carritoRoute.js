//! CRUD CARRITOS

import { Router } from 'express';
import carritoControlador from '../controladores/carritoControlador.js';
import mongoDBControlador from '../controladores/mongoCarritoControlador.js';
const mongoCarritoContenedor = new mongoDBControlador();
const carritoContenedor = new carritoControlador();
const carritoRoute = Router();

carritoRoute.get("/", async (req, res) => {
    try {
        const getCarritos = await carritoContenedor.getAll();
        const sinCarritos = "No hay carritos disponibles.";
        getCarritos 
            ? res.status(200).json(getCarritos) 
            : res.status(404).json(sinCarritos);
    }
    catch (err) {
        console.log(err);
    }
});

carritoRoute.get("/:id", async (req, res) => {
    try {
        const getCarritoById = await carritoContenedor.getById(req.params.id);

        getCarritoById
        ? res.status(200).json(getCarritoById)
        : res.status(404).json({ message: "Carrito no encontrado. id: " + req.params.id });

    } catch (err) {
        console.log(err);
    }
});

carritoRoute.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await carritoContenedor.insert(req.body);
        res.status(201).json(
            {
                message: "Carrito creado con éxito",
                carrito: nuevoCarrito,
            }
        );
    } catch (err) {
        console.log(err);
    }
});

carritoRoute.delete("/:id", async (req, res) => {
    try {
        const getCarritoById = await carritoContenedor.getById(req.params.id);
        if (getCarritoById) {
            const borrarCarrito = await carritoContenedor.deleteById(req.params.id);
            res.status(200).json({
                message: "Carrito eliminado con éxito",
                carrito: borrarCarrito,
            });
        } else {
            res.status(404).json({ message: "Carrito no encontrado. id: " + req.params.id });
        };
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

carritoRoute.post("/:idCarrito/productos/:idProducto", async (req, res) => {
    try {
        const idCarrito = req.params.idCarrito;
        const idProducto = req.params.idProducto;
        const carrito = await carritoContenedor.getById(idCarrito);
        const producto = await carritoContenedor.getById(idProducto);

        if (idCarrito && idProducto) {
            await carritoContenedor.agregarProducto(idCarrito, idProducto);
            res.status(201).json({
                message: "Producto agregados con éxito",
                carrito: idCarrito,
                producto: idProducto,
            });
        }

        if (!carrito) {
            res.status(404).json({ message: "Carrito no encontrado. id: " + req.params.id });
        }

        if (!producto) {
            res.status(404).json({ message: "La lista de productos está vacía" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

carritoRoute.delete("/:idCarrito/productos/:idProducto", async (req, res) => {
    try {
        const idCarrito = req.params.idCarrito;
        const idProducto = req.params.idProducto;
        const carrito = await carritoContenedor.getById(idCarrito);
        const producto = await carritoContenedor.getById(idProducto);
        if (idCarrito && idProducto) {
            await carritoContenedor.borrarProducto(idCarrito, idProducto);
    
            res.status(200).json({
                message: "Producto eliminado con éxito",
                carrito: idCarrito,
                producto: idProducto,
            });
        }

        if (!carrito) {
            res.status(404).json({ message: "Carrito no encontrado. id: " + req.params.id });
        }

        if (!producto) {
            res.status(404).json({ message: "La lista de productos está vacía" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

carritoRoute.get("/:id/productos", async (req, res) => {
    try {
        const carrito = await carritoContenedor.getById(req.params.id);
        if(carrito){
            const productos = await carritoContenedor.mostrarProductosDeCarrito(req.params.id);
            res.status(200).json(productos);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

carritoRoute.get("/mongo/documents", async (req, res) => {
    try {
        const getDocument = await mongoCarritoContenedor.getDocuments();
        getDocument
            ? res.status(200).json(getDocument)
            : res.status(404).json({ message: "No hay carritos disponibles" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

carritoRoute.post("/mongo/documents", async (req, res) => {
    try {
        const insertDocument = await mongoCarritoContenedor.insertDocument(req.body);
        res.status(201).json({
            message: "Carrito creado con éxito",
            carrito: insertDocument,
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

carritoRoute.delete("/mongo/:code", async (req, res) => {
    try {
        const deleteDocumentByCode = await mongoCarritoContenedor.deleteDocumentByCode(req.params.code);
        deleteDocumentByCode
            ? res.status(200).json({ message: "Carrito borrado con éxito", code: req.params.code })
            : res.status(404).json({ message: "Carrito no encontrado: code "  + req.params.code });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

carritoRoute.put("/mongo/:code", async (req, res) => {
    try {
        const updateDocumentByCode = await mongoCarritoContenedor.updateDocumentByCode(req.params.code, req.body);
        res.status(200).json({
            message: "Carrito actualizado con éxito",
            carrito: updateDocumentByCode,
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default carritoRoute;
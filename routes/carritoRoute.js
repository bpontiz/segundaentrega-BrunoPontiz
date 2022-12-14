//! CRUD CARRITOS

import { Router } from 'express';
import carritoControlador from '../controladores/carritoControlador.js';
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

export default carritoRoute;
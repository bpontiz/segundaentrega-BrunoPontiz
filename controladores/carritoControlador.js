import mainControlador from "./mainControlador.js";
import knex from 'knex';
import { optionsMysql } from '../config/mariaDB.js';
const database = knex(optionsMysql);

class carritoControlador extends mainControlador {
    constructor() {
        super('carritos');
    }

    async mostrarProductosDeCarrito(idCarrito) {
        try {
            const productos = await database('carritos_productos').select("producto_id")
                .where("carrito_id", idCarrito)
                .join("productos", "carritos_productos.producto_id", "productos.id")
                .select("productos.*");
            return productos;
        }
        catch (err) {
            console.log(`mostrarProductosDeCarrito METHOD ERR! ${err}`);
        }
    }

    async agregarProducto(idProducto, idCarrito) {
        try {
            const nuevoProducto = await database("carritos_productos").insert(
                {
                    carrito_id: idCarrito,
                    producto_id: idProducto
                }
            );
            return nuevoProducto;
        }
        catch (err) {
            console.log(`agregarProducto METHOD ERR! ${err}`);
        }
    }

    async borrarProducto(idCarrito, idProducto) {
        try {
            const borrarProducto = await db("carritos_productos").where("carrito_id", idCarrito)
                .andWhere("producto_id", idProducto)
                .del();
            return borrarProducto;
        }
        catch (error) {
            console.log(`borrarProducto METHOD ERR! ${err}`);
        }
    };

};

export default carritoControlador;
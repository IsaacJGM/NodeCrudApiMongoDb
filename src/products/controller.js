const createError = require("http-errors");
const debug = require("debug")("app:modules:products:controller");
const { ProductsService } = require("./services");
const { Response } = require("../common/response");

module.exports.ProductsController = {
  getProducts: async (req, res) => {
    try {
      let products = await ProductsService.getAll();
      Response.success(res, 200, "Lista de productos", products);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      let product = await ProductsService.getById(id);
      if (!product) {
        Response.success(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Producto ${id} encontrado`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createProduct: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await ProductsService.create(body);
        Response.success(res, 201, "Producto agregado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  //update
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const updatedProduct = await ProductsService.update(id, body);
        Response.success(res, 200, "Producto actualizado", updatedProduct);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  //delete
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await ProductsService.deleteById(id);
      Response.success(res, 200, "Producto eliminado", deletedProduct);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  generateReport: (req, res) => {
    try {
      ProductsService.generateReport("inventario", res);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};

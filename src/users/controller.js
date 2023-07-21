const createError = require("http-errors");
const debug = require("debug")("app:modules:users:controller");
const { UsersService } = require("./services");
const { Response } = require("../common/response");

module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      let users = await UsersService.getAll();
      Response.success(res, 200, "Lista de usuarios", users);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      let user = await UsersService.getById(id);
      if (!user) {
        Response.success(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `User ${id} encontrado`, user);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createUser: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await UsersService.create(body);
        Response.success(res, 201, "Usuario agregado", insertedId);
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
        const updatedUser = await UsersService.update(id, body);
        Response.success(res, 200, "Usuario actualizado", updatedUser);
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
      const deletedUserProduct = await UsersService.deleteById(id);
      Response.success(res, 200, "Producto eliminado", deletedUserProduct);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};

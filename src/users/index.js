const express = require("express");

const { UsersController } = require("./controller");

const router = express.Router();

module.exports.UsersAPI = (app) => {
  router
    .get("/", UsersController.getUsers) // http://localhost:3000/api/products
    .get("/:id", UsersController.getUserById) // http://localhost:3000/api/products/123
    .post("/", UsersController.createUser) // http://localhost:3000/api/products
    .put("/:id", UsersController.updateProduct) // http://localhost:3000/api/products/123
    .delete("/:id", UsersController.deleteProduct); // http://localhost:3000/api/products/123
  //realizar los 2 endpoints de update y delete

  app.use("/api/users", router);
};

const express = require("express");

const { ProductsController } = require("./controller");

const router = express.Router();

module.exports.ProductsAPI = (app) => {
  router
    .get("/", ProductsController.getProducts) // http://localhost:3000/api/products
    .get("/report", ProductsController.generateReport) // http://localhost:3000/api/products/report
    .get("/:id", ProductsController.getProductById) // http://localhost:3000/api/products/123
    .post("/", ProductsController.createProduct) // http://localhost:3000/api/products
    .put("/:id", ProductsController.updateProduct) // http://localhost:3000/api/products/123
    .delete("/:id", ProductsController.deleteProduct); // http://localhost:3000/api/products/123
  //realizar los 2 endpoints de update y delete

  app.use("/api/products", router);
};

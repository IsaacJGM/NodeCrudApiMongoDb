const express = require("express");
const debug = require("debug")("app:main");

const { Config } = require("./src/config/index");
const { ProductsAPI } = require("./src/products/index");
const { UsersAPI } = require("./src/users/index");
const { IndexApi, NotFoundApi } = require("./src/index/index");

const app = express();

const PORT = parseInt(Config.port);
app.use(express.json());

//modulos
IndexApi(app);
ProductsAPI(app);
UsersAPI(app);
NotFoundApi(app);

app.listen(PORT, () => {
  debug(`Server running in port ${PORT}`);
});

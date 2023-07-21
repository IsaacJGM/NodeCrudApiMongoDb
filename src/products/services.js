//aqui va la logica de la aplicacion

const { ObjectId } = require("mongodb");
const { Database } = require("../database/index");
const { ProductsUtils } = require("./utils");
const COLLECTION = "products";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  //consultas hacia la base de datos (CRUD) mongo db
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  const objectId = new ObjectId(id);
  return await collection.findOne({ _id: objectId });
};

const create = async (product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(product);
  return result.insertedId;
};

const update = async (id, product) => {
  const collection = await Database(COLLECTION);
  const objectId = new ObjectId(id);
  let result = await collection.updateOne({ _id: objectId }, { $set: product });
  return result.modifiedCount;
};

const deleteById = async (id) => {
  const collection = await Database(COLLECTION);
  const objectId = new ObjectId(id);
  let result = await collection.deleteOne({ _id: objectId });
  return result.deletedCount;
};
//update
//delete

const generateReport = async (name, res) => {
  let products = await getAll();
  ProductsUtils.excelGenerator(products, name, res);
};

module.exports.ProductsService = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  generateReport,
};

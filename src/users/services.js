//aqui va la logica de la aplicacion

const { ObjectId } = require("mongodb");
const { Database } = require("../database/index");
const COLLECTION = "users";

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

const create = async (user) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(user);
  return result.insertedId;
};

const update = async (id, user) => {
  const collection = await Database(COLLECTION);
  const objectId = new ObjectId(id);
  let result = await collection.updateOne({ _id: objectId }, { $set: user });
  return result.modifiedCount;
};

const deleteById = async (id) => {
  const collection = await Database(COLLECTION);
  const objectId = new ObjectId(id);
  let result = await collection.deleteOne({ _id: objectId });
  return result.deletedCount;
};

module.exports.UsersService = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};

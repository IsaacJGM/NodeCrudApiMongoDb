const { MongoClient } = require("mongodb");
const debug = require("debug")("app:database");
const { Config } = require("../config/index");

var connection = null;

module.exports.Database = (collection) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!connection) {
        const client = new MongoClient(Config.mongoUri);
        connection = await client.connect();
        debug("New connection to MongoDB Atlas");
      }
      debug("Reusing connection to MongoDB Atlas");
      const db = connection.db(Config.mongoDbname);
      resolve(db.collection(collection));
    } catch (error) {
      reject(error);
    }
  });

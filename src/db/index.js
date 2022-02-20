require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

/**
 * Create MongoDB connection and return a specified collection
 * @param {string} _collection collection name
 * @returns Promise<Collection<Document>>
 */
const getCollection = async (_collection) => {
  try {
    const dbName = process.env.DB_NAME;
    const connectionURL = process.env.DB_CONNECTION_URL;
    if (!dbName || !connectionURL) {
      throw new Error('Connection URL or DB name missing');
    }
    const client = await new MongoClient(connectionURL).connect();
    return client.db(dbName).collection(_collection);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = getCollection;

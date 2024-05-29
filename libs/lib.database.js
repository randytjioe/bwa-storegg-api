const mongoose = require("mongoose");
const { Logging } = require("./lib.logging");

const { MONGO_URL } = process.env

const configDB = {
  
  // dstHost: 'localhost',
  useNewUrlParser: true,
}

const MongoDBConnection = () => {
  mongoose
    .connect(MONGO_URL, configDB)
    .then(() => {
      Logging.info("Berhasil terhubung ke database mongoDB");
    })
    .catch((error) => {
      Logging.error("Gagal terkoneksi database mongoDB");
      Logging.error(error.message);
    });
}

module.exports = {
  MongoDBConnection
}
const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");

const mongoDBConnect = async (options = {}) => {
  try {
    await mongoose.connect(mongodbURL);
    console.log("Mongodb connection successfully!");
    mongoose.connection.on("error", (error) => {
      console.error(`Mongodb Connection failed.! ${error}`);
    });
  } catch (err) {
    console.error(`Could not connected to db ${err.toString()}`);
  }
};

module.exports = mongoDBConnect;

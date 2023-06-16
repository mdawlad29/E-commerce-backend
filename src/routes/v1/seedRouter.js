const express = require("express");
const { seedUser } = require("../../controllers/seedUserController");
const seedRouter = express.Router();

seedRouter.get("/users", seedUser);

module.exports = seedRouter;

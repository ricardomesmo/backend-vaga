const express = require("express");
const users = require("./controllers/users");
const favorites = require("./controllers/favorites");
const session = require("./controllers/session");

const routes = express.Router();

routes.post("/login", session.login);
routes.post("/users", users.createUser);
routes.get("/users", users.listUsers);
routes.get("/favorites", favorites.listFavorites);
routes.post("/users/favorites", favorites.createFavorite);
routes.get("/users/favorites", favorites.indexFavorite);
routes.delete("/users/favorites/:id", favorites.removeFavorites);

module.exports = routes;

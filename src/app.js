const express = require("express");
require("dotenv").config();
const app = express();

const movieControllers = require("./controllers/movieControllers");
const users = require("./controllers/users");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", users.getUsers);
app.get("/api/users/:id", users.getUsersById);
module.exports = app;

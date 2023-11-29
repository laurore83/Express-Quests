const express = require("express");
require("dotenv").config();
const app = express();

const movieControllers = require("./controllers/movieControllers");
const users = require("./controllers/users");
const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");

app.use(express.json());
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", users.getUsers);
app.get("/api/users/:id", users.getUsersById);
app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.post("/api/users", validateUser, movieControllers.postUsers);
app.put("/api/movies/:id", validateMovie, movieControllers.updateMovieById);
app.put("/api/users/:id", validateUser, users.updateUsersById);

module.exports = app;

const database = require("../../database");

const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    color: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    color: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];
const getMovies = (req, res) => {
  database
    .query("SELECT * FROM movies")
    .then(([movies]) => {
      console.log(movies);
      res.json(movies);
    })
    .catch((err) => {
      console.err(500);
      res.statuts(500).send("Internal Server Error");
    });
};
const updateMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
      [title, director, year, color, duration, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("SELECT * FROM movies WHERE id =?", [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;
  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const postUsers = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  postUsers,
  updateMovieById,
};
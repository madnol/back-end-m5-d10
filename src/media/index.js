const { getmovies, writemovies } = require("../fsUtilities");
const axios = require("axios");
const express = require("express");
const movieRoute = express.Router();
const { join } = require("path");
const { check } = require("express-validator");
// const PDFDocument = require("pdfkit")

const moviesPath = join(__dirname, "media.json");
// get movies from axios or from file with title
movieRoute.get("/", async (req, res, next) => {
  try {
    if (req.query && req.query.title) {
      let response = axios
        .get(`http://www.omdbapi.com/?apikey=73cccb60&t=${req.query.title}`)
        .then(response => res.send(response.data));
    } else {
      let movies = getmovies();

      res.send(movies);
    }
  } catch (err) {
    console.log(err), next(err);
  }
});

// get movies with id
movieRoute.get("/:id", async (req, res, next) => {
  let response = axios
    .get(`http://www.omdbapi.com/?apikey=73cccb60&i=${req.params.id}`)
    .then(response => res.send(response.data));
});

movieRoute.post("/", async (req, res, next) => {
  check("imdbID").exists().withMessage("imdbID is required").not().isEmpty();
  try {
    let newMovie = { ...req.body };
    let movies = await getmovies(moviesPath);
    movies.push(newMovie);
    await writemovies(movies);
    res.send("post movie");
  } catch (err) {
    console.log(err), next(err);
  }
});
movieRoute.put("/:id", async (req, res, next) => {
  let movies = await getmovies(moviesPath);
  let filteredmovie = movies.filter(movie => movie.imdbID !== req.params.id);

  editedmovie = { ...req.body, imdbID: req.params.id };
  filteredmovie.push(editedmovie);
  await writemovies(filteredmovie);
  res.send("updated movie");
});

movieRoute.delete("/:id", async (req, res, next) => {
  try {
    let movies = await getmovies(moviesPath);
    let filteredmovie = movies.filter(movie => movie.imdbID !== req.params.id);
    await writemovies(filteredmovie);

    res.send(filteredmovie);
  } catch (err) {
    console.log(err), next(err);
  }
});

module.exports = movieRoute;

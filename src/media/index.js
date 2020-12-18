const { getmedias, writemedias } = require("../fsUtilities");
const axios = require("axios");
const express = require("express");
const mediaRoute = express.Router();
const { join } = require("path");
const { check } = require("express-validator");
// const PDFDocument = require("pdfkit")

const mediasPath = join(__dirname, "media.json");
// get medias from axios or from file with title

mediaRoute.get("/", async (req, res, next) => {
  try {
    if (req.query && req.query.title) {
      let response = axios
        .get(`http://www.omdbapi.com/?apikey=bdddd0c1&t=${req.query.title}`)
        .then(response => res.send(response.data));
    } else {
      let medias = await getmedias(mediasPath);

      res.send(medias);
    }
  } catch (err) {
    console.log(err), next(err);
  }
});

// get medias with id
mediaRoute.get("/:id", async (req, res, next) => {
  let response = axios
    .get(`http://www.omdbapi.com/?apikey=bdddd0c1&i=${req.params.id}`)
    .then(response => res.send(response.data));
});

mediaRoute.post("/", async (req, res, next) => {
  check("imdbID").exists().withMessage("imdbID is required").not().isEmpty();
  try {
    let newmedia = { ...req.body };
    let medias = await getmedias(mediasPath);
    medias.push(newmedia);
    await writemedias(medias);
    res.send("media posted correctly!");
  } catch (err) {
    console.log(err), next(err);
  }
});
mediaRoute.put("/:id", async (req, res, next) => {
  let medias = await getmedias(mediasPath);
  let filteredmedia = medias.filter(media => media.imdbID !== req.params.id);

  editedmedia = { ...req.body, imdbID: req.params.id };
  filteredmedia.push(editedmedia);
  await writemedias(filteredmedia);
  res.send("updated media");
});

mediaRoute.delete("/:id", async (req, res, next) => {
  try {
    let medias = await getmedias(mediasPath);
    let filteredmedia = medias.filter(media => media.imdbID !== req.params.id);
    await writemedias(filteredmedia);

    res.send(filteredmedia);
  } catch (err) {
    console.log(err), next(err);
  }
});

module.exports = mediaRoute;

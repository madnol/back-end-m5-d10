const { readJSON, writeJSON } = require("fs-extra"); //ASYNC METHODS OF READING/WRITING JSONS
const { join } = require("path"); //JOIN IS USED TO GET RELATIVE FILE PATHS
const reviewPath = join(__dirname, "./reviews/reviews.json");
const moviesPath = join(__dirname, "./media/media.json"); //CREATE A PATH TO MOVIES JSON

const readDB = async (filepath) => {
  try {
    const fileAsAJson = await readJSON(filepath);
    return fileAsAJson;
  } catch (riccky) {
    throw new Error(riccky);
  }
};

const writeDB = async (filepath, fileContent) => {
  try {
    await writeJSON(filepath, fileContent);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  readDB,
  writeDB,
  getMovies: async () => readDB(moviesPath), //EXPORTS A FUNCTION THAT AUTOMATICALLY RETURNS THE MOVIES JSON AS AN ARRAY
  writeMovies: async (moviesData) => writeDB(moviesPath, moviesData), //EXPORTS A FUNCTION THAT ONLY RECIEVES AN ARRAY AND OVERWRITES THE MOVIES JSON
};

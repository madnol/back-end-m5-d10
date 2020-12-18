const { readJSON, writeJSON } = require("fs-extra"); //ASYNC METHODS OF READING/WRITING JSONS
const { join } = require("path"); //JOIN IS USED TO GET RELATIVE FILE PATHS
const reviewPath = join(__dirname, "./reviews/reviews.json");
const mediasPath = join(__dirname, "./media/media.json"); //CREATE A PATH TO medias JSON

const readDB = async filepath => {
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
  getmedias: async () => readDB(mediasPath), //EXPORTS A FUNCTION THAT AUTOMATICALLY RETURNS THE medias JSON AS AN ARRAY
  writemedias: async mediasData => writeDB(mediasPath, mediasData), //EXPORTS A FUNCTION THAT ONLY RECIEVES AN ARRAY AND OVERWRITES THE medias JSON
};

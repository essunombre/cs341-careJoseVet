// this is variable when testing in local
// CALLBACK_URL = http://localhost:3000/github/callback
// https://cs341-carejosevet.onrender.com/github/callback


// to change to local
// "host": "localhost:3000",
// "basePath": "/",
// "schemes": [
//   "http",
//   "https"
// ],


// "host": "cs341-carejosevet.onrender.com",
// "basePath": "/",
// "schemes": [
//   "https"
// ],

const swaggerAutogen = require("swagger-autogen");
const doc = {
  info: {
    title: "Care Jose Vet Api",
    description: "cs341 project3",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointFiles, doc)
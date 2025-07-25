const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json"; 
const endpointsFiles = ["./app.js"]; 

const doc = {
  info: {
    title: "Polytechnic Library API",
    description: "API for managing books, users, and transactions in the Polytechnic Library System.",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

swaggerAutogen(outputFile, endpointsFiles, doc);

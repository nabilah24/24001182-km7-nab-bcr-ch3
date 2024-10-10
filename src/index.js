require('dotenv').config(); // Load environment variables from .env
const express = require("express");
require("express-async-errors");
const fileUpload = require("express-fileupload");
const Router = require("./routes");
const { errorHandler, notFoundURLHandler } = require("./middlewares/errors");
const router = require("express/lib/router");

// Make initiate express application
const app = express();
const port = process.env.PORT || 4000;

// Activate to body parser/reader (req.body)
app.use(express.json());

// Read form-body (body parser/reader) (req.files) if want to upload file
app.use(
  fileUpload({
    limits: {fileSize: 50 * 1024 * 1024}, // 50 MB
  })
);

// All routes define here
app.use("/", router);

// This function is for 404 handle URL
app.use("*", notFoundURLHandler);

// This function is for hendle error API hit, it always be last middleware
app.use(errorHandler);

// Run the express,js application
app.listen(port, () => {
  console.log(`The application is running on port ${port}`);
});
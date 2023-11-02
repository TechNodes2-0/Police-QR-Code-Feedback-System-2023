const express = require("express");
const app = express();
const districtRoutes = require("./routes/districtRoutes");
const 
const cors = require("cors");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const fileUpload = require("express-fileupload");
const cloudinary = require("./db/cloudinary");

require("dotenv").config();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//routes

app.use("/districts", districtRoutes);
app.use("/divisions", districtRoutes);

// Error handler middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

cloudinary.cloudinaryConnect();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

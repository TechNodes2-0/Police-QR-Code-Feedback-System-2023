const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoute");
const districtRoutes = require("./routes/districtRoutes");
const divisionRoutes = require("./routes/divisonRoutes");
const policeStationRoutes = require("./routes/policeStationRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const qrCodesRoutes = require("./routes/qrCodesRoutes");
const positionRoutes = require("./routes/positionRoutes");
const cors = require("cors");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const fileUpload = require("express-fileupload");
const cloudinary = require("./db/cloudinary");

require("dotenv").config();

app.use(cors({}));

// Middleware
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/districts", districtRoutes);
app.use("/divisions", divisionRoutes);
app.use("/police-stations", policeStationRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/qrcodes", qrCodesRoutes);
app.use("/position", positionRoutes);

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

import express from 'express';
import cors from 'cors';
import v1Routes from './routes';
import mongoose from 'mongoose'; 

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(cors());

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json());
app.use(v1Routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message
    }
  });
});

app.listen(PORT, () => console.log(`App Listening on port ${PORT}`));

export default app;

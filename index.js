const express = require("express");
require('dotenv').config();
const { connectToMongoDB } = require("./connectMongoDB");
const apiRouter = require("./routes/user");
const projectRouter = require("./routes/project");
const clientsReviewRouter = require("./routes/clientsReview");
const blogsRouter = require("./routes/blogs");
const cookieParser = require("cookie-parser");
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB database
connectToMongoDB(process.env.MONGO_URL);

// Set up EJS for rendering views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));

// Allow all CORS requests
app.use(cors({
  origin: '*',
  credentials: true, 
}));

// Routes
app.use("/api", apiRouter);
app.use("/api/projects", projectRouter);
app.use("/api/clientReviews", clientsReviewRouter);
app.use("/api/blogs", blogsRouter);

// Start server
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

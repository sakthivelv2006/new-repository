import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./route/route.userroute.js";
import bookRoutes from "./route/booking.routes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "https://sivanethunaitoursandtravels.vercel.app" }));


app.get("/", (req, res) => {
  res.send("MERN Backend Running with Import Syntax!");
});

// Use User Routes
app.use("/api/users", userRoutes);
app.use("/api/users/book", bookRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const cors = require("cors");
const carsRoutes=require("../server/routes/carsRoutes")
const reservationsRouter = require('../server/routes/reservationRoutes');
dotenv.config({ path: "./config/.env" });

connectDb();
const app = express();

const port = process.env.PORT || 3000;
const corsOptions = {
    origin: "http://localhost:5173", // Replace with your frontend app's URL
    credentials: true, // To allow cookies to be sent
  };
  app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/cars", carsRoutes);
app.use('/api/reservations', reservationsRouter);

// app.use("/api/auth", auth);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

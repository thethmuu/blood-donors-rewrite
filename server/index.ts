import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import donorRouter from "./src/routes/donor.route";
import donationRouter from "./src/routes/donation.route";
import authRouter from "./src/routes/auth.route";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.ORIGIN_URL, credentials: true }));
app.use(express.json());

app.use("/api/donors", donorRouter);

app.use("/api/donations", donationRouter);

app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is listening on http://127.0.0.1:5000");
});

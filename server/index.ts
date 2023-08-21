import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import donorRouter from "./src/routes/donor.route";
import donationRouter from "./src/routes/donation.route";
import authRouter from "./src/routes/auth.route";
import checkAuth from "./src/middlewares/checkAuth";
import handleCronJob from "./src/libs/handleCronJob";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.ORIGIN_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/donors", checkAuth, donorRouter);

app.use("/api/donations", checkAuth, donationRouter);

app.use("/api/auth", authRouter);

cron.schedule("0 8 * * *", handleCronJob);

app.listen(process.env.PORT, () => {
  console.log("Server is listening on http://127.0.0.1:5000");
});

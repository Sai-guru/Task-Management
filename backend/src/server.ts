import dotenv from "dotenv";
dotenv.config();
import "./config/db.js";
import app from "./app.js";
import { initializeDatabase } from "./config/db.js";

const PORT = Number(process.env.PORT) || 5000;

await initializeDatabase();

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config();

app.listen(process.env.PORT, () => {
  console.log("Listning to port :- ", process.env.PORT);
});

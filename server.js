import app from "./app.js";
import { connectDB } from "./drizzle/db.js";

const PORT = process.env.PORT;

let db;
connectDB().then((drizzleInstance) => {
  db = drizzleInstance;
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

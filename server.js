import express from "express";
import "./db.js";
import productsRoute from "./routes/productsRoute.js";
import userRoute from "./routes/usersRoute.js";
import orderRoute from "./routes/ordersRoute.js";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);

console.log(__dirname)

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server avviato alla porta " + port);
});

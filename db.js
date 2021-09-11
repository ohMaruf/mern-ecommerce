import mongoose from "mongoose";

let mongoDBUrl =
  "mongodb+srv://fuffo:fuffo@cluster0.rkrgg.mongodb.net/mern-ecommerce";

mongoose.connect(mongoDBUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
let dbConnect = mongoose.connection;

dbConnect.on("error", () => {
  console.log("MongoDB connessione fallita");
});

dbConnect.on("connected", () => {
  console.log("MongoDB connessione riuscita");
});

export default mongoose;

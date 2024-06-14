import express from "express";
import router from "./routes/index.js";
// import morgan from "morgan";
// import cookieParser from "cookie-parser"
import dbConnection from "./dbConnection/dbConnection.js";
// import {SERVER_PORT} from "./config/config.js"
const app = express();

// app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser())


app.use("/api", router)

app.use((req, res, next) => {
  res.status(404).send({ success: false, message: "not found" });
});

await dbConnection.sync({force:false})

app.listen(8080, () => {
  console.log("Escuchando el servidor 8080"); 
});


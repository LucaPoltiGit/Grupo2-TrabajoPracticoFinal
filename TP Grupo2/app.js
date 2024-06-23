import express from "express";
import router from "./routes/index.js";
import { createServer } from "http";
// import { Server } from "socket.io";
import dbConnection from "./dbConnection/dbConnection.js";
// import morgan from "morgan";
// import cookieParser from "cookie-parser";
// import { SERVER_PORT } from "./config/config.js";

const app = express();

// app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.use(express.static('public'));

const server = createServer(app);

const io = new Server(server);

const rooms = {
  // "xxx1"
  // "yyy2"
  // "zzz3"
}

io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });

rooms.forEach(room => {
  socket.on(`playroom: ${room}`, (msg) =>{

    io.emit(`playroom: ${room}`, msg)})
  })

  socket.on('mensaje', (msg) => {
    console.log('Mensaje recibido: ' + msg);
    io.emit('mensaje', msg);
  });
});

app.use("/api", router);

app.use((req, res, next) => {
  res.status(404).send({ success: false, message: "Ruta no encontrada" });
});

await dbConnection.sync({ force: false });

server.listen(8080, () => {
  console.log("Escuchando el servidor 8080");
});

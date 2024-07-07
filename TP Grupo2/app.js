import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dbConnection from "./dbConnection/dbConnection.js";
import cookieParser from "cookie-parser";
import router from './routes/index.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", router)
app.use(express.static('public'));

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Permitir cualquier origen para desarrollo
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.send('Servidor corriendo correctamente');
});



// Gestión de eventos de Socket.IO
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('actualizarSalas', (data)=>{
    io.emit('actualizarSalas', data)
    console.log("data: ",data)
  })

  socket.on('joinRoom', (roomId) => {

    //const roomExists = rooms.find(room => room.room_id === roomId);
    console.log("Room id: ",roomId)
    // if (roomExists) {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
      io.to(roomId).emit('playerJoined', socket.id);
  //  } else {
  //    socket.emit('error', 'La sala no existe');
  //  }
  });
  socket.on('movimiento',({roomId, updatedBoard, nextPlayer})=>{
    io.to(roomId).emit('movimiento', ({updatedBoard, nextPlayer}))

  })




  // Evento para salir de una sala
  socket.on('leaveRoom', () => {
    const roomName = players[socket.id];
    if (roomName) {
      socket.leave(roomName);
      delete players[socket.id];
      io.to(roomName).emit('playerLeft', socket.id);
    }
  });


});

app.use((req, res, next) => {
  res.status(404).send({ success: false, message: "Ruta no encontrada" });
});

await dbConnection.sync({ force: false });

server.listen(8080, () => {
  console.log("Escuchando el servidor 8080");
});
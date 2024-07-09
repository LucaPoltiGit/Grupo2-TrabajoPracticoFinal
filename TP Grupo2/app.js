import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dbConnection from "./dbConnection/dbConnection.js";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", router);
app.use(express.static("public"));

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Permitir cualquier origen para desarrollo
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Servidor corriendo correctamente");
});

const players = {}; // Un objeto para almacenar los jugadores en cada sala

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("actualizarSalas", (data) => {
    io.emit("actualizarSalas", data);

    console.log("data: ", data);
  });


  socket.on("joinRoom", ({ roomId, authData }) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);

    // Verifica si ya hay un jugador en la sala
    if (!players[roomId]) {
      players[roomId] = { jugador1: authData, jugador2: null };
      io.to(roomId).emit("playerJoined", { jugador1: authData });
    } else if (!players[roomId].jugador2) {
      players[roomId].jugador2 = authData;
      io.to(roomId).emit("playerJoined", {
        jugador1: players[roomId].jugador1,
        jugador2: authData,
      });
    } else {
      // La sala está llena
      socket.emit("roomFull", "La sala está llena");
    }
  });

  socket.on("movimiento", ({ roomId, updatedBoard, nextPlayer }) => {
    io.to(roomId).emit("movimiento", { updatedBoard, nextPlayer });
  });

  // Maneja la desconexión
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
    // Elimina al jugador de la sala
    for (const roomId in players) {
      if (
        players[roomId].jugador1 &&
        players[roomId].jugador1.id === socket.id
      ) {
        players[roomId].jugador1 = null;
      } else if (
        players[roomId].jugador2 &&
        players[roomId].jugador2.id === socket.id
      ) {
        players[roomId].jugador2 = null;
      }
    }
  });
});

// // Gestión de eventos de Socket.IO
// io.on('connection', (socket) => {
//   console.log('Nuevo cliente conectado');

//   socket.on('actualizarSalas', (data)=>{
//     io.emit('actualizarSalas', data)
//     console.log("data: ",data)
//   })

//   socket.on('joinRoom', ({roomId, authData}) => {

//     //const roomExists = rooms.find(room => room.room_id === roomId);
//     console.log("Room id: ",roomId)
//     // if (roomExists) {
//       socket.join(roomId);
//       console.log(`Socket ${socket.id} joined room ${roomId}`);
//       io.to(roomId).emit('playerJoined', authData);
//   //  } else {
//   //    socket.emit('error', 'La sala no existe');
//   //  }
//   });

//   socket.on('movimiento',({roomId, updatedBoard, nextPlayer})=>{
//     io.to(roomId).emit('movimiento', ({updatedBoard, nextPlayer}))

//   })

//   socket.on('setPlayer',({authData, roomId})=>{
//     console.log("jugador: ", typeof authData, authData)
//     //socket.join(roomId);

//     io.to(roomId).emit('setPlayer', authData)

//   })

//   socket.on('setRoomId',(roomParamsId)=>{
//     socket.emit('setRoomId', roomParamsId)
//     console.log("roomId: ", roomParamsId)
//   })

//   // Evento para salir de una sala
//   socket.on('leaveRoom', () => {
//     const roomName = players[socket.id];
//     if (roomName) {
//       socket.leave(roomName);
//       delete players[socket.id];
//       io.to(roomName).emit('playerLeft', socket.id);
//     }
//   });

// });

app.use((req, res, next) => {
  res.status(404).send({ success: false, message: "Ruta no encontrada" });
});

await dbConnection.sync({ force: false });

server.listen(8080, () => {
  console.log("Escuchando el servidor 8080");
});

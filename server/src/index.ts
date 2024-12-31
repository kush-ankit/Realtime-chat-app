import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { userSave } from "./controllers/user.controller";

const app = express();
const cors = require("cors")
const httpServer = createServer(app);

const port = process.env.PORT || 4001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  console.log("Request received");
  res.send("Hello, from Express server!");
});

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
  },
});


io.on("connect", (socket) => {
  console.log("Socket connected: ", socket.id);

  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
    console.log(`${socket.id} joined room ${roomName}`);
    socket.to(roomName).emit('sendMessage', `User ${socket.id} has joined the room!`);
  });

  socket.on("sendMessage", (data) => {
    userSave(data)
    socket.to(data.room).emit('recieveMessage', data.message);
  });

  socket.on("allSockets", () => {
    io.sockets.sockets.forEach((socket) => {
      console.log(`Connected User: ${socket.id}`);
    });
  });

  socket.on('getAllUserInRoom', (roomName) => {
    const room = io.sockets.adapter.rooms.get(roomName);
    if (room) {
      const usersInRoom = Array.from(room);
      console.log(`Users in room ${roomName}:`, usersInRoom);
    }
  });

  socket.on("disconnect", () => {
    console.log('Socket disconnected: ', socket.id);
  });
});

httpServer.listen(port, () => {
  console.log("Server is running on port " + port);
});
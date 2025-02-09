import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { userSave } from "./controllers/user.controller";
import { authRoute } from "./routers/auth.route";
import mongoose from "mongoose";
import { AuthenticatedRequest, tokenValidator } from "./middleware/reqValidator";
import { CustomSocket } from "../types/types";
require('dotenv').config();
const app = express();
const cors = require("cors")
const httpServer = createServer(app);
const port = process.env.PORT || 4000;
const cookieParser = require('cookie-parser')


const connectWithRetry = () => {
  mongoose
    .connect(process.env.mongoURI || "")
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
      console.error(err);
      setTimeout(connectWithRetry, 30000)
    });
}
connectWithRetry();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));


app.use("/api/auth", authRoute);
app.get("/api/data", tokenValidator, (req: AuthenticatedRequest, res: Response) => {
  console.log(req.user);
  res.send("djflkjdlf")
})

app.get("/", (req: Request, res: Response) => {
  console.log("Request received");
  res.send("Hello, from Express server!");
});

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
  },
});

io.use((socket: CustomSocket, next) => {
  const username = socket.handshake.auth?.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});


io.on("connection", (socket: CustomSocket) => {

  const users = [];
  for (let [id, soc] of io.of("/").sockets) {
    users.push({
      userID: id,
    });
  }
  socket.emit("users", users);

  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
    console.log(socket.username);

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
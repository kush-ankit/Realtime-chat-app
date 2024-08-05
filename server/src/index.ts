import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.get("/", (req, res) => {
  console.log("Request received");
  res.send("Hello, from Express server!");
});

io.on("connection", (socket) => {
  console.log("Socket connection established", socket.id);
  socket.on('message', (data) => {
    console.log(data);
    io.emit('message', data);
  })
});

httpServer.listen(4000);
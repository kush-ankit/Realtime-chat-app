import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  console.log("Request received");
  res.send("Hello, from Express server!");
});

io.on("connection", (socket) => {
  console.log("Socket connected: ", socket.id);
  socket.on('hello', (data) => {
    console.log(data);
  })
  socket.on('disconnect', () => {
    console.log('Socket disconnected: ', socket.id);
  })
});

httpServer.listen(4000, () => {
  console.log("Server is running on port 4000");
});
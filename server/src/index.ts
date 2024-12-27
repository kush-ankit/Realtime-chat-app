import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
const httpServer = createServer(app);

const port = process.env.PORT || 4001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  socket.on("sendMessage", (data) => {
    console.log(data);
    io.emit('recieveMessage', data.message)
  })
  socket.on("disconnect", () => {
    console.log('Socket disconnected: ', socket.id);
  })
});

httpServer.listen(port, () => {
  console.log("Server is running on port " + port);
});
// import express, { Express, Request, Response } from "express";
// import dotenv from "dotenv";
// dotenv.config();
// import { createServer } from "http";
// import { Server } from "socket.io";
// const app: Express = express();
// const port = process.env.PORT || 4000;
// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000"
//   }
// });
// app.get("/", (req: Request, res: Response) => {
//   console.log("request received");
//   res.send("Express + TypeScript Server");
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });

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

io.on("connection", (socket) => {
  console.log("Socket connection established", socket.id);
  socket.on('hi', (data) => {
    console.log(data);

  })
});

httpServer.listen(4000);
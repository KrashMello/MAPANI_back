import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { routes,sockIO } from "#Routes/api";
// import DB from "#Class/database";

const app = express();
app.use(express.json());
routes(app);

//socket io implement

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

sockIO(io);


server.listen(process.env.SOCKET_PORT || 7000, () => {
  console.log(`server socket listening on Port ${process.env.SOCKET_PORT}`);
});

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`listening on port ${process.env.SERVER_PORT || 3000}`);
});

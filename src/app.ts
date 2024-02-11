import express, { Application } from "express";
import http from "http";
import { Server, Socket } from "socket.io";

class App {
  // constructor é algo que é iniciado quando a classe for iniciada

  private app: Application;
  private http: http.Server;
  private io: Server;
  constructor() {
    this.app = express();
    this.http = new http.Server(this.app);
    this.io = new Server(this.http);
  }

  public listen() {
    this.app.listen(3333, () => console.log("Server running on port 3333"));
  }

  public listenSocket() {
    this.io.of("/streams").on("connection", this.socketEvents);
  }

  private socketEvents(socket: Socket) {
    console.log("socket connect", +socket);
    socket.on("subscribe", (data) => {
      socket.join(data.roomId);

      socket.broadcast.to(data.roomId).emit("chat", {
        message: data.message,
        userName: data.userName,
        time: data.time,
      });
    });
  }
}

export { App };

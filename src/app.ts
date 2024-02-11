import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";

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
}

export { App };

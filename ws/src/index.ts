import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

//event handler
wss.on("connection", function (socket) {
  console.log("user connected");

  socket.on("message", function (e) {
    console.log(e.toString());
    if (e.toString() === "ping") {
      socket.send("pong");
    }
  });
});

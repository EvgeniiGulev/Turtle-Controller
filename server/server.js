const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 43509, host: "0.0.0.0" });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    console.log("received: %s", data);
    // Broadcast the message to all connected clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.send("connected");
});

console.log("WebSocket server running on ws://localhost:43509");

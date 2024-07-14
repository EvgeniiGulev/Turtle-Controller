export const sendCommand = (ws, command) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(command);
  } else {
    console.log("Problem sending command! Please check your connection.");
  }
};

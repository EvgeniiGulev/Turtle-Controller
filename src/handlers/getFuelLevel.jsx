import { blobToJson } from "./blobToJson";
import { sendCommand } from "./sendCommand";

export const getFuelLevel = (ws, setFuelLevel) => {
  sendCommand(ws, "getFuel");

  let messageCount = 0;

  ws.onmessage = async function (event) {
    try {
      messageCount++;

      if (messageCount === 2) {
        const FuelData = await blobToJson(event.data);
        setFuelLevel(FuelData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return null;
};

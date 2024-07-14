import { blobToJson } from "./blobToJson";
import { sendCommand } from "./sendCommand";

const handleInspect = (
  ws,
  setBlockCollision,
  setBlockName,
  setBlockDirection
) => {
  sendCommand(ws, "inspect");

  let messageCount = 0;

  ws.onmessage = async function (event) {
    try {
      messageCount++;

      if (messageCount === 2) {
        const blockData = await blobToJson(event.data);
        if (blockData === "Nothing to inspect" || blockData[0] !== '"') {
          console.log("Nothing to inspect or invalid block data");
          setBlockDirection(0);
          setBlockName("None");
          setBlockCollision(false);
          return;
        }
        setBlockDirection(0);
        setBlockCollision(true);
        setBlockName(blockData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return null;
};

const handleInspectUp = (
  ws,
  setBlockCollision,
  setBlockName,
  setBlockDirection
) => {
  sendCommand(ws, "inspectUp");

  let messageCount = 0;

  ws.onmessage = async function (event) {
    try {
      messageCount++;

      if (messageCount === 2) {
        const blockData = await blobToJson(event.data);
        if (blockData === "Nothing to inspect" || blockData[0] !== '"') {
          console.log("Nothing to inspect or invalid block data");
          setBlockDirection(2);
          setBlockName("None");
          setBlockCollision(false);
          return;
        }
        setBlockDirection(2);
        setBlockCollision(true);
        setBlockName(blockData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return null;
};

const handleInspectDown = (
  ws,
  setBlockCollision,
  setBlockName,
  setBlockDirection
) => {
  sendCommand(ws, "inspectDown");

  let messageCount = 0;

  ws.onmessage = async function (event) {
    try {
      messageCount++;

      if (messageCount === 2) {
        const blockData = await blobToJson(event.data);
        if (blockData === "Nothing to inspect" || blockData[0] !== '"') {
          console.log("Nothing to inspect or invalid block data");
          setBlockDirection(1);
          setBlockName("None");
          setBlockCollision(false);
          return;
        }

        setBlockDirection(1);
        setBlockCollision(true);
        setBlockName(blockData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return null;
};

export { handleInspect, handleInspectUp, handleInspectDown };

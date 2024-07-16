import { sendCommand } from "./sendCommand";
import { blobToJson } from "./blobToJson";

const updateInventory = (ws) => {
  sendCommand(ws, "update");

  return new Promise((resolve) => {
    let messageCount = 0;

    const onMessage = async (event) => {
      try {
        messageCount++;
        if (messageCount === 2) {
          ws.removeEventListener("message", onMessage);
          const inventoryData = await blobToJson(event.data);
          /* console.log(inventoryData); */
          const inventorySlots = document.querySelectorAll(".inventory-slot");
          inventorySlots.forEach((slot, slotIndex) => {
            const itemCount = slot.querySelector(".inventory-item-count");
            const item = slot.querySelector(".inventory-item");

            const slotData = inventoryData[slotIndex];
            if (slotData) {
              itemCount.innerHTML = slotData.count ?? "";
              item.innerHTML = slotData.name ?? "";
            } else {
              itemCount.innerHTML = "";
              item.innerHTML = "";
            }
          });
          resolve(inventoryData);
        }
      } catch (error) {
        ws.removeEventListener("message", onMessage);
        console.error("Error:", error);
      }
    };

    ws.addEventListener("message", onMessage);
  });
};

export { updateInventory };

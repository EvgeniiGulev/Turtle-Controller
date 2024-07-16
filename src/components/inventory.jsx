import React, { useState } from "react";

const Inventory = ({ ws, setInventorySlot }) => {
  const [selectedSlot, setSelectedSlot] = useState(0);

  const handleSelectSlot = (index) => {
    setSelectedSlot(index);
    setInventorySlot(index);
    ws.send("select " + index);
  };

  const slots = Array.from({ length: 16 }).map((_, index) => (
    <div
      key={index}
      className="inventory-slot"
      onClick={() => handleSelectSlot(index)}
      style={{
        border: selectedSlot === index ? "3px solid white" : "none",
      }}
    >
      <p className="inventory-item-count"></p>
      <p className="inventory-item"></p>
    </div>
  ));

  return <section className="inventory-container">{slots}</section>;
};

export default Inventory;

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Inventory from "./components/inventory";
import Controls from "./components/controls";
import Tooltip from "./components/tooltip";
import Heading from "./components/heading";
import Turtle from "./model/turtle";
import Block from "./model/block";
import "./App.css";
import {
  handleForward,
  handleBack,
  handleLeft,
  handleRight,
  handleUp,
  handleDown,
  handleAddBlock,
  handleRemoveBlock,
  handleBlockColor,
  getBlockColor,
} from "./handlers/handlers";

const ws = new WebSocket("ws://localhost:43509");

// WebSocket event listeners
ws.onopen = function () {
  console.log("Connected to WebSocket server");
};

ws.onclose = function () {
  console.log("Disconnected from WebSocket server");
};
function App() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [isFacing, setIsFacing] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const [blockCollision, setBlockCollision] = useState(false);
  const [blockName, setBlockName] = useState("");
  const [blockDirection, setBlockDirection] = useState(0);
  const [worldBlocks, setWorldBlocks] = useState([]);
  const [blockColor, setBlockColor] = useState([]);
  const [assignColor, setAssignColor] = useState(null);
  const [inventorySlot, setInventorySlot] = useState(1);

  const handleTooltip = (event, text) => {
    setTooltipText(text);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    setShowTooltip(true);
  };

  useEffect(() => {
    const handleKeyDown = async (event) => {
      switch (event.key.toLowerCase()) {
        case "w":
          handleForward(ws, setIsFacing, setPosition);
          break;
        case "a":
          handleLeft(ws, setIsFacing, setRotationAngle);
          break;
        case "s":
          handleBack(ws, setIsFacing, setPosition);
          break;
        case "d":
          handleRight(ws, setIsFacing, setRotationAngle);
          break;
        case "arrowup":
          handleUp(ws, setPosition);
          break;
        case "arrowdown":
          handleDown(ws, setPosition);
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ws]);

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => setShowTooltip(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  useEffect(() => {
    const addOrRemoveBlock = async () => {
      if (blockCollision) {
        /* console.log("Add Block: " + blockName); */

        handleBlockColor(blockName, setBlockColor, blockColor);

        await new Promise((resolve) => setTimeout(resolve, 7));

        getBlockColor(blockName, blockColor, setAssignColor);

        await new Promise((resolve) => setTimeout(resolve, 7));

        handleAddBlock(
          blockDirection,
          isFacing,
          position.x,
          position.y,
          position.z,
          blockName,
          setWorldBlocks,
          assignColor
        );
      } else if (blockName === "None") {
        /* console.log("Removed Block: " + blockName); */

        handleRemoveBlock(
          blockDirection,
          isFacing,
          position.x,
          position.y,
          position.z,
          setWorldBlocks
        );
      }

      setBlockDirection(0);
      setBlockCollision(false);
      setBlockName("");
    };

    addOrRemoveBlock();
  }, [
    blockCollision,
    blockName,
    blockColor,
    assignColor,
    blockDirection,
    handleAddBlock,
    handleRemoveBlock,
    isFacing,
    position,
  ]);

  return (
    <main className="main-container">
      <Heading />
      <Controls
        setBlockCollision={setBlockCollision}
        setBlockName={setBlockName}
        setBlockDirection={setBlockDirection}
        ws={ws}
      />
      <Inventory ws={ws} setInventorySlot={setInventorySlot} />
      <Canvas
        camera={{ position: [position.x, position.y + 1, position.z + 5] }}
      >
        <ambientLight />
        <Turtle
          position={[position.x, position.y, position.z]}
          key={"Bob"}
          rotationAngle={rotationAngle}
          setIsFacing={setIsFacing}
        />
        {worldBlocks.map((block) => (
          <Block
            position={block.position}
            text={block.name}
            key={block.id}
            color={block.color}
            handleTooltip={handleTooltip}
          />
        ))}
        <OrbitControls />
      </Canvas>{" "}
      {showTooltip && <Tooltip text={tooltipText} position={tooltipPosition} />}
    </main>
  );
}

export default App;

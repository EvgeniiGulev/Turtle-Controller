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
  //Movement
  handleForward,
  handleBack,
  handleLeft,
  handleRight,
  handleUp,
  handleDown,
  //Block Management
  handleAddBlock,
  handleRemoveBlock,
} from "./handlers/handlers";

function App() {
  const ws = new WebSocket("ws://localhost:43509");

  ws.onopen = function () {
    console.log("Connected to WebSocket server");
  };

  ws.onclose = function () {
    console.log("Disconnected from WebSocket server");
  };

  const [rotationAngle, setRotationAngle] = useState(0);
  const [isX, setIsX] = useState(0);
  const [isY, setIsY] = useState(0);
  const [isZ, setIsZ] = useState(0);
  const [isFacing, setIsFacing] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const [blockCollision, setBlockCollision] = useState(false);
  const [blockName, setBlockName] = useState("");
  const [blockDirection, setBlockDirection] = useState(0);
  const [worldBlocks, setWorldBlocks] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key.toLowerCase()) {
        case "w":
          handleForward(ws, setIsFacing, setIsX, setIsZ);
          break;
        case "a":
          handleLeft(ws, setIsFacing, setRotationAngle);
          break;
        case "s":
          handleBack(ws, setIsFacing, setIsX, setIsZ);
          break;
        case "d":
          handleRight(ws, setIsFacing, setRotationAngle);
          break;
        case "arrowup":
          handleUp(ws, setIsY);
          break;
        case "arrowdown":
          handleDown(ws, setIsY);
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    handleForward,
    handleBack,
    handleLeft,
    handleRight,
    handleUp,
    handleDown,
    ws,
  ]);

  const handleTooltip = (event, text) => {
    setTooltipText(text);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    setShowTooltip(true);
  };

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => setShowTooltip(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  useEffect(() => {
    if (blockCollision) {
      console.log("Add Block: " + blockName);
      handleAddBlock(
        blockDirection,
        isFacing,
        isX,
        isY,
        isZ,
        blockName,
        setWorldBlocks
      );
    } else if (blockName === "None") {
      console.log("Remove Block: " + blockName);
      handleRemoveBlock(
        blockDirection,
        isFacing,
        isX,
        isY,
        isZ,
        setWorldBlocks
      );
    }

    // Reset state variables after processing
    setBlockDirection(0);
    setBlockCollision(false);
    setBlockName("");
  }, [
    blockCollision,
    blockName,
    handleAddBlock,
    handleRemoveBlock,
    isFacing,
    isX,
    isY,
    isZ,
    blockDirection,
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
      <Inventory />
      <Canvas camera={{ position: [isX, isY + 1, isZ + 5] }}>
        <ambientLight />
        <Turtle
          position={[isX, isY, isZ]}
          key={"Bob"}
          rotationAngle={rotationAngle}
          setIsFacing={setIsFacing}
        />
        {worldBlocks.map((block) => (
          <Block
            position={block.position}
            text={block.name}
            key={block.id}
            handleTooltip={handleTooltip}
          />
        ))}
        <Block
          position={[1, 1, 0]}
          text={"kurva"}
          key={"123123"}
          handleTooltip={handleTooltip}
        />
        <OrbitControls />
      </Canvas>{" "}
      {showTooltip && <Tooltip text={tooltipText} position={tooltipPosition} />}
    </main>
  );
}

export default App;

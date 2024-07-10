import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei";
import "./App.css";
import Heading from "./components/heading";
import Inventory from "./components/inventory";
import Controls from "./components/controls";

function App() {
  const ws = new WebSocket("ws://localhost:43509");

  ws.onopen = function () {
    console.log("Connected to WebSocket server");
  };

  ws.onclose = function () {
    console.log("Disconnected from WebSocket server");
  };

  const sendCommand = (command) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(command);
    }
  };

  const handleForward = () => {
    sendCommand("forward");
  };

  const handleBack = () => {
    sendCommand("back");
  };

  const handleLeft = () => {
    sendCommand("left");
  };

  const handleRight = () => {
    sendCommand("right");
  };
  const handleUp = () => {
    sendCommand("up");
  };

  const handleDown = () => {
    sendCommand("down");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "w" || event.key === "W") {
        handleForward();
      } else if (event.key === "a" || event.key === "A") {
        handleLeft();
      } else if (event.key === "s" || event.key === "S") {
        handleBack();
      } else if (event.key === "d" || event.key === "D") {
        handleRight();
      } else if (event.key === "ArrowUp") {
        handleUp();
      } else if (event.key === "ArrowDown") {
        handleDown();
      }
    };

    // Attach the event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const Block = ({ ...props }) => {
    let color = "red";
    return (
      <mesh {...props} scale="1">
        <boxGeometry />
        <meshStandardMaterial color={color} />
        <Edges linewidth={3} threshold={15} color={"black"} />
      </mesh>
    );
  };

  const [isHovered, setIsHovered] = useState(false);

  const Turtle = ({ ...props }) => {
    let color = "white";
    return (
      <mesh {...props} scale="1">
        <boxGeometry />
        <meshStandardMaterial color={color} />
        <Edges linewidth={3} threshold={15} color={"black"} />
      </mesh>
    );
  };

  return (
    <main className="main-container">
      <Heading />
      <Controls />
      <Inventory />
      <Canvas>
        <ambientLight />
        <Block position={[1, 0, 0]} />
        <Turtle position={[0, 0, 0]} />
        <OrbitControls />
      </Canvas>
    </main>
  );
}

export default App;

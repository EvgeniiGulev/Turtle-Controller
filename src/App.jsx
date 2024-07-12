import React, { useEffect, useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei";
import "./App.css";
import Inventory from "./components/inventory";
import Controls from "./components/controls";
import * as THREE from "three";

function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isX, setIsX] = useState(0);
  const [isY, setIsY] = useState(0);
  const [isZ, setIsZ] = useState(0);
  const [isFacing, setIsFacing] = useState(0);

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
    } else {
      console.log("Problem sending command! Please check your connection.");
    }
  };

  const handleForward = useCallback(() => {
    sendCommand("forward");
    setIsFacing((prevFacing) => {
      if (prevFacing % 4 === 0) {
        setIsZ((prevZ) => prevZ - 1);
      } else if (prevFacing % 4 === 2) {
        setIsZ((prevZ) => prevZ + 1);
      } else if (prevFacing % 4 === 1) {
        setIsX((prevX) => prevX + 1);
      } else if (prevFacing % 4 === 3) {
        setIsX((prevX) => prevX - 1);
      }
      return prevFacing;
    });
  }, [sendCommand]);

  const handleBack = useCallback(() => {
    sendCommand("back");
    setIsFacing((prevFacing) => {
      if (prevFacing % 4 === 0) {
        setIsZ((prevZ) => prevZ + 1);
      } else if (prevFacing % 4 === 2) {
        setIsZ((prevZ) => prevZ - 1);
      } else if (prevFacing % 4 === 1) {
        setIsX((prevX) => prevX - 1);
      } else if (prevFacing % 4 === 3) {
        setIsX((prevX) => prevX + 1);
      }
      return prevFacing;
    });
  }, [sendCommand]);

  const handleLeft = useCallback(() => {
    sendCommand("left");
    setIsFacing((prevFacing) => (prevFacing - 1 + 4) % 4);
    setRotationAngle((prevAngle) => prevAngle + Math.PI / 2);
  }, [sendCommand]);

  const handleRight = useCallback(() => {
    sendCommand("right");
    setIsFacing((prevFacing) => (prevFacing + 1) % 4);
    setRotationAngle((prevAngle) => prevAngle - Math.PI / 2);
  }, [sendCommand]);

  const handleUp = useCallback(() => {
    sendCommand("up");
    setIsY((prevY) => prevY + 1);
  }, [sendCommand]);

  const handleDown = useCallback(() => {
    sendCommand("down");
    setIsY((prevY) => prevY - 1);
  }, [sendCommand]);

  const handleOverIn = () => {
    setIsHovered(!isHovered);
  };

  const Block = ({ ...props }) => {
    const blockRef = useRef();
    const color = isHovered ? "teal" : "red";
    return (
      <mesh
        {...props}
        ref={blockRef}
        scale="1"
        onClick={handleOverIn}
        className="block-mesh"
      >
        <boxGeometry />
        <meshStandardMaterial color={color} />
        <Edges linewidth={3} threshold={15} color={"black"} />
      </mesh>
    );
  };

  const Turtle = ({ position, ...props }) => {
    const turtleRef = useRef();

    useEffect(() => {
      const handleKeyDown = (event) => {
        switch (event.key.toLowerCase()) {
          case "w":
            handleForward();
            break;
          case "a":
            handleLeft();
            break;
          case "s":
            handleBack();
            break;
          case "d":
            handleRight();
            break;
          case "arrowup":
            handleUp();
            break;
          case "arrowdown":
            handleDown();
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
    ]);

    useFrame(() => {
      if (turtleRef.current) {
        turtleRef.current.rotation.y = rotationAngle;
      }
    });

    return (
      <mesh ref={turtleRef} position={position} scale={1} {...props}>
        <boxGeometry />
        <arrowHelper
          args={[
            new THREE.Vector3(0, 0, -1),
            new THREE.Vector3(0, 0, 0),
            2,
            0xff0000,
          ]}
        />
        <meshStandardMaterial color={"white"} />
        <Edges linewidth={3} threshold={15} color={"black"} />
      </mesh>
    );
  };

  return (
    <main className="main-container">
      <Controls />
      <Inventory />
      <Canvas>
        <ambientLight />
        <Block position={[2, 0, 0]} />
        <Turtle position={[isX, isY, isZ]} />
        <OrbitControls />
      </Canvas>
    </main>
  );
}

export default App;

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei";
import "./App.css";
import Inventory from "./components/inventory";
import Controls from "./components/controls";
import Tooltip from "./components/tooltip";
import Heading from "./components/heading";
import * as THREE from "three";

const ws = new WebSocket("ws://localhost:43509");

ws.onopen = function () {
  console.log("Connected to WebSocket server");
};

ws.onclose = function () {
  console.log("Disconnected from WebSocket server");
};

function App() {
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

  const handleTooltip = (event, text) => {
    setTooltipText(text);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    setShowTooltip(true);
  };

  const handleAddBlock = useCallback(() => {
    let x = 0,
      y = 0,
      z = 0;
    switch (blockDirection) {
      case 0:
        if (isFacing === 0) z--;
        else if (isFacing === 1) x++;
        else if (isFacing === 2) z++;
        else if (isFacing === 3) x--;
        break;
      case 1:
        y--;
        break;
      case 2:
        y++;
        break;
      default:
        break;
    }
    setWorldBlocks((prevWorldBlocks) => [
      ...prevWorldBlocks,
      {
        id: prevWorldBlocks.length,
        position: [isX + x, isY + y, isZ + z],
        name: blockName,
      },
    ]);
  }, [blockDirection, isFacing, isX, isY, isZ, blockName]);

  const handleRemoveBlock = useCallback(() => {
    let x = 0,
      y = 0,
      z = 0;
    switch (blockDirection) {
      case 0:
        if (isFacing === 0) z--;
        else if (isFacing === 1) x++;
        else if (isFacing === 2) z++;
        else if (isFacing === 3) x--;
        break;
      case 1:
        y--;
        break;
      case 2:
        y++;
        break;
      default:
        break;
    }

    const positionToRemove = [isX + x, isY + y, isZ + z];

    setWorldBlocks((prevWorldBlocks) =>
      prevWorldBlocks.filter(
        (block) =>
          block.position[0] !== positionToRemove[0] ||
          block.position[1] !== positionToRemove[1] ||
          block.position[2] !== positionToRemove[2]
      )
    );
    console.log("Removed block at position:", positionToRemove);
  }, [blockDirection, isFacing, isX, isY, isZ]);

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => setShowTooltip(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  useEffect(() => {
    console.log(blockName);
    if (blockCollision) {
      handleAddBlock();
    } else if (blockName === "None") {
      handleRemoveBlock();
    }
    setBlockCollision(false);
  }, [blockCollision, blockName, handleAddBlock, handleRemoveBlock]);

  const Block = ({ text, position, ...props }) => {
    const blockRef = useRef();

    return (
      <mesh
        {...props}
        ref={blockRef}
        position={position}
        scale="1"
        className="block-mesh"
        onClick={(event) => handleTooltip(event, text)}
      >
        <boxGeometry />
        <meshStandardMaterial color={"blue"} />
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
      <Heading />
      <Controls
        setBlockCollision={setBlockCollision}
        setBlockName={setBlockName}
        setBlockDirection={setBlockDirection}
      />
      <Inventory />
      <Canvas camera={{ position: [isX, isY + 1, isZ + 5] }}>
        <ambientLight />
        <Turtle position={[isX, isY, isZ]} key={"Bob"} />
        {worldBlocks.map((block) => (
          <Block position={block.position} text={block.name} key={block.id} />
        ))}
        <OrbitControls />
      </Canvas>
      {showTooltip && <Tooltip text={tooltipText} position={tooltipPosition} />}
    </main>
  );
}

export default App;

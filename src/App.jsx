import React, { useEffect, useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei";
import "./App.css";
import Heading from "./components/heading";
import Inventory from "./components/inventory";
import Controls from "./components/controls";

function App() {
  const blockRef = useRef();
  const turtleRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isX, setIsX] = useState(0);
  const [isY, setIsY] = useState(0);
  const [isZ, setIsZ] = useState(0);
  const [isFacing, setIsFacing] = useState(0);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:43509");

    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const sendCommand = (command) => {
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(command);
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
  }, [sendCommand]);

  const handleRight = useCallback(() => {
    sendCommand("right");
    setIsFacing((prevFacing) => (prevFacing + 1) % 4);
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
    return (
      <mesh
        {...props}
        ref={blockRef}
        scale="1"
        onClick={handleOverIn}
        className="block-mesh"
      >
        <boxGeometry />
        <meshStandardMaterial color={"red"} />
        <Edges linewidth={3} threshold={15} color={"black"} />
      </mesh>
    );
  };

  const Turtle = ({ position, ...props }) => {
    const turtleRef = useRef();
    const [targetPosition, setTargetPosition] = useState(position);

    useEffect(() => {
      setTargetPosition(position);
    }, [position]);

    useFrame(() => {
      if (turtleRef.current) {
        const moveSpeed = 0.05;
        turtleRef.current.position.x +=
          (targetPosition[0] - turtleRef.current.position.x) * moveSpeed;
        turtleRef.current.position.y +=
          (targetPosition[1] - turtleRef.current.position.y) * moveSpeed;
        turtleRef.current.position.z +=
          (targetPosition[2] - turtleRef.current.position.z) * moveSpeed;
      }
    });

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

    const color = isHovered ? "yellow" : "white";

    return (
      <mesh ref={turtleRef} position={targetPosition} scale={1} {...props}>
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
        <Turtle position={[isX, isY, isZ]} />
        <OrbitControls />
      </Canvas>
    </main>
  );
}

export default App;

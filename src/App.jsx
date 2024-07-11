import React, { useEffect, useRef, useState } from "react";
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

  const handleForward = () => {
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
  };

  const handleBack = () => {
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
  };

  const handleLeft = () => {
    sendCommand("left");
    setIsFacing((prevFacing) => (prevFacing - 1 + 4) % 4);
  };

  const handleRight = () => {
    sendCommand("right");
    setIsFacing((prevFacing) => (prevFacing + 1) % 4);
  };

  const handleUp = () => {
    sendCommand("up");
    setIsY((prevY) => prevY + 1);
  };

  const handleDown = () => {
    sendCommand("down");
    setIsY((prevY) => prevY - 1);
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

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
    const [newPosition, setNewPosition] = useState(position);
    const moveSpeed = 0.05;
    useFrame(() => {
      turtleRef.current.position.x +=
        (newPosition[0] - turtleRef.current.position.x) * moveSpeed;
      turtleRef.current.position.y +=
        (newPosition[1] - turtleRef.current.position.y) * moveSpeed;
      turtleRef.current.position.z +=
        (newPosition[2] - turtleRef.current.position.z) * moveSpeed;
    });

    useEffect(() => {
      setNewPosition(position);
    }, [position]);

    let color = "white";
    return (
      <mesh {...props} ref={turtleRef} scale={1}>
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

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Edges } from "@react-three/drei";

const Turtle = ({ position, rotationAngle = 0, ...props }) => {
  const turtleRef = useRef();

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

export default Turtle;

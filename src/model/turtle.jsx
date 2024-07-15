import React, { useRef } from "react";
import * as THREE from "three";
import { Edges } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";

const Turtle = ({ position, rotationAngle, ...props }) => {
  const turtleRef = useRef();

  const { rotation } = useSpring({
    rotation: [0, rotationAngle, 0],
    config: { tension: 170, friction: 44 },
  });

  return (
    <a.mesh
      ref={turtleRef}
      position={position}
      rotation={rotation}
      scale={1}
      {...props}
    >
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
    </a.mesh>
  );
};

export default Turtle;

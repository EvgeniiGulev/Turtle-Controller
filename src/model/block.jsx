import React, { useRef } from "react";
import { Edges } from "@react-three/drei";

const Block = ({ text, position, handleTooltip, ...props }) => {
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

export default Block;

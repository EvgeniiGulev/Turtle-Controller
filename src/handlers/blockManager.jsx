// Function to handle adding a block
const handleAddBlock = (
  blockDirection,
  isFacing,
  isX,
  isY,
  isZ,
  blockName,
  setWorldBlocks
) => {
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
};

// Function to handle removing a block
const handleRemoveBlock = (
  blockDirection,
  isFacing,
  isX,
  isY,
  isZ,
  setWorldBlocks
) => {
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
};

export { handleAddBlock, handleRemoveBlock };

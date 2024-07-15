// Utility function to generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const handleBlockColor = (blockName, setBlockColor, blockColor) => {
  if (blockColor.some((block) => block.name === blockName)) {
    /* console.log("Block already exists. No changes made."); */
    return;
  } else {
    /* console.log("New Color Has Been Added!"); */
    const newColor = getRandomColor();
    const updatedColors = [...blockColor, { name: blockName, color: newColor }];
    setBlockColor(updatedColors);
    /* console.log(updatedColors); */
  }
};

export const getBlockColor = (blockName, blockColor, setAssignColor) => {
  const block = blockColor.find((block) => block.name === blockName);
  /* console.log("Block found:", block); */
  setAssignColor(block ? block.color : null);
};

import { sendCommand } from "./sendCommand";

const handleForward = (ws, setIsFacing, setIsX, setIsZ) => {
  sendCommand(ws, "forward");
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

const handleBack = (ws, setIsFacing, setIsX, setIsZ) => {
  sendCommand(ws, "back");
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

const handleLeft = (ws, setIsFacing, setRotationAngle) => {
  sendCommand(ws, "left");
  setIsFacing((prevFacing) => (prevFacing - 1 + 4) % 4);
  setRotationAngle((prevAngle) => prevAngle + Math.PI / 2);
};

const handleRight = (ws, setIsFacing, setRotationAngle) => {
  sendCommand(ws, "right");
  setIsFacing((prevFacing) => (prevFacing + 1) % 4);
  setRotationAngle((prevAngle) => prevAngle - Math.PI / 2);
};

const handleUp = (ws, setIsY) => {
  sendCommand(ws, "up");
  setIsY((prevY) => prevY + 1);
};

const handleDown = (ws, setIsY) => {
  sendCommand(ws, "down");
  setIsY((prevY) => prevY - 1);
};

export {
  handleForward,
  handleBack,
  handleLeft,
  handleRight,
  handleUp,
  handleDown,
};

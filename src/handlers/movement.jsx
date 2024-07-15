import { sendCommand } from "./sendCommand";

const handleForward = (ws, setIsFacing, setPosition) => {
  sendCommand(ws, "forward");
  setIsFacing((prevFacing) => {
    if (prevFacing % 4 === 0) {
      setPosition((prevPosition) => ({
        ...prevPosition,
        z: prevPosition.z - 1,
      }));
    } else if (prevFacing % 4 === 2) {
      setPosition((prevPosition) => ({
        ...prevPosition,
        z: prevPosition.z + 1,
      }));
    } else if (prevFacing % 4 === 1) {
      setPosition((prevPosition) => ({
        ...prevPosition,
        x: prevPosition.x + 1,
      }));
    } else if (prevFacing % 4 === 3) {
      setPosition((prevPosition) => ({
        ...prevPosition,
        x: prevPosition.x - 1,
      }));
    }
    return prevFacing;
  });
};

const handleBack = (ws, setIsFacing, setPosition) => {
  sendCommand(ws, "back");
  setIsFacing((prevFacing) => {
    if (prevFacing % 4 === 0) {
      setPosition((prevPosition) => ({
        ...prevPosition,
        z: prevPosition.z + 1,
      }));
    } else if (prevFacing % 4 === 2) {
      setPosition((prevPosition) => ({
        ...prevPosition,
        z: prevPosition.z - 1,
      }));
    } else if (prevFacing % 4 === 1) {
      setPosition((prevPosition) => ({
        ...prevPosition,
        x: prevPosition.x - 1,
      }));
    } else if (prevFacing % 4 === 3) {
      setPosition((prevPosition) => ({
        ...prevPosition,
        x: prevPosition.x + 1,
      }));
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

const handleUp = (ws, setPosition) => {
  sendCommand(ws, "up");
  setPosition((prevPosition) => ({
    ...prevPosition,
    y: prevPosition.y + 1,
  }));
};

const handleDown = (ws, setPosition) => {
  sendCommand(ws, "down");
  setPosition((prevPosition) => ({
    ...prevPosition,
    y: prevPosition.y - 1,
  }));
};

export {
  handleForward,
  handleBack,
  handleLeft,
  handleRight,
  handleUp,
  handleDown,
};

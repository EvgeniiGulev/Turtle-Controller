import { blobToJson } from "./blobToJson";

export const addTurtleId = (ws, setTurtles) => {
  let messageCount = 0;

  const onMessage = async (event) => {
    try {
      messageCount++;
      if (messageCount === 2) {
        const messageData = await blobToJson(event.data);

        if (typeof messageData !== "string") {
          /*           console.error(
            "Expected blobToJson to return a string, received:",
            messageData
          ); */
          return;
        }

        const splitMessage = messageData.split(" ");

        if (
          splitMessage.length !== 2 ||
          splitMessage[0] === "setActiveID" ||
          splitMessage[0] === "select"
        ) {
          return;
        }

        const turtleName = splitMessage[0];
        const turtleID = splitMessage[1];

        setTurtles((prevTurtles) => {
          const turtleExists = prevTurtles.some(
            (turtle) => turtle.id === turtleID && turtle.name === turtleName
          );

          if (!turtleExists) {
            return [...prevTurtles, { id: turtleID, name: turtleName }];
          }

          return prevTurtles;
        });

        ws.removeEventListener("message", onMessage);
      }
    } catch (error) {
      ws.removeEventListener("message", onMessage);
      /*       console.error("Error:", error); */
    }
  };

  ws.addEventListener("message", onMessage);
};

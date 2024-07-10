const controls = () => {
  const ws = new WebSocket("ws://localhost:43509");

  ws.onopen = function () {
    console.log("Connected to WebSocket server");
  };

  ws.onclose = function () {
    console.log("Disconnected from WebSocket server");
  };

  const sendCommand = (command) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(command);
    }
  };
  return (
    <section className="controls-container">
      <ul className="controls-list">
        <li className="controls-item">
          <button
            className="controls-btn-direction"
            onClick={() => sendCommand("digUp")}
          >
            Up
          </button>
          <button
            className="controls-btn-main"
            onClick={() => sendCommand("dig")}
          >
            Dig
          </button>
          <button
            className="controls-btn-direction"
            onClick={() => sendCommand("digDown")}
          >
            Down
          </button>
        </li>
        <li className="controls-item">
          <button
            className="controls-btn-direction"
            onClick={() => sendCommand("placeUp")}
          >
            Up
          </button>
          <button
            className="controls-btn-main"
            onClick={() => sendCommand("place")}
          >
            Place
          </button>
          <button
            className="controls-btn-direction"
            onClick={() => sendCommand("placeDown")}
          >
            Down
          </button>
        </li>
        <li className="controls-item">
          <button
            className="controls-btn-direction"
            onClick={() => sendCommand("suckUp")}
          >
            Up
          </button>
          <button
            className="controls-btn-main"
            onClick={() => sendCommand("suck")}
          >
            Suck
          </button>
          <button
            className="controls-btn-direction"
            onClick={() => sendCommand("suckDown")}
          >
            Down
          </button>
        </li>
        <li className="controls-item">
          <button
            className="controls-btn-direction"
            onClick={() => sendCommand("inspectUp")}
          >
            Up
          </button>
          <button
            className="controls-btn-main"
            onClick={() => sendCommand("inspect")}
          >
            Inspect
          </button>
          <button
            className="controls-btn-direction"
            onClick={() => sendCommand("inspectDown")}
          >
            Down
          </button>
        </li>
        <li className="controls-item">
          <button
            className="controls-btn-direction"
            onClick={() => sendCommand("compareUp")}
          >
            Up
          </button>
          <button
            className="controls-btn-main"
            onClick={() => sendCommand("compare")}
          >
            Compare
          </button>
          <button
            className="controls-btn-direction"
            onClick={() => sendCommand("compareDown")}
          >
            Down
          </button>
        </li>
        <li className="controls-item">
          <button
            className="controls-btn-direction"
            onClick={() => sendCommand("craft64")}
          >
            x64
          </button>
          <button
            className="controls-btn-main"
            onClick={() => sendCommand("craft")}
          >
            Craft
          </button>
          <button
            className="controls-btn-direction"
            onClick={() => sendCommand("craft1")}
          >
            x1
          </button>
        </li>
        <li className="controls-item">
          <img
            src="https://cdn-icons-png.flaticon.com/128/649/649686.png"
            alt="item-spacer"
          />
        </li>
        <li className="controls-item">
          <button
            className="controls-btn-option"
            onClick={() => sendCommand("getFuel")}
          >
            GetFuel
          </button>
        </li>
        <li className="controls-item">
          <button
            className="controls-btn-option"
            onClick={() => sendCommand("refuel")}
          >
            Refuel
          </button>
        </li>
        <li className="controls-item">
          <button
            className="controls-btn-option"
            onClick={() => sendCommand("edit")}
          >
            Edit
          </button>
        </li>
        <li className="controls-item">
          <img
            src="https://cdn-icons-png.flaticon.com/128/649/649686.png"
            alt="item-spacer"
          />
        </li>
        <li className="controls-item">
          <button
            className="controls-btn-utils"
            onClick={() => sendCommand("update")}
          >
            Update
          </button>
          <button
            className="controls-btn-utils"
            onClick={() => sendCommand("stop")}
          >
            Stop
          </button>
        </li>
        <li className="controls-item">
          <button
            className="controls-btn-utils"
            onClick={() => sendCommand("excavate")}
          >
            Excavate
          </button>
          <button
            className="controls-btn-utils"
            onClick={() => sendCommand("tunnel")}
          >
            Tunnel
          </button>
        </li>
        <li className="controls-item">
          <button
            className="controls-btn-utils"
            onClick={() => sendCommand("setHome")}
          >
            SetHome
          </button>
          <button
            className="controls-btn-utils"
            onClick={() => sendCommand("return")}
          >
            Return
          </button>
        </li>
        <li className="controls-item">
          <img
            src="https://cdn-icons-png.flaticon.com/128/649/649686.png"
            alt="item-spacer"
          />
        </li>
        <li className="controls-item">
          <p className="turtle-name">Turtle:</p>
        </li>
        <li className="controls-item">
          <select name="turtles" id="turtles" className="turtle-select">
            <option className="turtle-option" value="turtleid">
              #1 - Bob
            </option>
          </select>
        </li>
      </ul>
    </section>
  );
};

export default controls;

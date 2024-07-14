import { useState } from "react";
import {
  //Tunnel
  handleCloseTunnelPopup,
  handleOpenTunnelPopup,
  //Excavate
  handleCloseExcavatePopup,
  handleOpenExcavatePopup,
  //Inspect
  handleInspect,
  handleInspectUp,
  handleInspectDown,
} from "../handlers/handlers";

const Controls = ({
  ws,
  setBlockCollision,
  setBlockName,
  setBlockDirection,
}) => {
  const [wasSent, setWasSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  ws.onopen = function () {
    console.log("Connected to WebSocket server");
  };

  ws.onclose = function () {
    console.log("Disconnected from WebSocket server");
  };

  const handleWasSent = () => {
    setWasSent(!wasSent);
    setTimeout(() => {
      setWasSent(false);
    }, 5000);
  };

  const handleExcavateSubmit = () => {
    const width = document.querySelector(".excavate-width").value;
    const height = document.querySelector(".excavate-height").value;
    const depth = document.querySelector(".excavate-depth").value;

    if (ws.readyState === WebSocket.OPEN) {
      ws.send("excavate " + width + " " + height + " " + depth);
      handleWasSent();
      setErrorMessage("");
    } else {
      setErrorMessage("Problem sending command! Please check your connection.");
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  const handleTunnelSubmit = () => {
    const width = document.querySelector(".tunnel-width").value;
    const height = document.querySelector(".tunnel-height").value;
    const depth = document.querySelector(".tunnel-depth").value;

    if (ws.readyState === WebSocket.OPEN) {
      ws.send("tunnel " + width + " " + height + " " + depth);
      handleWasSent();
      setErrorMessage("");
    } else {
      setErrorMessage("Problem sending command! Please check your connection.");
      setTimeout(() => setErrorMessage(""), 5000);
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
            onClick={() =>
              handleInspectUp(
                ws,
                setBlockCollision,
                setBlockName,
                setBlockDirection
              )
            }
          >
            Up
          </button>
          <button
            className="controls-btn-main"
            onClick={() =>
              handleInspect(
                ws,
                setBlockCollision,
                setBlockName,
                setBlockDirection
              )
            }
          >
            Inspect
          </button>
          <button
            className="controls-btn-direction"
            onClick={() =>
              handleInspectDown(
                ws,
                setBlockCollision,
                setBlockName,
                setBlockDirection
              )
            }
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
            className="controls-btn-utils open-excavate-popup"
            onClick={() => handleOpenExcavatePopup()}
          >
            Excavate
          </button>
          <button
            className="controls-btn-utils open-tunnel"
            onClick={() => handleOpenTunnelPopup()}
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

      {/* Popups */}
      <dialog className="popup-container excavate-popup">
        <p className="popup-heading">Excavate Master</p>
        <div className="popup-input-container">
          <label htmlFor="width" className="popup-label">
            Width
          </label>
          <input
            type="number"
            name="width"
            id="width"
            className="input-box excavate-width"
            required
          />
          <label htmlFor="height" className="popup-label">
            Height
          </label>
          <input
            type="number"
            name="height"
            id="height"
            className="input-box excavate-height"
            required
          />
          <label htmlFor="depth" className="popup-label">
            Depth
          </label>
          <input
            type="number"
            name="depth"
            id="depth"
            className="input-box excavate-depth"
            required
          />
          <button
            type="submit"
            value="submit"
            className="submit-btn"
            onClick={handleExcavateSubmit}
            disabled={wasSent}
          >
            {wasSent ? "Sent!" : "Submit"}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <button className="close-popup" onClick={handleCloseExcavatePopup}>
          Cancel
        </button>
      </dialog>
      <dialog className="popup-container tunnel-popup">
        <p className="popup-heading">Tunnel Master</p>
        <div className="popup-input-container">
          <label htmlFor="width" className="popup-label">
            Width
          </label>
          <input
            type="number"
            name="width"
            id="width"
            className="input-box tunnel-width"
            required
          />
          <label htmlFor="height" className="popup-label">
            Height
          </label>
          <input
            type="number"
            name="height"
            id="height"
            className="input-box tunnel-height"
            required
          />
          <label htmlFor="depth" className="popup-label">
            Depth
          </label>
          <input
            type="number"
            name="depth"
            id="depth"
            className="input-box tunnel-depth"
            required
          />
          <button
            type="submit"
            value="submit"
            className="submit-btn"
            onClick={handleTunnelSubmit}
            disabled={wasSent}
          >
            {wasSent ? "Sent" : "Submit"}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <button className="close-popup" onClick={handleCloseTunnelPopup}>
          Cancel
        </button>
      </dialog>
    </section>
  );
};

export default Controls;

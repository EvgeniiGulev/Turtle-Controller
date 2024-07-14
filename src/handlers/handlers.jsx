import { handleCloseTunnelPopup, handleOpenTunnelPopup } from "./tunnelPopup";
import {
  handleCloseExcavatePopup,
  handleOpenExcavatePopup,
} from "./excavatePopup";
import { handleInspect, handleInspectUp, handleInspectDown } from "./inspect";
import {
  handleForward,
  handleBack,
  handleLeft,
  handleRight,
  handleUp,
  handleDown,
} from "./movement";
import { sendCommand } from "./sendCommand";
import { handleAddBlock, handleRemoveBlock } from "./blockManager";

export {
  // Tunnel Popup
  handleCloseTunnelPopup,
  handleOpenTunnelPopup,

  // Excavate Popup
  handleCloseExcavatePopup,
  handleOpenExcavatePopup,

  // Inspect
  handleInspect,
  handleInspectUp,
  handleInspectDown,

  // Movement
  handleForward,
  handleBack,
  handleLeft,
  handleRight,
  handleUp,
  handleDown,

  //BlockManagement
  handleAddBlock,
  handleRemoveBlock,

  //SendCommand
  sendCommand,
};

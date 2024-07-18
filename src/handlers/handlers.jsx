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
import { handleBlockColor, getBlockColor } from "./blockColor";
import { updateInventory } from "./updateInventory";
import { getFuelLevel } from "./getFuelLevel";
import { addTurtleId } from "./addTurtleId";

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

  //BlockColor
  handleBlockColor,
  getBlockColor,

  //SendCommand
  sendCommand,

  //Inventory
  updateInventory,

  //FuelLevel
  getFuelLevel,

  //AddTurtleId
  addTurtleId,
};

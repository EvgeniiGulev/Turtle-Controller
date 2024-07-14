const handleOpenTunnelPopup = () => {
  const modal = document.querySelector(".tunnel-popup");
  modal.showModal();
};

const handleCloseTunnelPopup = () => {
  const modal = document.querySelector(".tunnel-popup");
  modal.close();
};

export { handleCloseTunnelPopup, handleOpenTunnelPopup };

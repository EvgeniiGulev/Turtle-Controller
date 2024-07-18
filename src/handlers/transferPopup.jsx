const handleOpenTransferPopup = () => {
  const modal = document.querySelector(".transfer-popup");
  modal.showModal();
};

const handleCloseTransferPopup = () => {
  const modal = document.querySelector(".transfer-popup");
  modal.close();
};

export { handleCloseTransferPopup, handleOpenTransferPopup };

const handleOpenExcavatePopup = () => {
  const modal = document.querySelector(".excavate-popup");
  modal.showModal();
};

const handleCloseExcavatePopup = () => {
  const modal = document.querySelector(".excavate-popup");
  modal.close();
};

export { handleCloseExcavatePopup, handleOpenExcavatePopup };

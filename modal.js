const openModalWithData = data => {
  modalContent.innerHTML = "";
  modalContent.scrollTo(0, 0);
  typeof data == "string"
    ? (modalContent.innerHTML = data)
    : modalContent.appendChild(data);
  pageBody.style.overflowY = "hidden";
  modal.classList.add("active");
};

const closeModal = () => {
  pageBody.style.overflowY = "auto";
  modal.classList.remove("active");
};
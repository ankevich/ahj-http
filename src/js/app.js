const addTicketButton = document.querySelector("#add-ticket-button");
const createTicketModal = document.querySelector("#create-ticket-modal");

addTicketButton.addEventListener("click", () => {
  createTicketModal.classList.remove("hidden");
});

// Кнопки закрытия модальных окон
document.querySelectorAll(".modal-close").forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.add("hidden");
    });
  });
});

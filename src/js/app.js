const addTicketButton = document.querySelector("#add-ticket-button");
const createTicketForm = document.querySelector("#create-ticket-form");
const createTicketModal = document.querySelector("#create-ticket-modal");
const ticketsList = document.querySelector("#tickets-list");

addTicketButton.addEventListener("click", () => {
  createTicketModal.classList.remove("hidden");
});

createTicketForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(createTicketForm);
  const name = formData.get("name");
  const description = formData.get("description");
  const response = await fetch("http://localhost:3000/?method=createTicket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const ticket = await response.json();
  renderTicket(ticket);
  createTicketModal.classList.add("hidden");
});


// Кнопки закрытия модальных окон
document.querySelectorAll(".modal-close").forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.add("hidden");
    });
  });
});

//передать на страницу список тикетов с сервера
const renderTicket = (ticket) => {
  const ticketElement = document.createElement("div");
  ticketElement.classList.add("ticket");
  ticketElement.innerHTML = `
  <div>${ticket.status === "open" ? "◻️" : "☑️"}</div>
  <span class="description">${ticket.description}</span>
  <span class="date">${ticket.created}</span>
  <button>🖊️</button>
  <button>⚔️</button>
  `;
  ticketsList.append(ticketElement);
};

//получить список тикетов с сервера
const getTickets = async () => {
  const response = await fetch("http://localhost:3000/?method=allTickets");
  const tickets = await response.json();
  tickets.forEach(renderTicket);
}

getTickets();



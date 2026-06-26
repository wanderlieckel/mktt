
let selectedServer = [];



function addOrder() {
    const itemName = document.getElementById("itemName").value;
    const itemQuantity = document.getElementById("itemQuantity").value;
    const itemValue = document.getElementById("itemValue").value;

    if (!itemName || !itemQuantity || !itemValue) {
        alert("Preencha todos os campos.");
        return;
    }

    const table = document.getElementById("ordersTable");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${selectedServer}</td>
        <td>${itemName}</td>
        <td>${itemQuantity}</td>
        <td>${itemValue}</td>
        <td class="status">Ativa</td>
        <td><button class="delete-btn">Excluir</button></td>
      `;

    row.querySelector(".delete-btn").addEventListener("click", () => {
        row.remove();
    });

    table.appendChild(row);

    document.getElementById("itemName").value = "";
    document.getElementById("itemQuantity").value = "";
    document.getElementById("itemValue").value = "";
}

const minimizeBtn = document.getElementById("minimize-btn");
const closeBtn = document.getElementById("close-btn");

minimizeBtn.addEventListener("click", () => {
    window.backend.window.minimize();
});

closeBtn.addEventListener("click", () => {
    window.backend.window.close();
});




//functions to update profit summary
async function updateProfitSummary() {
    const summary = await window.backend.statistics.getTotalProfit();
    document.getElementById("totalProfit").innerText = 'Ganho Total: ' + summary.total;
    document.getElementById("monthlyProfit").innerText = 'Ganho Mensal: ' + summary.monthly;
    document.getElementById("dailyProfit").innerText = 'Ganho Diário: ' + summary.daily;
}

//Functions to loadServer list
async function loadServer() {
    const servers = await window.backend.servers.getServerList();
    const carousel = document.getElementById("serverCarousel");
    servers.forEach((server, index) => {
        if (index === 0) {
            selectedServer = server;
        }
        const card = document.createElement("div");
        card.className = "server-card" + (index === 0 ? " active" : "");
        card.innerText = server;

        card.addEventListener("click", () => {
            document.querySelectorAll(".server-card").forEach(card => {
                card.classList.remove("active");
            });

            card.classList.add("active");
            selectedServer = server;
            filterOrdersByServer(selectedServer)
        });

        carousel.appendChild(card);
    });

}

async function loadOrders() {
    const orders = await window.backend.orderHandler.getOrders();
    window.backend.orders = orders; // Store the orders in the backend object

    const table = document.getElementById("ordersTable");
    table.innerHTML = ""; // Clear existing rows
    for (const order of orders) {
        let tr = document.createElement("tr");
        tr.id = order.server + order.id; // Assign a unique ID to the row
        tr.innerHTML = `
            <td>${order.server}</td>
            <td>${order.itemName}</td>
            <td>${order.quantity[0]} - ${order.quantity[1]}</td>
            <td>${order.value}</td>
            <td class="status">${order.status}</td>
            <td><button class="delete-btn">Excluir</button></td>
        `;
        table.appendChild(tr);
    }
}

function filterOrdersByServer(server) {
    const rows = document.querySelectorAll("#ordersTable tr");

    rows.forEach(row => {
        const serverCell = row.children[0];

        if (!serverCell) return;

        const rowServer = serverCell.innerText.trim().toLowerCase();
        const selectedServer = server.trim().toLowerCase();

        row.style.display = rowServer === selectedServer ? "" : "none";
    });
}


async function initialize() {
    await loadOrders();
    await loadServer();
    await updateProfitSummary();
}

initialize();
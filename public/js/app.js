let selectedServer = [];
let selectedItemName = "";
let backendOrders = [];
let filteredItems = [];
let createOrderFilteredItems = [];
let showOnlyActiveOrders = false;
let selectedExecutionOrderId = null;
let itemList = [];


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

async function getItemList() {
    const itens = await window.backend.settings.getItemList();
    console.log(itens)
    itemList = itens
}
//functions to update profit summary
async function updateProfitSummary() {
    const summaries = await window.backend.statistics.getTotalProfit();
    const servers = await window.backend.servers.getServerList();
    const summary = {
        total: 0,
        monthly: 0,
        daily: 0
    }
    for (let i = 0; i < servers.length; i++) {
        const s = servers[i];
        console.log(s)
        let values = await window.backend.settings.getServerSettings(s.toLowerCase())
        summary.total = summary.total + (summaries.total[s.toLowerCase()] / values[0] * (values[1] / 1000))
        summary.monthly = summary.monthly + (summaries.monthly[s.toLowerCase()] / values[0] * (values[1] / 1000))
        summary.daily = summary.daily + (summaries.daily[s.toLowerCase()] / values[0] * (values[1] / 1000))
    }

    document.getElementById("totalProfit").innerText = 'Ganho Total: R$ ' + summary.total.toFixed(2);
    document.getElementById("monthlyProfit").innerText = 'Ganho Mensal: R$  ' + summary.monthly.toFixed(2);
    document.getElementById("dailyProfit").innerText = 'Ganho Diário: R$  ' + summary.daily.toFixed(2);
}


//Functions to loadServer list
async function loadServer() {
    const servers = await window.backend.servers.getServerList();
    const carousel = document.getElementById("serverCarousel");
    console.log(servers)
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
//Function to load orders and display them in the table
async function loadOrders() {
    backendOrders = await window.backend.orderHandler.getOrders(window.backend.orders);
    console.log("Loaded orders:", backendOrders); // Log the loaded orders for debugging
    let orders = backendOrders; // Store the orders in a separate variable
    window.backend.orders = orders; // Store the orders in the backend object

    const table = document.getElementById("ordersTable");
    table.innerHTML = ""; // Clear existing rows
    for (const order of backendOrders) {
        let tr = document.createElement("tr");
        tr.id = order.server + order.id; // Assign a unique ID to the row
        const ageClass = getOrderAgeClass(order.timestamp);
        if (ageClass) {
            tr.classList.add(ageClass);
        }
        const cancelDisabled =
            order.status === "completed" ||
            order.status === "cancelled";
        tr.addEventListener("click", event => {
            if (event.target.closest("button")) {
                return;
            }

            if (order.status === "cancelled" || order.status === "completed") {
                return;
            }

            openExecuteOrderModal(order);
        });
        tr.innerHTML = `
            <td>${order.server}</td>
            <td>${order.itemName}</td>
            <td>${order.quantity[0]} - ${order.quantity[1]}</td>
            <td>${order.value}</td>
            <td>${order.profit}</td>
            <td class="status">${order.status}</td>
            <td><button 
        class="cancel-btn" 
        data-id="${order.id}"
        ${cancelDisabled ? "disabled" : ""}
    >
        Cancelar
    </button></td>
        `;
        table.appendChild(tr);
    }
    document.querySelectorAll(".cancel-btn").forEach(button => {
        button.addEventListener("click", async () => {
            const id = button.dataset.id;
            const confirmCancel = confirm("Deseja realmente cancelar esta ordem?");

            if (!confirmCancel) {
                return;
            }
            await window.backend.orderHandler.cancelOrder(id, window.backend.orders);

            await loadOrders();
            await updateProfitSummary();

            applyOrderFilters();
        });
    });


}
//Function to filter orders by server
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
//Function to filter orders by item name
function applyOrderFilters() {
    const rows = document.querySelectorAll("#ordersTable tr");

    rows.forEach(row => {
        const serverCell = row.children[0];
        const itemCell = row.children[1];
        const statusCell = row.children[4];

        if (!serverCell || !itemCell) return;

        const rowServer = serverCell.innerText.trim().toLowerCase();
        const rowItem = itemCell.innerText.trim().toLowerCase();
        const rowStatus = statusCell.innerText.trim().toLowerCase();


        const serverMatch = !selectedServer || rowServer === selectedServer.toLowerCase();
        const itemMatch = !selectedItemName || rowItem === selectedItemName.toLowerCase();
        const statusMatch = !showOnlyActiveOrders || rowStatus === "active";

        row.style.display = serverMatch && itemMatch && statusMatch ? "" : "none";
    });
}
//Function to update the item dropdown based on the search input
function updateItemDropdown(searchText) {
    const dropdown = document.getElementById("itemSearchDropdown");

    dropdown.innerHTML = "";

    if (!searchText.trim()) {
        dropdown.style.display = "none";
        selectedItemName = "";
        applyOrderFilters();
        return;
    }

    const foundItems = backendOrders
        .filter(order => {
            const serverMatch = !selectedServer || order.server.toLowerCase() === selectedServer.toLowerCase();
            const itemMatch = order.itemName.toLowerCase().includes(searchText.toLowerCase());

            return serverMatch && itemMatch;
        })
        .map(order => order.itemName);

    filteredItems = [...new Set(foundItems)];

    if (filteredItems.length === 0) {
        dropdown.style.display = "none";
        return;
    }

    filteredItems.forEach(itemName => {
        const item = document.createElement("div");

        item.classList.add("search-dropdown-item");
        item.innerText = itemName;

        item.addEventListener("click", () => {
            document.getElementById("itemSearchInput").value = itemName;

            selectedItemName = itemName;

            dropdown.style.display = "none";

            applyOrderFilters();
        });

        dropdown.appendChild(item);
    });

    dropdown.style.display = "block";
}
//function to setup the item search input event listener
function setupItemSearch() {
    const input = document.getElementById("itemSearchInput");


    input.addEventListener("focus", () => {
        input.value = "";

        selectedItemName = "";

        updateItemDropdown("");
        applyOrderFilters();
    });

    input.addEventListener("input", () => {
        const searchText = input.value;

        selectedItemName = "";
        updateItemDropdown(searchText);
    });

    input.addEventListener("keydown", (event) => {

        if (event.key !== "Enter")
            return;

        if (filteredItems.length !== 1)
            return;

        event.preventDefault();

        selectedItemName = filteredItems[0];

        input.value = selectedItemName;

        document.getElementById("itemSearchDropdown").style.display = "none";

        applyOrderFilters();

    });
}
//function to setup the order form toggle button
function setupOrderFormToggle() {
    const section = document.getElementById("orderFormSection");
    const toggle = document.getElementById("orderFormToggle");

    toggle.addEventListener("click", () => {
        section.classList.toggle("collapsed");
    });
}
//Function to update the create order item dropdown based on the search input
function updateCreateItemDropdown(searchText) {
    const dropdown = document.getElementById("createItemDropdown");

    dropdown.innerHTML = "";

    if (!searchText.trim()) {
        dropdown.style.display = "none";
        createOrderFilteredItems = [];
        return;
    }

    createOrderFilteredItems = itemList.filter(itemName =>
        itemName.toLowerCase().includes(searchText.toLowerCase())
    );

    if (createOrderFilteredItems.length === 0) {
        dropdown.style.display = "none";
        return;
    }

    createOrderFilteredItems.forEach(itemName => {
        const item = document.createElement("div");

        item.classList.add("search-dropdown-item");
        item.innerText = itemName;

        item.addEventListener("click", () => {
            document.getElementById("itemName").value = itemName;
            dropdown.style.display = "none";
        });

        dropdown.appendChild(item);
    });

    dropdown.style.display = "block";
}
//function to setup the create order item search input event listener
function setupCreateOrderItemSearch() {
    const input = document.getElementById("itemName");
    const dropdown = document.getElementById("createItemDropdown");

    input.addEventListener("input", () => {
        updateCreateItemDropdown(input.value);
    });

    input.addEventListener("keydown", event => {
        if (event.key !== "Enter")
            return;

        if (createOrderFilteredItems.length !== 1)
            return;

        event.preventDefault();

        input.value = createOrderFilteredItems[0];
        dropdown.style.display = "none";
    });

    input.addEventListener("focus", () => {
        input.value = "";
        updateCreateItemDropdown("");
    });
}
//Function to create an order from the form inputs
async function createOrderFromForm() {
    const itemName = document.getElementById("itemName").value.trim();
    const quantity = document.getElementById("itemQuantity").value;
    const value = document.getElementById("itemValue").value;

    if (!selectedServer) {
        alert("Selecione um servidor.");
        return;
    }

    if (!itemName || !quantity || !value) {
        alert("Preencha todos os campos.");
        return;
    }

    const order = {
        server: selectedServer.toLowerCase(),
        itemName,
        quantity: Number(quantity),
        value: Number(value)
    };

    await window.backend.orderHandler.createOrder(order, window.backend.orders);

    await loadOrders();
    await updateProfitSummary();

    document.getElementById("itemName").value = "";
    document.getElementById("itemQuantity").value = "";
    document.getElementById("itemValue").value = "";

    document.getElementById("orderFormSection").classList.add("collapsed");

    applyOrderFilters();
}
//Function to setup the create order button event listener
function setupCreateOrderButton() {
    const button = document.getElementById("createOrderBtn");

    button.addEventListener("click", createOrderFromForm);
}
//Function to setup the status filter toggle
function setupStatusFilter() {
    const header = document.getElementById("statusHeader");

    header.addEventListener("click", () => {

        showOnlyActiveOrders = !showOnlyActiveOrders;

        header.classList.toggle("active", showOnlyActiveOrders);
        header.classList.toggle("all", !showOnlyActiveOrders);

        applyOrderFilters();

    });
}
//function to get the age class of an order
function getOrderAgeClass(timestamp) {
    const now = Date.now();
    const ageInHours = (now - timestamp) / (1000 * 60 * 60);

    if (ageInHours >= 48) {
        return "order-danger";
    }

    if (ageInHours >= 36) {
        return "order-warning";
    }

    return "";
}
//function to open the execute order modal
function openExecuteOrderModal(order) {
    selectedExecutionOrderId = order.id;

    document.getElementById("executeModalItemName").innerText = order.itemName;
    document.getElementById("executeQuantityInput").value = "";

    document.getElementById("executeOrderModal").classList.remove("hidden");

    setTimeout(() => {
        document.getElementById("executeQuantityInput").focus();
    }, 50);
}
//function to close the execute order modal
function closeExecuteOrderModal() {
    selectedExecutionOrderId = null;

    document.getElementById("executeOrderModal").classList.add("hidden");
    document.getElementById("executeQuantityInput").value = "";
}
//function to confirm the execution of an order
async function confirmExecuteOrder() {
    const quantityInput = document.getElementById("executeQuantityInput");
    const quantity = Number(quantityInput.value);

    if (!selectedExecutionOrderId) {
        return;
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
        alert("Digite uma quantidade válida.");
        quantityInput.focus();
        return;
    }

    await window.backend.orderHandler.executeOrder(selectedExecutionOrderId, quantity, window.backend.orders);

    await loadOrders();
    await updateProfitSummary();

    applyOrderFilters();
    closeExecuteOrderModal();
}
//function to setup the execute order modal event listeners
function setupExecuteOrderModal() {
    const modal = document.getElementById("executeOrderModal");
    const closeBtn = document.getElementById("closeExecuteModalBtn");
    const okBtn = document.getElementById("confirmExecuteOrderBtn");
    const input = document.getElementById("executeQuantityInput");

    closeBtn.addEventListener("click", closeExecuteOrderModal);
    okBtn.addEventListener("click", confirmExecuteOrder);

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeExecuteOrderModal();
        }
    });

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            confirmExecuteOrder();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeExecuteOrderModal();
        }
    });
}
//function to create modal of settings
async function openSettingsModal() {

    const config = await window.backend.settings.getServerSettings(selectedServer);
    console.log(config)
    document.getElementById("settingsServerName").innerText = selectedServer;
    document.getElementById("currentGoldCoinValue").innerText = config[0];
    document.getElementById("currentBRL250CoinsValue").innerText = config[1].toFixed(2);

    document.getElementById("settingsModal").classList.remove("hidden");

}
//function to close this modal
function closeSettingsModal() {
    document.getElementById("settingsModal").classList.add("hidden");
}
//function for setup settings modal
async function setupSettingsModal() {
    const modal = document.getElementById("settingsModal");

    document.getElementById("settingsBtn").addEventListener("click", openSettingsModal);
    document.getElementById("closeSettingsModalBtn").addEventListener("click", closeSettingsModal);

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeSettingsModal();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeSettingsModal();
        }
    });

    document.getElementById("updateGoldCoinBtn").addEventListener("click", async () => {
        const server = selectedServer || "auroria";
        const value = Number(document.getElementById("goldCoinInput").value);

        if (value <= 0) return;

        await window.backend.settings.updateGoldCoinValue(
            selectedServer,
            Number(document.getElementById("goldCoinInput").value)
        );

        await openSettingsModal();

    });

    document.getElementById("updateBRL250CoinsBtn").addEventListener("click", async () => {
        const server = selectedServer;
        const value = Number(document.getElementById("brl250CoinsInput").value);

        if (value <= 0) {
            return;
        }

        await window.backend.settings.updateBRL250CoinsValue(server, value);

        await openSettingsModal();
    });
}



async function initialize() {
    await getItemList();
    await loadOrders();
    await loadServer();
    await updateProfitSummary();


    setupItemSearch();
    setupOrderFormToggle();
    setupCreateOrderItemSearch();
    setupCreateOrderButton();
    setupStatusFilter();
    setupExecuteOrderModal();
    setupSettingsModal();

}





initialize();
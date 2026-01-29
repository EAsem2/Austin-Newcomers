const adminGrid = document.getElementById("adminGrid");
const clearAllBtn = document.getElementById("clearAllBtn");

// Load user submissions
function loadUserResources() {
  const userResources = JSON.parse(localStorage.getItem("userResources")) || [];
  renderAdminCards(userResources);
}

// Render cards in admin panel
function renderAdminCards(resources) {
  if (resources.length === 0) {
    adminGrid.innerHTML = `<p style="text-align:center; font-size:18px;">No user submissions found.</p>`;
    return;
  }

  adminGrid.innerHTML = resources
    .map((r, index) => createAdminCard(r, index))
    .join("");
}

// Create card HTML (matches your Resources page)
function createAdminCard(r, index) {
  return `
    <article class="resource-card">
      <h2 class="resource-name">${r.name}</h2>
      <p class="provider"><strong>Provider:</strong> ${r.provider}</p>

      <p><strong>Description:</strong> ${r.description}</p>
      <p><strong>Main services:</strong> ${r.main_services}</p>
      <p><strong>Cost:</strong> ${r.cost}</p>
      <p><strong>Next steps:</strong> ${r.next_steps}</p>

      <hr class="resource-divider" />

      <div class="spot-info">
        <img src="../Images/pin.png" class="icon">
        <p>${r.address}</p>
      </div>

      <div class="spot-info">
        <img src="../Images/phone.png" class="icon">
        <p>${r.contact}</p>
      </div>

      <div class="spot-info">
        <img src="../Images/wall-clock.png" class="icon">
        <p>${r.hours}</p>
      </div>

      <button class="delete-btn" onclick="deleteResource(${index})">Delete Resource</button>
    </article>
  `;
}

// Delete a single resource
function deleteResource(index) {
  let saved = JSON.parse(localStorage.getItem("userResources")) || [];
  saved.splice(index, 1);
  localStorage.setItem("userResources", JSON.stringify(saved));
  loadUserResources();
}

// Clear all submissions
clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete ALL user submissions?")) {
    localStorage.removeItem("userResources");
    loadUserResources();
  }
});

// Load on page start
loadUserResources();



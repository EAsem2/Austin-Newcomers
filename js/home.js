document.addEventListener("DOMContentLoaded", () => {

  let allResources = [];

  async function loadResources() {
    const response = await fetch("js/Resources.json");
    const jsonData = await response.json();
    const userData = JSON.parse(localStorage.getItem("userResources")) || [];
    allResources = [...jsonData, ...userData];
    updateSpotlights();
  }

  // Pick 3 resources from different categories
  function pickSpotlights() {
    const categories = {};
    const unique = [];

    for (const r of allResources) {
      if (!categories[r.category]) {
        categories[r.category] = true;
        unique.push(r);
      }
      if (unique.length === 3) break;
    }

    // If not enough unique categories, fallback to random
    while (unique.length < 3) {
      const r = allResources[Math.floor(Math.random() * allResources.length)];
      if (!unique.includes(r)) unique.push(r);
    }

    return unique;
  }

  function renderSpotlights(spotlights) {
    const container = document.getElementById("spotlightsContainer");
    container.innerHTML = spotlights.map(r => `
      <div class="spot-card">
        <div class="spot-card-inner">

          <div class="spot-card-front">
            <div class="tag">${r.category}</div>
            <h4 class="spot-name">${r.name}</h4>
            <p class="spot-desc">${r.description}</p>
            <hr>
            <div class="spot-info"><img src="Images/pin.png" class="icon"><p>${r.address}</p></div>
            <div class="spot-info"><img src="Images/phone.png" class="icon"><p>${r.contact}</p></div>
          </div>

          <div class="spot-card-back">
            <h4>More Details</h4>
            <p><strong>Provider:</strong> <a href="${r.website}" target="_blank">${r.provider}</a></p>
            <p><strong>Main Services:</strong> ${r.main_services}</p>
            <p><strong>Cost:</strong> ${r.cost}</p>
            <p><strong>Hours:</strong> ${r.hours}</p>
          </div>

        </div>
      </div>
    `).join("");
  }

  function updateSpotlights() {
    const saved = JSON.parse(localStorage.getItem("spotlights"));
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    if (!saved || saved.date !== today) {
      // Check if 30 days passed
      if (!saved || (new Date(today) - new Date(saved.date)) / (1000*60*60*24) >= 30) {
        const newSpots = pickSpotlights();
        localStorage.setItem("spotlights", JSON.stringify({ date: today, items: newSpots }));
        renderSpotlights(newSpots);
      } else {
        renderSpotlights(saved.items);
      }
    } else {
      renderSpotlights(saved.items);
    }
  }

  document.addEventListener("click", (e) => {
    const card = e.target.closest(".spot-card");
    if (card) card.classList.toggle("flipped");
  });

  loadResources();
});

document.addEventListener("DOMContentLoaded", () => {
  let allResources = [];

  async function loadResources() {
    const response = await fetch("js/Resources.json");
    const jsonData = await response.json();
    const userData = JSON.parse(localStorage.getItem("userResources")) || [];
    allResources = [...jsonData, ...userData];
    updateSpotlights();
  }

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
    while (unique.length < 3) {
      const r = allResources[Math.floor(Math.random() * allResources.length)];
      if (!unique.includes(r)) unique.push(r);
    }
    return unique;
  }

  function renderSpotlights(spotlights) {
    const container = document.getElementById("spotlightsContainer");

    // pick resource with longest description as featured
    let featuredIndex = 0;
    let maxLength = 0;
    spotlights.forEach((r, i) => {
      if ((r.description || "").length > maxLength) {
        maxLength = r.description.length;
        featuredIndex = i;
      }
    });

    // reorder so featured is always in the middle
    const ordered = [];
    ordered[1] = spotlights[featuredIndex];
    const others = spotlights.filter((_, i) => i !== featuredIndex);
    ordered[0] = others[0];
    ordered[2] = others[1];

    container.innerHTML = ordered
      .map((r, i) => {
        const isFeatured = i === 1 ? "spot-card--featured" : "spot-card--side";
        return `
          <div class="spot-card ${isFeatured}">
            <div class="spot-card-inner">
              <div class="spot-card-front">
                <div class="tag-left">${r.category}</div>

                <div class="spot-main-content">
                  <h4 class="spot-name">${r.name}</h4>
                  <p class="spot-desc">${r.description}</p>
                </div>

                <div class="spot-footer">
                  <div class="spot-info">
                    <img src="Images/gps.png" class="icon">
                    <span>${r.address}</span>
                  </div>
                  <div class="spot-info">
                    <img src="Images/phone.png" class="icon">
                    <span>${r.contact}</span>
                  </div>
                </div>
              </div>

              <div class="spot-card-back">
                <h4 class="back-title">More Details</h4>
                <div class="back-content">
                  <p><strong>Provider:</strong> <br><a href="${r.website}" target="_blank">${r.provider}</a></p>
                  <p><strong>Services:</strong> ${r.main_services}</p>
                  <p><strong>Cost:</strong> ${r.cost}</p>
                  <p><strong>Hours:</strong> ${r.hours}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function updateSpotlights() {
    const saved = JSON.parse(localStorage.getItem("spotlights"));
    const today = new Date().toISOString().split("T")[0];

    if (!saved || saved.date !== today) {
      if (!saved || (new Date(today) - new Date(saved.date)) / (1000 * 60 * 60 * 24) >= 30) {
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

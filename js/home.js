document.addEventListener("DOMContentLoaded", () => {

  let allResources = [];

  // 1. LOAD RESOURCES
  async function loadResources() {
    try {
      const response = await fetch("js/Resources.json");
      const jsonData = await response.json();

      const userData = JSON.parse(localStorage.getItem("userResources")) || [];

      allResources = [...jsonData, ...userData];

      updateSpotlightsIfNeeded();
    } catch (error) {
      console.error("Error loading resources:", error);
    }
  }

  // 2. PICK 3 RANDOM RESOURCES
  function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function getSpotlightResources() {
  const now = new Date();
  const seed = `${now.getFullYear()}-${now.getMonth() + 1}`;
  const random = seededRandom(seed);

  // Group resources by category
  const categories = {};
  allResources.forEach(r => {
    if (!categories[r.category]) categories[r.category] = [];
    categories[r.category].push(r);
  });

  const categoryNames = Object.keys(categories);

  // Need at least 3 categories
  if (categoryNames.length < 3) {
    console.error("Not enough categories for 3 spotlights");
    return [];
  }

  // Shuffle categories deterministically
  const shuffledCats = shuffleWithSeed(categoryNames, random);

  // Pick first 3 categories
  const chosenCats = shuffledCats.slice(0, 3);

  // Pick 1 random resource from each category
  return chosenCats.map(cat => {
    const items = categories[cat];
    const index = Math.floor(random() * items.length);
    return items[index];
  });
}
  function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = Math.imul(31, h) + seed.charCodeAt(i);
  return function () {
    h = Math.imul(48271, h) % 2147483647;
    return (h & 2147483647) / 2147483647;
  };
}

  // 3. RENDER SPOTLIGHT CARDS
  function renderSpotlights() {
    const spotlights = getSpotlightResources();
    const container = document.getElementById("spotlightsContainer");

    container.innerHTML = spotlights.map(r => `
      <div class="spot-card">
        <div class="spot-card-inner">

 <div class="spot-card-front">
  <div class="tag">${r.category}</div>
  <h4 class="spot-name">${r.name}</h4>
  <p class="spot-desc">${r.description}</p>
  <hr>
  <div class="spot-info">
    <img src="Images/phone.png" class="icon">
    <p>${r.address}</p>
  </div>
  <div class="spot-info">
    <img src="Images/pin.png" class="icon">
    <p>${r.contact}</p>
  </div>
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

  // 4. CHECK IF 2 WEEKS HAVE PASSED
function shouldRefreshSpotlights() {
  const last = localStorage.getItem("spotlightMonth");
  const now = new Date();
  const current = `${now.getFullYear()}-${now.getMonth() + 1}`;
  return last !== current;
}

  // 5. UPDATE SPOTLIGHTS IF NEEDED
function updateSpotlightsIfNeeded() {
  if (shouldRefreshSpotlights()) {
    const now = new Date();
    localStorage.setItem("spotlightMonth", `${now.getFullYear()}-${now.getMonth() + 1}`);
  }
  renderSpotlights();
}

  // 6. ENABLE FLIP ON CLICK
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".spot-card");
    if (card) card.classList.toggle("flipped");
  });

  loadResources();
});











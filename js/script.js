const resourcesGrid = document.getElementById("resourcesGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

let allResources = [];
let selectedCategories = [];
let currentSearch = "";

// 1. Initialize Supabase at the top of script.js
const SUPABASE_URL = 'https://nwbijelfjgypciwiwuig.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_yi9D3mpSgEoH9uPSdHJf3w_QJ0IU15e'; 
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Updated Load Function
async function loadResources() {
    try {
        // 1. Fetch from Supabase
        const { data: supabaseResources, error } = await _supabase
            .from('resources')
            .select('*');

        if (error) throw error;

        // 2. Fetch your original static JSON
        const res = await fetch("../js/Resources.json");
        const jsonResources = await res.json();

        // 3. Combine them into the global array
        allResources = [...jsonResources, ...supabaseResources];
        
        // 4. Update the screen
        renderResources();
    } catch (err) {
        console.error("Error loading resources:", err.message);
    }
}


// Render cards
function renderResources() {
  const filtered = allResources.filter(r => {
    const matchesSearch =
      r.name.toLowerCase().includes(currentSearch) ||
      r.description.toLowerCase().includes(currentSearch) ||
      r.main_services.toLowerCase().includes(currentSearch);

    let matchesCategory = true;

    if (selectedCategories.includes("All")) {
      matchesCategory = true;
    }
    else if (selectedCategories.length === 0) {
      matchesCategory = true;
    }
    else {
      matchesCategory = selectedCategories.includes(r.category);
    }


    return matchesSearch && matchesCategory;
  });

  resourcesGrid.innerHTML = filtered.map(createCardHTML).join("");
}

// Create card HTML
function createCardHTML(r) {
  return `
    <article class="resource-card">
      <h2 class="resource-name">
        <a href="${r.website}" target="_blank">${r.name}</a>
      </h2>
      <p><strong></strong> ${r.description}</p>
      <p><strong>Main services:</strong> ${r.main_services}</p>
      <p><strong>Cost:</strong> ${r.cost}</p>

      <hr class="resource-divider" />

      <div class="spot-info">
        <img src="../Images/gps.png" class="icon">
        <p>${r.address}</p>
      </div>

      <div class="spot-info">
        <img src="../Images/phone.png" class="icon">
        <p>${r.contact}</p>
      </div>

      <div class="spot-info">
        <img src="../Images/clock.png" class="icon">
        <p>${r.hours}</p>
      </div>
    </article>
  `;
}

// Search input
searchInput.addEventListener("input", e => {
  currentSearch = e.target.value.toLowerCase();
  renderResources();
});

// Multi-select categories
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;

    if (category === "All") {
      selectedCategories = ["All"];

      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      renderResources();
      return;
    }

    selectedCategories = selectedCategories.filter(c => c !== "All");
    document.querySelector(".all-btn").classList.remove("active");
    btn.classList.toggle("active");

    if (selectedCategories.includes(category)) {
      selectedCategories = selectedCategories.filter(c => c !== category);
    } else {
      selectedCategories.push(category);
    }

    renderResources();
  });
});


loadResources();




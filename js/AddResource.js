// 1. Initialize Supabase (Put your actual Anon Key here)
const SUPABASE_URL = 'https://nwbijelfjgypciwiwuig.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_yi9D3mpSgEoH9uPSdHJf3w_QJ0IU15e'; 
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById("submitResource").addEventListener("click", async function (e) {
    e.preventDefault();

    // 2. Collect Data
    const resourceName = document.getElementById("resourceName").value.trim();
    const providerName = document.getElementById("providerName").value.trim();
    const category = document.getElementById("category").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const address = document.getElementById("address").value.trim();
    const hours = document.getElementById("hours").value.trim();
    const website = document.getElementById("website").value.trim();
    const description = document.getElementById("description").value.trim();

    // 3. Validation
    let errors = [];
    if (!resourceName) errors.push("Resource Name is required.");
    if (!providerName) errors.push("Provider Name is required.");
    if (!category) errors.push("Category is required.");
    if (!contact) errors.push("Contact Info is required.");
    if (!address) errors.push("Address is required.");

    if (website && !website.startsWith("http")) {
        errors.push("Website URL must start with http or https.");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    }

    // 4. Send to Supabase
    try {
        const { data, error } = await _supabase
            .from('resources') 
            .insert([
                { 
                    name: resourceName, 
                    provider: providerName, 
                    category: category, 
                    contact: contact,
                    address: address,
                    url: website,
                    description: description,
                    hours: hours // Added hours since you collected it
                }
            ]);

        if (error) throw error;

        // 5. Success UI (Using your existing popup)
        const popup = document.getElementById("successPopup");
        if (popup) {
            popup.style.display = "flex";
            setTimeout(() => { popup.style.display = "none"; }, 2000);
        } else {
            alert("Resource added successfully!");
        }

        // Clear the form
        document.querySelector(".resource-form").reset();

    } catch (err) {
        console.error("Supabase Error:", err.message);
        alert("Error saving to database: " + err.message);
    }
});
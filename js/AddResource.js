document.getElementById("submitResource").addEventListener("click", function (e) {
    e.preventDefault();

    const resourceName = document.getElementById("resourceName").value.trim();
    const providerName = document.getElementById("providerName").value.trim();
    const category = document.getElementById("category").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const address = document.getElementById("address").value.trim();
    const hours = document.getElementById("hours").value.trim();
    const website = document.getElementById("website").value.trim();
    const description = document.getElementById("description").value.trim();

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

    const newResource = {
        name: resourceName,
        provider: providerName,
        description: description,
        main_services: "",
        cost: "",
        next_steps: "",
        website: website,
        contact: contact,
        address: address,
        hours: hours,
        online_or_in_person: "",
        category: category
    };

    let saved = JSON.parse(localStorage.getItem("userResources")) || [];
    saved.push(newResource);
    localStorage.setItem("userResources", JSON.stringify(saved));

    // SUCCESS POPUP
    const popup = document.getElementById("successPopup");
    popup.style.display = "flex";

    setTimeout(() => {
        popup.style.display = "none";
    }, 2000);

    // CLEAR FORM
    document.querySelector(".resource-form").reset();
});

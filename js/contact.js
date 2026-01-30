   document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault(); 
        
        // Show confirmation message
        const confirmationMessage = document.getElementById("confirmationMessage");
        confirmationMessage.style.display = "block";
        
        // Clear  fields
        this.reset();
        
        // Set timeout to hide the message after 3 seconds
        setTimeout(() => {
            confirmationMessage.style.display = "none";
        }, 3000);

    });

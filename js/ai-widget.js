// Load the widget HTML into the page
fetch("../html/ai-widget.html")
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);
    initAIWidget();
  });

function initAIWidget() {
  const toggle = document.getElementById("ai-toggle");
  const chat = document.getElementById("ai-chat");
  const sendBtn = document.getElementById("ai-send");
  const input = document.getElementById("ai-input");
  const messages = document.getElementById("ai-messages");

  toggle.onclick = () => {
    chat.classList.toggle("hidden");
  };

  sendBtn.onclick = async () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage("You", text);
    input.value = "";

    const response = await fetch("https://resource-ai-backend.austin-newcomershub.workers.dev/", {
      method: "POST",
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    addMessage("AI", data.reply);
  };

  function addMessage(sender, text) {
    const div = document.createElement("div");
    div.textContent = `${sender}: ${text}`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }
}

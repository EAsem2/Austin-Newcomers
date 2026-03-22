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

  addMessage("user", text);
  input.value = "";

  const response = await fetch("https://resource-ai-backend.austin-newcomershub.workers.dev/", {
    method: "POST",
    body: JSON.stringify({ message: text })
  });

  const data = await response.json();
  addMessage("ai", data.reply);
};

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.textContent = `${sender === "user" ? "You" : "AI"}: ${text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

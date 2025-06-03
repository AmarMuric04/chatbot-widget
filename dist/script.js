const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
document.head.appendChild(script);
const currentScript = document.currentScript;
const botId = currentScript.getAttribute("data-bot-id");

script.onload = () => {
  initChat();
};

function initChat() {
  const button = document.createElement("button");

  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.height = "50px";
  button.style.width = "50px";
  button.style.backgroundColor = "#2c2c2c";
  button.style.borderRadius = "50%";
  button.style.border = "2px solid #404040";
  button.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
  button.style.cursor = "pointer";
  button.style.outline = "none";
  button.style.fontSize = "24px";
  button.style.color = "white";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";
  button.textContent = "💬";

  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "#1a1a1a";
    button.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.25)";
    button.style.transform = "scale(1.05)";
  });
  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "#2c2c2c";
    button.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    button.style.transform = "scale(1)";
  });
  button.addEventListener("focus", () => {
    button.style.outline = "3px solid #666666";
  });
  button.addEventListener("blur", () => {
    button.style.outline = "none";
  });

  document.body.appendChild(button);

  const chatContainer = document.createElement("div");
  chatContainer.style.position = "fixed";
  chatContainer.style.bottom = "80px";
  chatContainer.style.right = "20px";
  chatContainer.style.width = "350px";
  chatContainer.style.height = "500px";
  chatContainer.style.borderRadius = "12px";
  chatContainer.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.2)";
  chatContainer.style.zIndex = "9999";
  chatContainer.style.display = "none";
  chatContainer.style.flexDirection = "column";
  chatContainer.style.backgroundColor = "white";
  chatContainer.style.fontFamily = "Arial, sans-serif";
  chatContainer.style.overflow = "hidden";
  chatContainer.style.display = "flex";

  const header = document.createElement("div");
  header.textContent = "Chat with AI Assistant";
  header.style.padding = "16px";
  header.style.backgroundColor = "#2c2c2c";
  header.style.color = "white";
  header.style.fontWeight = "600";
  header.style.fontSize = "16px";
  header.style.borderTopLeftRadius = "12px";
  header.style.borderTopRightRadius = "12px";
  chatContainer.appendChild(header);

  const messagesContainer = document.createElement("div");
  messagesContainer.style.flexGrow = "1";
  messagesContainer.style.padding = "16px";
  messagesContainer.style.overflowY = "auto";
  messagesContainer.style.backgroundColor = "#f8f8f8";
  messagesContainer.style.display = "flex";
  messagesContainer.style.flexDirection = "column";
  messagesContainer.style.gap = "12px";
  chatContainer.appendChild(messagesContainer);

  function createMessage(text, sender) {
    const messageWrapper = document.createElement("div");
    messageWrapper.style.display = "flex";
    messageWrapper.style.justifyContent =
      sender === "user" ? "flex-end" : "flex-start";

    const messageBox = document.createElement("div");
    messageBox.innerHTML = marked.parse(text);

    messageBox.style.maxWidth = "80%";
    messageBox.style.padding = "0px 16px";
    messageBox.style.borderRadius = "18px";
    messageBox.style.backgroundColor =
      sender === "user" ? "#2c2c2c" : "#ffffff";
    messageBox.style.color = sender === "user" ? "white" : "#333333";
    messageBox.style.fontSize = "14px";
    messageBox.style.lineHeight = "1.4";
    messageBox.style.wordBreak = "break-word";
    messageBox.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
    if (sender === "bot") {
      messageBox.style.border = "1px solid #e0e0e0";
      messageBox.style.textAlign = "start";
    }

    messageWrapper.appendChild(messageBox);
    return messageWrapper;
  }

  const inputContainer = document.createElement("div");
  inputContainer.style.padding = "16px";
  inputContainer.style.borderTop = "1px solid #e0e0e0";
  inputContainer.style.backgroundColor = "white";
  inputContainer.style.borderBottomLeftRadius = "12px";
  inputContainer.style.borderBottomRightRadius = "12px";
  inputContainer.style.display = "flex";
  inputContainer.style.gap = "8px";

  const inputWrapper = document.createElement("div");
  inputWrapper.style.position = "relative";
  inputWrapper.style.flex = "1";
  inputWrapper.style.display = "flex";
  inputWrapper.style.alignItems = "center";
  inputWrapper.style.gap = "8px";

  const textarea = document.createElement("textarea");
  textarea.placeholder = "Type your message...";
  textarea.rows = 2;
  textarea.style.flex = "1";
  textarea.style.padding = "12px 16px";
  textarea.style.borderRadius = "12px";
  textarea.style.border = "1px solid #e0e0e0";
  textarea.style.fontSize = "14px";
  textarea.style.outline = "none";
  textarea.style.resize = "none";
  textarea.style.backgroundColor = "white";
  textarea.style.color = "#333333";
  textarea.style.lineHeight = "1.4";
  textarea.style.overflow = "hidden";

  const sendButton = document.createElement("button");
  sendButton.textContent = ">";
  sendButton.style.padding = "0px";
  sendButton.style.height = "25px";
  sendButton.style.width = "25px";
  sendButton.style.display = "grid";
  sendButton.style.placeItems = "center";
  sendButton.style.borderRadius = "50%";
  sendButton.style.backgroundColor = "#2c2c2c";
  sendButton.style.color = "white";
  sendButton.style.border = "none";
  sendButton.style.cursor = "pointer";
  sendButton.style.fontSize = "14px";
  sendButton.style.fontWeight = "600";
  sendButton.style.transition = "all 0.2s ease";
  sendButton.style.position = "absolute";
  sendButton.style.bottom = "5px";
  sendButton.style.right = "5px";

  function updateSendButton() {
    if (textarea.value.trim() === "") {
      sendButton.disabled = true;
      sendButton.style.backgroundColor = "#e0e0e0";
      sendButton.style.cursor = "not-allowed";
      sendButton.style.color = "#888888";
    } else {
      sendButton.disabled = false;
      sendButton.style.backgroundColor = "#2c2c2c";
      sendButton.style.cursor = "pointer";
      sendButton.style.color = "white";
    }
  }

  textarea.addEventListener("input", updateSendButton);
  updateSendButton();

  inputWrapper.appendChild(textarea);
  inputWrapper.appendChild(sendButton);

  inputContainer.appendChild(inputWrapper);

  chatContainer.appendChild(inputContainer);

  document.body.appendChild(chatContainer);

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  let isLoading = false;
  const loadingMessage = createMessage("Thinking...", "bot");

  const chatHistory = [];

  async function sendPromptAPI(prompt) {
    try {
      const response = await fetch("http://localhost:3000/ask-gemini", {
        method: "POST",
        body: JSON.stringify({
          prompt,
          history: chatHistory,
          botId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data?.response) {
        chatHistory.push(
          { role: "user", parts: { text: prompt } },
          { role: "model", parts: { text: data.response } }
        );
      }

      return data;
    } catch (error) {
      console.error(error);
      return { error: "Failed to fetch response" };
    }
  }

  async function handleSendMessage() {
    if (textarea.value.trim() === "" || isLoading) return;

    const userText = textarea.value.trim();
    messagesContainer.appendChild(createMessage(userText, "user"));
    scrollToBottom();

    textarea.value = "";
    updateSendButton();

    messagesContainer.appendChild(loadingMessage);
    scrollToBottom();

    isLoading = true;
    textarea.disabled = true;
    sendButton.disabled = true;

    const response = await sendPromptAPI(userText);

    messagesContainer.removeChild(loadingMessage);

    const botText =
      response.response || response.error || "Sorry, I couldn't process that.";
    messagesContainer.appendChild(createMessage(botText, "bot"));
    scrollToBottom();

    isLoading = false;
    textarea.disabled = false;
    updateSendButton();
    textarea.focus();
  }

  sendButton.addEventListener("click", handleSendMessage);

  textarea.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  });

  let chatOpen = false;
  chatContainer.style.display = "none";
  button.textContent = "💬";

  function toggleChat() {
    chatOpen = !chatOpen;
    if (chatOpen) {
      chatContainer.style.display = "flex";
      button.textContent = "✕";
      textarea.focus();
      scrollToBottom();
    } else {
      chatContainer.style.display = "none";
      button.textContent = "💬";
    }
  }

  button.addEventListener("click", toggleChat);
}

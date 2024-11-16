import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";
//CLIENT_SEND_MASSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;
    if (content) {
      socket.emit("CLIENT_SEND_MASSAGE", content);
      e.target.elements.content.value = "";
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }
  });
}
//END CLIENT_SEND_MASSAGE

//SEVER_RETURN_MASSAGE
socket.on("SEVER_RETURN_MASSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");
  const boxTyping = document.querySelector(".chat .inner-list-typing");
  const div = document.createElement("div");
  let htmlFullName = "";
  if (myId == data.userId) {
    div.classList.add("inner-outgoing");
  } else {
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
    div.classList.add("inner-incoming");
  }
  div.innerHTML = `
  ${htmlFullName}
  <div class ="inner-content">${data.content}</div>
  `;
  body.insertBefore(div, boxTyping);
  // Tự động cuộn xuống cuối
  body.scrollTop = body.scrollHeight;
});
//END SEVER_RETURN_MASSAGE

//show icon chat
const buttonIcon = document.querySelector(".button-icon");
if (buttonIcon) {
  const tooltip = document.querySelector(".tooltip");
  Popper.createPopper(buttonIcon, tooltip);
  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown");
  };
}

//show typing
var timeout;
const showTyping = () => {
  socket.emit("CLIENT_SEND_TYPING", "show");
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    socket.emit("CLIENT_SEND_TYPING", "hidden");
  }, 3000);
};
//end show typing

//insert icon to input

const emoji = document.querySelector("emoji-picker");
if (emoji) {
  const inputChat = document.querySelector(
    ".chat .inner-form input[name='content']"
  );
  emoji.addEventListener("emoji-click", (event) => {
    const icon = event.detail.unicode;
    inputChat.value = inputChat.value + icon;
    const end = inputChat.value.length;
    inputChat.setSelectionRange(end, end);
    inputChat.focus();
    showTyping();
  });
  //input keyup

  inputChat.addEventListener("keyup", () => {
    showTyping();
  });
  //end input keyup
}
//end insert icon to input

//end show icon chat

//SEVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");
if (elementListTyping) {
  socket.on("SEVER_RETURN_TYPING", (data) => {
    console.log(data);
    if (data.type == "show") {
      const exitTyping = document.querySelector(`[user_id="${data.userId}"]`);
      if (!exitTyping) {
        const boxTyping = document.createElement("div");
        boxTyping.classList.add("box-typing");
        boxTyping.setAttribute("user_id", data.userId);
        boxTyping.innerHTML = `
      <div class="inner-name">${data.fullName}</div>
      <div class="inner-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      `;
        elementListTyping.appendChild(boxTyping);
        body.scrollTop = body.scrollHeight;
      }
    } else {
      const boxTypingRemove = document.querySelector(
        `[user_id="${data.userId}"]`
      );
      if (boxTypingRemove) {
        elementListTyping.removeChild(boxTypingRemove);
      }
    }
  });
}

//END SEVER_RETURN_TYPING

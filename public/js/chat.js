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
    }
  });
}
//END CLIENT_SEND_MASSAGE

//SEVER_RETURN_MASSAGE
socket.on("SEVER_RETURN_MASSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");
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
  body.appendChild(div);
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
//insert icon to input
const emoji = document.querySelector("emoji-picker");
if (emoji) {
  const inputChat = document.querySelector(
    ".chat .inner-form input[name='content']"
  );
  emoji.addEventListener("emoji-click", (event) => {
    const icon = event.detail.unicode;
    inputChat.value = inputChat.value + icon;
  });
}
//end insert icon to input
//end show icon chat

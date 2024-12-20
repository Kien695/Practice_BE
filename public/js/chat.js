import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";
//-file-upload-with-preview
let upload;
import { FileUploadWithPreview } from "https://unpkg.com/file-upload-with-preview/dist/index.js";
document.addEventListener("DOMContentLoaded", () => {
  try {
    upload = new FileUploadWithPreview("upload-image", {
      multiple: true,
      maxFileCount: 10,
    });
  } catch (error) {
    console.error("Error initializing FileUploadWithPreview:", error);
  }
});

//-end file-upload-with-preview
//CLIENT_SEND_MASSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;

    const images = upload.cachedFileArray;

    if (content || images.length > 0) {
      socket.emit("CLIENT_SEND_MASSAGE", {
        content: content,
        images: images,
      });
      e.target.elements.content.value = "";
      upload.resetPreviewPanel(); // clear all selected images
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
  let htmlContent = "";
  let htmlImages = "";
  if (myId == data.userId) {
    div.classList.add("inner-outgoing");
  } else {
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
    div.classList.add("inner-incoming");
  }
  if (data.content) {
    htmlContent = `<div class ="inner-content">${data.content}</div>`;
  }
  if (data.images.length > 0) {
    htmlImages += `<div class ="inner-image">`;
    for (const image of data.images) {
      htmlImages += `<img src="${image}">`;
    }
    htmlImages += `</div`;
  }
  div.innerHTML = `
  ${htmlFullName}
  ${htmlContent}
  ${htmlImages}
  
  `;
  body.insertBefore(div, boxTyping);
  // Tự động cuộn xuống cuối
  body.scrollTop = body.scrollHeight;
  //preview full image
  const gallery = new Viewer(div);
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

//preview full image
const bodyPreviewFullImage = document.querySelector(".chat .inner-body");
if (bodyPreviewFullImage) {
  const gallery = new Viewer(bodyPreviewFullImage);
}
//end preview full image

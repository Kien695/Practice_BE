//chức năng gởi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");

if (listBtnAddFriend.length > 0) {
  listBtnAddFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("add");
      const userId = button.getAttribute("btn-add-friend");
      socket.emit("CLIENT_ADD_FRIEND", userId);
    });
  });
}
//end chức năng gởi yêu cầu

//chức năng hủy gởi yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");

if (listBtnCancelFriend.length > 0) {
  listBtnCancelFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.remove("add");
      const userId = button.getAttribute("btn-cancel-friend");
      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    });
  });
}
//end chức năng hủy gởi yêu cầu

//chức năng từ chối lời mời
const refuseFriend = (button) => {
  button.addEventListener("click", () => {
    button.closest(".box-user").classList.add("refuse");
    const userId = button.getAttribute("btn-refuse-friend");
    socket.emit("CLIENT_REFUSE_FRIEND", userId);
  });
};

const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");

if (listBtnRefuseFriend.length > 0) {
  listBtnRefuseFriend.forEach((button) => {
    refuseFriend(button);
  });
}
//end chức năng từ chối lời mời

//chức năng chấp nhận lời mời
const acceptFriend = (button) => {
  button.addEventListener("click", () => {
    button.closest(".box-user").classList.add("accepted");
    const userId = button.getAttribute("btn-accept-friend");
    socket.emit("CLIENT_ACCEPT_FRIEND", userId);
  });
};
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");

if (listBtnAcceptFriend.length > 0) {
  listBtnAcceptFriend.forEach((button) => {
    acceptFriend(button);
  });
}
//end chức năng chấp nhận lời mời

//SEVER_RETURN_LENGTH_ACCEPT_FRIEND
const badgeUserAccept = document.querySelector("[badge-users-accept]");
if (badgeUserAccept) {
  const userId = badgeUserAccept.getAttribute("badge-users-accept");
  socket.on("SEVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    if (userId === data.userId) {
      badgeUserAccept.innerHTML = data.lengthAcceptFriends;
    }
  });
}

//end SEVER_RETURN_LENGTH_ACCEPT_FRIEND

//SEVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SEVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
  // Trang lời mời đã nhận
  const dataUserAccept = document.querySelector("[data-users-accept]");
  if (dataUserAccept) {
    const userId = dataUserAccept.getAttribute("data-users-accept");
    if (userId === data.userId) {
      //vẽ user ra giao diện
      const div = document.createElement("div");
      div.classList.add("col-6");
      div.setAttribute("user-id", data.infoUserA._id);
      div.innerHTML = `
      <div class="box-user ">
        <div class="inner-avatar">
          <img src="/img/6596121.png" alt="${data.infoUserA.fullName}">
        </div>
        <div class="inner-info">
          <div class="inner-name">${data.infoUserA.fullName}
          </div>
          <div class="inner-buttons">
            <button 
            class="btn btn-sm btn-primary mr-1" 
            btn-accept-friend="${data.infoUserA._id}"
            >
              Chấp nhận 
            </button>
            <button 
            class="btn btn-sm btn-secondary mr-1" 
            btn-refuse-friend="${data.infoUserA._id}"
            >
              Hủy
            </button>
            <button 
              class="btn btn-sm btn-secondary mr-1" 
              btn-deleted-friend="btn-deleted-friend" 
              disabled="disabled"
              >
              Đã xóa
            </button>
            <button 
              class="btn btn-sm btn-primary mr-1" 
              btn-accepted-friend="btn-accepted-friend" 
              disabled="disabled"
            >
              Đã chấp nhận
            </button>
          </div>
        </div>
      </div>
      `;
      dataUserAccept.appendChild(div);
      //end vẽ user ra giao diện

      //hủy lời mời kết bạn
      const buttonRefuse = div.querySelector("[btn-refuse-friend]");
      refuseFriend(buttonRefuse);

      //end hủy lời mời kết bạn

      //chấp nhận lời mời
      const buttonAccept = div.querySelector("[btn-accept-friend]");
      acceptFriend(buttonAccept);
      //end chấp nhận lời mời
    }
  }
  // Trang danh sách người dùng
  const dataUserNotFriend = document.querySelector("[data-users-not-friend]");
  if (dataUserNotFriend) {
    const userId = dataUserNotFriend.getAttribute("data-users-not-friend");
    if (userId === data.userId) {
      const boxUserRemove = dataUserNotFriend.querySelector(
        `[user-id='${data.infoUserA._id}']`
      );
      if (boxUserRemove) {
        dataUserNotFriend.removeChild(boxUserRemove);
      }
    }
  }
});

//end SEVER_RETURN_INFO_ACCEPT_FRIEND

//SEVER_RETURN_USERID_CANCEL_FRIEND
socket.on("SEVER_RETURN_USERID_CANCEL_FRIEND", (data) => {
  const boxUserRemove = document.querySelector(`[user-id='${data.userIdA}']`);
  if (boxUserRemove) {
    const dataUserAccept = document.querySelector("[data-users-accept]");
    const userIdB = badgeUserAccept.getAttribute("badge-users-accept");
    if (userIdB === data.userIdB) {
      dataUserAccept.removeChild(boxUserRemove);
    }
  }
});

//END SEVER_RETURN_USERID_CANCEL_FRIEND

//SERVER_RETURN_USER_STATUS_ONLINE
socket.on("SERVER_RETURN_USER_STATUS_ONLINE", (data) => {
  const dataUserFriend = document.querySelector("[data-users-friend]");
  if (dataUserFriend) {
    const boxUser = dataUserFriend.querySelector(`[user-id='${data.userId}']`);
    if (boxUser) {
      boxUser.querySelector("[status]").setAttribute("status", data.status);
    }
  }
});
//end SERVER_RETURN_USER_STATUS_ONLINE

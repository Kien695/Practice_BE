//change-status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");
      let statusChange = statusCurrent == "active" ? "inactive" : "active";
      const action = path + `/${statusChange}/${id}?_method=PATCH`;
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}
//end change-status

//delete item
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=PATCH`;
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}
//end delete item

//restore item
const buttonRestore = document.querySelectorAll("[button-restore]");

if (buttonRestore.length > 0) {
  const formRestoreItem = document.querySelector("#form-restore-item");

  const path = formRestoreItem.getAttribute("data-path");
  buttonRestore.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn khôi phục sản phẩm này?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        console.log(id);
        const action = `${path}/${id}?_method=PATCH`;

        formRestoreItem.action = action;
        formRestoreItem.submit();
      }
    });
  });
}
//end restore item

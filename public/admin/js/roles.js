//permission
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    let permissions = [];
    const rows = tablePermissions.querySelectorAll("[data-name]");
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");
      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value;
          permissions.push({
            id: id,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          if (checked) {
            permissions[index].permissions.push(name);
          }
        });
      }
    });
    if (permissions.length > 0) {
      const formChangePermissions = document.querySelector(
        "#form-change-permission"
      );
      const inputPermissions = formChangePermissions.querySelector(
        "input[name='permissions']"
      );

      // Kiểm tra inputPermissions tồn tại trước khi gán giá trị
      if (inputPermissions) {
        inputPermissions.value = JSON.stringify(permissions);
        formChangePermissions.submit();
      } else {
        console.error("Phần tử input với name='permissions' không tồn tại.");
      }
    }
  });
}
//end permissions
//permissions data default
const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  const tablePermissions = document.querySelector("[table-permissions]");
  records.forEach((records, index) => {
    const permissions = records.permissions;
    permissions.forEach((permissions) => {
      const row = tablePermissions.querySelector(
        `[data-name="${permissions}"]`
      );
      const input = row.querySelectorAll("input")[index];
      input.checked = true;
    });
  });
}
//end permissions data default
//delete item
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa nhóm quyền này?");
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

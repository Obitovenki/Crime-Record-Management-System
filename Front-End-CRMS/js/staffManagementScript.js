document.addEventListener("DOMContentLoaded", () => {
  const staffIdInput = document.getElementById("staffIdInput");
  const nameInput = document.getElementById("nameInput");
  const roleInput = document.getElementById("roleInput");
  const deptInput = document.getElementById("deptInput");
  const addRoleBtn = document.getElementById("addRoleBtn");
  const roleList = document.getElementById("roleList");
  const roleCount = document.getElementById("roleCount");
  const errorModal = document.getElementById("errorModal");
  const errorMessage = document.getElementById("errorMessage");
  const closeModalBtn = document.querySelector(".close-btn");

  let staffRecords = [];

  // Close modal on clicking close button
  closeModalBtn.addEventListener("click", () => {
    errorModal.style.display = "none";
  });

  // Display modal with error message
  function showError(message) {
    errorMessage.textContent = message;
    errorModal.style.display = "block";
  }

  // Add staff information
  addRoleBtn.addEventListener("click", () => {
    const staffId = staffIdInput.value.trim();
    const staffName = nameInput.value.trim();
    const staffRole = roleInput.value.trim();
    const staffDept = deptInput.value.trim();

    // Input validation
    if (!staffId || !staffName || !staffRole || !staffDept) {
      showError("All fields are required!");
      return;
    }

    // Add staff record to the array
    const staffRecord = {
      staffId,
      staffName,
      staffRole,
      staffDept,
    };

    staffRecords.push(staffRecord);
    updateUI();
    storeData(staffRecord);

    // Clear inputs after adding
    staffIdInput.value = "";
    nameInput.value = "";
    roleInput.value = "";
    deptInput.value = "";
  });

  // Update UI with staff records
  function updateUI() {
    roleList.innerHTML = "";
    staffRecords.forEach((record, index) => {
      const li = document.createElement("li");
      li.textContent = `ID: ${record.staffId}, Name: ${record.staffName}, Role: ${record.staffRole}, Department: ${record.staffDept}`;
      roleList.appendChild(li);
    });
    roleCount.textContent = `Total Record stored: ${staffRecords.length}`;
  }

  // Store data using AJAX (Assuming you have a server-side API to handle this)
  function storeData(staffRecord) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "storeStaffData.php", true); // This PHP file should handle the SQL storage
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("Data stored successfully.");
      } else if (xhr.readyState === 4) {
        showError("Failed to store data.");
      }
    };

    xhr.send(JSON.stringify(staffRecord));
  }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNDRTkV8sF24Q8VzJKzOPAsaahh_fzp4U",
  authDomain: "crime-record-management-ab578.firebaseapp.com",
  databaseURL: "https://crime-record-management-ab578-default-rtdb.firebaseio.com",
  projectId: "crime-record-management-ab578",
  storageBucket: "crime-record-management-ab578.appspot.com",
  messagingSenderId: "302270968816",
  appId: "1:302270968816:web:e661f3f80e6899dbdea335"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const staffFormDB = ref(database, "staff-managements");

// DOMContentLoaded event listener for initial setup
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

  // Form submission handling
  const form = document.getElementById("staff-managements");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload
    
    const staffId = staffIdInput.value.trim();
    const staffName = nameInput.value.trim();
    const staffRole = roleInput.value.trim();
    const staffDept = deptInput.value.trim();

    // Input validation
    if (!staffId || !staffName || !staffRole || !staffDept) {
      showError("All fields are required!");
      return;
    }

    try {
      // Save to Firebase
      await saveMessages(staffId, staffName, staffRole, staffDept);

      // Add staff record to the array
      const staffRecord = {
        staffId,
        staffName,
        staffRole,
        staffDept,
      };

      staffRecords.push(staffRecord);
      updateUI();

      // Display success alert
      document.querySelector(".alert").style.display = "block";

      // Hide the alert after 3 seconds
      setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
      }, 3000);

      // Clear inputs after adding
      staffIdInput.value = "";
      nameInput.value = "";
      roleInput.value = "";
      deptInput.value = "";
    } catch (error) {
      showError("Failed to save staff information. Please try again.");
    }
  });

  // Save staff information to Firebase
  const saveMessages = async (sid, name, role, dept) => {
    const newStaffForm = push(staffFormDB);
    await set(newStaffForm, {
      sid: sid,
      name: name,
      role: role,
      dept: dept
    });
  };

  // Update UI with staff records
  function updateUI() {
    roleList.innerHTML = "";
    staffRecords.forEach((record) => {
      const li = document.createElement("li");
      li.textContent = `ID: ${record.staffId}, Name: ${record.staffName}, Role: ${record.staffRole}, Department: ${record.staffDept}`;
      roleList.appendChild(li);
    });
    roleCount.textContent = `Total Record stored: ${staffRecords.length}`;
  }
});

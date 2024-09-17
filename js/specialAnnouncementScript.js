
// document.addEventListener("DOMContentLoaded", () => {
//   const caseNumberInput = document.getElementById("caseNumber");
//   const caseDateInput = document.getElementById("caseDate");
//   const locationInput = document.getElementById("location");
//   const descriptionInput = document.getElementById("description");
//   const officerInChargeInput = document.getElementById("officerInCharge");
//   const submitUpdateButton = document.getElementById("submitupdatebutton");
//   const roleList = document.getElementById("roleList");
//   const roleCount = document.getElementById("roleCount");
//   const alertDiv = document.querySelector(".alert");
//   const errorModal = document.getElementById("errorModal");
//   const errorMessage = document.getElementById("errorMessage");
//   const closeErrorModalBtn = document.querySelector(".close-btn");

//   let caseRecords = [];

//   // Close error modal on clicking close button
//   closeErrorModalBtn.addEventListener("click", () => {
//     errorModal.style.display = "none";
//   });

//   // Display error modal with message
//   function showError(message) {
//     errorMessage.textContent = message;
//     errorModal.style.display = "block";
//   }

//   // Handle form submission
//   submitUpdateButton.addEventListener("click", (event) => {
//     event.preventDefault(); // Prevent default form submission

//     const caseNumber = caseNumberInput.value.trim();
//     const caseDate = caseDateInput.value.trim();
//     const location = locationInput.value.trim();
//     const description = descriptionInput.value.trim();
//     const officerInCharge = officerInChargeInput.value.trim();

//     // Input validation
//     if (!caseNumber || !caseDate || !location || !description || !officerInCharge) {
//       showError("All fields are required!");
//       return;
//     }

//     // Add case record to the array
//     const caseRecord = {
//       caseNumber,
//       caseDate,
//       location,
//       description,
//       officerInCharge,
//     };

//     caseRecords.push(caseRecord);
//     updateUI();

//     // Display success alert
//     alertDiv.style.display = "block";

//     // Hide the alert after 3 seconds
//     setTimeout(() => {
//       alertDiv.style.display = "none";
//     }, 3000);

//     // Clear inputs after adding
//     caseNumberInput.value = "";
//     caseDateInput.value = "";
//     locationInput.value = "";
//     descriptionInput.value = "";
//     officerInChargeInput.value = "";
//   });


//   // Update UI with case records
//   function updateUI() {
//     roleList.innerHTML = "";
//     caseRecords.forEach((record) => {
//       const li = document.createElement("li");
//       li.textContent = `Case Number: ${record.caseNumber}, Date: ${record.caseDate}, Location: ${record.location}, Description: ${record.description}, Officer: ${record.officerInCharge}`;
//       roleList.appendChild(li);
//     });
//     roleCount.textContent = `Case Status stored: ${caseRecords.length}`;
//   }
// });


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
const caseRecordsDB = ref(database, "Officer-Allotment-Updates");

document.addEventListener("DOMContentLoaded", () => {
  const caseNumberInput = document.getElementById("caseNumber");
  const caseDateInput = document.getElementById("caseDate");
  const locationInput = document.getElementById("location");
  const descriptionInput = document.getElementById("description");
  const officerInChargeInput = document.getElementById("officerInCharge");
  const submitUpdateButton = document.getElementById("submitupdatebutton");
  const roleList = document.getElementById("roleList");
  const roleCount = document.getElementById("roleCount");
  const alertDiv = document.querySelector(".alert");
  const errorModal = document.getElementById("errorModal");
  const errorMessage = document.getElementById("errorMessage");
  const closeErrorModalBtn = document.querySelector(".close-btn");

  let caseRecords = [];

  // Close error modal on clicking close button
  closeErrorModalBtn.addEventListener("click", () => {
    errorModal.style.display = "none";
  });

  // Display error modal with message
  function showError(message) {
    errorMessage.textContent = message;
    errorModal.style.display = "block";
  }

  // Handle form submission
  submitUpdateButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const caseNumber = caseNumberInput.value.trim();
    const caseDate = caseDateInput.value.trim();
    const location = locationInput.value.trim();
    const description = descriptionInput.value.trim();
    const officerInCharge = officerInChargeInput.value.trim();

    // Input validation
    if (!caseNumber || !caseDate || !location || !description || !officerInCharge) {
      showError("All fields are required!");
      return;
    }

    try {
      // Save to Firebase
      await saveCaseRecord(caseNumber, caseDate, location, description, officerInCharge);

      // Add case record to the array
      const caseRecord = {
        caseNumber,
        caseDate,
        location,
        description,
        officerInCharge,
      };

      caseRecords.push(caseRecord);
      updateUI();

      // Display success alert
      alertDiv.style.display = "block";

      // Hide the alert after 3 seconds
      setTimeout(() => {
        alertDiv.style.display = "none";
      }, 3000);

      // Clear inputs after adding
      caseNumberInput.value = "";
      caseDateInput.value = "";
      locationInput.value = "";
      descriptionInput.value = "";
      officerInChargeInput.value = "";

    } catch (error) {
      showError("Failed to save case information. Please try again.");
    }
  });

  // Save case record to Firebase
  const saveCaseRecord = async (caseNumber, caseDate, location, description, officerInCharge) => {
    const newCaseRecord = push(caseRecordsDB);
    await set(newCaseRecord, {
      caseNumber: caseNumber,
      caseDate: caseDate,
      location: location,
      description: description,
      officerInCharge: officerInCharge
    });
  };

  // Update UI with case records
  function updateUI() {
    roleList.innerHTML = "";
    caseRecords.forEach((record) => {
      const li = document.createElement("li");
      li.textContent = `Case Number: ${record.caseNumber}, Date: ${record.caseDate}, Location: ${record.location}, Description: ${record.description}, Officer: ${record.officerInCharge}`;
      roleList.appendChild(li);
    });
    roleCount.textContent = `Case Status stored: ${caseRecords.length}`;
  }
});

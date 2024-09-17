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
    const caseRecordsDB = ref(database, "Crime-Case-Status");

    document.addEventListener("DOMContentLoaded", () => {
      const caseIdInput = document.getElementById("caseId");
      const caseStatusSelect = document.getElementById("caseStatus");
      const crimeTypeInput = document.getElementById("crimeType");
      const caseDetailsTextarea = document.getElementById("caseDetails");
      const bookCaseBtn = document.getElementById("bookCaseBtn");
      const bookingList = document.getElementById("bookingList");
      const bookingCount = document.getElementById("bookingCount");
      const alertBox = document.querySelector(".alert");
      const errorModal = document.getElementById("errorModal");
      const errorMessage = document.getElementById("errorMessage");
      const closeModalBtn = document.querySelector(".close-btn");

      let caseRecords = [];

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
      bookCaseBtn.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevent form submission

        const caseId = caseIdInput.value.trim();
        const caseStatus = caseStatusSelect.value;
        const crimeType = crimeTypeInput.value.trim();
        const caseDetails = caseDetailsTextarea.value.trim();

        // Input validation
        if (!caseId || !caseStatus || !crimeType || !caseDetails) {
          showError("All fields are required!");
          return;
        }

        // Check if case ID already exists
        if (caseRecords.some(record => record.caseId === caseId)) {
          showError("Case ID already exists!");
          return;
        }

        // Add case record to the array and Firebase
        const caseRecord = {
          caseId,
          caseStatus,
          crimeType,
          caseDetails,
        };

        try {
          await saveCase(caseRecord);

          caseRecords.push(caseRecord);
          updateUI();

          // Display success alert
          alertBox.style.display = "block";

          // Hide the alert after 3 seconds
          setTimeout(() => {
            alertBox.style.display = "none";
          }, 3000);

          // Clear inputs after adding
          caseIdInput.value = "";
          caseStatusSelect.value = "open";
          crimeTypeInput.value = "";
          caseDetailsTextarea.value = "";
        } catch (error) {
          showError("Failed to save case information. Please try again.");
        }
      });

      // Save case information to Firebase
      const saveCase = async (caseRecord) => {
        const newCaseRecord = push(caseRecordsDB);
        await set(newCaseRecord, caseRecord);
      };

      // Update UI with case records
      function updateUI() {
        bookingList.innerHTML = "";
        caseRecords.forEach((record) => {
          const li = document.createElement("li");
          li.textContent = `ID: ${record.caseId}, Status: ${record.caseStatus}, Crime Type: ${record.crimeType}, Details: ${record.caseDetails}`;
          bookingList.appendChild(li);
        });
        bookingCount.textContent = `Case Status stored: ${caseRecords.length}`;
      }
    });


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
const bookingFormDB = ref(database, "customer-booking");


document.addEventListener("DOMContentLoaded", () => {
  const customerNameInput = document.getElementById("customerName");
  const caseDescriptionInput = document.getElementById("caseDescription");
  const locationInput = document.getElementById("location");
  const caseDateInput = document.getElementById("caseDate");
  const caseHourSelect = document.getElementById("caseHour");
  const caseMinuteSelect = document.getElementById("caseMinute");
  const bookCaseBtn = document.getElementById("bookCaseBtn");
  const bookingList = document.getElementById("bookingList");
  const bookingCount = document.getElementById("bookingCount");
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
  const form = document.getElementById("bookings");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload
    
    const customerName = customerNameInput.value.trim();
    const caseDescription = caseDescriptionInput.value.trim();
    const location = locationInput.value.trim();
    const caseDate = caseDateInput.value.trim();
    const caseHour = caseHourSelect.value;
    const caseMinute = caseMinuteSelect.value;
  
    // Input validation
    if (!customerName || !caseDescription || !location || !caseDate || !caseHour || !caseMinute) {
      showError("All fields are required!");
      return;
    }
    

  try {
      // Save to Firebase
      await saveMessages(customerName, caseDescription, location, caseDate,caseHour,caseMinute);

      // Add staff record to the array
      const staffRecord = {
        customerName,
        caseDescription,
        location,
        caseDate,
        caseTime: `${caseHour}:${caseMinute}`,
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
      customerNameInput.value = "";
      caseDescriptionInput.value = "";
      locationInput.value = "";
      caseDateInput.value = "";
      caseHourSelect.value = "";
      caseMinuteSelect.value = "";

    } catch (error) {
      showError("Failed to save case information. Please try again.");
      
    }
  });



  // Save staff information to Firebase
  const saveMessages = async (customerName, caseDescription, location, caseDate,caseHour,caseMinute) => {
    const newBookingForm = push(bookingFormDB);
    await set(newBookingForm, {
      customerName: customerName,
      caseDescription: caseDescription,
      location: location,
      caseDate: caseDate,
      caseHour: caseHour,
      caseMinute: caseMinute
    });
  };


  

  // Update UI with staff records
  function updateUI() {
    bookingList.innerHTML = "";
    staffRecords.forEach((record) => {
      const li = document.createElement("li");
      li.textContent = `Name: ${record.customerName}, Description: ${record.caseDescription}, Location: ${record.location}, Date: ${record.caseDate}, Time: ${record.caseTime}`;
      bookingList.appendChild(li);
    });
    bookingCount.textContent = `Total Bookings: ${staffRecords.length}`;
  }
});
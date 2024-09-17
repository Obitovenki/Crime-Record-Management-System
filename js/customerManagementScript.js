import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

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
const staffFormDB = ref(database, "staff-managements");
const bookingFormDB = ref(database, "customer-booking");
const officerAllotmentDB = ref(database, "Officer-Allotment-Updates");

// Function to display fetched records
function displayData(data, container, type) {
  container.innerHTML = ""; // Clear the container before adding new data

  if (data) {
    Object.keys(data).forEach((key) => {
      const record = data[key];
      const div = document.createElement("div");

      if (type === "case") {
        div.innerHTML = `
          <h4>Case ID: ${record.caseId}</h4>
          <h5>Status: ${record.caseStatus}</h5>
          <h5>Crime Type: ${record.crimeType}</h5>
          <h5>Details: ${record.caseDetails}</h5>
          <hr/>
        `;
      } else if (type === "staff") {
        div.innerHTML = `
          <h4>Staff ID: ${record.sid}</h4>
          <h5>Name: ${record.name}</h5>
          <h5>Role: ${record.role}</h5>
          <h5>Department: ${record.dept}</h5>
          <hr/>
        `;
      } else if (type === "booking") {
        div.innerHTML = `
          <h4>Criminal Name: ${record.customerName}</h4>
          <h5>Description: ${record.caseDescription}</h5>
          <h5>Location: ${record.location}</h5>
          <h5>Date: ${record.caseDate}</h5>
          <h5>Time: ${record.caseHour}:${record.caseMinute}</h5>
          <hr/>
        `;
      } else if (type === "officer") {
        div.innerHTML = `
          <h4>Case ID: ${record.caseNumber}</h4>
          <h5>Date: ${record.caseDate}</h5>
          <h5>Location: ${record.location}</h5>
          <h5>Description: ${record.description}</h5>
          <h5>Officer In Charge: ${record.officerInCharge}</h5>
          <hr/>
        `;
      }

      container.appendChild(div);
    });
  } else {
    container.innerHTML = `<p>No ${type === 'case' ? 'crime case' : type === 'staff' ? 'staff management' : type === 'booking' ? 'crime booking' : 'officer allotment updates'} records found.</p>`;
  }
}

// Event listener for "Crime Case Status" button
document.getElementById("statusfetchbtn").addEventListener("click", () => {
  const rootDiv = document.getElementById("root");
  
  // Fetch crime case data from Firebase
  onValue(caseRecordsDB, (snapshot) => {
    const data = snapshot.val();
    displayData(data, rootDiv, "case");
  });
});

// Event listener for "Staff Management" button
document.getElementById("stafffetchbtn").addEventListener("click", () => {
  const rootDiv = document.getElementById("root");

  // Fetch staff management data from Firebase
  onValue(staffFormDB, (snapshot) => {
    const data = snapshot.val();
    displayData(data, rootDiv, "staff");
  });
});

// Event listener for "Crime Booking" button
document.getElementById("bookingfetchbtn").addEventListener("click", () => {
  const rootDiv = document.getElementById("root");

  // Fetch crime booking data from Firebase
  onValue(bookingFormDB, (snapshot) => {
    const data = snapshot.val();
    displayData(data, rootDiv, "booking");
  });
});

// Event listener for "Officer Allotment Updates" button
document.getElementById("allotmentfetchbtn").addEventListener("click", () => {
  const rootDiv = document.getElementById("root");

  // Fetch officer allotment updates data from Firebase
  onValue(officerAllotmentDB, (snapshot) => {
    const data = snapshot.val();
    displayData(data, rootDiv, "officer");
  });
});

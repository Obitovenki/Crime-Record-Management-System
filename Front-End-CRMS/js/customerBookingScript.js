// customerBookingScript.js

document.addEventListener('DOMContentLoaded', () => {
  const bookCaseBtn = document.getElementById('bookCaseBtn');
  const bookingList = document.getElementById('bookingList');
  const bookingCount = document.getElementById('bookingCount');
  const errorModal = document.getElementById('errorModal');
  const errorMessage = document.getElementById('errorMessage');
  const closeBtn = document.querySelector('.close-btn');

  // Function to validate the input fields
  function validateInputs(name, description, location, date, hour, minute) {
    if (!name || !description || !location || !date || hour === '' || minute === '') {
      return 'Please fill out all fields.';
    }
    return '';
  }

  // Function to book a crime case
  function bookCase() {
    const customerName = document.getElementById('customerName').value.trim();
    const caseDescription = document.getElementById('caseDescription').value.trim();
    const location = document.getElementById('location').value.trim();
    const caseDate = document.getElementById('caseDate').value;
    const caseHour = document.getElementById('caseHour').value;
    const caseMinute = document.getElementById('caseMinute').value;

    // Validate inputs
    const error = validateInputs(customerName, caseDescription, location, caseDate, caseHour, caseMinute);
    if (error) {
      showErrorModal(error);
      return;
    }

    // Add booking to the list
    const listItem = document.createElement('li');
    listItem.textContent = `Name: ${customerName}, Description: ${caseDescription}, Location: ${location}, Date: ${caseDate}, Time: ${caseHour}:${caseMinute}`;
    bookingList.appendChild(listItem);

    // Update booking count
    const currentCount = bookingList.children.length;
    bookingCount.textContent = `Total Bookings: ${currentCount}`;

    // Clear inputs
    document.getElementById('customerName').value = '';
    document.getElementById('caseDescription').value = '';
    document.getElementById('location').value = '';
    document.getElementById('caseDate').value = '';
    document.getElementById('caseHour').value = '';
    document.getElementById('caseMinute').value = '';
  }

  // Function to show error modal
  function showErrorModal(message) {
    errorMessage.textContent = message;
    errorModal.style.display = 'block';
  }

  // Function to close error modal
  function closeErrorModal() {
    errorModal.style.display = 'none';
  }

  // Event listener for booking button
  bookCaseBtn.addEventListener('click', bookCase);

  // Event listener for closing error modal
  closeBtn.addEventListener('click', closeErrorModal);
  
  // Event listener for clicking outside the modal to close it
  window.addEventListener('click', (event) => {
    if (event.target === errorModal) {
      closeErrorModal();
    }
  });
});

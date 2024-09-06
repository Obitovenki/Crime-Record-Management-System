// crimeCaseStatusScript.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const updateStatusBtn = document.getElementById('updateStatusBtn');
  const statusUpdateResult = document.getElementById('statusUpdateResult');
  const errorModal = document.getElementById('errorModal');
  const successModal = document.getElementById('successModal');
  const errorMessage = document.getElementById('errorMessage');
  const successMessage = document.getElementById('successMessage');
  const closeModalBtn = document.querySelector('.close-btn');
  const closeSuccessBtn = document.querySelector('.close-success-btn');

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate form submission
    try {
      // Extract form data
      const caseId = document.getElementById('caseId').value;
      const caseStatus = document.getElementById('caseStatus').value;
      const officerInCharge = document.getElementById('officerInCharge').value;
      const crimeType = document.getElementById('crimeType').value;
      const caseDetails = document.getElementById('caseDetails').value;

      // Validate input data
      if (!caseId || !caseStatus || !officerInCharge || !crimeType || !caseDetails) {
        throw new Error('All fields are required.');
      }

      // Simulate a successful update (you should replace this with actual server call)
      statusUpdateResult.textContent = 'Case status updated successfully!';
      statusUpdateResult.style.color = 'green';

      // Show success modal
      successMessage.textContent = 'Case status has been successfully updated!';
      successModal.style.display = 'block';

      // Clear form
      form.reset();
    } catch (error) {
      // Show error message
      errorMessage.textContent = error.message;
      errorModal.style.display = 'block';
    }
  });

  // Handle modal close
  closeModalBtn.addEventListener('click', () => {
    errorModal.style.display = 'none';
  });

  closeSuccessBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', (e) => {
    if (e.target === errorModal) {
      errorModal.style.display = 'none';
    }
    if (e.target === successModal) {
      successModal.style.display = 'none';
    }
  });

  // Logout button functionality
  const logoutButton = document.getElementById('logout');
  logoutButton.addEventListener('click', () => {
    // Simulate logout (replace with actual logout logic)
    alert('Logging out...');
    // Redirect to login page or home page
    window.location.href = './index.html'; // Adjust as needed
  });
});

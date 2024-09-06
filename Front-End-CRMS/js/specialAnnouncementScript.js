document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('crimeUpdateForm');
  const errorModal = document.getElementById('errorModal');
  const errorMessage = document.getElementById('errorMessage');
  const closeBtn = document.querySelector('.close-btn');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Gather form data
    const formData = new FormData(form);
    const data = {
      caseNumber: formData.get('caseNumber'),
      caseDate: formData.get('caseDate'),
      location: formData.get('location'),
      description: formData.get('description'),
      officerInCharge: formData.get('officerInCharge'),
    };

    try {
      const response = await fetch('submitCrimeUpdate.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Handle successful submission
        alert('Crime update submitted successfully.');
        form.reset();
      } else {
        // Display error message
        showError(result.message);
      }
    } catch (error) {
      showError('An error occurred while submitting the form.');
    }
  });

  function showError(message) {
    errorMessage.textContent = message;
    errorModal.style.display = 'block';
  }

  closeBtn.addEventListener('click', () => {
    errorModal.style.display = 'none';
  });

  // Close modal if user clicks outside of modal content
  window.addEventListener('click', (event) => {
    if (event.target === errorModal) {
      errorModal.style.display = 'none';
    }
  });
});

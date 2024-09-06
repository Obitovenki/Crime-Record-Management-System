document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('recordForm');
  const recordDetailsOutput = document.getElementById('recordDetailsOutput');
  const generateResultsBtn = document.getElementById('generateResultsBtn');

  function validateForm() {
    const criminalName = document.getElementById('criminalName').value.trim();
    const crimeType = document.getElementById('crimeType').value.trim();
    const caseStatus = document.getElementById('caseStatus').value;
    const sentenceLength = document.getElementById('sentenceLength').value.trim();

    if (!criminalName || !crimeType || !caseStatus || !sentenceLength) {
      alert('Please fill out all fields.');
      return false;
    }
    return true;
  }

  function generateRecordDetails() {
    if (validateForm()) {
      const criminalName = document.getElementById('criminalName').value.trim();
      const crimeType = document.getElementById('crimeType').value.trim();
      const caseStatus = document.getElementById('caseStatus').value;
      const sentenceLength = document.getElementById('sentenceLength').value.trim();

      const recordDetails = `
Name: ${criminalName}
Type of Crime: ${crimeType}
Case Status: ${caseStatus}
Sentence Length: ${sentenceLength}
      `;

      recordDetailsOutput.textContent = recordDetails;
      alert('Record details generated successfully!');
    }
  }

  generateResultsBtn.addEventListener('click', generateRecordDetails);
});
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('recordForm');
  const recordDetailsOutput = document.getElementById('recordDetailsOutput');
  const generateResultsBtn = document.getElementById('generateResultsBtn');
  const generateExampleBtn = document.createElement('button');
  generateExampleBtn.textContent = 'Generate Example Record';
  generateExampleBtn.id = 'generateExampleBtn';
  form.appendChild(generateExampleBtn);

  const exampleRecords = [
    { name: 'John Doe', crimeType: 'Theft', caseStatus: 'Open', sentenceLength: '5 years' },
    { name: 'Jane Smith', crimeType: 'Fraud', caseStatus: 'Closed', sentenceLength: '3 years' },
    { name: 'Emily Johnson', crimeType: 'Assault', caseStatus: 'Pending', sentenceLength: '2 years' },
    { name: 'Michael Brown', crimeType: 'Robbery', caseStatus: 'Open', sentenceLength: '10 years' },
    { name: 'Chris Davis', crimeType: 'Burglary', caseStatus: 'Closed', sentenceLength: '4 years' },
    { name: 'Jessica Miller', crimeType: 'Vandalism', caseStatus: 'Pending', sentenceLength: '1 year' },
    { name: 'Daniel Wilson', crimeType: 'Drug Possession', caseStatus: 'Closed', sentenceLength: '6 months' },
    { name: 'Laura Martinez', crimeType: 'Arson', caseStatus: 'Open', sentenceLength: '8 years' },
  ];

  function validateForm() {
    const criminalName = document.getElementById('criminalName').value.trim();
    const crimeType = document.getElementById('crimeType').value.trim();
    const caseStatus = document.getElementById('caseStatus').value;
    const sentenceLength = document.getElementById('sentenceLength').value.trim();

    if (!criminalName || !crimeType || !caseStatus || !sentenceLength) {
      alert('Please fill out all fields.');
      return false;
    }
    return true;
  }

  function generateRecordDetails() {
    if (validateForm()) {
      const criminalName = document.getElementById('criminalName').value.trim();
      const crimeType = document.getElementById('crimeType').value.trim();
      const caseStatus = document.getElementById('caseStatus').value;
      const sentenceLength = document.getElementById('sentenceLength').value.trim();

      const recordDetails = `
Name: ${criminalName}
Type of Crime: ${crimeType}
Case Status: ${caseStatus}
Sentence Length: ${sentenceLength}
      `;

      recordDetailsOutput.textContent = recordDetails;
      alert('Record details generated successfully!');
    }
  }

  function generateExampleRecord() {
    const randomIndex = Math.floor(Math.random() * exampleRecords.length);
    const record = exampleRecords[randomIndex];
    recordDetailsOutput.textContent = `
Name: ${record.name}
Type of Crime: ${record.crimeType}
Case Status: ${record.caseStatus}
Sentence Length: ${record.sentenceLength}
    `;
    alert('Example record generated successfully!');
  }

  generateResultsBtn.addEventListener('click', generateRecordDetails);
  generateExampleBtn.addEventListener('click', generateExampleRecord);
});

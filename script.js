
document.getElementById('ageForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form submission

    // Clear previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('result').textContent = '';

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    let isValid = true;

    // Validate name
    if (name === '') {
        document.getElementById('nameError').textContent = '*Name is required.';

        isValid = false;

    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = '*Please enter a valid email address.';

        isValid = false;
    }

    if (!isValid) return;

    // Fetch data from API
    try {
        const response = await fetch(`https://api.agify.io?name=${encodeURIComponent(name)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data from API.');
        }

        const data = await response.json();
        const age = data.age ? data.age : 'unknown';

        document.getElementById('result').textContent = `The predicted age for the name "${name}" is ${age}.`;
    } catch (error) {
        document.getElementById('result').textContent = `Error: ${error.message}`;
    }
});
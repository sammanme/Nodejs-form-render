function validateForm() {
    let isValid = true;

    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const otherNames = document.getElementById('other_name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phone_number').value;
    const gender = document.getElementById('gender').value;

    const namePattern = /^[A-Za-z]+$/;
    const phonePattern = /^[0-9]{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!namePattern.test(firstName)) {
        document.getElementById('first_name_error').innerText = "Invalid first name";
        isValid = false;
    } else {
        document.getElementById('first_name_error').innerText = "";
    }

    if (!namePattern.test(lastName)) {
        document.getElementById('last_name_error').innerText = "Invalid last name";
        isValid = false;
    } else {
        document.getElementById('last_name_error').innerText = "";
    }

    if (otherNames && !namePattern.test(otherNames)) {
        document.getElementById('other_names_error').innerText = "Invalid other names";
        isValid = false;
    } else {
        document.getElementById('other_names_error').innerText = "";
    }

    if (!emailPattern.test(email)) {
        document.getElementById('email_error').innerText = "Invalid email";
        isValid = false;
    } else {
        document.getElementById('email_error').innerText = "";
    }

    if (!phonePattern.test(phoneNumber)) {
        document.getElementById('phone_number_error').innerText = "Invalid phone number";
        isValid = false;
    } else {
        document.getElementById('phone_number_error').innerText = "";
    }

    if (gender === '') {
        document.getElementById('gender_error').innerText = "Gender is required";
        isValid = false;
    } else {
        document.getElementById('gender_error').innerText = "";
    }

    return isValid;
}

function submitForm(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const form = document.getElementById('myForm');
    const formData = new FormData(form);
    const jsonData = {};

    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    fetch('/submit-form', {
        method: 'POST',
        body: JSON.stringify(jsonData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const successMessage = document.createElement('p');
        successMessage.textContent = 'Form submitted successfully!';
        form.appendChild(successMessage); // Append success message to the form
        setTimeout(() => {
            successMessage.remove(); // Remove success message after 3 seconds
            window.location.href = 'index.html'; // Redirect to the form page
        }, 3000); // Redirect after 3 seconds
    })
    .catch(error => console.error('Error:', error));
}

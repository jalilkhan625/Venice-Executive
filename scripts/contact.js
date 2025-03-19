// /scripts/contact.js
$(document).ready(function() {
    // Explicitly hide the badge on page load
    $('#successBadge').hide();

    // Get form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');

    // Add input event listeners to clear errors as user types
    nameInput.addEventListener('input', () => {
        document.getElementById('nameError').style.display = 'none';
    });

    emailInput.addEventListener('input', () => {
        document.getElementById('emailError').style.display = 'none';
    });

    subjectInput.addEventListener('input', () => {
        document.getElementById('subjectError').style.display = 'none';
    });

    // Form validation on submit
    $('#contactForm').on('submit', function(event) {
        event.preventDefault();
        let isValid = true;

        // Reset error messages
        document.querySelectorAll('.error').forEach(error => error.style.display = 'none');

        // Validate name
        const name = nameInput.value.trim();
        if (!name) {
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        }

        // Validate email
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }

        // Validate subject
        const subject = subjectInput.value.trim();
        if (!subject) {
            document.getElementById('subjectError').style.display = 'block';
            isValid = false;
        }

        // If all validations pass
        if (isValid) {
            // Show success badge with jQuery
            $('#successBadge').fadeIn('fast').delay(3000).fadeOut('slow');
            this.reset(); // Reset the form
        }
    });
});
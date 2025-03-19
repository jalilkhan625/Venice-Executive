// /scripts/about.js
document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.how-it-works-section .step');
    const imageContainer = document.querySelector('.how-it-works-section .image-container');

    steps.forEach(step => {
        step.addEventListener('click', () => {
            steps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
            const index = step.getAttribute('data-index');
            imageContainer.style.transform = `translateX(-${index * 100}%)`;
        });
    });
});
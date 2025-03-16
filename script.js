// Function to load external HTML files
function loadComponent(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;

            // Re-run navbar and footer-related logic after components load
            if (elementId === 'navbar-placeholder') {
                initializeNavbarScroll();
                initializeLanguageSelector();
                setTimeout(() => initializeGoogleTranslate(), 500); // Delay to prevent conflicts
            }
            if (elementId === 'footer-placeholder') {
                initializeFooterScroll();
            }
        })
        .catch(error => console.error('Error loading component:', error));
}

// Initialize navbar scroll behavior
function initializeNavbarScroll() {
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar-custom');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });
}

// Initialize footer scroll-up behavior
function initializeFooterScroll() {
    const scrollUp = document.querySelector('.scroll-up');
    if (scrollUp) {
        scrollUp.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            scrollUp.style.display = window.scrollY > 200 ? 'flex' : 'none';
        });
    }
}

// Initialize language selector dropdown behavior
function initializeLanguageSelector() {
    const langToggle = document.getElementById('langToggle');
    const languageDropdown = document.getElementById('languageDropdown');

    if (langToggle && languageDropdown) {
        langToggle.addEventListener('click', function (e) {
            e.preventDefault();
            languageDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!langToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageDropdown.classList.remove('show');
            }
        });

        // Add event listeners to language options
        document.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', function (e) {
                e.preventDefault();
                const selectedLang = this.getAttribute('data-lang');
                translatePage(selectedLang);
            });
        });
    }
}

// Load Google Translate script dynamically only once
function loadGoogleTranslateScript() {
    if (!window.googleTranslateLoaded) {
        window.googleTranslateLoaded = true; // Prevent multiple loads
        const script = document.createElement('script');
        script.src = "https://translate.google.com/translate_a/element.js?cb=initializeGoogleTranslate";
        script.async = true;
        script.defer = true;
        script.onload = initializeGoogleTranslate;
        document.head.appendChild(script);
    }
}

// Initialize Google Translate only once
function initializeGoogleTranslate() {
    if (!document.getElementById('google_translate_element')) {
        const translateDiv = document.createElement('div');
        translateDiv.id = 'google_translate_element';
        translateDiv.style.display = 'none';
        document.body.appendChild(translateDiv);
    }

    if (!window.googleTranslateInitialized && typeof google !== 'undefined' && google.translate) {
        try {
            new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
            window.googleTranslateInitialized = true; // Prevent multiple initializations
        } catch (error) {
            console.error("Google Translate initialization failed:", error);
        }
    }
}

// Function to trigger translation
function translatePage(lang) {
    const googleTranslateFrame = document.querySelector('.goog-te-combo');
    if (googleTranslateFrame) {
        if (googleTranslateFrame.value !== lang) { // Prevent recursion
            googleTranslateFrame.value = lang;
            googleTranslateFrame.dispatchEvent(new Event("change"));
        }
    } else {
        console.error("Google Translate dropdown not found.");
    }
}

// Load navbar, footer, and Google Translate when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('navbar.html', 'navbar-placeholder');
    loadComponent('footer.html', 'footer-placeholder');
    loadGoogleTranslateScript();
});

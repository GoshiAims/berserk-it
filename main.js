// main.js for Berserk IT

document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Toggle ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            // Optional: Toggle ARIA attribute for accessibility
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
            menuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.setAttribute('aria-hidden', isExpanded);
        });

        // Close mobile menu when a link is clicked (for single-page navigation)
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            });
        });
    } else {
        console.warn("Mobile menu button or mobile menu element not found.");
    }

    // --- Smooth Scrolling for Anchor Links (if class 'scroll-smooth' in <html> isn't enough or for more control) ---
    // Tailwind's 'scroll-smooth' on the <html> tag usually handles this well.
    // This is an alternative or supplementary JavaScript approach.
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         const hrefAttribute = this.getAttribute('href');
    //         // Ensure it's a valid ID selector and not just "#"
    //         if (hrefAttribute && hrefAttribute.length > 1 && document.querySelector(hrefAttribute)) {
    //             e.preventDefault();
    //             document.querySelector(hrefAttribute).scrollIntoView({
    //                 behavior: 'smooth'
    //             });
    //         }
    //     });
    // });

    // --- Set Current Year in Footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    } else {
        console.warn("Current year span element not found in footer.");
    }

    // --- Contact Form Submission ---
    // Please dont abuse me 😭
    const contactForm = document.querySelector('#contact form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            formStatus.textContent = 'Sending message...';
            formStatus.className = 'mt-4 text-center text-blue-400';

            const formData = new FormData(contactForm); 
            console.log(formData)
            
            const email = formData.get("email")
            const name = formData.get("name")

            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            body: json
                })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                        formStatus.textContent = `Thanks, ${name}! Your message has been "sent". We'll be in touch via ${email} if needed.`;
                        formStatus.className = 'mt-4 text-center text-green-400 p-3 bg-gray-700 rounded-md';
                    } else {
                        console.log(response);
                        formStatus.innerHTML = json.message;
                    }
                })
                .catch(error => {
                    console.log(error);
                    formStatus.textContent = `Thanks, ${name}! Your message has been sent. We'll be in touch via ${email} if needed.`;
                    formStatus.className = 'mt-4 text-center text-green-400 p-3 bg-gray-700 rounded-md';
                })
                .then(function() {
                    contactForm.reset();
                });
    });

    } else {
        console.warn("Contact form or form status element not found.");
    }
});

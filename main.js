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

    // --- Contact Form Submission (Basic Example - Needs a backend to actually send email) ---
    const contactForm = document.querySelector('#contact form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Basic client-side validation (Tailwind classes + HTML5 'required' handle most of this)
            // You can add more complex validation here if needed

            // Simulate form submission
            formStatus.textContent = 'Sending message...';
            formStatus.className = 'mt-4 text-center text-blue-400'; // Reset classes and set loading style

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // In a real application, you would send this data to a server-side script
            // using fetch() or XMLHttpRequest.
            // For example:
            // fetch('/your-server-endpoint', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         formStatus.textContent = 'Message sent successfully!';
            //         formStatus.className = 'mt-4 text-center text-green-500';
            //         contactForm.reset(); // Clear the form
            //     } else {
            //         formStatus.textContent = 'Error sending message. Please try again.';
            //         formStatus.className = 'mt-4 text-center text-red-500';
            //     }
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            //     formStatus.textContent = 'An unexpected error occurred. Please try again.';
            //     formStatus.className = 'mt-4 text-center text-red-500';
            // });

            // Simulate a delay for the "sending" message
            setTimeout(() => {
                // Simulate a successful submission for this example
                formStatus.textContent = `Thanks, ${name}! Your message has been "sent" (simulated). We'll be in touch via ${email} if needed.`;
                formStatus.className = 'mt-4 text-center text-green-400 p-3 bg-gray-700 rounded-md';
                contactForm.reset(); // Clear the form
            }, 2000); // 2-second delay
        });
    } else {
        console.warn("Contact form or form status element not found.");
    }
});

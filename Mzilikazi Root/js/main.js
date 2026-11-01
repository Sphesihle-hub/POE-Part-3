/* =========================================
   KWA-MZILAZI MAIN JAVASCRIPT (PART 3)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. LIVE MENU SEARCH FILTERING
    // =========================================
    const searchInput = document.querySelector('.search-form input[type="search"]');
    const menuItems = document.querySelectorAll('.menu-list li');

    if (searchInput && menuItems.length > 0) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            menuItems.forEach(item => {
                const dishName = item.querySelector('.dish-name') ? item.querySelector('.dish-name').textContent.toLowerCase() : '';
                const categoryText = item.textContent.toLowerCase();

                if (dishName.includes(query) || categoryText.includes(query)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // =========================================
    // 2. IMAGE LIGHTBOX GALLERY
    // =========================================
    const galleryImages = document.querySelectorAll('.menu-list img, .hero-image img');
    
    if (galleryImages.length > 0) {
        // Create lightbox modal elements dynamically
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox-modal';
        lightbox.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;

        const lightboxImg = document.createElement('img');
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 85vh;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            border: 3px solid #fff;
        `;
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);

        galleryImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.style.opacity = '1';
                lightbox.style.pointerEvents = 'auto';
            });
        });

        lightbox.addEventListener('click', () => {
            lightbox.style.opacity = '0';
            lightbox.style.pointerEvents = 'none';
        });
    }

    // =========================================
    // 3. ENQUIRY FORM VALIDATION & DYNAMIC RESPONSE
    // =========================================
    const enquiryForm = document.querySelector('.enquiry-form form');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('full-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const enquiryType = document.getElementById('enquiry-type').value;
            const message = document.getElementById('message').value.trim();

            // Validation checks
            if (fullName.length < 2) {
                alert('Please enter a valid full name.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
            return;
            }

            if (phone && !/^[0-9+\s()-]{10,}$/.test(phone)) {
                alert('Please enter a valid phone number (at least 10 digits).');
                return;
            }

            if (message.length < 5) {
                alert('Please provide a more detailed message for your enquiry.');
                return;
            }

            // Simulate AJAX processing and dynamic cost/availability response
            let responseDetails = "";
            switch (enquiryType) {
                case 'takeaway':
                    responseDetails = "Estimated preparation time: 20-30 minutes. Payment available upon collection at 43 Eloff Street.";
                    break;
                case 'catering':
                    responseDetails = "Our catering manager will review your bulk requirements and email a formal quotation within 2 hours.";
                    break;
                case 'meat-bones':
                    responseDetails = "Fresh meat bones are currently in stock at R45/kg (Beef) and R35/kg (Mixed). Ready for immediate pickup.";
                    break;
                default:
                    responseDetails = "Thank you for reaching out. Our team will review your enquiry and respond shortly.";
            }

            // Display dynamic success feedback box
            showNotification(enquiryForm, `Enquiry Sent Successfully, ${fullName}!`, responseDetails);
            enquiryForm.reset();
        });
    }

    // =========================================
    // 4. CONTACT FORM VALIDATION
    // =========================================
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 5) {
                alert('Please fill in all required contact fields correctly.');
                return;
            }

            showNotification(contactForm, `Message Compiled & Ready!`, `Thank you ${name}. Your message has been compiled into an email draft addressed to Kwa-Mzilikazi management.`);
            contactForm.reset();
        });
    }

    // Helper function for dynamic form feedback banners
    function showNotification(formElement, title, description) {
        const existingAlert = formElement.querySelector('.form-alert');
        if (existingAlert) existingAlert.remove();

        const alertBox = document.createElement('div');
        alertBox.className = 'form-alert';
        alertBox.style.cssText = `
            margin-top: 1.5rem;
            padding: 1.2rem;
            background-color: #e6fffa;
            border: 2px solid #319795;
            color: #234e52;
            border-radius: 8px;
            font-family: inherit;
            text-align: left;
        `;
        alertBox.innerHTML = `<strong>${title}</strong><p style="margin-top: 0.4rem; font-size: 0.95rem;">${description}</p>`;
        formElement.appendChild(alertBox);
    }

});

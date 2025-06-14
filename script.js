document.addEventListener('DOMContentLoaded', function() {
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const menuCloseBtn = document.getElementById('menu-close-btn');
    const layoutMenu = document.getElementById('layout-menu');
    const pageOverlay = document.getElementById('page-overlay'); // Optional: for overlay effect

    if (menuToggleBtn && layoutMenu) {
        menuToggleBtn.addEventListener('click', function() {
            layoutMenu.classList.toggle('active');
            if (pageOverlay) {
                pageOverlay.classList.toggle('active'); // Toggle overlay if it exists
            }
        });
    }

    if (menuCloseBtn && layoutMenu) {
        menuCloseBtn.addEventListener('click', function() {
            layoutMenu.classList.remove('active');
            if (pageOverlay) {
                pageOverlay.classList.remove('active'); // Hide overlay
            }
        });
    }

    // Optional: Close menu when clicking outside of it (on the overlay)
    if (pageOverlay && layoutMenu) {
        pageOverlay.addEventListener('click', function() {
            if (layoutMenu.classList.contains('active')) {
                layoutMenu.classList.remove('active');
                pageOverlay.classList.remove('active');
            }
        });
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // Get the <html> element

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                htmlElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                // If currentTheme is 'light' or null (not set)
                htmlElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });

        // Apply saved theme on load or set default
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            htmlElement.setAttribute('data-theme', savedTheme);
        } else {
            // Default to light theme if no theme is saved
            htmlElement.setAttribute('data-theme', 'light');
            // localStorage.setItem('theme', 'light'); // Optionally save default, but let user's first click decide storage
        }
    }
});
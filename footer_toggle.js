document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer');
    const closeBtn = document.querySelector('.footer_close-btn');
    
    // Sanity checks
    if (!footer || !closeBtn) {
        console.error('Footer or close button not found');
        return;
    }

    // Remove the localStorage check and always show footer
    footer.style.display = 'block';

    // Add click event listener to close button
    closeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        footer.style.display = 'none';
        // Optional: Only set localStorage if you want to remember it's hidden
        // localStorage.setItem('footerHidden', 'true');
    });

    // Global function to restore footer
    window.restoreFooter = function() {
        footer.style.display = 'block';
        // Optional: Clear the localStorage item
        // localStorage.removeItem('footerHidden');
    };
});
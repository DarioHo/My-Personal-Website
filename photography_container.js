// gallery.js
function generateImagePaths(startNumber, endNumber) {
    const images = [];
    for (let i = startNumber; i <= endNumber; i++) {
        // Convert number to 3-digit format (e.g., 1 -> 001)
        const paddedNumber = String(i).padStart(3, '0');
        images.push(`image/photography/${paddedNumber}.jpg`);
    }
    return images;
}

function createGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    
    // Generate image paths (change 1 and 50 to match your actual image range)
    const images = generateImagePaths(1, 50);
    
    // Create image elements
    images.forEach(imagePath => {
        // Create wrapper for image
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'gallery-item';
        
        // Create image element
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `Gallery Image ${imagePath}`;
        
        // Add error handling for missing images
        img.onerror = function() {
            imageWrapper.remove(); // Remove the wrapper if image doesn't exist
        };
        
        // Add click handler for full-size view
        img.addEventListener('click', () => {
            openFullSize(imagePath);
        });
        
        // Add to wrapper and gallery
        imageWrapper.appendChild(img);
        galleryContainer.appendChild(imageWrapper);
    });
}

function openFullSize(imagePath) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    const fullImage = document.createElement('img');
    fullImage.src = imagePath;
    fullImage.className = 'full-size-image';
    
    overlay.appendChild(fullImage);
    
    // Close on click
    overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    
    document.body.appendChild(overlay);
}

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', createGallery);

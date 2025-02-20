function generateImagePaths(startNumber, endNumber) {
    const images = [];
    for (let i = startNumber; i <= endNumber; i++) {
      // Convert number to 3-digit format (e.g., 1 -> 001)
      const paddedNumber = String(i).padStart(3, '0');
      images.push(`image/photography/${paddedNumber}.webp`);
    }
    return images;
  }
  
  function createGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    const fragment = document.createDocumentFragment(); // Create a fragment to hold the items
  
    // Generate image paths (adjust the range as needed)
    const images = generateImagePaths(1, 12);
  
    // Create image elements and add them to the fragment
    images.forEach(imagePath => {
      // Create wrapper for image
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'gallery-item';
  
      // Create image element with lazy loading enabled
      const img = document.createElement('img');
      img.src = imagePath;
      img.alt = `Gallery Image ${imagePath}`;
      img.loading = 'lazy'; // Enable lazy loading for performance
  
      // Remove the wrapper if the image doesn't exist
      img.onerror = function() {
        imageWrapper.remove();
      };
  
      // Add click handler for full-size view
      img.addEventListener('click', () => {
        openFullSize(imagePath);
      });
  
      imageWrapper.appendChild(img);
      fragment.appendChild(imageWrapper);
    });
  
    // Append all items to the gallery at once
    galleryContainer.appendChild(fragment);
  }
  
  function openFullSize(imagePath) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
  
    const fullImage = document.createElement('img');
    fullImage.src = imagePath;
    fullImage.className = 'full-size-image';
  
    overlay.appendChild(fullImage);
  
    // Close the overlay on click
    overlay.addEventListener('click', () => {
      document.body.removeChild(overlay);
    });
  
    document.body.appendChild(overlay);
  }
  
  // Initialize gallery when the page loads
  document.addEventListener('DOMContentLoaded', createGallery);
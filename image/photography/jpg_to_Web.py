import os
from PIL import Image

def convert_images_to_webp(folder, quality=80):
    files = os.listdir(folder)
    print("Files in folder:", files)  # Debug: list all files in the folder
    found = False
    # Loop over all files in the folder
    for filename in files:
        # Check for .jpg and .jpeg files (case-insensitive)
        if filename.lower().endswith(('.jpg', '.jpeg')):
            found = True
            file_path = os.path.join(folder, filename)
            print("Processing:", filename)
            try:
                with Image.open(file_path) as img:
                    # Create new filename with .webp extension
                    base_name = os.path.splitext(filename)[0]
                    new_filename = f"{base_name}.webp"
                    new_file_path = os.path.join(folder, new_filename)
                    # Save the image as WebP
                    img.save(new_file_path, 'WEBP', quality=quality)
                    print(f"Converted {filename} to {new_filename}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")
    
    if not found:
        print("No JPEG files found in the folder.")

if __name__ == '__main__':
    # Set the folder path to the directory where the script resides
    folder_path = os.path.dirname(os.path.abspath(__file__))
    print("Using folder:", folder_path)
    convert_images_to_webp(folder_path)
export async function uploadImageToCloudinary(file, folder = "portfolio") {
  // Validate file
  if (!file) {
    throw new Error("Please select an image file to upload.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Please select a valid image file (JPG, PNG, GIF, etc.).");
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error("Image size must be less than 5MB.");
  }

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Image upload service is not configured. Please check your environment variables (REACT_APP_CLOUDINARY_CLOUD_NAME and REACT_APP_CLOUDINARY_UPLOAD_PRESET)."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const payload = await response.json();

    if (!response.ok) {
      const errorMessage = payload.error?.message || "Image upload failed. Please try again.";
      throw new Error(errorMessage);
    }

    return payload.secure_url;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Network error. Please check your connection and try again.");
    }
    throw error;
  }
}

import axios from "axios";

const uploadImagesToCloudinary = async (files:File[]) => {
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL;
    const urls = [];
  
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset); // Add the upload preset
  
      try {
        const response = await axios.post(cloudinaryUrl, formData);
        urls.push(response.data.secure_url); // Push the secure URL to the array
      } catch (error) {
        // console.error("Error uploading image:", error);
        throw error; // Optional: Rethrow the error to handle it in the calling function
      }
    }
  
    return urls; // Return an array of image URLs
  };

  export default uploadImagesToCloudinary;
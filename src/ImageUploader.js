import React, { useState } from "react";
import axios from "axios";
function ImageUploader() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await axios.post(
        "https://api.example.com/upload",
        formData
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        {previewUrl && <img src={previewUrl} alt="Preview" />}
        <button type="submit" disabled={!image}>
          Submit
        </button>
      </form>
    </div>
  );
}
export default ImageUploader;

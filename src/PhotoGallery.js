import React, { useState } from "react";
const PhotoGallery = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const photos = [
    {
      id: 1,
      title: "Mountain View",
      imageUrl: "https://via.placeholder.com/800x600.png?text=Mountain+View"
    },
    {
      id: 2,
      title: "Beach View",
      imageUrl: "https://via.placeholder.com/800x600.png?text=Beach+View"
    },
    {
      id: 3,
      title: "City View",
      imageUrl: "https://via.placeholder.com/800x600.png?text=City+View"
    }
  ];
  const handlePrevClick = () => {
    setCurrentPhotoIndex(
      currentPhotoIndex === 0 ? photos.length - 1 : currentPhotoIndex - 1
    );
  };
  const handleNextClick = () => {
    setCurrentPhotoIndex(
      currentPhotoIndex === photos.length - 1 ? 0 : currentPhotoIndex + 1
    );
  };
  const currentPhoto = photos[currentPhotoIndex];
  return (
    <div>
      <h1>{currentPhoto.title}</h1>
      <img src={currentPhoto.imageUrl} alt={currentPhoto.title} />
      <div>
        <button onClick={handlePrevClick}>Prev</button>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
};
export default PhotoGallery;

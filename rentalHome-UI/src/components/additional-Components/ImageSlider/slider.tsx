import React, { useState } from "react";
import "./slider.css";
import { FaFortAwesome } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";

interface SliderProps {
  images?: string[]; // Array of image URLs (strings)
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  const [imageIndex, setImageIndex] = useState<number | null>(null); // For full image display



  // Handle the rotating of the 3rd image (carousel) if there are more than 2 images


  return (
    <div className="slider">
      {/* Full-screen image view when clicked */}
      {imageIndex !== null && (
        <div className="fullSlider">
          <div
            className="arrow"
            onClick={() =>
              setImageIndex((imageIndex - 1 + images.length) % images.length)
            }
          >
            <FontAwesomeIcon icon={faChevronLeft} size="2x" color="#216B9B" />
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt={`Image ${imageIndex}`} />
          </div>
          <div
            className="arrow"
            onClick={() => setImageIndex((imageIndex + 1) % images.length)}
          >
           <FontAwesomeIcon icon={faChevronRight} size="2x" color="#216B9B" />
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>
            <FontAwesomeIcon icon={faTimes} color="black"/>
          </div>
        </div>
      )}

      {/* Main large image */}
      <div className="bigImage">
        <img
          src={images[0]}
          alt="Main Image"
          onClick={() => setImageIndex(0)}
        />
      </div>

      {/* Small thumbnails */}
      <div className="smallImages">
        {/* Static thumbnails for the first 2 images */}
        {images.slice(1, 3).map((image, index) => (
          <img
            src={image}
            alt={`Thumbnail ${index + 1}`}
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}

        {/* Display the remaining images count on the last image */}
        {images.length > 3 ? (
          <div className="thumbnailWrapper">
            <img
              src={images[2]} // The 3rd image (static)
              alt="Thumbnail 3"
              onClick={() => setImageIndex(2)}
            />
            <div className="remainingImagesOverlay">
              +{images.length - 4}
            </div>
          </div>
        ) : (
          <img
            src={images[2]} // Just the 3rd static image if no extra images
            alt="Thumbnail 3"
            onClick={() => setImageIndex(2)}
          />
        )}
      </div>
    </div>
  );
};

export default Slider;

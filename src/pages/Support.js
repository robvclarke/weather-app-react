import React from 'react';
import donateImage from '../assets/Donate_Image.png'; // Update the image path as per your project structure

function Support() {
  return (
    <div className="support-page">
      <div className="support-card">
        <div className="support-card__text">
          <h1>Support Clarke Weather Inc.</h1>
          <p>
            Clarke Weather Inc. relies on support from the community to keep providing accurate and reliable weather updates. Any contributions are greatly appreciated and go towards improving our services.
          </p>
          <button className="primary-button">
            Donate Now
          </button>
        </div>
        <div className="support-card__image">
          <img src={donateImage} alt="Support Clarke Weather Inc." />
        </div>
      </div>
    </div>
  );
}

export default Support;

import React from 'react';
import PaymentForm from '../components/PaymentForm';
import donateImage from '../assets/Donate_Image.png';

function Support() {
  return (
    <div className="support-page">
      <div className="support-card">
        <div className="support-card__text">
          <h1>Support Clarke Weather Inc.</h1>
          <p>
            Clarke Weather Inc. relies on support from the community to keep providing accurate and reliable weather updates. Any contributions are greatly appreciated and go towards improving our services.
          </p>
          <PaymentForm />
        </div>
        <div className="support-card__image">
          <img src={donateImage} alt="Support Clarke Weather Inc." />
        </div>
      </div>
    </div>
  );
}

export default Support;

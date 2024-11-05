import React from "react";
import thankYouImage from "../assets/Thank_You_Image.png"; // Update the path and file name if necessary

function ThankYou() {
  return (
    <div className="thank-you-page">
      <div className="thank-you-card">
        <div className="thank-you-card__text">
          <h1>Thank You!</h1>
          <p>
            We truly appreciate your support for Clarke Weather Inc. Your
            contribution helps us continue to provide accurate and timely
            weather updates to our community. Thank you for being a part of
            our journey.
          </p>
          <p>
            Your support means a lot to us and our mission to deliver
            high-quality weather services. Together, we can help keep our
            community informed and safe.
          </p>
        </div>
        <div className="thank-you-card__image">
          <img src={thankYouImage} alt="Thank you for supporting Clarke Weather Inc." />
        </div>
      </div>
    </div>
  );
}

export default ThankYou;

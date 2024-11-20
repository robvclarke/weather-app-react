import React, { useEffect, useRef } from "react";
// Importing images for the About page
import ceoImage from "../assets/Clarke_CEO.png";
import dublinImage from "../assets/Dublin.png";
import promiseImage from "../assets/Sustainability.png";

// The About page component, where we display information about Clarke Weather Inc.
function About() {
  // Ref to keep track of the cards for the IntersectionObserver
  const cardRefs = useRef([]);

  // useEffect hook to initialize the IntersectionObserver for fading in/out elements as they enter/exit the viewport
  useEffect(() => {
    // IntersectionObserver to track visibility of each section card
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When the element is in view, add 'fade-in' and remove 'fade-out'
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            entry.target.classList.remove("fade-out");
          } else {
            // When the element is not in view, add 'fade-out' and remove 'fade-in'
            entry.target.classList.remove("fade-in");
            entry.target.classList.add("fade-out");
          }
        });
      },
      { threshold: 0.1 } // Trigger observer when 10% of the element is in view
    );

    // Attach the observer to each reference in the cardRefs array
    cardRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    // Cleanup the observer when the component is unmounted or updated
    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  // Rendering the About page content
  return (
    <div className="about-page">
      {/* Section 1: About Clarke Weather Inc. */}
      <div
        className="about-card fade-out" // Initially hidden, will fade in as it enters the viewport
        data-index="0" // Used to reference the card in the IntersectionObserver
        ref={(el) => (cardRefs.current[0] = el)} // Setting up the reference for the observer
      >
        <div className="about-card__text">
          <h1>About Clarke Weather Inc.</h1>
          {/* About the company */}
          <p>
            Clarke Weather Inc. is a family-run weather company based in Dublin,
            Ireland. Founded in 1991 by visionary CEO Robert Clarke, the company started
            as a small local business providing weather updates to farmers and
            fishermen in the community. Over the years, it has grown into a
            trusted source of weather information for the entire region and indeed the world.
          </p>
          {/* Continuation of the company’s story */}
          <p>
            Our journey began with a single weather station in our backyard.
            From there, our passion for meteorology and our dedication to our
            community helped us expand.
          </p>
        </div>
        <div className="about-card__image">
          {/* Image of the CEO */}
          <img src={ceoImage} alt="CEO of Clarke Weather Inc." loading="lazy"/>
        </div>
      </div>

      {/* Section 2: Company Mission */}
      <div
        className="about-card fade-out"
        data-index="1"
        ref={(el) => (cardRefs.current[1] = el)} // Reference for the second card
      >
        <div className="about-card__text">
          <h1>Our Mission</h1>
          {/* Mission statement */}
          <p>
            At Clarke Weather Inc., our mission is to promote sustainability and
            support local communities through accurate weather forecasting. 
          </p>
          <p>
            We strive to use our platform to educate the public about climate
            change and its impact on our environment.
          </p>
        </div>
        <div className="about-card__image">
          {/* Image representing Dublin */}
          <img src={dublinImage} alt="Dublin, Ireland" loading="lazy" />
        </div>
      </div>

      {/* Section 3: Our Promise */}
      <div
        className="about-card fade-out"
        data-index="2"
        ref={(el) => (cardRefs.current[2] = el)} // Reference for the third card
      >
        <div className="about-card__text">
          <h1>Our Promise</h1>
          {/* Promise of sustainability, diversity, and inclusion */}
          <p>
            At Clarke Weather Inc., we are committed to fostering diversity,
            inclusion, and sustainability in everything we do. 
          </p>
          <p>
            Sustainability is at the heart of our business. We are constantly
            exploring new ways to reduce our carbon footprint and make our
            operations more eco-friendly.
          </p>
        </div>
        <div className="about-card__image">
          {/* Image representing sustainability */}
          <img src={promiseImage} alt="A bird flying over a beach" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

export default About;

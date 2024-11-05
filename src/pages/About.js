import React, { useEffect, useRef } from "react";
import ceoImage from "../assets/Clarke_CEO.png";
import dublinImage from "../assets/Dublin.png";

function About() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            entry.target.classList.remove("fade-out");
          } else {
            entry.target.classList.remove("fade-in");
            entry.target.classList.add("fade-out");
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <div className="about-page" style={{ backgroundColor: "#74FAFF" }}>
      <div
        className="about-card fade-out"
        ref={(el) => (cardRefs.current[0] = el)}
        style={{ marginTop: "100px" }}
      >
        <div className="about-card__text">
          <h1>About Clarke Weather Inc.</h1>
          <p>
            Clarke Weather Inc. is a family-run weather company based in Dublin,
            Ireland. Founded in 1980 by the Clarke family, the company started
            as a small local business providing weather updates to farmers and
            fishermen in the community. Over the years, it has grown into a
            trusted source of weather information for the entire region. With a
            commitment to accuracy and community, Clarke Weather Inc. remains
            dedicated to serving the people of Dublin with reliable weather
            forecasts and updates.
          </p>
        </div>
        <div className="about-card__image">
          <img src={ceoImage} alt="CEO of Clarke Weather Inc." />
        </div>
      </div>

      <div
        className="about-card fade-out"
        ref={(el) => (cardRefs.current[1] = el)}
        style={{ marginTop: "50px" }}
      >
        <div className="about-card__text">
          <h1>Our Mission</h1>
          <p>
            At Clarke Weather Inc., our mission is to promote sustainability and
            support local communities through accurate weather forecasting. We
            believe that local weather companies play a vital role in modern
            Ireland by providing specialized, community-focused services that
            larger corporations cannot. By staying true to our roots and
            focusing on the needs of our community, we aim to help people make
            informed decisions that contribute to a sustainable future.
          </p>
        </div>
        <div className="about-card__image">
          <img src={dublinImage} alt="Dublin, Ireland" />
        </div>
      </div>
    </div>
  );
}

export default About;

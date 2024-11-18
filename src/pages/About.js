import React, { useEffect, useRef } from "react";
import ceoImage from "../assets/Clarke_CEO.png";
import dublinImage from "../assets/Dublin.png";
import promiseImage from "../assets/Sustainability.png";

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
    <div className="about-page">
      <div
        className="about-card fade-out"
        data-index="0"
        ref={(el) => (cardRefs.current[0] = el)}
      >
        <div className="about-card__text">
          <h1>About Clarke Weather Inc.</h1>
          <p>
            Clarke Weather Inc. is a family-run weather company based in Dublin,
            Ireland. Founded in 1991 by visionary CEO Robert Clarke, the company started
            as a small local business providing weather updates to farmers and
            fishermen in the community. Over the years, it has grown into a
            trusted source of weather information for the entire region and indeed the world. With a
            commitment to accuracy and community, Clarke Weather Inc. remains
            dedicated to serving the people of Dublin and the wider global community with reliable weather
            forecasts and updates.
          </p>
          <p>
            Our journey began with a single weather station in our backyard.
            From there, our passion for meteorology and our dedication to our
            community helped us expand. We believe that accurate, timely weather
            information can make a real difference in people's lives, from
            helping farmers with crop decisions to ensuring safety during
            extreme weather events.
          </p>
        </div>
        <div className="about-card__image">
          <img src={ceoImage} alt="CEO of Clarke Weather Inc." loading="lazy"/>
        </div>
      </div>

      <div
        className="about-card fade-out"
        data-index="1"
        ref={(el) => (cardRefs.current[1] = el)}
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
          <p>
            We strive to use our platform to educate the public about climate
            change and its impact on our environment. Our forecasts not only
            help people plan their days but also help communities prepare for
            extreme weather, reducing the risk of damage and ensuring safety for
            all.
          </p>
        </div>
        <div className="about-card__image">
          <img src={dublinImage} alt="Dublin, Ireland" loading="lazy" />
        </div>
      </div>

      <div
        className="about-card fade-out"
        data-index="2"
        ref={(el) => (cardRefs.current[2] = el)}
      >
        <div className="about-card__text">
          <h1>Our Promise</h1>
          <p>
            At Clarke Weather Inc., we are committed to fostering diversity,
            inclusion, and sustainability in everything we do. We believe that
            our strength lies in our people, and we are dedicated to creating an
            environment where everyone feels valued and respected. Our team
            reflects the diverse community we serve, and we strive to ensure
            that every voice is heard.
          </p>
          <p>
            Sustainability is at the heart of our business. We are constantly
            exploring new ways to reduce our carbon footprint and make our
            operations more eco-friendly. From using renewable energy to power
            our offices to reducing waste through thoughtful practices, we are
            dedicated to making a positive impact on the planet.
          </p>
        </div>
        <div className="about-card__image">
          <img src={promiseImage} alt="A bird flying over a beach" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

export default About;

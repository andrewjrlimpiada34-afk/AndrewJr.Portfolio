import React from "react";
import Particles from "react-tsparticles";

function Particle() {
  return (
    <Particles
      id="tsparticles"
      params={{
        particles: {
          number: {
            value: 70,
            density: {
              enable: true,
              value_area: 1800,
            },
          },
          line_linked: {
            enable: false,
          },
          move: {
            enable: true,
            direction: "none",
            random: true,
            speed: 0.08,
            straight: false,
            out_mode: "out",
          },
          size: {
            value: 1.4,
            random: true,
          },
          opacity: {
            value: 0.55,
            anim: {
              enable: true,
              speed: 0.8,
              opacity_min: 0.15,
              sync: false,
            },
          },
          color: {
            value: ["#ffffff", "#d9ecff", "#b7d8ff"],
          },
        },
        interactivity: {
          events: {
            onclick: {
              enable: false,
            },
            onhover: {
              enable: false,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
}

export default Particle;

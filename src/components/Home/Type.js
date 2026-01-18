import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Software Engineer",
          "Full Stack Developer",
          "AI & ML Enthusiast",
          "Cloud & DevOps Engineer",
          "Open Source Contributor",
          "Creative Problem Solver",
          "Tech Innovation Driver",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 40,
        delay: 80,
      }}
    />
  );
}

export default Type;

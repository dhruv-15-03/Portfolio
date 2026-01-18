import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Full Stack Developer",
          "AI & Machine Learning Engineer",
          "Deep Learning Specialist",
          "Cloud Solutions Architect",
          "Generative AI Developer",
          "Data Science Enthusiast",
          "Open Source Contributor",
          "LLM & NLP Practitioner",
          "DevOps Engineer",
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

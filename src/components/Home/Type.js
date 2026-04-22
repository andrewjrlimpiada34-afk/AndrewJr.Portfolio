import React from "react";
import Typewriter from "typewriter-effect";
import { usePortfolio } from "../../context/PortfolioContext";

function Type() {
  const { homeContent } = usePortfolio();

  return (
    <Typewriter
      options={{
        strings: homeContent.roleLines,
        autoStart: true,
        loop: true,
        deleteSpeed: 40,
      }}
    />
  );
}

export default Type;

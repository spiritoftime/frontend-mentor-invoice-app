import React from "react";
import { useState, useEffect } from "react";
const useViewPort = () => {
  const [width, setWidth] = React.useState(window.screen.width);
  useEffect(() => {
    const checkWindowSize = () => setWidth(window.screen.width);
    window.addEventListener("resize", checkWindowSize);
    return () => window.removeEventListener("resize", checkWindowSize);
  }, []);
  return width;
};

export default useViewPort;

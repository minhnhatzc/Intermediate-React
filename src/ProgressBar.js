import React, { useState, useEffect } from "react";
const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(intervalId);
          return prevProgress;
        }
        return prevProgress + 10;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <h1>Progress: {progress}%</h1>
      <div style={{ width: "100%", height: "30px", backgroundColor: "#ccc" }}>
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "blue"
          }}
        ></div>
      </div>
    </div>
  );
};
export default ProgressBar;

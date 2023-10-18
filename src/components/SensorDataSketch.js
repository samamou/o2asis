import React from 'react';
import P5 from 'react-p5';

export default function AirQualitySketch({ sensorData }) {
  const setup = (p, canvasParentRef) => {
    p.createCanvas(500, 500).parent(canvasParentRef);
    p.colorMode(p.HSB, 360, 100, 100);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(17);
  };

  const getColorForSensorValue = (sensorName, value) => {
    // Define color ranges (green, yellow, red) for different sensor types
    const colorRanges = {
      ftTemp: { good: [0, 25], moderate: [25, 35], unhealthy: [35, Infinity] },
      gbHum: { good: [30, 60], moderate: [15, 30], unhealthy: [0, 15] },
      gbTemp: { good: [18, 24], moderate: [24, 30], unhealthy: [30, Infinity] },
      Moist: { good: [300, 700], moderate: [100, 300], unhealthy: [700, Infinity] },
      pH: { good: [6, 7.5], moderate: [4, 6], unhealthy: [7.5, 10] },
    };

    const range = colorRanges[sensorName];
    if (!range) return [0, 0, 100]; // Default color (white) if sensor not defined

    if (value >= range.good[0] && value <= range.good[1]) return [120, 50, 90];
    if (value >= range.moderate[0] && value <= range.moderate[1]) return [60, 50, 90];
    return [0, 50, 90];
  };

  const draw = (p) => {
    p.clear(); // Transparent background

    // Filter out invalid sensor values
    const filteredSensorData = Object.entries(sensorData).filter(
      ([key, value]) => value !== -1 && value !== -127
    );

    // Calculate starting xPos and yOffset to center the sketch
    const xOffset = 100;
    const xPosStart = (p.width - (filteredSensorData.length - 1) * xOffset) / 2.5;
    const yPos = p.height / 4;

    let xPos = xPosStart;
    filteredSensorData.forEach(([sensorName, value]) => {
      const color = getColorForSensorValue(sensorName, value);
      const r = 50;

      // Draw the circle with a 3D effect using radial gradient shading
      p.push();
      p.noStroke();
      for (let i = r; i > 0; i -= 2) {
        const gradientColor = p.color(...color, (i / r) * 255);
        p.fill(gradientColor);
        p.ellipse(xPos, yPos, i);
      }
      p.pop();

      // Draw the sensor name below the circle
      p.push();
      p.fill(0, 0, 0); // Text color (black)
      p.text(sensorName, xPos, yPos + 50); // Draw sensor name centered below the circle
      p.pop();
      xPos += xOffset; // Space between circles
    });
  };

  return <P5 setup={setup} draw={draw} />;
}




// old sketch: 

// import React from 'react';
// import P5 from 'react-p5';

// export default function SensorDataSketch({ sensorData }) {
//   const setup = (p, canvasParentRef) => {
//     p.createCanvas(1500, 500).parent(canvasParentRef);
//   };

//   const draw = (p) => {
//     p.background(255);

//     if (sensorData) {
//       let xPos = 30;
//       const yPos = p.height / 2;

//       const values = Object.values(sensorData);
//       const minValue = Math.min(...values);
//       const maxValue = Math.max(...values);
//       const circleSizeMultiplier = 5;

//       p.textSize(16);
//       p.noStroke();

//       Object.entries(sensorData).forEach(([key, value]) => {
//         const circleSize = value * circleSizeMultiplier;
//         p.fill(100);
//         p.text(key, xPos, yPos - circleSize / 2 - 10);

//         p.fill(0, 100, 200, 150);
//         p.ellipse(xPos, yPos, circleSize, circleSize);

//         xPos += circleSize + 30;
//       });
//     }
//   };

//   return <P5 setup={setup} draw={draw} />;
// }

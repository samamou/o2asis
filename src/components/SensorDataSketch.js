import React from 'react';
import P5 from 'react-p5';

// SensorDataSketch component receives sensor data and visualizes it using p5.js
export default function SensorDataSketch({ sensorData }) {
  // Calculate the number of sensors and the angle increment for positioning
  const numSensors = Object.keys(sensorData).length;
  const angleIncrement = 360 / numSensors;
  let time = 0;

  // Setup function initializes the p5.js sketch
  const setup = (p, canvasParentRef) => {
    p.createCanvas(700, 700, p.WEBGL).parent(canvasParentRef);
    p.colorMode(p.HSB, 360, 100, 100);
    p.noStroke();
  };

  // Rotation angle for the camera
  let rotationAngle = 100;

  // Draw function renders the visualization
  const draw = (p) => {
    // Set background color and ambient light
    p.background("#f5f7f9");
    p.background(255);
    p.ambientLight(60);


    // Set camera position and orientation
    p.camera(50, 50, 1000, 0, 0, 0, 0, 1, 0);

    // Rotate the sketch around the Y-axis
    p.rotateY(p.radians(rotationAngle));

    // If sensor data is available, render the visualization
    if (sensorData) {
      let angle = 0;

      // Iterate through each sensor value and create a floating orb for each
      Object.entries(sensorData).forEach(([key, value]) => {
        // Calculate the position, size, and color of the orb based on the sensor value
        const radius = p.map(value, 0, 100, 50, 200);
        const x = radius * p.cos(p.radians(angle)) + p.map(p.noise(time + angle * 0.1), 0, 1, -10, 10);
        const y = radius * p.sin(p.radians(angle)) + p.map(p.noise(time + angle * 0.1 + 1000), 0, 1, -10, 10);
        const z = p.map(value, 0, 100, -100, 100) + p.map(p.noise(time + angle * 0.1 + 2000), 0, 1, -10, 10);
        const sphereSize = p.map(value, 0, 100, 15, 40);
        const hue = p.map(value, 0, 60, 0, 120);

        // Draw the orb
        p.push();
        p.translate(x, y, z);
        p.specularMaterial(hue, 100, 100); // Use specularMaterial for a glossy appearance
        p.sphere(sphereSize);
        p.pop();

        // Increment the angle for the next orb
        angle += angleIncrement;
      });
    }

    // Update the rotation angle and time
    rotationAngle += 0.3;
    time += 0.03;
  };

  return <P5 setup={setup} draw={draw} />;
}

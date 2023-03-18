import React from 'react';
import P5 from 'react-p5';

export default function SensorDataSketch({ sensorData }) {
  const radius = 200;
  const numSensors = Object.keys(sensorData).length;
  const angleIncrement = 360 / numSensors;
  let rotationAngle = 0;
  let rotationSpeed = 0.5;
  let drag = false;

  const setup = (p, canvasParentRef) => {
    p.createCanvas(1000, 600, p.WEBGL).parent(canvasParentRef);
  };

  const draw = (p) => {
    p.background(255);
    p.rotateY(p.radians(rotationAngle));

    if (sensorData) {
      let angle = 0;

      Object.entries(sensorData).forEach(([key, value]) => {
        const x = radius * p.cos(p.radians(angle));
        const y = radius * p.sin(p.radians(angle));
        const z = 0;

        // Map the sensor value to a smaller range for the sphere size
        const sphereSize = p.map(value, 0, 100, 5, 50);

        p.push();
        p.translate(x, y, z);

        // Set the color based on the sphere size
        const colorValue = p.map(sphereSize, 5, 50, 0, 255);
        p.fill(p.lerpColor(p.color(255, 0, 0), p.color(0, 255, 0), colorValue / 255));

        // No stroke for the spheres
        p.noStroke();

        p.sphere(sphereSize / 2);
        p.pop();

        angle += angleIncrement;
      });
    }

    // Update rotation angle
    if (!drag) {
      rotationAngle += rotationSpeed;
    }
  };

  const mousePressed = (p) => {
    drag = true;
  };

  const mouseReleased = (p) => {
    drag = false;
  };

  const mouseDragged = (p) => {
    if (drag) {
      rotationAngle += p.movedX * 0.5;
    }
  };

  return (
    <P5
      setup={setup}
      draw={draw}
      mousePressed={mousePressed}
      mouseReleased={mouseReleased}
      mouseDragged={mouseDragged}
    />
  );
}

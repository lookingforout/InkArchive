import React, { useEffect, useRef, useState } from 'react';
import styles from './colorwheel.module.css';

const ColorWheel = ({ onColorChange }) => {
  const hueRingRef = useRef(null);
  const squareGradientRef = useRef(null);
  const huePickerRef = useRef(null);
  const satValPickerRef = useRef(null);

  const [hue, setHue] = useState(0);
  const [sat, setSat] = useState(1);
  const [val, setVal] = useState(1);
  const [hex, setHex] = useState('#ffffff');

  useEffect(() => {
    updateSquareGradient();
    positionHuePicker(hue);
    positionSatValPicker(sat, val);
    updateColorDisplay();
  }, []);

  useEffect(() => {
    updateSquareGradient();
    updateColorDisplay();
    if (onColorChange) onColorChange(hex);
  }, [hue, sat, val]);

  const hsvToRgb = (h, s, v) => {
    let r, g, b;
    const i = Math.floor(h / 60) % 6;
    const f = h / 60 - Math.floor(h / 60);
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  };

  const rgbToHex = (r, g, b) => '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  const positionHuePicker = (degrees) => {
    const ring = hueRingRef.current;
    const radius = ring.offsetWidth / 2;
    const innerRadius = radius * 0.85;
    const radians = degrees * (Math.PI / 180);
    huePickerRef.current.style.left = `${radius + innerRadius * Math.cos(radians)}px`;
    huePickerRef.current.style.top = `${radius + innerRadius * Math.sin(radians)}px`;
  };

  const positionSatValPicker = (saturation, value) => {
    const gradient = squareGradientRef.current;
    const x = saturation * gradient.offsetWidth;
    const y = (1 - value) * gradient.offsetHeight;
    satValPickerRef.current.style.left = `${gradient.offsetLeft + x}px`;
    satValPickerRef.current.style.top = `${gradient.offsetTop + y}px`;
  };

  const updateSquareGradient = () => {
    const { r, g, b } = hsvToRgb(hue, 1, 1);
    const hueHex = rgbToHex(r, g, b);
    squareGradientRef.current.style.background = `
      linear-gradient(to bottom, rgba(0,0,0,0), black),
      linear-gradient(to right, white, ${hueHex})
    `;
  };

  const updateColorDisplay = () => {
    const { r, g, b } = hsvToRgb(hue, sat, val);
    const newHex = rgbToHex(r, g, b);
    setHex(newHex);
  };

  const handleHueChange = (e) => {
    const rect = hueRingRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    let degrees = (angle * (180 / Math.PI) + 360) % 360;
    setHue(degrees);
    positionHuePicker(degrees);
  };

  const handleSatValChange = (e) => {
    const rect = squareGradientRef.current.getBoundingClientRect();
    let saturation = (e.clientX - rect.left) / rect.width;
    let value = 1 - (e.clientY - rect.top) / rect.height;
    setSat(Math.min(1, Math.max(0, saturation)));
    setVal(Math.min(1, Math.max(0, value)));
    positionSatValPicker(saturation, value);
  };

  const handleDrag = (callback) => (e) => {
    callback(e);
    const moveListener = (ev) => callback(ev);
    const upListener = () => {
      document.removeEventListener('mousemove', moveListener);
      document.removeEventListener('mouseup', upListener);
    };
    document.addEventListener('mousemove', moveListener);
    document.addEventListener('mouseup', upListener);
  };

  return (
    <div className={styles.colorPickerWrapper}>
      <div id="colorPickerContainer" className={styles.colorPickerContainer}>
        <div ref={hueRingRef} className={styles.hueRing} onMouseDown={handleDrag(handleHueChange)} />
        <div className={styles.innerMask} />
        <div
          ref={squareGradientRef}
          className={styles.squareGradient}
          onMouseDown={handleDrag(handleSatValChange)}
        />
        <div ref={huePickerRef} className={styles.huePicker} />
        <div ref={satValPickerRef} className={styles.satValPicker} />
        <div className={styles.colorIndicator} style={{ backgroundColor: hex }} />
        <div className={styles.hexDisplay}>{hex.toUpperCase()}</div>
      </div>
    </div>
  );
};

export default ColorWheel;

import { useState, useCallback } from 'react';

export function useTweaks(defaults) {
  const [t, setT] = useState(defaults);
  const setTweak = useCallback((k, v) => setT((prev) => ({ ...prev, [k]: v })), []);
  return [t, setTweak];
}

export function TweaksPanel() { return null; }
export function TweakSection() { return null; }
export function TweakRadio() { return null; }
export function TweakSlider() { return null; }
export function TweakColor() { return null; }
export function TweakToggle() { return null; }

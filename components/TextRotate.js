import { useState, useEffect } from 'react';

/**
 * TextRotate  pure React/CSS, no external libraries needed.
 * Shows one word at a time, animating in from below and out upward.
 */
export default function TextRotate({ texts, interval = 2000, className = '' }) {
  const [index, setIndex] = useState(0);
  const [animState, setAnimState] = useState('visible'); // 'visible' | 'exit' | 'enter'

  useEffect(() => {
    const cycle = setInterval(() => {
      // 1. slide out upward
      setAnimState('exit');
      setTimeout(() => {
        // 2. switch text while invisible, snap to bottom
        setIndex(i => (i + 1) % texts.length);
        setAnimState('enter');
        // 3. slide in from below
        setTimeout(() => setAnimState('visible'), 20);
      }, 280);
    }, interval);
    return () => clearInterval(cycle);
  }, [texts.length, interval]);

  const style = {
    display: 'inline-block',
    transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease',
    transform:
      animState === 'exit'   ? 'translateY(-110%)' :
      animState === 'enter'  ? 'translateY(80%)'   :
                               'translateY(0)',
    opacity: animState === 'visible' ? 1 : 0,
  };

  return (
    <span
      className={className}
      style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'middle' }}
    >
      <span style={style}>{texts[index]}</span>
    </span>
  );
}

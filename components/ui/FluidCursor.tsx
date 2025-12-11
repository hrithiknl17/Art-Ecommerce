
import React, { useEffect, useRef } from 'react';

const FluidCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement[]>([]);
  const coords = useRef({ x: 0, y: 0 });
  const circles = Array.from({ length: 20 }); // Number of droplets in the trail

  useEffect(() => {
    // Initial mouse position
    coords.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      coords.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    
    const trailPositions = circles.map(() => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }));
    
    const animateTrail = () => {
      let x = coords.current.x;
      let y = coords.current.y;

      trailPositions.forEach((pos, index) => {
        // Leader follows mouse, followers follow leader
        const targetX = index === 0 ? x : trailPositions[index - 1].x;
        const targetY = index === 0 ? y : trailPositions[index - 1].y;
        
        // Easing factor (lower = slower fluid, higher = tighter)
        const ease = index === 0 ? 1 : 0.35; 
        
        pos.x += (targetX - pos.x) * ease;
        pos.y += (targetY - pos.y) * ease;

        const circle = circlesRef.current[index];
        if (circle) {
           const scale = Math.max(0.1, (circles.length - index) / circles.length); // Taper effect
           circle.style.transform = `translate(${pos.x - 10}px, ${pos.y - 10}px) scale(${scale})`;
        }
      });

      animationFrameId = requestAnimationFrame(animateTrail);
    };

    animateTrail();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* CSS Filter definition for the Gooey Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="fluid-metal">
            {/* Blur the shapes together */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            {/* Increase contrast to make edges sharp again (Gooey effect) */}
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div 
        ref={cursorRef}
        className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
        style={{ filter: 'url(#fluid-metal)' }}
      >
        {circles.map((_, i) => (
          <div
            key={i}
            ref={(el) => {
                if (el) circlesRef.current[i] = el;
            }}
            className="absolute w-6 h-6 rounded-full"
            style={{
              // Liquid Gold Gradient styling
              background: 'radial-gradient(circle at 30% 30%, #FFD700, #C5A059, #8B4513)',
              boxShadow: '0 0 15px rgba(197, 160, 89, 0.6)',
              willChange: 'transform',
              opacity: 0.9
            }}
          />
        ))}
      </div>
    </>
  );
};

export default FluidCursor;

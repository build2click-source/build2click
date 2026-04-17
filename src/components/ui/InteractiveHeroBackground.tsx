'use client';

import { useEffect, useRef } from 'react';

interface Shape {
  x: number;
  y: number;
  size: number;
  type: string;
  depth: number;
  speedY: number;
  rotation: number;
  rotSpeed: number;
  colorAlpha: number;
  vx: number;
  vy: number;
}

interface ClickWave {
  x: number;
  y: number;
  radius: number;
  opacity: number;
}

export default function InteractiveHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let shapes: Shape[] = [];
    let clickWaves: ClickWave[] = [];
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const initShapes = () => {
      if (!canvas) return;
      shapes = [];
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      const shapeTypes = ['circle', 'square', 'bracket', 'chart'];
      const numberOfShapes = Math.floor(window.innerWidth > 768 ? 35 : 15);

      for (let i = 0; i < numberOfShapes; i++) {
        const depth = Math.random();
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: (Math.random() * 20 + 10) * (depth + 0.5),
          type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
          depth: depth,
          speedY: -(Math.random() * 0.5 + 0.2) * (depth + 0.5),
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.02,
          colorAlpha: depth * 0.3 + 0.1,
          vx: 0,
          vy: 0,
        });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = (event.clientX - rect.left) - canvas.width / 2;
      mouse.targetY = (event.clientY - rect.top) - canvas.height / 2;
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    const handleClick = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      clickWaves.push({ x: clickX, y: clickY, radius: 0, opacity: 0.8 });

      shapes.forEach((s) => {
        const dx = s.x - clickX;
        const dy = s.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
          const force = (300 - dist) / 300;
          s.vx = (dx / dist) * force * 15 * (s.depth + 0.5);
          s.vy = (dy / dist) * force * 15 * (s.depth + 0.5);
        }
      });
    };

    window.addEventListener('resize', initShapes);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('click', handleClick);

    initShapes();

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      clickWaves.forEach((wave, i) => {
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(197, 160, 89, ${wave.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        wave.radius += 12;
        wave.opacity -= 0.015;
        if (wave.opacity <= 0) clickWaves.splice(i, 1);
      });

      shapes.forEach((s) => {
        s.y += s.speedY + s.vy;
        s.x += s.vx;
        s.rotation += s.rotSpeed;
        s.vx *= 0.92;
        s.vy *= 0.92;

        if (s.y + s.size < -50) {
          s.y = canvas.height + 50;
          s.x = Math.random() * canvas.width;
        }

        const parallaxX = s.x - (mouse.x * s.depth * 0.05);
        const parallaxY = s.y - (mouse.y * s.depth * 0.05);

        ctx.save();
        ctx.translate(parallaxX, parallaxY);
        ctx.rotate(s.rotation);
        ctx.strokeStyle = `rgba(197, 160, 89, ${s.colorAlpha})`;
        ctx.lineWidth = 1.5;

        if (s.type === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, s.size, 0, Math.PI * 2);
          ctx.stroke();
        } else if (s.type === 'square') {
          ctx.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size);
        } else if (s.type === 'bracket') {
          ctx.beginPath();
          ctx.moveTo(s.size * 0.3, -s.size);
          ctx.lineTo(-s.size * 0.2, -s.size);
          ctx.lineTo(-s.size * 0.2, -s.size * 0.2);
          ctx.lineTo(-s.size * 0.6, 0);
          ctx.lineTo(-s.size * 0.2, s.size * 0.2);
          ctx.lineTo(-s.size * 0.2, s.size);
          ctx.lineTo(s.size * 0.3, s.size);
          ctx.stroke();
        } else if (s.type === 'chart') {
          ctx.strokeRect(-s.size * 0.8, 0, s.size * 0.4, s.size);
          ctx.strokeRect(-s.size * 0.2, -s.size * 0.5, s.size * 0.4, s.size * 1.5);
          ctx.strokeRect(s.size * 0.4, -s.size * 0.2, s.size * 0.4, s.size * 1.2);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', initShapes);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}

"use client";

import { useEffect, useRef } from "react";

/** Tracks mouse position for the CSS glow and renders trailing golden pollen particles. */
export default function MouseGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Disable entirely if no hover capability OR on mobile/tablet viewport sizes
    const hasPointer = window.matchMedia("(hover: hover)").matches;
    if (!hasPointer) return;
    if (window.innerWidth < 1024) return;

    /* --- Smoothed Mouse Tracker --- */
    const root = document.documentElement;
    let isActive = false;
    
    // Target coordinates the mouse is actually at
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    
    // Lerped (smoothed) coordinates that chase the target
    let currentX = targetX;
    let currentY = targetY;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isActive) {
        isActive = true;
        root.style.setProperty("--mouse-active", "1");
      }
    };

    const onLeave = () => {
      isActive = false;
      root.style.setProperty("--mouse-active", "0");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    /* --- Golden Pollen Particle System --- */
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", onResize, { passive: true });

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      
      constructor(x: number, y: number) {
        this.x = x + (Math.random() - 0.5) * 40;
        this.y = y + (Math.random() - 0.5) * 40;
        // Smooth floating physics
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 1.2 - 0.3; // Gentle upward drift 
        this.maxLife = Math.random() * 40 + 30; // Slightly shorter life for cleaner trails
        this.life = this.maxLife;
        this.size = Math.random() * 2 + 0.5;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        const alpha = Math.max(0, this.life / this.maxLife);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 171, 0, ${alpha * 0.4})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 180, ${alpha * 0.9})`;
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    let animationFrameId: number;
    let lastSpawnTime = 0;

    const render = (time: number) => {
      // Dynamic mobile/tablet kill switch during resize
      if (window.innerWidth < 1024) {
        ctx.clearRect(0, 0, width, height);
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Buttery smooth (lerp) mouse tracking for the CSS spotlight
      currentX += (targetX - currentX) * 0.15; // 0.15 controls the smoothness/chase speed
      currentY += (targetY - currentY) * 0.15;
      root.style.setProperty("--mouse-x", `${currentX}px`);
      root.style.setProperty("--mouse-y", `${currentY}px`);

      ctx.clearRect(0, 0, width, height);

      // Spawn new particles smoothly alongside the lerped cursor
      // time limiter prevents huge clumps on high refresh rate monitors
      if (isActive && time - lastSpawnTime > 30) {
        particles.push(new Particle(currentX, currentY));
        if (Math.random() > 0.5) particles.push(new Particle(currentX, currentY));
        lastSpawnTime = time;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.life <= 0) {
          particles.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[-3] hidden lg:block"
      style={{ filter: "blur(0.5px)" }}
      aria-hidden="true"
    />
  );
}
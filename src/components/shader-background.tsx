import { useEffect, useRef } from "react";

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchPhone = window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 768;
    if (shouldReduceMotion || isTouchPhone) {
      canvas.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with easing
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Color definitions
    const primaryOrbColor = "rgba(200, 16, 46, 0.08)"; // Crimson
    const secondaryOrbColor = "rgba(212, 175, 55, 0.05)"; // Gold/Amber
    const tertiaryOrbColor = "rgba(7, 17, 31, 0.2)"; // Deep Navy base

    // Glow Orbs definition
    const orbs = [
      { x: width * 0.2, y: height * 0.3, vx: 0.2, vy: 0.15, radius: 350, color: primaryOrbColor },
      { x: width * 0.8, y: height * 0.7, vx: -0.15, vy: 0.2, radius: 400, color: secondaryOrbColor },
      { x: width * 0.5, y: height * 0.5, vx: 0.1, vy: -0.1, radius: 450, color: "rgba(30, 58, 138, 0.06)" }, // Deep Blue
    ];

    const render = () => {
      // Clear with very dark slate/navy base
      ctx.fillStyle = "#04090F";
      ctx.fillRect(0, 0, width, height);

      // Ease mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Draw glowing background orbs
      orbs.forEach((orb) => {
        // Move orbs
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce on boundaries
        if (orb.x < 0 || orb.x > width) orb.vx *= -1;
        if (orb.y < 0 || orb.y > height) orb.vy *= -1;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, "rgba(4, 9, 15, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw mouse-interactive spotlight
      const mouseGradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300);
      mouseGradient.addColorStop(0, "rgba(200, 16, 46, 0.04)"); // Very soft crimson glow
      mouseGradient.addColorStop(0.5, "rgba(212, 175, 55, 0.01)"); // Golden tint
      mouseGradient.addColorStop(1, "rgba(4, 9, 15, 0)");

      ctx.fillStyle = mouseGradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 300, 0, Math.PI * 2);
      ctx.fill();

      // Render subtle organic noise/grain texture
      const bufferSize = 128;
      const noiseBuffer = ctx.createImageData(bufferSize, bufferSize);
      const data = noiseBuffer.data;
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.floor(Math.random() * 15); // subtle grain intensity
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 4; // Alpha channel (low transparency for subtle overlay)
      }

      // Draw grain pattern tiled across the canvas
      for (let x = 0; x < width; x += bufferSize) {
        for (let y = 0; y < height; y += bufferSize) {
          ctx.putImageData(noiseBuffer, x, y, 0, 0, Math.min(bufferSize, width - x), Math.min(bufferSize, height - y));
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />;
}

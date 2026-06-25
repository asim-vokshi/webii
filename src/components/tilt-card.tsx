import React from "react";
import { motion } from "framer-motion";
import { useTilt } from "@/hooks/use-tilt";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 10,
  perspective = 1000,
  ...props
}: TiltCardProps) {
  const tiltRef = useTilt(maxTilt, perspective);

  return (
    <div
      ref={tiltRef}
      className={`relative rounded-3xl overflow-hidden transition-all duration-300 will-change-transform ${className}`}
      style={{
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      {/* 3D Depth Layer for Children */}
      <div 
        style={{ 
          transform: "translateZ(20px)",
          transformStyle: "preserve-3d"
        }}
        className="w-full h-full"
      >
        {children}
      </div>
    </div>
  );
}

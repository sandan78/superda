import { useEffect, useRef } from "react";

interface ParticleBackgroundProps {
  theme?: "ocean" | "forest" | "sunset" | "minimal";
}

export const ParticleBackground = ({ theme = "minimal" }: ParticleBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Theme color mapping
  const getThemeColor = () => {
    switch (theme) {
      case "ocean":
        return "#06b6d4"; // enhanced cyan
      case "forest":
        return "#10b981"; // enhanced emerald
      case "sunset":
        return "#f97316"; // enhanced orange
      default:
        return "#8b5cf6"; // enhanced purple
    }
  };

  const getThemeGradient = () => {
    switch (theme) {
      case "ocean":
        return "radial-gradient(circle at center, #0f172a, #020617)";
      case "forest":
        return "radial-gradient(circle at center, #064e3b, #022c22)";
      case "sunset":
        return "radial-gradient(circle at center, #9a3412, #431407)";
      default:
        return "radial-gradient(circle at center, #1e1b4b, #0f0f23)";
    }
  };
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = container.querySelectorAll<HTMLDivElement>(".premium-particle");

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 50;
      const y = (e.clientY / innerHeight - 0.5) * 50;

      particles.forEach((p, i) => {
        const speed = 3 + (i % 7);
        const rotation = (i % 360);
        p.style.transform = `translate(${x / speed}px, ${y / speed}px) scale(${p.dataset.scale}) rotate(${rotation + (x + y) / 10}deg)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{
        background: getThemeGradient(),
      }}
    >
      {/* Enhanced center glow */}
      <div className="absolute left-1/2 top-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 animate-pulse" 
           style={{ 
             background: `radial-gradient(circle, ${getThemeColor()}40, transparent)`,
             filter: 'blur(60px)'
           }} />

      {/* Premium floating particles */}
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="premium-particle absolute rounded-full animate-float"
          data-scale={(0.2 + Math.random() * 1.5).toFixed(2)}
          style={{
            width: `${1 + Math.random() * 6}px`,
            height: `${1 + Math.random() * 6}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: getThemeColor(),
            opacity: 0.3 + Math.random() * 0.7,
            boxShadow: `0 0 ${4 + Math.random() * 12}px ${getThemeColor()}`,
            borderRadius: "50%",
            transition: "transform 0.3s ease-out",
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`
          }}
        />
      ))}

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
    </div>
  );
};

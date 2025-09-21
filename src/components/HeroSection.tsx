import { Button } from "@/components/ui/button";
import { Heart, Compass } from "lucide-react";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Space Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-black to-slate-950 -z-10" />

      {/* Earth Glow in Center */}
      <div className="absolute left-1/2 top-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-600/40 to-green-400/30 blur-3xl animate-pulse" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden -z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Tagline */}
        <div 
          className={`mb-12 inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-blue-400/50 shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } ${isHovering ? 'shadow-blue-400/25 border-blue-400/70' : ''}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            transitionDelay: '0.2s'
          }}
        >
          <Heart className={`w-5 h-5 text-blue-400 transition-all duration-300 ${isHovering ? 'scale-110 text-blue-300' : ''}`} />
          <span className="text-white text-sm font-medium tracking-wide">
            Emotional Travel Intelligence • Feel-First Journey
          </span>
          <Compass className={`w-4 h-4 text-teal-400 animate-pulse transition-all duration-300 ${isHovering ? 'rotate-12 scale-110' : ''}`} />
        </div>

        {/* Heading */}
        <h1 className={`text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tight mb-8 transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
        style={{
          transitionDelay: '0.4s'
        }}>
          <span className="inline-block animate-slideInUp" style={{animationDelay: '0.6s'}}>Journey</span>
          <br />
          <span className="inline-block animate-slideInUp" style={{animationDelay: '0.8s'}}>Beyond</span>
          <br />
          <span className="bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 bg-clip-text text-transparent animate-pulse inline-block animate-slideInUp" style={{animationDelay: '1s'}}>
            Emotions
          </span>
        </h1>

        {/* Description */}
        <p className={`max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed mb-12 transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
        style={{
          transitionDelay: '1.2s'
        }}>
          <span className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-300">Discover your emotional compass</span> and let your feelings guide you to{" "}
          <span className="text-teal-400 font-semibold hover:text-teal-300 transition-colors duration-300">extraordinary destinations</span>.
          <br />
          Travel that{" "}
          <span className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors duration-300">heals, inspires & transforms</span> your soul.
        </p>

        {/* Buttons */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
        style={{
          transitionDelay: '1.4s'
        }}>
          <Button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-6 rounded-full shadow-lg hover:scale-105 hover:shadow-blue-500/25 transition-all duration-300 animate-bounce-subtle">
            Start Your Journey
          </Button>
          <Button 
            variant="outline" 
            className="border-2 border-blue-400/60 bg-white/10 text-white px-10 py-6 rounded-full hover:scale-105 hover:border-blue-400/80 hover:bg-white/20 transition-all duration-300 animate-bounce-subtle"
            style={{
              animationDelay: '0.2s'
            }}
          >
            Discover Emotions
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
            opacity: 0.5;
          }
          75% {
            transform: translateY(-30px) translateX(-10px);
            opacity: 0.9;
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}; 
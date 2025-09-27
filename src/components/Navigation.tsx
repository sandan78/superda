import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Chrome as Home, MapPin, Mountain, Waves, Building, LayoutDashboard, Compass } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/tamil-nadu", label: "Tamil Nadu", icon: Mountain },
  { path: "/kerala", label: "Kerala", icon: Waves },
  { path: "/bangalore", label: "Bangalore", icon: Building },
  { path: "/discover", label: "Discover", icon: Compass },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard }
];

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectorStyle, setSelectorStyle] = useState({ width: 0, left: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: number]: HTMLElement }>({});

  const isActive = (path: string) => location.pathname === path;

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update selector position
  useEffect(() => {
    const activeIndex = navItems.findIndex(item => isActive(item.path));
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      const activeElement = itemRefs.current[activeIndex];
      setTimeout(() => {
        setSelectorStyle({
          width: activeElement.offsetWidth,
          left: activeElement.offsetLeft
        });
      }, 50);
    }
  }, [location.pathname]);

  // Dynamic text color for contrast
  const getTextColorClass = () => {
    if (!isScrolled) return "text-white";
    return "text-gray-900";
  };

  const getNavbarClass = () => {
    return `fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/20 bg-white/5 backdrop-blur-xl`;
  };

  return (
    <nav className={getNavbarClass()}>
      <style jsx>{`
        .nav-selector {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          height: 40px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(124, 58, 237, 0.5));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 1;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          animation: selectorPulse 0.6s ease-out;
        }

        @keyframes selectorPulse {
          0% { transform: translateY(-50%) scale(0.95); opacity: 0.8; }
          50% { transform: translateY(-50%) scale(1.02); opacity: 1; }
          100% { transform: translateY(-50%) scale(1); opacity: 1; }
        }

        .nav-item-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          text-decoration: none;
          font-weight: 500;
          white-space: nowrap;
        }

        .nav-item-link.active {
          color: ${!isScrolled ? "white" : "rgb(17, 24, 39)"};
          text-shadow: ${!isScrolled ? "0 2px 8px rgba(0,0,0,0.5)" : "0 2px 8px rgba(255,255,255,0.8)"};
          animation: textGlow 0.6s ease-out;
        }

        @keyframes textGlow {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 1; }
        }

        .nav-item-link:not(.active):hover {
          transform: translateY(-1px);
        }

        .nav-icon {
          width: 16px;
          height: 16px;
        }

        .nav-item-link.active .nav-icon {
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
        }

        .mobile-nav-item {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 glass-premium rounded-xl flex items-center justify-center shadow-luxury">
              <MapPin className={`w-5 h-5 transition-colors duration-500 ${getTextColorClass()}`} />
            </div>
            <span className={`text-xl font-cinematic transition-colors duration-500 ${getTextColorClass()}`}>
              Emotion Escapes 
            </span> 
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center relative">
            <div 
              className="nav-selector"
              style={{
                width: `${selectorStyle.width}px`,
                left: `${selectorStyle.left}px`,
                opacity: selectorStyle.width > 0 ? 1 : 0
              }}
            />
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  ref={(el: HTMLAnchorElement | null) => { if (el) itemRefs.current[index] = el; }}
                  className={`nav-item-link ${active ? 'active' : ''} ${getTextColorClass()}`}
                  onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}
                >
                  <Icon className="nav-icon" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="sm"
            className={`md:hidden glass border-white/20 hover:bg-white/10 transition-all duration-500 ${getTextColorClass()}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in glass-premium rounded-2xl mt-4 mx-2">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => { setIsMobileMenuOpen(false); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100); }}
                    className={`mobile-nav-item flex items-center space-x-3 px-6 py-4 rounded-xl mx-2 ${active ? "active" : ""} ${getTextColorClass()}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className={`font-medium transition-colors duration-500 ${getTextColorClass()}`}>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

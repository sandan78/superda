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

// Named export - make sure you're importing it as { Navigation }
export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectorStyle, setSelectorStyle] = useState({ width: 0, left: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: number]: HTMLElement }>({});

  const isActive = (path: string) => location.pathname === path;

  // Detect scroll position and background color
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newIsScrolled = scrollPosition > 50;
      setIsScrolled(newIsScrolled);
      
      // Detect background color by checking the page content
      const body = document.body;
      const computedStyle = window.getComputedStyle(body);
      const backgroundColor = computedStyle.backgroundColor;
      
      // Check if we're on a page with dark background
      const isDark = location.pathname === '/' || 
                    location.pathname === '/tamil-nadu' || 
                    location.pathname === '/kerala' || 
                    location.pathname === '/bangalore' || 
                    location.pathname === '/discover';
      
      setIsDarkBackground(isDark && !newIsScrolled);
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);
  // Update selector position when route changes
  useEffect(() => {
    const activeIndex = navItems.findIndex(item => isActive(item.path));
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      const activeElement = itemRefs.current[activeIndex];
      
      // Add a small delay to ensure DOM is updated
      setTimeout(() => {
        setSelectorStyle({
          width: activeElement.offsetWidth,
          left: activeElement.offsetLeft
        });
      }, 50);
    }
  }, [location.pathname]);

  // Dynamic text color classes
  const getTextColorClass = () => {
    if (isDarkBackground && !isScrolled) {
      return 'text-white';
    }
    return 'text-gray-900';
  };

  const getNavbarClass = () => {
    if (isScrolled) {
      return 'glass-premium border-b border-white/20 bg-white/95 backdrop-blur-xl';
    }
    return 'glass-premium border-b border-white/20';
  };
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getNavbarClass()}`}>
      <style jsx>{`
        .animated-nav {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .nav-item {
          position: relative;
          z-index: 2;
        }
        
        .nav-selector {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          height: 40px;
          background: ${isDarkBackground && !isScrolled 
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(29, 78, 216, 0.9), rgba(124, 58, 237, 0.8))'
            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(29, 78, 216, 1), rgba(124, 58, 237, 0.9))'};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 1;
          box-shadow: ${isDarkBackground && !isScrolled 
            ? '0 8px 32px rgba(59, 130, 246, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            : '0 8px 32px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'};
          animation: selectorPulse 0.6s ease-out;
        }

        @keyframes selectorPulse {
          0% {
            transform: translateY(-50%) scale(0.95);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-50%) scale(1.02);
            opacity: 1;
          }
          100% {
            transform: translateY(-50%) scale(1);
            opacity: 1;
          }
        }
        
        .nav-item-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          color: ${isDarkBackground && !isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(17, 24, 39, 0.8)'};
          text-decoration: none;
          font-weight: 500;
          z-index: 2;
          white-space: nowrap;
        }
        
        .nav-item-link.active {
          color: ${isDarkBackground && !isScrolled ? 'white' : 'rgb(17, 24, 39)'};
          text-shadow: ${isDarkBackground && !isScrolled 
            ? '0 2px 8px rgba(0, 0, 0, 0.5)' 
            : '0 2px 8px rgba(255, 255, 255, 0.8)'};
          animation: textGlow 0.6s ease-out;
        }

        @keyframes textGlow {
          0% {
            color: ${isDarkBackground && !isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(17, 24, 39, 0.8)'};
            text-shadow: none;
          }
          50% {
            color: ${isDarkBackground && !isScrolled ? '#e0e7ff' : '#1f2937'};
            text-shadow: ${isDarkBackground && !isScrolled 
              ? '0 0 8px rgba(255, 255, 255, 0.5)' 
              : '0 0 8px rgba(59, 130, 246, 0.5)'};
          }
          100% {
            color: ${isDarkBackground && !isScrolled ? 'white' : 'rgb(17, 24, 39)'};
            text-shadow: ${isDarkBackground && !isScrolled 
              ? '0 2px 8px rgba(0, 0, 0, 0.5)' 
              : '0 2px 8px rgba(255, 255, 255, 0.8)'};
          }
        }
        
        .nav-item-link:not(.active):hover {
          color: ${isDarkBackground && !isScrolled ? 'white' : 'rgb(17, 24, 39)'};
          background: ${isDarkBackground && !isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
          transform: translateY(-1px);
          text-shadow: ${isDarkBackground && !isScrolled 
            ? '0 2px 8px rgba(255, 255, 255, 0.3)' 
            : '0 2px 8px rgba(59, 130, 246, 0.3)'};
        }

        .nav-item-link:not(.active) {
          transition: color 0.3s ease, background 0.3s ease, transform 0.3s ease;
        }
        
        .nav-icon {
          width: 16px;
          height: 16px;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .nav-item-link.active .nav-icon {
          color: ${isDarkBackground && !isScrolled ? 'white' : 'rgb(17, 24, 39)'};
          filter: ${isDarkBackground && !isScrolled 
            ? 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5))' 
            : 'drop-shadow(0 2px 8px rgba(255, 255, 255, 0.8))'};
          animation: iconGlow 0.6s ease-out;
        }

        @keyframes iconGlow {
          0% {
            color: ${isDarkBackground && !isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(17, 24, 39, 0.8)'};
            filter: none;
            transform: scale(1);
          }
          50% {
            color: ${isDarkBackground && !isScrolled ? '#e0e7ff' : '#1f2937'};
            filter: ${isDarkBackground && !isScrolled 
              ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))' 
              : 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))'};
            transform: scale(1.1);
          }
          100% {
            color: ${isDarkBackground && !isScrolled ? 'white' : 'rgb(17, 24, 39)'};
            filter: ${isDarkBackground && !isScrolled 
              ? 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5))' 
              : 'drop-shadow(0 2px 8px rgba(255, 255, 255, 0.8))'};
            transform: scale(1);
          }
        }

        .nav-item-link:not(.active):hover .nav-icon {
          transform: scale(1.1);
          color: ${isDarkBackground && !isScrolled ? 'white' : 'rgb(17, 24, 39)'};
          filter: ${isDarkBackground && !isScrolled 
            ? 'drop-shadow(0 2px 8px rgba(255, 255, 255, 0.3))' 
            : 'drop-shadow(0 2px 8px rgba(59, 130, 246, 0.3))'};
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .mobile-nav-item {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .mobile-nav-item.active {
          background: ${isDarkBackground && !isScrolled 
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.1))' 
            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.1))'};
          color: ${isDarkBackground && !isScrolled ? 'white' : 'rgb(17, 24, 39)'};
          border-left: ${isDarkBackground && !isScrolled 
            ? '3px solid rgba(255, 255, 255, 0.8)' 
            : '3px solid rgba(59, 130, 246, 0.8)'};
          transform: translateX(4px);
          animation: mobileActiveSlide 0.5s ease-out;
        }

        @keyframes mobileActiveSlide {
          0% {
            background: transparent;
            color: ${isDarkBackground && !isScrolled ? 'rgba(255, 255, 255, 0.7)' : 'rgba(17, 24, 39, 0.7)'};
            border-left: 3px solid transparent;
            transform: translateX(0);
          }
          100% {
            background: ${isDarkBackground && !isScrolled 
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.1))' 
              : 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.1))'};
            color: ${isDarkBackground && !isScrolled ? 'white' : 'rgb(17, 24, 39)'};
            border-left: ${isDarkBackground && !isScrolled 
              ? '3px solid rgba(255, 255, 255, 0.8)' 
              : '3px solid rgba(59, 130, 246, 0.8)'};
            transform: translateX(4px);
          }
        }

        .mobile-nav-item:not(.active):hover {
          background: ${isDarkBackground && !isScrolled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(59, 130, 246, 0.08)'};
          color: ${isDarkBackground && !isScrolled ? 'white' : 'rgb(17, 24, 39)'};
          transform: translateX(2px);
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
          <div className="hidden md:flex items-center animated-nav" ref={navRef}>
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
                  ref={(el: HTMLAnchorElement | null) => {
                    if (el) itemRefs.current[index] = el;
                  }}
                  className={`nav-item-link nav-item ${active ? 'active' : ''}`}
                  onClick={() => {
                    // Ensure scroll to top on navigation
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 100);
                  }}
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
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`mobile-nav-item flex items-center space-x-3 px-6 py-4 rounded-xl mx-2 ${
                      active ? "active" : ""
                    }`}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      // Ensure scroll to top on mobile navigation
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 100);
                    }}
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

// If you want to use default export instead, uncomment this line and comment out the named export above:
// export default Navigation;
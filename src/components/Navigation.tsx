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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const getTextColorClass = () => (isScrolled ? "text-gray-900" : "text-white");
  const getNavbarClass = () => (isScrolled ? "bg-white border-b border-gray-300" : "bg-gray-800 border-b border-gray-700");

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getNavbarClass()}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <MapPin className={`w-5 h-5 ${getTextColorClass()}`} />
            </div>
            <span className={`text-xl font-bold ${getTextColorClass()}`}>
              Emotion Escapes
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center" ref={navRef}>
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                    active ? "text-blue-600" : getTextColorClass()
                  } hover:text-blue-600`}
                  onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="sm"
            className={`md:hidden border ${getTextColorClass()}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-gray-800 rounded-xl mt-4">
            <div className="flex flex-col space-y-2">
              {navItems.map(item => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
                    }}
                    className={`flex items-center gap-3 px-6 py-3 rounded-md font-medium transition-colors ${
                      active ? "text-blue-600" : "text-white"
                    } hover:text-blue-600`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
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

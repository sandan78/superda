import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Heart, Plus, Check } from "lucide-react";
import { usePlans } from "@/contexts/PlanContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface DestinationCardProps {
  name: string;
  country: string;
  image: string;
  emotionalMatch: string;
  matchPercentage: number;
  description: string;
  culturalHighlights: string[];
  safetyLevel: "high" | "medium" | "low";
  bestTime: string;
  priceRange: "$" | "$$" | "$$$";
  idealGroupSize?: string;
  groupDescription?: string;
  hideGetGoingPlans?: boolean;
}

export const DestinationCard = ({
  name,
  country,
  image,
  emotionalMatch,
  matchPercentage,
  description,
  culturalHighlights,
  safetyLevel,
  bestTime,
  priceRange,
  idealGroupSize,
  groupDescription,
  hideGetGoingPlans = false,
}: DestinationCardProps) => {
  const { addPlan, selectedPlans, updatePlanStatus } = usePlans();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const isSelected = selectedPlans.some(
    (plan) => plan.name === name && plan.region === country
  );

  const handleAddToPlan = () => {
    if (isSelected) {
      toast({
        title: "Already added",
        description: `${name} is already in your travel plans.`,
      });
      return;
    }
    addPlan({
      name,
      country,
      image,
      emotionalMatch,
      matchPercentage,
      description,
      culturalHighlights,
      safetyLevel,
      bestTime,
      priceRange,
      region: country as "Tamil Nadu" | "Kerala" | "Bangalore",
    });
    toast({
      title: "Added to plans!",
      description: `${name} has been added to your travel dashboard.`,
    });
  };

  const handleGetGoingPlans = () => {
    const existing = selectedPlans.find(
      (plan) => plan.name === name && plan.region === country
    );
    if (!existing) {
      addPlan({
        name,
        country,
        image,
        emotionalMatch,
        matchPercentage,
        description,
        culturalHighlights,
        safetyLevel,
        bestTime,
        priceRange,
        region: country as "Tamil Nadu" | "Kerala" | "Bangalore",
      });
      toast({
        title: "Added to plans",
        description: `${name} added. Opening ongoing plans...`,
      });
      setTimeout(() => {
        const plan = selectedPlans.find(
          (p) => p.name === name && p.region === country
        );
        if (plan) {
          updatePlanStatus(plan.id, "ongoing");
        }
        navigate("/dashboard?tab=ongoing");
      }, 100);
      return;
    }
    updatePlanStatus(existing.id, "ongoing");
    navigate("/dashboard?tab=ongoing");
  };

  const safetyColor = {
    high: "#32ba7c",
    medium: "#f1c232",
    low: "#e65151",
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.currentTarget;
    if (target.src !== "/placeholder.svg") target.src = "/placeholder.svg";
  };

  // Base card styles - applied immediately
  const cardStyles = {
    background: '#fff',
    borderRadius: '1rem',
    boxShadow: isHovered ? '0 14px 40px rgba(0,0,0,0.25)' : '0 6px 22px rgba(0,0,0,0.08)',
    border: '1px solid #ececec',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    transform: isHovered ? 'translateY(-10px) translateZ(0)' : 'translateY(0) translateZ(0)',
    transition: 'transform 0.25s ease-out, box-shadow 0.25s ease-out',
    zIndex: isHovered ? 100 : 1,
  };

  const imageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    display: 'block' as const,
    transform: isHovered ? 'scale(1.06)' : 'scale(1)',
    filter: isHovered ? 'brightness(0.85)' : 'brightness(1)',
    transition: 'transform 0.4s ease-out, filter 0.3s ease-out',
  };

  return (
    <Card 
      className="h-full"
      style={cardStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient glow overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '2px',
          background: 'linear-gradient(135deg, #ff6b6b, #f8cdda, #4facfe, #00f2fe)',
          backgroundSize: '400% 400%',
          backgroundPosition: isHovered ? '100% 100%' : '0% 0%',
          opacity: isHovered ? 1 : 0,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease-out, background-position 1.5s ease-out',
          zIndex: 0,
        }}
      />

      {/* Image section */}
      <div
        style={{
          position: 'relative',
          height: '200px',
          width: '100%',
          overflow: 'hidden',
          background: '#f2f4f7',
          flexShrink: 0,
          zIndex: 1,
        }}
      >
        <img
          src={image || "/placeholder.svg"}
          alt={`${name}, ${country}`}
          style={imageStyles}
          onError={handleImageError}
        />
        
        {/* Shiny streak effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: isHovered ? '125%' : '-75%',
            width: '50%',
            height: '100%',
            background: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 100%)',
            transform: 'skewX(-20deg)',
            transition: isHovered ? 'left 0.6s ease-out' : 'none',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Match badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: '#1f1f1f',
            color: '#fff',
            fontWeight: 700,
            borderRadius: '999px',
            padding: '6px 12px',
            fontSize: '0.86rem',
            lineHeight: 1,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 6px 14px rgba(0,0,0,0.2)',
            zIndex: 3,
          }}
        >
          <Heart style={{ height: 16, width: 16 }} />
          {matchPercentage}% Match
        </div>
      </div>

      {/* Content section */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(6px)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h2
            style={{
              fontSize: '1.35rem',
              fontWeight: 600,
              margin: 0,
              color: '#101828',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
            }}
          >
            {name}
          </h2>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.92rem',
              fontWeight: 500,
              color: '#6b7280',
              marginTop: '6px',
              marginBottom: '10px',
            }}
          >
            <MapPin />
            <span>{country}</span>
          </div>
          <div
            style={{
              fontSize: '0.96rem',
              lineHeight: 1.55,
              color: '#303030',
              margin: '0 0 12px 0',
              flexGrow: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </div>
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.92rem',
              color: '#475d69',
              gap: '10px',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '16px',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Clock style={{ width: 16, height: 16 }} />
                {bestTime}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                💰 {priceRange}
              </span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 700,
                color: safetyColor[safetyLevel],
              }}
            >
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '999px',
                  display: 'inline-block',
                  backgroundColor: safetyColor[safetyLevel],
                }}
              />
              {safetyLevel} Safety
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              style={{
                flex: 1,
                borderRadius: '0.8rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                padding: '0.7rem',
                minHeight: '44px',
                transition: 'transform 0.15s ease',
              }}
              onClick={() => {
                navigate(
                  `/destination/${encodeURIComponent(
                    country
                  )}/${encodeURIComponent(name)}`
                );
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
              }}
            >
              View Details
            </Button>

            {!hideGetGoingPlans && (
              <Button
                style={{
                  flex: 1,
                  borderRadius: '0.8rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  padding: '0.7rem',
                  minHeight: '44px',
                  transition: 'transform 0.15s ease',
                }}
                onClick={handleGetGoingPlans}
              >
                Get Going
              </Button>
            )}

            <Button
              style={{
                flex: 1,
                borderRadius: '0.8rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                padding: '0.7rem',
                minHeight: '44px',
                transition: 'transform 0.15s ease',
                opacity: isSelected ? 0.6 : 1,
                cursor: isSelected ? 'not-allowed' : 'pointer',
              }}
              onClick={handleAddToPlan}
              disabled={isSelected}
            >
              {isSelected ? (
                <>
                  <Check style={{ width: 16, height: 16, marginRight: 6 }} />
                  Added
                </>
              ) : (
                <>
                  <Plus style={{ width: 16, height: 16, marginRight: 6 }} />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
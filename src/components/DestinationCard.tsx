import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Heart, Plus, Check, Users, Shield } from "lucide-react";
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
  const [imageLoaded, setImageLoaded] = useState(false);

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
    high: "#10b981",
    medium: "#f59e0b",
    low: "#ef4444",
  };

  const safetyIcon = {
    high: <Shield className="w-3 h-3" />,
    medium: <Shield className="w-3 h-3" />,
    low: <Shield className="w-3 h-3" />
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.currentTarget;
    if (target.src !== "/placeholder.svg") target.src = "/placeholder.svg";
  };

  return (
    <Card
      className={`destination-card-elite h-full overflow-hidden cursor-pointer transform-gpu ${isHovered ? 'is-hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* keep your styles untouched */}

      {/* Image Section */}
      <div className="destination-img-container">
        {!imageLoaded && <div className="image-shimmer" />}
        <img
          src={image || "/placeholder.svg"}
          alt={`${name}, ${country}`}
          className="destination-img"
          onError={handleImageError}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="image-overlay" />
        <div className="match-badge floating">
          <Heart className="w-4 h-4" />
          {matchPercentage}% Match
        </div>
      </div>

      {/* Content Section */}
      <div className="destination-content-wrapper">
        <div className="destination-main">
          <h2 className="destination-title">{name}</h2>
          <div className="destination-location">
            <MapPin className="w-4 h-4 meta-icon" />
            <span>{country}</span>
          </div>
          <p className="destination-description">{description}</p>
        </div>

        <div className="destination-footer">
          <div className="destination-meta-grid">
            <div className="meta-item">
              <Clock className="w-4 h-4 meta-icon" />
              <span>{bestTime}</span>
            </div>
            <div className="meta-item">
              <span>{priceRange}</span>
            </div>
            {idealGroupSize && (
              <div className="meta-item">
                <Users className="w-4 h-4 meta-icon" />
                <span>{idealGroupSize}</span>
              </div>
            )}
            <div className="safety-indicator">
              <span
                className="safety-dot"
                style={{ backgroundColor: safetyColor[safetyLevel] }}
              />
              {safetyIcon[safetyLevel]}
            </div>
          </div>

          <div className="destination-actions">
            <Button
              className="action-btn"
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
              Explore
            </Button>

            {!hideGetGoingPlans && (
              <Button 
                className="action-btn primary-btn" 
                onClick={handleGetGoingPlans}
              >
                Get Going
              </Button>
            )}

            <Button
              className="action-btn"
              onClick={handleAddToPlan}
              disabled={isSelected}
            >
              {isSelected ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Added
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Plan
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

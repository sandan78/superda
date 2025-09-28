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

  return (
    <Card
      className={`destination-card h-full ${isHovered ? "is-hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        .destination-card {
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(16px) saturate(150%);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), border 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
          contain: layout paint; /* contain effects INSIDE */
        }

        .destination-card:hover {
          transform: translateY(-6px) scale(1.01);
          border-color: rgba(255,255,255,0.35);
        }

        /* Image with cinematic zoom */
        .destination-img-wrap {
          position: relative;
          height: 220px;
          overflow: hidden;
          border-radius: 1rem 1rem 0 0;
        }

        .destination-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1);
          filter: brightness(0.85) saturate(1.05);
          transition: transform 0.8s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease;
        }

        .destination-card:hover .destination-img {
          transform: scale(1.08);
          filter: brightness(1) saturate(1.25);
        }

        /* Badge inside card with glow */
        .destination-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(30,30,30,0.75);
          color: #fff;
          box-shadow: inset 0 0 6px rgba(255,255,255,0.15), 0 0 10px rgba(255,90,90,0.4);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .destination-card:hover .destination-badge {
          transform: scale(1.08);
          box-shadow: inset 0 0 6px rgba(255,255,255,0.15), 0 0 16px rgba(255,90,90,0.9);
        }

        /* Body */
        .destination-body {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(20px);
          border-radius: 0 0 1rem 1rem;
        }

        .destination-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: #fff;
          margin: 0;
          transition: color 0.35s ease;
        }

        .destination-card:hover .destination-title {
          color: #ffd54f;
        }

        .destination-location {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.95rem;
          color: #ddd;
          margin: 6px 0 12px;
        }

        .destination-description {
          color: #eee;
          font-size: 0.95rem;
          line-height: 1.55;
          -webkit-line-clamp: 3;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .destination-info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #ccc;
          margin-bottom: 18px;
          font-size: 0.9rem;
        }

        /* Buttons */
        .destination-buttons {
          display: flex;
          gap: 10px;
        }

        .destination-btn {
          flex: 1;
          border-radius: 0.7rem;
          font-size: 0.95rem;
          font-weight: 600;
          min-height: 44px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .destination-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #ff8a65, #ff5252);
          box-shadow: inset 0 0 6px rgba(255,255,255,0.2), 0 8px 18px rgba(0,0,0,0.3);
          border-color: rgba(255,255,255,0.3);
        }

        .destination-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .safety {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
        }

        .safety-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
      `}</style>

      {/* Image Section */}
      <div className="destination-img-wrap">
        <img
          src={image || "/placeholder.svg"}
          alt={`${name}, ${country}`}
          className="destination-img"
          onError={handleImageError}
        />
        <div className="destination-badge">
          <Heart style={{ height: 16, width: 16 }} />
          {matchPercentage}% Match
        </div>
      </div>

      {/* Body */}
      <div className="destination-body">
        <div>
          <h2 className="destination-title">{name}</h2>
          <div className="destination-location">
            <MapPin />
            <span>{country}</span>
          </div>
          <div className="destination-description">{description}</div>
        </div>

        <div>
          <div className="destination-info-row">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Clock style={{ width: 16, height: 16 }} />
                {bestTime}
              </span>
              <span className="flex items-center gap-1">💰 {priceRange}</span>
            </div>
            <div
              className="safety"
              style={{ color: safetyColor[safetyLevel] }}
            >
              <span
                className="safety-dot"
                style={{ backgroundColor: safetyColor[safetyLevel] }}
              />
              {safetyLevel} Safety
            </div>
          </div>

          <div className="destination-buttons">
            <Button
              className="destination-btn"
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
              <Button className="destination-btn" onClick={handleGetGoingPlans}>
                Get Going
              </Button>
            )}

            <Button
              className="destination-btn"
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
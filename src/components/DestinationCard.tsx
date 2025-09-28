import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Heart, Plus, Check } from "lucide-react";
import { usePlans } from "@/contexts/PlanContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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

  const getSafetyIcon = () => {
    switch (safetyLevel) {
      case "high":
        return "🟢";
      case "medium":
        return "🟡";
      case "low":
        return "🔴";
      default:
        return "";
    }
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.currentTarget;
    if (target.src !== "/placeholder.svg") target.src = "/placeholder.svg";
  };

  return (
    <Card className="destination-card h-full group">
      <style>{`
        .destination-card {
          background: #fff;
          border-radius: 1rem;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.08),
            0 1px 3px rgba(0, 0, 0, 0.04);
          border: 1px solid #f0f0f0;
          width: 100%;
          height: 100%;
          font-family: 'Inter', Arial, sans-serif;
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          cursor: pointer;
        }

        /* Modern Glass Morphism Hover Effect */
        .destination-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(255, 255, 255, 0.85) 100%
          );
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          opacity: 0;
          transition: all 0.4s ease;
          z-index: 1;
          pointer-events: none;
        }

        .destination-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 
            0 25px 60px rgba(0, 0, 0, 0.15),
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.8);
          border-color: rgba(255, 255, 255, 0.9);
        }

        .destination-card:hover::before {
          opacity: 1;
        }

        /* Image Hover Effects */
        .destination-img-wrap {
          position: relative;
          height: 200px;
          width: 100%;
          overflow: hidden;
          background: #f2f4f7;
          flex-shrink: 0;
          z-index: 2;
        }

        .destination-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          filter: brightness(0.95);
        }

        .destination-card:hover .destination-img {
          transform: scale(1.1);
          filter: brightness(1.05) contrast(1.1);
        }

        /* Enhanced Badge Hover */
        .destination-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(135deg, #1f1f1f 0%, #3a3a3a 100%);
          color: #fff;
          font-weight: 700;
          border-radius: 999px;
          padding: 6px 12px;
          font-size: 0.86rem;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 3;
        }

        .destination-card:hover .destination-badge {
          transform: translateY(-4px) scale(1.08);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
          background: linear-gradient(135deg, #3a3a3a 0%, #1f1f1f 100%);
        }

        /* Body Content */
        .destination-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        /* Title Animation */
        .destination-title {
          font-size: 1.35rem;
          font-weight: 1500;
          margin: 0;
          color: #101828;
          letter-spacing: -0.01em;
          line-height: 1.2;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
        }

        .destination-title::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: width 0.4s ease;
        }

        .destination-card:hover .destination-title::after {
          width: 100%;
        }

        .destination-card:hover .destination-title {
          color: #1e40af;
          transform: translateX(2px);
        }

        /* Location Pin Animation */
        .destination-location {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.92rem;
          font-weight: 500;
          color: #6b7280;
          margin-top: 6px;
          margin-bottom: 10px;
          transition: all 0.3s ease;
        }

        .destination-card:hover .destination-location {
          color: #4b5563;
          transform: translateX(3px);
        }

        .destination-location svg {
          width: 16px;
          height: 16px;
          flex: 0 0 16px;
          vertical-align: middle;
          transition: all 0.3s ease;
        }

        .destination-card:hover .destination-location svg {
          transform: scale(1.2) rotate(5deg);
          color: #ef4444;
        }

        /* Description Enhancement */
        .destination-description {
          font-size: 0.96rem;
          line-height: 1.55;
          color: #303030;
          margin: 0 0 12px 0;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .destination-card:hover .destination-description {
          color: #404040;
          transform: translateY(-1px);
        }

        /* Content Wrapper */
        .destination-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        /* Bottom Section Animation */
        .destination-bottom {
          margin-top: auto;
          padding-top: 12px;
          transition: transform 0.3s ease;
        }

        .destination-card:hover .destination-bottom {
          transform: translateY(-2px);
        }

        /* Meta Info Row Animations */
        .destination-info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.92rem;
          color: #475d69;
          gap: 10px;
          margin-bottom: 16px;
          transition: transform 0.3s ease;
        }

        .destination-card:hover .destination-info-row {
          transform: translateY(-1px);
        }

        .meta-left {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          white-space: nowrap;
        }

        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
          padding: 4px 8px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.5);
        }

        .destination-card:hover .meta-item {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .destination-card:hover .meta-item:nth-child(1) {
          transition-delay: 0.05s;
        }

        .destination-card:hover .meta-item:nth-child(2) {
          transition-delay: 0.1s;
        }

        /* Safety Indicator Animation */
        .safety {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          transition: all 0.3s ease;
          padding: 4px 8px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.5);
        }

        .destination-card:hover .safety {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .safety-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .destination-card:hover .safety-dot {
          transform: scale(1.4);
          box-shadow: 0 0 10px currentColor;
        }

        /* Buttons Container Animation */
        .destination-buttons {
          display: flex;
          gap: 12px;
          transition: transform 0.3s ease;
        }

        .destination-card:hover .destination-buttons {
          transform: translateY(-2px);
        }

        /* Individual Button Effects */
        .destination-btn {
          flex: 1;
          border-radius: 0.8rem;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.7rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-height: 44px;
          position: relative;
          overflow: hidden;
        }

        .destination-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
          transition: all 0.4s ease;
          transform: translate(-50%, -50%);
          border-radius: 50%;
        }

        .destination-btn:hover:not(:disabled)::before {
          width: 300px;
          height: 300px;
        }

        .destination-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .destination-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }
      `}</style>

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

      <div className="destination-body">
        <div className="destination-content">
          <h2 className="destination-title">{name}</h2>

          <div className="destination-location">
            <MapPin />
            <span>{country}</span>
          </div>

          <div className="destination-description">{description}</div>
        </div>

        <div className="destination-bottom">
          <div className="destination-info-row">
            <div className="meta-left">
              <span className="meta-item">
                <Clock style={{ width: 16, height: 16 }} />
                {bestTime}
              </span>
              <span className="meta-item">💰 {priceRange}</span>
            </div>

            <div
              className="safety"
              style={{ color: safetyColor[safetyLevel] }}
              aria-label={`${safetyLevel} safety`}
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
                  window.scrollTo({ top: 0, behavior: 'smooth' });
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
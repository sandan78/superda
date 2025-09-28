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
    <Card className="destination-card h-full">
      <style>{`
        .destination-card {
          background: #fff;
          border-radius: 1rem;
          box-shadow: 0 6px 22px rgba(0,0,0,0.08);
          border: 1px solid #ececec;
          width: 100%;
          height: 100%;
          font-family: 'Inter', Arial, sans-serif;
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
          cursor: pointer;
        }

        /* Creative Border Glow Effect */
        .destination-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(
            45deg,
            #ff6b6b,
            #4ecdc4,
            #45b7d1,
            #96ceb4,
            #feca57,
            #ff9ff3
          );
          background-size: 400% 400%;
          border-radius: 1.1rem;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.4s ease;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .destination-card:hover {
          transform: translateY(-8px) rotateX(5deg) rotateY(2deg);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.15),
            0 15px 30px rgba(0, 0, 0, 0.1),
            0 0 80px rgba(100, 255, 218, 0.1);
        }

        .destination-card:hover::before {
          opacity: 1;
        }

        /* Image Hover Magic */
        .destination-img-wrap {
          position: relative;
          height: 200px;
          width: 100%;
          overflow: hidden;
          background: #f2f4f7;
          flex-shrink: 0;
        }

        .destination-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          filter: saturate(0.9);
        }

        .destination-card:hover .destination-img {
          transform: scale(1.15) rotate(1deg);
          filter: saturate(1.2) brightness(1.1);
        }

        /* Floating Badge Effect */
        .destination-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #1f1f1f;
          color: #fff;
          font-weight: 700;
          border-radius: 999px;
          padding: 6px 12px;
          font-size: 0.86rem;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 6px 14px rgba(0,0,0,0.2);
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          z-index: 2;
        }

        .destination-card:hover .destination-badge {
          transform: translateY(-8px) scale(1.1);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
        }

        /* Body Content */
        .destination-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
          background: #fff;
          position: relative;
          z-index: 1;
        }

        /* Title Slide-up Effect */
        .destination-title {
          font-size: 1.35rem;
          font-weight: 1500;
          margin: 0;
          color: #101828;
          letter-spacing: -0.01em;
          line-height: 1.2;
          transition: all 0.3s ease;
          transform: translateY(0);
        }

        .destination-card:hover .destination-title {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Location Pin Bounce */
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
          transform: translateX(5px);
          color: #4b5563;
        }

        .destination-location svg {
          width: 16px;
          height: 16px;
          flex: 0 0 16px;
          vertical-align: middle;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .destination-card:hover .destination-location svg {
          transform: scale(1.3) rotate(15deg);
          color: #ef4444;
        }

        /* Description Glow */
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
          transform: translateY(-1px);
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        /* Content wrapper */
        .destination-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        /* Bottom section */
        .destination-bottom {
          margin-top: auto;
          padding-top: 12px;
          transition: transform 0.3s ease;
        }

        .destination-card:hover .destination-bottom {
          transform: translateY(-3px);
        }

        /* Meta info floating effect */
        .destination-info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.92rem;
          color: #475d69;
          gap: 10px;
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }

        .destination-card:hover .destination-info-row {
          transform: translateY(-2px);
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
          border-radius: 8px;
          background: rgba(248, 250, 252, 0.8);
        }

        .destination-card:hover .meta-item {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* Safety indicator pulse */
        .safety {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          transition: all 0.3s ease;
          padding: 4px 8px;
          border-radius: 8px;
          background: rgba(248, 250, 252, 0.8);
        }

        .destination-card:hover .safety {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1.05); }
        }

        .safety-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .destination-card:hover .safety-dot {
          transform: scale(1.5);
          box-shadow: 0 0 15px currentColor;
          animation: glow 1.5s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from { box-shadow: 0 0 10px currentColor; }
          to { box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
        }

        /* Buttons container */
        .destination-buttons {
          display: flex;
          gap: 12px;
          transition: transform 0.3s ease;
        }

        .destination-card:hover .destination-buttons {
          transform: translateY(-3px);
        }

        /* Button hover effects */
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
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transition: left 0.6s ease;
        }

        .destination-btn:hover:not(:disabled)::before {
          left: 100%;
        }

        .destination-btn:hover:not(:disabled) {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .destination-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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
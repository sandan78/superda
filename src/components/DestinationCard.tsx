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
          position: relative;
          overflow: hidden;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          isolation: isolate; /* Contains the hover effects */
        }

        /* Contained gradient glow effect */
        .destination-card::before {
          content: "";
          position: absolute;
          inset: -2px; /* Extends slightly beyond the card */
          border-radius: 1.1rem; /* Slightly larger to contain the glow */
          background: linear-gradient(135deg, #ff6b6b, #f8cdda, #4facfe, #00f2fe);
          background-size: 400% 400%;
          z-index: -1; /* Places it behind the card content */
          opacity: 0;
          transition: opacity 0.4s ease, background-position 2s ease;
          pointer-events: none; /* Prevents interference with clicks */
        }

        .destination-card:hover::before {
          opacity: 1;
          background-position: 100% 100%;
        }

        /* Image wrap effects */
        .destination-img-wrap {
          position: relative;
          height: 200px;
          width: 100%;
          overflow: hidden;
          background: #f2f4f7;
          flex-shrink: 0;
          z-index: 1;
        }

        .destination-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease, filter 0.4s ease;
        }

        .destination-card:hover .destination-img {
          transform: scale(1.06);
          filter: brightness(0.85);
        }

        /* Contained shiny streak effect */
        .destination-img-wrap::after {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-20deg);
          transition: left 0.8s ease;
          z-index: 2;
        }

        .destination-card:hover .destination-img-wrap::after {
          left: 125%;
        }

        /* Card content container */
        .destination-body {
          position: relative;
          z-index: 2;
          background: #fff; /* Solid background to contain effects */
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
          border-radius: 0 0 1rem 1rem; /* Match card border radius */
        }

        /* Card lift with contained shadow */
        .destination-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 14px 40px rgba(0,0,0,0.25);
        }

        /* Content wrapper */
        .destination-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        /* Title + Location */
        .destination-title {
          font-size: 1.35rem;
          font-weight: 1500;
          margin: 0;
          color: #101828;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .destination-location {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.92rem;
          font-weight: 500;
          color: #6b7280;
          margin-top: 6px;
          margin-bottom: 10px;
        }

        /* Description */
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
        }

        /* Bottom section */
        .destination-bottom {
          margin-top: auto;
          padding-top: 12px;
        }

        /* Meta row */
        .destination-info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.92rem;
          color: #475d69;
          gap: 10px;
          margin-bottom: 16px;
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
        }

        .safety {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
        }

        .safety-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          display: inline-block;
        }

        /* Buttons */
        .destination-buttons {
          display: flex;
          gap: 12px;
        }
        .destination-btn {
          flex: 1;
          border-radius: 0.8rem;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.7rem;
          transition: transform 0.15s ease;
          min-height: 44px;
        }
        .destination-btn:hover:not(:disabled) {
          transform: translateY(-1px);
        }
        .destination-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Match badge */
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
          z-index: 3;
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
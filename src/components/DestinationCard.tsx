Of course. My apologies for the error in the previous version. The build error you encountered is a subtle but common issue when mixing dynamic JavaScript expressions directly inside a `<style>` tag within JSX.

The error `Cannot read properties of undefined (reading 'indexOf')` from `vite:react-swc` happens because the build tool tries to parse the content of the `<style>` tag as plain CSS, but it encounters the JavaScript expression `opacity: ${imageLoaded ? 1 : 0};` and doesn't know how to handle it.

The correct way to apply dynamic styles in React is to use the inline `style` prop on the element itself.

I have fixed this issue and also implemented your original request to remove the price emojis and the "high/medium/low" text.

Here is the corrected, error-free code:

### Summary of Changes:
1.  **Build Error Fix:** Moved the dynamic `opacity` from the `<style>` block to an inline `style` prop on the `<img>` tag. This resolves the Vite build error.
2.  **Price Display:** Removed the `priceIcons` emoji map and replaced the emoji with a `DollarSign` icon from `lucide-react` for a cleaner look.
3.  **Safety Indicator:** Removed the "High", "Medium", "Low" text, leaving just the colored dot and the shield icon.
4.  **Import Statement:** Updated the `lucide-react` import to include `DollarSign`.

---

### Corrected Code

```tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  Heart,
  Plus,
  Check,
  Users,
  Shield,
  DollarSign, // Added DollarSign icon
} from "lucide-react";
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
    low: <Shield className="w-3 h-3" />,
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.currentTarget;
    if (target.src !== "/placeholder.svg") target.src = "/placeholder.svg";
  };

  return (
    <Card
      className={`destination-card-elite h-full overflow-hidden cursor-pointer transform-gpu ${
        isHovered ? "is-hovered" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        .destination-card-elite {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          width: 100%;
          height: 100%;
          font-family: 'Inter', 'SF Pro Display', -apple-system, sans-serif;
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          isolation: isolate;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.08),
            0 1px 3px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        .destination-card-elite:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.15),
            0 15px 30px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }
        .destination-img-container {
          position: relative;
          height: 240px;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          flex-shrink: 0;
          z-index: 1;
          transform-style: preserve-3d;
        }
        .destination-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          transform: scale(1);
        }
        .destination-card-elite:hover .destination-img {
          transform: scale(1.08);
          filter: brightness(1.1) contrast(1.05);
        }
        .image-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          animation: shimmer 2s infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60%;
          background: linear-gradient(transparent 0%, rgba(0, 0, 0, 0.5) 100%);
          z-index: 2;
          pointer-events: none;
        }
        .match-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-weight: 700;
          border-radius: 20px;
          padding: 8px 16px;
          font-size: 0.8rem;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
          z-index: 3;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        .destination-card-elite:hover .match-badge {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 12px 25px rgba(102, 126, 234, 0.4);
        }
        .destination-content-wrapper {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
          position: relative;
          z-index: 2;
          background: transparent;
        }
        .destination-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 8px 0;
          background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
          line-height: 1.2;
          transition: all 0.3s ease;
        }
        .destination-card-elite:hover .destination-title {
          background: linear-gradient(135deg, #ffffff 0%, #c7d2fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .destination-location {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          font-weight: 500;
          color: #d1d5db;
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }
        .destination-card-elite:hover .destination-location {
          color: #e5e7eb;
          transform: translateX(2px);
        }
        .destination-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #d1d5db;
          margin: 0 0 20px 0;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .destination-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #9ca3af;
          transition: all 0.3s ease;
        }
        .destination-card-elite:hover .meta-item {
          color: #d1d5db;
        }
        .meta-icon {
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        .destination-card-elite:hover .meta-icon {
          opacity: 1;
          transform: scale(1.1);
        }
        .safety-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .destination-card-elite:hover .safety-indicator {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }
        .safety-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .destination-actions {
          display: flex;
          gap: 12px;
          margin-top: auto;
        }
        .action-btn {
          flex: 1;
          border-radius: 14px;
          font-size: 0.9rem;
          font-weight: 600;
          padding: 12px 16px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-height: 44px;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
          color: white;
        }
        .action-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s;
        }
        .action-btn:hover::before {
          left: 100%;
        }
        .action-btn:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        .action-btn:active {
          transform: translateY(0);
        }
        .primary-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
        }
        .primary-btn:hover {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .floating {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Image Section with Enhanced Effects */}
      <div className="destination-img-container">
        {!imageLoaded && <div className="image-shimmer" />}
        <img
          src={image || "/placeholder.svg"}
          alt={`${name}, ${country}`}
          className="destination-img"
          // FIXED: Apply dynamic style here instead of in the <style> block
          style={{ opacity: imageLoaded ? 1 : 0 }}
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
            {/* UPDATED: Price display */}
            <div className="meta-item">
              <DollarSign className="w-4 h-4 meta-icon" />
              <span>{priceRange}</span>
            </div>
            {idealGroupSize && (
              <div className="meta-item">
                <Users className="w-4 h-4 meta-icon" />
                <span>{idealGroupSize}</span>
              </div>
            )}
            {/* UPDATED: Safety indicator */}
            <div className="safety-indicator" title={`Safety Level: ${safetyLevel}`}>
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
```
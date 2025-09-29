import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  Shield,
  DollarSign,
  Circle,
} from "lucide-react";

interface DestinationCardProps {
  name: string;
  country: string;
  image: string;
  bestTime: string;
  priceRange: string;
  idealGroupSize?: string;
  safetyLevel: "High" | "Medium" | "Low";
}

const safetyColor: Record<DestinationCardProps["safetyLevel"], string> = {
  High: "#22c55e", // green
  Medium: "#eab308", // yellow
  Low: "#ef4444", // red
};

const safetyIcon: Record<DestinationCardProps["safetyLevel"], JSX.Element> = {
  High: <Shield className="w-4 h-4" />,
  Medium: <Shield className="w-4 h-4" />,
  Low: <Shield className="w-4 h-4" />,
};

const priceIcons: Record<string, JSX.Element> = {
  Budget: <DollarSign className="w-4 h-4" />,
  Moderate: (
    <>
      <DollarSign className="w-4 h-4" />
      <DollarSign className="w-4 h-4" />
    </>
  ),
  Luxury: (
    <>
      <DollarSign className="w-4 h-4" />
      <DollarSign className="w-4 h-4" />
      <DollarSign className="w-4 h-4" />
    </>
  ),
};

export function DestinationCard({
  name,
  country,
  image,
  bestTime,
  priceRange,
  idealGroupSize,
  safetyLevel,
}: DestinationCardProps) {
  return (
    <Card className="destination-card-elite">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover rounded-t-xl" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{country}</p>

        {/* Meta Grid */}
        <div className="destination-meta-grid mt-3">
          <div className="meta-item">
            <Clock className="w-4 h-4 meta-icon" />
            <span>{bestTime}</span>
          </div>

          <div className="meta-item">
            <span className="flex gap-1 meta-icon">{priceIcons[priceRange]}</span>
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

        <Button className="mt-4 w-full">Explore</Button>
      </div>

      {/* CSS-in-JSX style (can move to CSS file if needed) */}
      <style>{`
        .destination-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: #9ca3af;
          line-height: 1.4;
          transition: all 0.3s ease;
        }
        .destination-card-elite:hover .meta-item {
          color: #d1d5db;
        }
        .meta-icon {
          flex-shrink: 0;
          opacity: 0.8;
          transition: all 0.3s ease;
        }
        .destination-card-elite:hover .meta-icon {
          opacity: 1;
          transform: scale(1.05);
        }
        .safety-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          padding: 6px 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .destination-card-elite:hover .safety-indicator {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-1px);
        }
        .safety-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </Card>
  );
}

export const DestinationCard = ({ ...props }: DestinationCardProps) => {
  return (
    <Card className="destination-card-split">
      <style>{`
        .destination-card-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 300px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
        }

        .destination-card-split:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .split-media {
          position: relative;
          overflow: hidden;
        }

        .split-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .destination-card-split:hover .split-media img {
          transform: scale(1.05);
        }

        .split-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .split-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
        }

        .split-location {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #94a3b8;
          margin-bottom: 16px;
        }

        .split-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin: 20px 0;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
        }

        .feature-icon {
          opacity: 0.7;
        }

        .split-actions {
          display: flex;
          gap: 10px;
        }

        .split-btn {
          flex: 1;
          padding: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          background: transparent;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .split-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .split-btn.primary {
          background: rgba(59, 130, 246, 0.8);
          border-color: rgba(59, 130, 246, 0.5);
        }

        .split-btn.primary:hover {
          background: rgba(59, 130, 246, 1);
        }

        @media (max-width: 768px) {
          .destination-card-split {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="split-media">
        <img src={image} alt={name} />
      </div>

      <div className="split-content">
        <div className="split-header">
          <h3>{name}</h3>
          <div className="split-location">
            <MapPin size={16} />
            {country}
          </div>
          <p className="minimal-description">{description}</p>
        </div>

        <div>
          <div className="split-features">
            <div className="feature">
              <Clock className="feature-icon" size={16} />
              <span>{bestTime}</span>
            </div>
            <div className="feature">
              <span>{priceRange}</span>
            </div>
            <div className="feature">
              <Shield className="feature-icon" size={16} />
              <span style={{ color: safetyColor[safetyLevel] }}>{safetyLevel}</span>
            </div>
            <div className="feature">
              <Heart className="feature-icon" size={16} />
              <span>{matchPercentage}% Match</span>
            </div>
          </div>

          <div className="split-actions">
            <button className="split-btn">Details</button>
            <button className="split-btn primary">Add Plan</button>
          </div>
        </div>
      </div>
    </Card>
  );
};
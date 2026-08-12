interface StatBadgeProps {
  label: string;
  value: string | number;
}

function StatBadge({ label, value }: StatBadgeProps) {
  return (
    <div className="stat-badge">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

export default StatBadge;
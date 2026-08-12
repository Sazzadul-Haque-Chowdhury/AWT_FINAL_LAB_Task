interface DashboardHeaderProps {
  title: string;
  tagline: string;
}

function DashboardHeader({
  title,
  tagline,
}: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <div>
          <h1>{title}</h1>
          <p>{tagline}</p>
        </div>

        <nav className="dashboard-nav">
          <a href="#dashboard">Dashboard</a>
          <a href="#students">Students</a>
          <a href="#courses">Courses</a>
        </nav>
      </div>
    </header>
  );
}

export default DashboardHeader;
import { useTheme } from "../contexts/ThemeContext";

interface DashboardHeaderProps {
  title: string;
  tagline: string;
}

function DashboardHeader({
  title,
  tagline,
}: DashboardHeaderProps) {
  const { theme, toggleTheme } = useTheme();
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
      <button
  className="theme-toggle"
  onClick={toggleTheme}
>
  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
</button>
    </header>
  );
}

export default DashboardHeader;
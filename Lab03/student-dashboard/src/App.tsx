import { useEffect } from "react";
import StudentCard from "./components/StudentCard";
import StatBadge from "./components/StatBadge";
import DashboardHeader from "./components/DashboardHeader";
import SearchBar from "./components/SearchBar";
import SortControl from "./components/SortControl";
import { useStudents } from "./contexts/StudentContext";
import AddStudentForm from "./components/AddStudentForm";

function App() {
  const {
    students,
    loading,
    searchQuery,
    sortBy,
    favoriteIds,
  } = useStudents();

  useEffect(() => {
    document.title = `Student Dashboard — ${favoriteIds.length} favorites`;
  }, [favoriteIds]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading students...</p>
      </div>
    );
  }

  const averageGpa =
    students.length > 0
      ? (
          students.reduce(
            (total, student) => total + student.gpa,
            0
          ) / students.length
        ).toFixed(2)
      : "0.00";

  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase().trim();

    return (
      student.name.toLowerCase().includes(query) ||
      student.major.toLowerCase().includes(query)
    );
  });

  const sortedStudents = [...filteredStudents].sort(
    (a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      return b.gpa - a.gpa;
    }
  );

  return (
    <div className="app">
      <DashboardHeader
        title="Student Dashboard"
        tagline="Manage your academic information in one place."
      />

      <main className="dashboard-main">
        <SearchBar />

        <SortControl />

        <section className="stats-section">
          <StatBadge
            label="Total Students"
            value={students.length}
          />

          <StatBadge
            label="Average GPA"
            value={averageGpa}
          />

          <StatBadge
            label="Favorites"
            value={favoriteIds.length}
          />
        </section>

        <AddStudentForm />

        <section id="students">
          <h2>Students</h2>

          <div className="students-grid">
            {sortedStudents.map((student) => (
              <StudentCard
                key={student.id}
                name={student.name}
                id={student.id}
                avatar={student.avatar}
                gpa={student.gpa}
                major={student.major}
                courses={student.courses}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
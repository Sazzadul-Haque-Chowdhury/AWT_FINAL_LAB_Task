import { useEffect, useState } from "react";
import StudentCard from "./components/StudentCard";
import StatBadge from "./components/StatBadge";
import DashboardHeader from "./components/DashboardHeader";
import type { Student } from "./types/student";
import SearchBar from "./components/SearchBar";
import SortControl from "./components/SortControl";

const initialStudents: Student[] = [
  {
    name: "Sazzad Ahmed",
    id: "STU001",
    avatar: "https://i.pravatar.cc/150?img=12",
    gpa: 3.8,
    major: "Computer Science",
    courses: [
      "Data Structures",
      "Database Systems",
      "Web Development",
    ],
  },
  {
    name: "Nadia Rahman",
    id: "STU002",
    avatar: "https://i.pravatar.cc/150?img=47",
    gpa: 3.9,
    major: "Software Engineering",
    courses: [
      "Software Design",
      "Algorithms",
      "Web Development",
    ],
  },
  {
    name: "Tanvir Hasan",
    id: "STU003",
    avatar: "https://i.pravatar.cc/150?img=11",
    gpa: 3.6,
    major: "Information Technology",
    courses: [
      "Networking",
      "Database Systems",
      "Operating Systems",
    ],
  },
  {
    name: "Mim Akter",
    id: "STU004",
    avatar: "https://i.pravatar.cc/150?img=44",
    gpa: 3.7,
    major: "Data Science",
    courses: [
      "Statistics",
      "Machine Learning",
      "Data Analysis",
    ],
  },
];

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "gpa">("name");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(initialStudents);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
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
const handleFavoriteToggle = (studentId: string) => {
  setFavoriteIds((currentFavorites) => {
    if (currentFavorites.includes(studentId)) {
      return currentFavorites.filter((id) => id !== studentId);
    }

    return [...currentFavorites, studentId];
  });
};

  return (
    <div className="app">
      <DashboardHeader
        title="Student Dashboard"
        tagline="Manage your academic information in one place."
      />

      <main className="dashboard-main">
        <SearchBar
  query={searchQuery}
  onQueryChange={setSearchQuery}
/>
<SortControl
  sortBy={sortBy}
  onSortChange={setSortBy}
/>
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
    isFavorite={favoriteIds.includes(student.id)}
    onFavoriteToggle={() =>
      handleFavoriteToggle(student.id)
    }
  />
))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
import StudentCard from "./components/StudentCard";
import StatBadge from "./components/StatBadge";
import DashboardHeader from "./components/DashboardHeader";

function App() {
  return (
    <div>
      <h1>Student Dashboard</h1>

      <StudentCard
        name="Sazzad Chowdhury"
        id="001"
        avatar="https://i.pravatar.cc/150?img=12"
        gpa={3.4}
        major="Computer Science"
        courses={[
          "Python",
          "Dot NET",
          "Web Development",
        ]}
      />

      <div>
        <StatBadge label="GPA" value={3.4} />
        <StatBadge label="Credits" value={100} />
      </div>
    </div>
  );
}

export default App;
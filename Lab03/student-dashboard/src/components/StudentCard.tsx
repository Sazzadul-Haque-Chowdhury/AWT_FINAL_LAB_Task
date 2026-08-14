import { useStudents } from "../contexts/StudentContext";
import CourseTag from "./CourseTag";

interface StudentCardProps {
  name: string;
  id: string;
  avatar: string;
  gpa: number;
  major: string;
  courses: string[];
}

function StudentCard({
  name,
  id,
  avatar,
  gpa,
  major,
  courses,
}: StudentCardProps) {
  const {
    favoriteIds,
    handleFavoriteToggle,
    removeStudent,
  } = useStudents();

  const isFavorite = favoriteIds.includes(id);

  return (
    <div className="student-card">
      <img
        src={avatar}
        alt={`${name}'s avatar`}
        className="student-avatar"
      />

      <div className="student-info">
        <h2>{name}</h2>

        <p>Student ID: {id}</p>

        <p>Major: {major}</p>

        <p>GPA: {gpa.toFixed(2)}</p>

        <div className="courses">
          <strong>Courses:</strong>

          <div className="course-tags">
            {courses.map((course, index) => (
              <CourseTag
                key={index}
                courseName={course}
                color={
                  index % 2 === 0
                    ? "#2563eb"
                    : "#7c3aed"
                }
              />
            ))}
          </div>
        </div>

        <button
          className={`favorite-button ${
            isFavorite ? "favorited" : ""
          }`}
          onClick={() => handleFavoriteToggle(id)}
        >
          {isFavorite ? "♥ Favorited" : "♡ Favorite"}
        </button>
        <button
  className="remove-button"
  onClick={() => removeStudent(id)}
>
  Remove Student
</button>
      </div>
    </div>
  );
}

export default StudentCard;
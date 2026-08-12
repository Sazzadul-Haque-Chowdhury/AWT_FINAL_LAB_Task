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
                color={index % 2 === 0 ? "#93f019" : "#ff2a04"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;
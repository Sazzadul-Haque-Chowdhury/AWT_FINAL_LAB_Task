interface CourseTagProps {
  courseName: string;
  color: string;
}

function CourseTag({ courseName, color }: CourseTagProps) {
  return (
    <span
      className="course-tag"
      style={{ backgroundColor: color }}
    >
      {courseName}
    </span>
  );
}

export default CourseTag;
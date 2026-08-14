import { useStudents } from "../contexts/StudentContext";

function SortControl() {
  const {
    sortBy,
    setSortBy,
  } = useStudents();

  return (
    <div className="sort-control">
      <label htmlFor="sort-select">
        Sort by:
      </label>

      <select
        id="sort-select"
        value={sortBy}
        onChange={(event) =>
          setSortBy(
            event.target.value as "name" | "gpa"
          )
        }
      >
        <option value="name">Name</option>
        <option value="gpa">GPA</option>
      </select>
    </div>
  );
}

export default SortControl;
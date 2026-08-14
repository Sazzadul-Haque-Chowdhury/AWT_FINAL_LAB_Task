interface SortControlProps {
  sortBy: "name" | "gpa";
  onSortChange: (sortBy: "name" | "gpa") => void;
}

function SortControl({
  sortBy,
  onSortChange,
}: SortControlProps) {
  return (
    <div className="sort-control">
      <label htmlFor="sort-select">
        Sort by:
      </label>

      <select
        id="sort-select"
        value={sortBy}
        onChange={(event) =>
          onSortChange(
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
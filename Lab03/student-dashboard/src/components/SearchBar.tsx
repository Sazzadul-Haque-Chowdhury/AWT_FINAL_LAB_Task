import { useStudents } from "../contexts/StudentContext";

function SearchBar() {
  const {
    searchQuery,
    setSearchQuery,
  } = useStudents();

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={(event) =>
          setSearchQuery(event.target.value)
        }
        placeholder="Search by name or major..."
        aria-label="Search students"
      />
    </div>
  );
}

export default SearchBar;
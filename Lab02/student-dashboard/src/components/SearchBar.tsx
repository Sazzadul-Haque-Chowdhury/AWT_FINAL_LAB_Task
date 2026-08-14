interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

function SearchBar({
  query,
  onQueryChange,
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search by name or major..."
        aria-label="Search students"
      />
    </div>
  );
}

export default SearchBar;
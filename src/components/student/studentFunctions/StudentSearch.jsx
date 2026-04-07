import { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "../../../hooks/useDebounce";

const StudentSearch = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/students/search?q=${debouncedQuery}`
        );
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStudents();
  }, [debouncedQuery]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="🔍 Search student..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border p-2 rounded"
      />

      {results.length > 0 && (
        <div className="absolute w-full bg-white border rounded shadow max-h-60 overflow-y-auto z-10">
          {results.map((s) => (
            <div
              key={s._id}
              onClick={() => {
                onSelect(s);
                setQuery(`${s.name} (${s.course}-${s.year})`);
                setResults([]);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {s.name} ({s.course}-{s.year}) - {s.email}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentSearch;
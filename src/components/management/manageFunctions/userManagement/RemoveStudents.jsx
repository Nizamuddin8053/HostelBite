import React, { useEffect, useState } from "react";
import axios from "axios";

const RemoveStudents = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");

    // Fetch all students
    const fetchStudents = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/students/getAll");
            setStudents(res.data);
        } catch (err) {
            console.error("Error fetching students:", err);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Delete a single student
    const deleteStudent = async (student_id) => {
        if (!window.confirm("Are you sure you want to remove this student?")) return;
        
        try {
            
            await axios.delete(`http://localhost:4000/api/students/${student_id}`);
            alert("Student deleted successfully!");
            fetchStudents();
        } catch (err) {
            console.error("Error deleting student:", err);
            alert("Error deleting student");
        }
    };

    // Delete all students by course and year
    const deleteByCourseAndYear = async () => {
        if (!course || !year) return alert("Please enter both course and year!");
        if (!window.confirm(`Remove all students from ${course} - Year ${year}?`)) return;

        try {
            await axios.delete("http://localhost:4000/api/students/deleteCourseYear", {
                data: {
                    course,
                    year
                }
                
            });
            alert("All students of selected course and year deleted!");
            fetchStudents();
        } catch (err) {
            console.error("Error deleting students by course/year:", err);
        }
    };

    // Filter logic
    const filteredStudents = students.filter((s) => {
        return (
            (s.name ?? "").toLowerCase().includes(search.toLowerCase()) &&
            (course ? (s.course ?? "").toLowerCase().includes(course.toLowerCase()) : true) &&
            (year ? (s.year ?? "").toString().includes(year) : true)
        );
    });

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
                 Student List
            </h2>

            {/* Search & Filter Controls */}
            <div className="flex flex-wrap gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-48"
                />
                <input
                    type="text"
                    placeholder="Filter by course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-48"
                />
                <input
                    type="text"
                    placeholder="Filter by year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-48"
                />
                <button
                    onClick={deleteByCourseAndYear}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                    Remove All (Course & Year)
                </button>
            </div>

            {/* Student Table */}
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full border border-gray-200 text-sm text-gray-700">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="px-4 py-3 text-left border-b">ID</th>
                            <th className="px-4 py-3 text-left border-b">Name</th>
                            <th className="px-4 py-3 text-left border-b">Email</th>
                            <th className="px-4 py-3 text-left border-b">Course</th>
                            <th className="px-4 py-3 text-left border-b">Year</th>
                            <th className="px-4 py-3 text-left border-b">Room</th>
                            <th className="px-4 py-3 text-center border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((s) => (
                                <tr
                                    key={s.student_id}
                                    className="hover:bg-gray-50 transition duration-150"
                                >
                                    <td className="px-4 py-2 border-b">{s.student_id}</td>
                                    <td className="px-4 py-2 border-b">{s.name}</td>
                                    <td className="px-4 py-2 border-b">{s.email}</td>
                                    <td className="px-4 py-2 border-b">{s.course}</td>
                                    <td className="px-4 py-2 border-b">{s.year}</td>
                                    <td className="px-4 py-2 border-b">{s.room_number}</td>
                                    <td className="px-4 py-2 border-b text-center">
                                        <button
                                            onClick={() => deleteStudent(s.student_id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition duration-200"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center py-6 text-gray-500 italic border-b"
                                >
                                    No students found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default RemoveStudents;

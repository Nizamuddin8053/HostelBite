import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      
      <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
      
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">
        Access Denied
      </h2>
      
      <p className="text-gray-600 mb-6 text-center">
        You don’t have permission to access this page.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Go Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default Error;
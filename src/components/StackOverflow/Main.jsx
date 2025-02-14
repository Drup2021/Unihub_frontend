import FilterListIcon from "@mui/icons-material/FilterList";
import AllQuestions from "./AllQuestions";
import { Link } from "react-router-dom";

function Main({ questions }) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 py-10 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Top Section - Header and Ask Question Button */}
        <div className="flex justify-between items-center mb-10 px-16 w-full">
          <h2 className="text-3xl font-bold text-pri">All Questions</h2>
          <Link to="/add-question">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-bold uppercase hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg">
              Ask Question
            </button>
          </Link>
        </div>

        {/* Filter Section */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg mx-16">
          <div className="flex justify-between items-center">
            <p className="text-gray-300">{questions.length} questions</p>
            <div className="flex items-center space-x-6">
              <div className="flex space-x-4">
                <Link to="/" className="text-pri hover:text-purple-300 transition-colors">
                  Newest
                </Link>
                <Link to="/" className="text-pri hover:text-purple-300 transition-colors">
                  Active
                </Link>
                <Link to="/" className="text-pri hover:text-purple-300 transition-colors">
                  More
                </Link>
              </div>
              <div className="flex items-center space-x-2 text-pri hover:text-purple-300 transition-colors cursor-pointer">
                <FilterListIcon />
                <p>Filter</p>
              </div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6 mx-16">
          {questions?.map((_q, index) => (
            <div key={`question-${index}`}>
              <AllQuestions data={_q} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;

import Sidebar from "../StackOverflow/Sidebar";
import MainQuestion from "./MainQuestion";

const ViewQuestion = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex mt-6">
        {/* Sidebar - Fixed width */}
        {/* <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div> */}

        {/* MainQuestion - Takes up remaining space without horizontal scrolling */}
        <div className="flex-1 w-full overflow-hidden">
          <MainQuestion />
        </div>
      </div>
    </div>
  );
};

export default ViewQuestion;

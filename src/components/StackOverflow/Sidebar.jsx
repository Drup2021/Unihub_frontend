import PublicIcon from "@mui/icons-material/Public";
import StarsIcon from "@mui/icons-material/Stars";
import WorkIcon from "@mui/icons-material/Work";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 border-r border-purple-600 min-h-screen p-6">
      <div className="sidebar-container">
        <div className="sidebar-options space-y-8">
          {/* Home Option */}
          <div className="sidebar-option">
            <Link
              to="/"
              className="text-pri hover:text-purple-300 transition-colors text-lg font-semibold"
            >
              Home
            </Link>
          </div>

          {/* Public Section */}
          <div className="sidebar-option">
            <p className="text-sm text-gray-400 uppercase mb-3 tracking-wider">
              PUBLIC
            </p>
            <div className="link space-y-3">
              <div className="link-tag flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
                <PublicIcon className="text-pri" />
                <Link
                  to="/"
                  className="text-purple-200 hover:text-purple-300 transition-colors"
                >
                  Question
                </Link>
              </div>

              <div className="tags ml-10 space-y-2">
                <p className="text-gray-300 hover:text-purple-300 transition-colors">
                  Tags
                </p>
                <p className="text-gray-300 hover:text-purple-300 transition-colors">
                  Users
                </p>
              </div>
            </div>
          </div>

          {/* Collectives Section */}
          <div className="sidebar-option">
            <p className="text-sm text-gray-400 uppercase mb-3 tracking-wider">
              COLLECTIVES
            </p>
            <div className="link">
              <div className="link-tag flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
                <StarsIcon className="text-pri" />
                <Link
                  to="/"
                  className="text-purple-200 hover:text-purple-300 transition-colors"
                >
                  Explore Collectives
                </Link>
              </div>
            </div>
          </div>

          {/* Find a Job Section */}
          <div className="sidebar-option">
            <p className="text-sm text-gray-400 uppercase mb-3 tracking-wider">
              FIND A JOB
            </p>
            <div className="link space-y-3">
              <Link
                to="/"
                className="block p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors text-purple-200 hover:text-purple-300"
              >
                Jobs
              </Link>
              <Link
                to="/"
                className="block p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors text-purple-200 hover:text-purple-300"
              >
                Companies
              </Link>
            </div>
          </div>

          {/* Teams Section */}
          <div className="sidebar-option">
            <p className="text-sm text-gray-400 uppercase mb-3 tracking-wider">
              TEAMS
            </p>
            <div className="link-tag flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
              <WorkIcon className="text-purple-400" />
              <Link
                to="/"
                className="text-purple-200 hover:text-purple-300 transition-colors"
              >
                Companies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
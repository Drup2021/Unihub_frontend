import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import axios from "axios";

const StackOverflow = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getQuestion() {
      await axios.get("/api/question").then((res) => {
        setQuestions(res.data.reverse());
      });
    }
    getQuestion();
  }, []);

  return (
    <div className="flex min-h-screen w-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Sidebar - Fixed width */}
      {/* <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div> */}

      {/* Main - Takes remaining space */}
      <div className="flex-1 px-5">
        <Main questions={questions} />
      </div>
    </div>
  );
};

export default StackOverflow;

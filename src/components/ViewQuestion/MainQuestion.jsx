import { useEffect, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HistoryIcon from "@mui/icons-material/History";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function MainQuestion() {
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [
      { color: ["#ff0000", "#00ff00", "#0000ff", "#220055"] },
      { background: [] },
    ],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const Editor = {
    modules: {
      syntax: false,
      toolbar: toolbarOptions,
      clipboard: { matchVisual: false },
    },
    formats: [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "video",
    ],
  };

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");

  const [questionData, setQuestionData] = useState();
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.auth.user);

  const handleQuill = (value) => setAnswer(value);

  useEffect(() => {
    async function getFunctionDetails() {
      try {
        const res = await axios.get(`/api/question/${id}`);
        setQuestionData(res.data[0]);
      } catch (err) {
        console.error(err);
      }
    }
    getFunctionDetails();
  }, [id]);

  async function getUpdatedAnswer() {
    try {
      const res = await axios.get(`/api/question/${id}`);
      setQuestionData(res.data[0]);
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = async () => {
    console.log("Answer Submitted:", answer);

    const body = { question_id: id, answer, user };
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      await axios.post("/api/answer", body, config);
      alert("Answer added successfully");
      setAnswer("");
      getUpdatedAnswer();
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async () => {
    console.log("Comment Submitted:", comment);

    if (comment.trim()) {
      const body = { question_id: id, comment, user };
      try {
        await axios.post(`/api/comment/${id}`, body);
        setComment("");
        setShow(false);
        getUpdatedAnswer();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4">
      <div className="max-w-3xl mx-auto mt-12"> {/* Increased spacing */}
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-pri">
            {questionData?.title || "Loading..."}
          </h2>
          <Link to="/add-question">
            <button className="bg-gradient-to-r from-pri to-blue-600 text-white px-6 py-3 rounded-full font-bold uppercase hover:from-pri-dark hover:to-blue-700 transition-all shadow-lg mt-4">
              Ask Question
            </button>
          </Link>
        </div>

        {/* Question Details */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-10 shadow-lg">
          <div className="text-sm text-gray-300 mb-6">
            <p>Asked {new Date(questionData?.created_at || Date.now()).toLocaleString()}</p>
            <p>Active <span>today</span></p>
            <p>Viewed <span>43 times</span></p>
          </div>

          {/* Question Body */}
          <div className="prose text-pri">{parse(questionData?.body || "")}</div>
        </div>

        {/* Answers Section */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-10 shadow-lg">
          <p className="text-2xl font-bold text-pri mb-6">
            {questionData?.answerDetails?.length || 0} Answers
          </p>
          {questionData?.answerDetails?.map((_q) => (
            <div key={_q._id} className="flex border-b border-pri pb-6 mb-6">
              <div className="prose text-pri">{parse(_q.answer || "")}</div>
            </div>
          ))}
        </div>

        {/* Your Answer Section */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-pri mb-6">Your Answer</h3>
          <div className="bg-gray-700 rounded-lg border border-pri">
            <ReactQuill
              value={answer}
              onChange={handleQuill}
              modules={Editor.modules}
              theme="snow"
              className="text-pri text-lg"
              placeholder="Write your answer here..."
            />
          </div>
          <button
            className="bg-gradient-to-r from-pri to-blue-600 text-white px-6 py-3 rounded-full mt-6 font-bold uppercase hover:from-pri-dark hover:to-blue-700 transition-all w-full shadow-lg"
            onClick={handleSubmit}
          >
            Post your answer
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainQuestion;
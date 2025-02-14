import { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TagsInput } from "react-tag-input-component";
import { useNavigate } from "react-router-dom";

const AddQuestion = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data safely
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored && stored.username) {
      setUser(stored.username);
    } else {
      console.error("No user found in localStorage");
    }
  }, []);

  // Quill toolbar configuration
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const quillModules = {
    toolbar: toolbarOptions,
    clipboard: {
      matchVisual: false,
    },
  };

  const quillFormats = [
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
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Title:", title);
    console.log("Body:", body);
    console.log("Tags:", tag);

    if (title.trim() !== "" && body.trim() !== "") {
      const bodyJSON = {
        title,
        body,
        tag: JSON.stringify(tag),
        user,
      };

      try {
        await axios.post("/api/question", bodyJSON);
        alert("Question added successfully");
        navigate("/");
      } catch (err) {
        console.error("Error submitting question:", err);
      }
    } else {
      alert("Title and body are required fields.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="max-w-3xl w-full mx-auto space-y-5">
        {/* Header */}
        <div className="bg-gray-800 rounded-2xl p-5 shadow-lg">
          <h1 className="text-4xl font-bold text-pri mb-2 text-center">
            Ask a Public Question
          </h1>
          <p className="text-gray-300 text-center">
            Be specific and imagine you’re asking a question to another person.
          </p>
        </div>

        {/* Title Input */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <label className="block text-lg font-semibold text-pri mb-3">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full p-3 border border-pri rounded-lg bg-gray-700 text-pri placeholder-pri focus:ring-2 focus:ring-pri focus:border-pri transition-all text-lg"
            placeholder="e.g. Do you know when does the Insitute Canteen open in the morning on weekends?"
          />
          <small className="text-sm text-gray-400 mt-2">
            Be specific and concise with your question title.
          </small>
        </div>

        {/* Body Input */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <label className="block text-lg font-semibold text-pri mb-2">
            Body
          </label>
          <div className="bg-gray-700 rounded-lg border border-pri">
            <ReactQuill
              value={body}
              onChange={setBody}
              modules={quillModules}
              formats={quillFormats}
              theme="snow"
              className="text-pri text-lg"
              placeholder="Include all your information here."
            />
          </div>
          <small className="text-sm text-gray-400 mt-2">
            Provide detailed information to get the best answers.
          </small>
        </div>

        {/* Tags Input */}
        <div className="bg-gray-800 rounded-2xl p-5 shadow-lg">
          <label className="block text-lg font-semibold text-pri mb-2">
            Tags
          </label>
          <TagsInput
            value={tag}
            onChange={setTag}
            className="w-full p-3 border border-pri rounded-lg bg-gray-700 text-pri placeholder-pri focus:ring-2 focus:ring-pri focus:border-pri transition-all text-lg"
            placeHolder="Press enter to add a new tag"
          />
          <small className="text-sm text-gray-400 mt-2">
            Add up to 5 tags to describe what your question is about.
          </small>
        </div>

        {/* Submit Button */}
        <div className="bg-gray-800 rounded-2xl p-8 shadow-lg">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-pri to-blue-600 text-white px-6 py-3 rounded-lg font-bold uppercase hover:from-pri-dark hover:to-blue-700 transition-all shadow-lg text-lg"
          >
            Add Your Question
          </button>
        </div>
      </div>

      <style>
        {`
          .ql-toolbar.ql-snow {
            border: 1px solid #6d28d9 !important;
            border-radius: 8px 8px 0 0;
            background-color: #374151;
          }
          .ql-container.ql-snow {
            border: 1px solid #6d28d9 !important;
            border-radius: 0 0 8px 8px;
            background-color: #374151;
          }
          .ql-snow .ql-stroke {
            stroke: #d8b4fe !important;
          }
          .ql-snow .ql-fill {
            fill: #d8b4fe !important;
          }
          .ql-snow .ql-picker {
            color: #d8b4fe !important;
          }
          .ql-editor {
            font-size: 1.125rem;
            color: #e9d5ff;
          }
          .ql-editor.ql-blank::before {
            color: #9ca3af;
            font-size: 1.125rem;
            font-style: normal !important;
          }
        `}
      </style>
    </div>
  );
};

export default AddQuestion;

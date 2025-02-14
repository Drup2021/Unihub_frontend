import { useState } from "react";
import Input from "../../components/Input/Input";
import { motion } from "motion/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, logout } from "../../store/auth/authThunks";
import { useNavigate } from "react-router";
import Spinner from "../../components/Spinner/Spinner";
import { Link } from "react-router";

const DeleteAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      return;
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const result = await dispatch(deleteAccount({ email, password }));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success(result.payload.message);
        setEmail("");
        setPassword("");
        await dispatch(logout());
        navigate("/");
      } else {
        const errorMsg = result.payload || "Deletion failed. Please try again.";
        toast.error(errorMsg);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Server error occurred.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-full h-screen bg-back flex items-center justify-center">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        className="md:w-fit"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="rounded-xl md:w-[50dvw] flex flex-col md:flex-row md:justify-between p-4 md:p-8 border border-border bg-back shadow-2xl"
      >
        <div className="text-xl text-heading font-bold uppercase text-center mb-4">
          Delete Account
        </div>
        <form
          className="flex flex-col gap-4 p-4 w-[80dvw] md:w-1/2"
          onSubmit={handleSubmit}
        >
          <Input color1="#282829" color2="#4CAF50" className="rounded-xl p-px">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="rounded-xl focus:outline-none h-12 text-txt px-4 bg-back w-full"
            />
          </Input>
          <Input color1="#282829" color2="#4CAF50" className="rounded-xl p-px">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="rounded-xl focus:outline-none h-12 text-txt px-4 bg-back w-full"
            />
          </Input>
          <div className="text-red-600 text-sm text-center">{errorMessage}</div>
          <Link to="/resetPassword" className="rounded-xl text-pri text-center">
            Forgot Password?
          </Link>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="rounded-xl bg-pri w-full h-12"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Delete Account"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default DeleteAccount;

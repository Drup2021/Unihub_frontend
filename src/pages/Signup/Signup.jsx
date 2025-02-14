import { useState } from "react";
import Input from "../../components/Input/Input";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signup } from "../../store/auth/authThunks";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import { Link } from "react-router";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const validatePassword = (pass, confirmPass) => {
    if (!pass || !confirmPass) {
      setErrorMessage("Password fields cannot be empty.");
    } else if (pass !== confirmPass) {
      setErrorMessage("Passwords do not match.");
    } else if (pass.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
    } else {
      setErrorMessage("Passwords matched");
    }
  };

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

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validatePassword(password, value);
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();

    if (!email || !username || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (errorMessage && errorMessage !== "Passwords matched") {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      const result = await dispatch(signup({ email, username, password }));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success(result.payload.message);
        setTimeout(() => navigate("/verifyEmail"), 2000);
      } else {
        const errorMsg = result.payload || "Signup failed";
        toast.error(errorMsg);
      }
    } catch (e) {
      console.error(e);
      toast.error("An unexpected error occurred. Please try again.");
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
        className="rounded-xl md:w-[50dvw] flex flex-col md:flex-row md:justify-between p-4 md:p-8 bg-back border border-border shadow-xl"
      >
        <div className="text-2xl text-heading font-bold uppercase text-center mb-4">
          Sign up
        </div>
        <form
          className="flex flex-col w-[80dvw] gap-4 p-4 md:w-1/2"
          onSubmit={handleSubmitSignup}
        >
          <Input color1="#282829" color2="#4CAF50" className="rounded-xl p-px">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="rounded-xl focus:outline-none h-12 text-txt px-4 bg-back w-full"
              autoComplete="off"
            />
          </Input>
          <Input color1="#282829" color2="#4CAF50" className="rounded-xl p-px ">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              className="rounded-xl focus:outline-none h-12 text-txt px-4 bg-back w-full"
              autoComplete="off"
            />
          </Input>
          <Input color1="#282829" color2="#4CAF50" className="rounded-xl p-px ">
            <select
              type="text"
              placeholder="Role"
              value={role}
              onChange={handleUsernameChange}
              className="rounded-xl focus:outline-none h-12 text-txt px-4 bg-back w-full"
              autoComplete="off"
            ></select>
          </Input>
          <Input color1="#282829" color2="#4CAF50" className="rounded-xl p-px">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="rounded-xl focus:outline-none h-12 text-txt px-4 bg-back w-full"
              autoComplete="off"
            />
          </Input>
          <Input color1="#282829" color2="#4CAF50" className="rounded-xl p-px">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="rounded-xl focus:outline-none h-12 text-txt px-4 bg-back w-full"
              autoComplete="off"
            />
          </Input>
          <AnimatePresence mode="wait">
            {errorMessage ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0 }}
                key={"errorMessage"}
                className={`${
                  errorMessage === "Passwords matched"
                    ? "text-green-600"
                    : "text-red-600"
                } text-sm text-center`}
              >
                {errorMessage}
              </motion.div>
            ) : (
              <div className="h-[20px]"></div>
            )}
          </AnimatePresence>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="rounded-xl bg-pri w-full h-12"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Sign up"}
          </motion.button>
          <Link to="/login" className="rounded-xl text-txt text-center">
            Already have an account? Login{" "}
          </Link>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;

import { toast, ToastContainer } from "react-toastify";
import { motion } from "motion/react";
import { useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import Input from "../../components/Input/Input";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetPassword } from "@/store/auth/authThunks";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const params = useParams();
  const { token } = params;

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(resetPassword({ password, token }));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success(result.payload.message);
        setPassword("");
        setConfirmPassword("");
      } else {
        const errorMsg = result.payload || " Please try again.";
        toast.error(errorMsg);
      }
      dispatch(logout());
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Server error occurred.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-screen h-[100dvh]  bg-back flex justify-center items-center">
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
          Reset Password
        </div>
        <form
          className="flex flex-col gap-4 p-4 w-[80dvw] md:w-1/2"
          onSubmit={handleSubmit}
        >
          <Input color1="#282829" color2="#4CAF50" className="rounded-xl p-px">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="rounded-xl focus:outline-none h-12 text-txt px-4 bg-back w-full"
            />
          </Input>
          <Input color1="#282829" color2="#4CAF50" className="rounded-xl p-px">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="rounded-xl focus:outline-none h-12 text-txt px-4 bg-back w-full"
            />
          </Input>
          {errorMessage && (
            <div
              className={`${
                errorMessage === "Passwords matched"
                  ? "text-green-600"
                  : "text-red-600"
              } text-sm text-center`}
            >
              {errorMessage}
            </div>
          )}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="rounded-xl bg-pri w-full h-12"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Reset Password"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;

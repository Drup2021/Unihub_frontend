import { toast, ToastContainer } from "react-toastify";
import { motion } from "motion/react";
import { useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import Input from "../../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "@/store/auth/authThunks";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(forgotPassword({ email }));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success(result.payload.message);
        setTimeout(() => {
          toast.info("Check your mail!");
        }, 2000);
        setEmail("");
      } else {
        const errorMsg = result.payload || " Please try again.";
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
          Forgot Password
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
          <div className="text-red-600 text-sm text-center">{errorMessage}</div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="rounded-xl bg-pri w-full h-12"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Send reset mail"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;

import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { verifyEmail } from "@/store/auth/authThunks";
import Spinner from "../../components/Spinner/Spinner";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        verifyEmail({ verificationToken: e.target[0].value })
      );
      if (result.meta.requestStatus === "fulfilled") {
        toast.success(result.payload.message);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const errorMsg = result.payload || "Verification failed";
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
        className="rounded-xl w-[90dvw] md:w-[50dvw] flex flex-col md:flex-row md:justify-between py-8 md:p-8 bg-back border border-border shadow-xl"
      >
        <div className="text-2xl text-heading font-bold uppercase text-center mb-4">
          Verify Email
        </div>
        <form
          className=" flex flex-col items-center gap-4 p-2  md:p-4"
          onSubmit={handleSubmit}
        >
          <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
            <InputOTPGroup className="flex gap-1 md:gap-2">
              <InputOTPSlot
                index={0}
                className="md:w-12 md:h-12 text-white md:text-xl ring-white  bg-transparent border border-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
              />
              <InputOTPSlot
                index={1}
                className="md:w-12 md:h-12 text-white md:text-xl ring-white  bg-transparent border border-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
              />
              <InputOTPSlot
                index={2}
                className="md:w-12 md:h-12 text-white md:text-xl ring-white bg-transparent border border-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
              />
              <InputOTPSlot
                index={3}
                className="md:w-12 md:h-12 text-white md:text-xl ring-white bg-transparent border border-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
              />
              <InputOTPSlot
                index={4}
                className="md:w-12 md:h-12 text-white md:text-xl ring-white bg-transparent border border-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
              />
              <InputOTPSlot
                index={5}
                className="md:w-12 md:h-12 text-white md:text-xl ring-white bg-transparent border border-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
              />
            </InputOTPGroup>
          </InputOTP>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="rounded-xl bg-pri w-1/2 md:w-full h-12"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Verify"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;

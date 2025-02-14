import { ToastContainer } from "react-toastify";
import StackOverflow from "../../components/StackOverflow";
import AddQuestion from "../../components/AddQuestion";
import ViewQuestion from "@/components/ViewQuestion";

const Forum = () => {
  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        className="md:w-fit"
      />
      <StackOverflow />
      <AddQuestion />
      <ViewQuestion />
    </div>
  );
};

export default Forum;

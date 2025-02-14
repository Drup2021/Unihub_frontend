import { motion } from "motion/react";
import { useState } from "react";
import Loading from "../Loading/Loading";

const Error404 = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 5000);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div className="w-[100dvw] h-[100dvh] bg-back text-txt grid place-content-center place-items-center  gap-4">
      <div className="text-6xl"> Error 404</div>
      <div className="text-center">
        <div>Page does not exist</div>
        <div>Either login or try another route</div>
      </div>
    </motion.div>
  );
};

export default Error404;

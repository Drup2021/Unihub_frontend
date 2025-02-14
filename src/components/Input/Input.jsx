import { motion } from "motion/react";
import { useState } from "react";

const Input = ({ color1, color2, duration = 4, children, className = "" }) => {
  const [interactionState, setInteractionState] = useState(null);
  const [focus, setFocus] = useState(false);

  return (
    <motion.div
      initial={{
        background: `linear-gradient(0deg, ${color1} 0% 30%, ${color2} 45% 65%, ${color1} 70% 100%)`,
      }}
      animate={
        interactionState === "play" || focus
          ? {
              background: `linear-gradient(360deg, ${color1} 0% 30%, ${color2} 45% 65%, ${color1} 70% 100%)`,
              transition: {
                duration,
                repeat: Infinity,
                ease: "linear",
              },
            }
          : undefined
      }
      onMouseMove={() => setInteractionState("play")}
      onMouseLeave={() => {
        setInteractionState(null);
      }}
      className={` ${className} `}
    >
      <div
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Input;

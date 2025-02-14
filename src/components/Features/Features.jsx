import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";

const Features = ({ setPosition }) => {
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { label: "forum", to: "/forum" },
    { label: "events", to: "/events" },
    { label: "maps", to: "/maps" },
  ];

  const featureRef = useRef(null);

  return (
    <>
      <button
        ref={featureRef}
        onMouseEnter={() => {
          if (!featureRef?.current) return;

          const { width } = featureRef.current.getBoundingClientRect();

          setPosition({
            left: featureRef.current.offsetLeft,
            width,
            opacity: 1,
          });
        }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative z-10 cursor-pointer w-fit h-12 px-4  text-pri mix-blend-difference flex flex-col items-center justify-center "
      >
        <motion.div
          animate={isOpen ? { rotate: "45deg", y: 4 } : { rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="w-4 h-[2px] my-[1px] bg-pri origin-center"
        ></motion.div>
        <motion.div
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-4 h-[2px] my-[1px] bg-pri"
        ></motion.div>
        <motion.div
          animate={isOpen ? { rotate: "-45deg", y: -4 } : { rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="w-4 h-[2px] my-[1px] bg-pri origin-center"
        ></motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute right-0 top-12 bg-back border border-border rounded-md shadow-lg"
          >
            <div className="flex flex-col p-2">
              {routes.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 cursor-pointer font-medium uppercase hover:bg-pri hover:text-back rounded-md text-txt text-center"
                >
                  <Link to={item.to} className="w-full block">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Features;

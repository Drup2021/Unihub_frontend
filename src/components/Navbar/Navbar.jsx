import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/auth/authThunks";
import Features from "../Features/Features";

const Navbar = () => {
  return (
    <div className="flex justify-center w-[100dvw]  ">
      <SlideTabs />
    </div>
  );
};
export default Navbar;

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const buttonRef = useRef(null);

  const { scrollDirection } = useSelector((state) => state.scrollDirection);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setPosition({ left: 0, width: 0, opacity: 0 });
  }, [isAuthenticated]);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <AnimatePresence>
        {scrollDirection === "up" && (
          <>
            <motion.ul
              initial={{ y: -75 }}
              animate={{ y: 10 }}
              exit={{ y: -75 }}
              transition={{ duration: 0.5 }}
              onMouseLeave={() => {
                setPosition((pv) => ({
                  ...pv,
                  opacity: 0,
                }));
              }}
              className=" fixed z-50 flex justify-evenly items-center w-fit h-12 rounded-full bg-pri px-1 border-2 border-bord"
            >
              <Tab to="/" setPosition={setPosition}>
                Home
              </Tab>
              {isAuthenticated ? (
                <>
                  <Tab to="/chatbot" setPosition={setPosition}>
                    Chatbot
                  </Tab>

                  {!isSmallScreen && (
                    <>
                      <Tab to="/forum" setPosition={setPosition}>
                        Forum
                      </Tab>
                      <Tab to="/events" setPosition={setPosition}>
                        Events
                      </Tab>
                      <Tab to="/maps" setPosition={setPosition}>
                        Maps
                      </Tab>
                    </>
                  )}

                  <button
                    ref={buttonRef}
                    onMouseEnter={() => {
                      if (!buttonRef?.current) return;

                      const { width } =
                        buttonRef.current.getBoundingClientRect();

                      setPosition({
                        left: buttonRef.current.offsetLeft,
                        width,
                        opacity: 1,
                      });
                    }}
                    className={`relative z-10 cursor-pointer  w-fit px-3 text-sm font-bold text-pri uppercase mix-blend-difference md:px-5 md:py-3 md:text-base `}
                    onClick={() => {
                      const response = confirm("Confirm logout?");
                      if (response) {
                        dispatch(logout());
                        navigate("/");
                      }
                    }}
                  >
                    Logout
                  </button>

                  {isSmallScreen && <Features setPosition={setPosition} />}
                </>
              ) : (
                <>
                  <Tab to="/signup" setPosition={setPosition}>
                    Sign up
                  </Tab>
                  <Tab to="/login" setPosition={setPosition}>
                    Log in
                  </Tab>
                </>
              )}
              <Cursor position={position} />
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const Tab = ({ children, setPosition, to }) => {
  const ref = useRef(null);
  const location = useLocation();
  return (
    <Link
      to={`${to}`}
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className={`relative z-10 block cursor-pointer px-3 text-sm font-bold text-pri ${
        location.pathname === to && "underline underline-offset-4"
      }  uppercase mix-blend-difference md:px-5  md:text-base `}
    >
      {children}
    </Link>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      transition={{
        opacity: { duration: 0 },
      }}
      className="absolute z-0 h-10 rounded-full bg-back"
    />
  );
};

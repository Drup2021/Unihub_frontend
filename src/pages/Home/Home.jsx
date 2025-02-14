import { useState, useEffect } from "react";
import data from "./data.json";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion"; // Import motion from framer-motion
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Calendar,
  User,
  Star,
  Mail,
} from "lucide-react"; // Lucide Icons
import logo from "../../assets/logo.svg";

const Home = () => {
  const { events, forumPosts, testimonials, team } = data;
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  // Auto-slide events every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 4000); // 4 seconds
    return () => clearInterval(interval);
  }, [events.length]);

  // Manual navigation for events
  const goToNextEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const goToPreviousEvent = () => {
    setCurrentEventIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="bg-black text-white font-sans min-h-screen p-12">
        {/* Header Section */}
        <header className="text-center mb-20">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome to UniHub
          </h1>
          <p className="text-2xl text-teal-400">
            A one-stop solution to all student problems
          </p>
          <p>Built By Students For Students</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-8 py-4 text-lg font-bold text-black bg-gradient-to-r bg-pri rounded-full"
          >
            Register
          </motion.button>
        </header>

        {/* Chatbot Section */}
        <section className="bg-gray-800 p-10 rounded-lg shadow-lg mb-24">
          <div className="flex items-center gap-8">
            <motion.img
              src={logo}
              alt="Chatbot"
              className="w-36 h-36 rounded-full border-4 border-teal-400"
              whileHover={{ scale: 1.05 }}
            />
            <div>
              <h2 className="text-3xl text-teal-400 mb-4">
                Meet BLAKE - Your FRIENDLY NEIGHBOURHOOD chatbot
              </h2>
              <p className="text-lg">
                Meet Blake, your AI study buddy. Ask me anything!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-3 text-lg font-bold text-black bg-gradient-to-r bg-pri rounded-full flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" /> Chat Now
              </motion.button>
            </div>
          </div>
        </section>

        {/* Forum Section */}
        <section className="bg-gray-800 p-10 rounded-lg shadow-lg mb-24">
          <h2 className="text-3xl text-teal-400 mb-8">Latest Forum Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {forumPosts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-2xl mb-4">{post.title}</h3>
                <p className="text-teal-400 flex items-center gap-2">
                  <User className="w-5 h-5" /> By {post.author}
                </p>
                <p className="text-lg mt-4">{post.content}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-6 py-3 text-lg font-bold text-black bg-gradient-to-r bg-pri rounded-full"
                >
                  Read More
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Events Section */}
        <section className="mb-24">
          <h2 className="text-3xl text-teal-400 mb-8">Upcoming Events</h2>
          <div className="relative overflow-hidden h-[500px]">
            <motion.div
              className="flex"
              style={{ width: `${events.length * 100}%` }}
              animate={{ x: `-${currentEventIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-700 p-10 rounded-lg shadow-md text-center min-w-full flex-shrink-0"
                >
                  <img
                    src={logo}
                    alt={event.title}
                    className="w-full h-72 rounded-lg object-cover mb-6"
                  />
                  <h3 className="text-2xl mb-4">{event.title}</h3>
                  <p className="text-teal-400 flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" /> {event.date}
                  </p>
                  <p className="text-lg mt-4">{event.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-teal-400 to-purple-600 rounded-full"
                  >
                    Learn More
                  </motion.button>
                </div>
              ))}
            </motion.div>
            <motion.button
              onClick={goToPreviousEvent}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-teal-400/80 rounded-full p-3 text-white text-2xl"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={goToNextEvent}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-teal-400/80 rounded-full p-3 text-white text-2xl"
            >
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gray-800 p-10 rounded-lg shadow-lg mb-24">
          <h2 className="text-3xl text-teal-400 mb-8">What Our Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700 p-6 rounded-lg shadow-md text-center"
              >
                <p className="text-lg italic">
                  &quot;{testimonial.comment}&quot;
                </p>
                <p className="text-teal-400 flex items-center justify-center gap-2 mt-4">
                  <Star className="w-5 h-5" /> - {testimonial.name}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-teal-400 to-purple-600 rounded-full"
                >
                  View Profile
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-gray-800 p-10 rounded-lg shadow-lg mb-24">
          <h2 className="text-3xl text-teal-400 mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <motion.div
                key={member.id}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <img
                  src={logo}
                  alt={member.name}
                  className="w-36 h-36 rounded-full border-4 border-teal-400 mx-auto mb-4"
                />
                <h3 className="text-2xl mb-2">{member.name}</h3>
                <p className="text-teal-400">{member.role}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-teal-400 to-purple-600 rounded-full"
                >
                  Contact
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-gray-800 p-10 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl text-teal-400 mb-4">Contact Us</h2>
          <p className="text-lg">
            Have questions or feedback? Reach out to us at{" "}
            <a
              href="mailto:info@example.com"
              className="text-teal-400 hover:underline"
            >
              <Mail className="inline-block w-5 h-5" /> info@example.com
            </a>
            . We&apos;d love to hear from you!
          </p>
        </footer>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        className="md:w-fit"
      />
    </>
  );
};

export default Home;

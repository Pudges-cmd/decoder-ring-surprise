import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, Gift } from "lucide-react";

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isUnlocked, setIsUnlocked] = useState(true); // TODO: Change back to false before Dec 24
  const [letterOpened, setLetterOpened] = useState(false);

  const targetDate = new Date("2025-12-24T00:00:00");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsUnlocked(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const letterContent = `To start this off I'd like to greet you a Happy Birthday first and a Merry Christmas. I pray for more birthdays and holidays to come in your future.

You definitely know who I am by now. If not, I'm the one from the room next to yours with the bad haircut, also I'm the one that sent you that embarrassing message to you that one time. Yeah, its that one.

To not, beat around the bush, I like you. I don't mind not having it reciprocated, I just want to tell you that myself, and honestly it being your birthday and the holidays at the same time helped push me to it.

You've honestly been an inspiration for me, and I hope you know that I think your honestly a cool and great person. To conclude, I just wanted to greet you, and I hope that you have a great rest of your day. I'm not expecting to come from this, but I'd like to be your friend.`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 via-pink-50 to-rose-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/40"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {i % 3 === 0 ? <Sparkles size={20} /> : i % 3 === 1 ? <Star size={16} /> : <div className="w-3 h-3 rounded-full bg-pink-200/50" />}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Gift className="w-20 h-20 mx-auto text-pink-400 mb-6" />
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-serif text-pink-600 mb-3">
              Something Special Awaits...
            </h1>
            <p className="text-pink-400 mb-10 text-lg">Opens on December 24th</p>

            <div className="flex gap-4 md:gap-6 justify-center mb-8">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg shadow-pink-200/50 min-w-[70px] md:min-w-[90px]"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span
                    key={item.value}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="block text-3xl md:text-4xl font-bold text-pink-500"
                  >
                    {String(item.value).padStart(2, "0")}
                  </motion.span>
                  <span className="text-xs md:text-sm text-pink-400 uppercase tracking-wider">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <p className="text-pink-300 text-sm italic">Be patient~ ✨</p>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-2xl z-10"
          >
            {!letterOpened ? (
              <motion.div
                className="text-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              >
                <h1 className="text-3xl md:text-4xl font-serif text-pink-600 mb-6">
                  Happy Birthday! 🎂
                </h1>
                <p className="text-pink-400 mb-8">You have a letter waiting for you...</p>
                
                <motion.button
                  onClick={() => setLetterOpened(true)}
                  className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg shadow-pink-300/50 hover:shadow-xl hover:shadow-pink-300/60 transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles size={20} />
                    Open Letter
                    <Sparkles size={20} />
                  </span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl shadow-pink-200/50"
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Sparkles className="w-10 h-10 mx-auto text-pink-400 mb-4" />
                  </motion.div>
                  <h2 className="text-2xl md:text-3xl font-serif text-pink-600">
                    For You
                  </h2>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="prose prose-pink max-w-none"
                >
                  {letterContent.split("\n\n").map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.3 }}
                      className="text-pink-700/80 leading-relaxed mb-4 text-base md:text-lg"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  className="mt-10 text-right"
                >
                  <p className="text-pink-500 italic text-lg">From</p>
                  <p className="text-pink-600 font-serif text-2xl mt-1">Guian</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                  className="mt-8 pt-6 border-t border-pink-200 text-center"
                >
                  <p className="text-pink-400 text-sm">
                    ✨ Wishing you the happiest birthday ✨
                  </p>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

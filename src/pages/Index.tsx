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
  const [isUnlocked, setIsUnlocked] = useState(true); // Preview mode
  const [letterOpened, setLetterOpened] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [greetingRead, setGreetingRead] = useState(false);

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

  const letterParagraphs = [
    "To start this off, I'd like to greet you with a Happy Birthday and a Merry Christmas. I pray for more birthdays and holidays to come in your future.",
    "You know who I am now. If not, I'm the one from the room next to yours with the bad haircut, also I'm the one that sent you that embarrassing message that one time. Yeah, its that one. Honestly, I don't know what got over me that I managed to message you then, but I'd like to apologize for how sudden that was.",
    "Anyways, to not, beat around the bush, I like you. Also, I wanted to ask...",
    "If pwede ba manligaw?",
    "HAHAHAHHA Ang corny, sorry, I was joking, it's a bit too early for me to do that na diba? Really, though, I just want you to know that I admire you a lot.",
    "I don't understand it myself. I guess one day, I just started to notice you despite never really knowing you. And, when people found out that I liked you, I started hearing more about you, and all of that made me like you even more.",
    "Honestly, I just wanted to tell you myself that I liked you. Ang boring naman if narinig mo lang sa iba and not from me diba?",
    "Theres so much I'd like to say, but I don't want this to be overwhelming. So, I'll end it like this. I'd be glad to get the chance to better get to know you better and to start that, I'd like to formally ask to be your friend :)",
    "Once again, Happy Birthday, I hope you appreciate this and not find this weird. I'm not expecting to have anything reciprocated, I just wanted to take the chance to say what I feel and tell you that I think you're an amazing person. I'd love to hear a response if you have one. Thanks for taking the time to read and have a great rest of your day, Mary!"
  ];

  // Auto-advance after the "manligaw" joke paragraph (index 3) after 3 seconds
  useEffect(() => {
    if (currentParagraph === 3) {
      const timer = setTimeout(() => {
        setCurrentParagraph(4);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentParagraph]);

  const handleNextParagraph = () => {
    if (currentParagraph < letterParagraphs.length - 1) {
      setCurrentParagraph(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-cute">
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-200/30 via-transparent to-transparent pointer-events-none" />
      
      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) 
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {i % 4 === 0 ? (
              <Sparkles className="text-pink-300/50" size={16 + Math.random() * 10} />
            ) : i % 4 === 1 ? (
              <Star className="text-rose-300/40" size={12 + Math.random() * 8} />
            ) : i % 4 === 2 ? (
              <div className="w-2 h-2 rounded-full bg-pink-300/40" />
            ) : (
              <div className="w-3 h-3 rounded-full bg-rose-200/50 blur-[1px]" />
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          !greetingRead ? (
            <motion.div
              key="greeting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center z-10 max-w-lg"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-16 h-16 mx-auto text-pink-400 mb-6 drop-shadow-lg" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-pink-200/40 border border-pink-100 mb-8"
              >
                <p className="text-pink-600/90 text-lg md:text-xl leading-relaxed font-medium">
                  Goodmorning! I saw you visited kanina, anyways happy one day before your birthday!
                </p>
              </motion.div>
              
              <motion.button
                onClick={() => setGreetingRead(true)}
                className="bg-gradient-to-r from-pink-300 to-rose-300 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-pink-200/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                See countdown~
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center z-10"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.08, 1],
                  rotate: [0, 3, -3, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Gift className="w-24 h-24 mx-auto text-pink-400 mb-8 drop-shadow-lg" />
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-script text-pink-500 mb-4 drop-shadow-sm">
                Something Special Awaits~
              </h1>
              <p className="text-pink-400 mb-12 text-lg font-medium tracking-wide">
                Opens on December 24th ✨
              </p>

              <div className="flex gap-3 md:gap-5 justify-center mb-10">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Mins", value: timeLeft.minutes },
                  { label: "Secs", value: timeLeft.seconds },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    className="bg-white/60 backdrop-blur-md rounded-3xl p-4 md:p-6 shadow-xl shadow-pink-200/40 min-w-[70px] md:min-w-[100px] border border-pink-100"
                    whileHover={{ scale: 1.08, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.span
                      key={item.value}
                      initial={{ scale: 1.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="block text-3xl md:text-5xl font-bold text-pink-500 font-cute"
                    >
                      {String(item.value).padStart(2, "0")}
                    </motion.span>
                    <span className="text-xs md:text-sm text-pink-400 uppercase tracking-widest font-semibold">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.p 
                className="text-pink-300 text-sm font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Be patient~ good things take time ♪
              </motion.p>
            </motion.div>
          )
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
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-16 h-16 mx-auto text-pink-400 mb-6" />
                </motion.div>
                
                <h1 className="text-4xl md:text-6xl font-script text-pink-500 mb-4 drop-shadow-sm">
                  Happy Birthday!
                </h1>
                <p className="text-pink-400 mb-10 text-lg">You have something waiting for you~</p>
                
                <motion.button
                  onClick={() => setLetterOpened(true)}
                  className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 text-white px-10 py-5 rounded-full text-lg font-semibold shadow-2xl shadow-pink-300/50 border-2 border-pink-300/30"
                  whileHover={{ 
                    scale: 1.08,
                    boxShadow: "0 25px 50px -12px rgba(244, 114, 182, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 10px 40px -10px rgba(244, 114, 182, 0.4)",
                      "0 20px 50px -10px rgba(244, 114, 182, 0.6)",
                      "0 10px 40px -10px rgba(244, 114, 182, 0.4)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="flex items-center gap-3">
                    <Sparkles size={22} />
                    Open Letter
                    <Sparkles size={22} />
                  </span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotateX: -90, opacity: 0, y: 50 }}
                animate={{ rotateX: 0, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-white/70 backdrop-blur-lg rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-pink-200/40 border border-pink-100"
              >
                <div className="text-center mb-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <Sparkles className="w-12 h-12 mx-auto text-pink-400 mb-4" />
                  </motion.div>
                  <h2 className="text-3xl md:text-4xl font-script text-pink-500">
                    For You~
                  </h2>
                </div>

                <div className="space-y-6 mb-8">
                  {letterParagraphs.slice(0, currentParagraph + 1).map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="text-pink-600/90 leading-loose text-base md:text-lg text-justify indent-8 font-medium"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {currentParagraph < letterParagraphs.length - 1 ? (
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button
                      onClick={handleNextParagraph}
                      className="bg-gradient-to-r from-pink-300 to-rose-300 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-pink-200/50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        y: [0, -3, 0]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Continue reading~
                    </motion.button>
                  </motion.div>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-12 text-right border-t border-pink-200/50 pt-8"
                    >
                      <p className="text-pink-400 italic text-lg font-medium">From:</p>
                      <p className="text-pink-500 font-script text-4xl mt-2">Guian Beriso</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="mt-8 text-center"
                    >
                      <p className="text-pink-400/80 text-sm font-medium">
                        ✨ Wishing you the happiest of birthdays ✨
                      </p>
                    </motion.div>
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

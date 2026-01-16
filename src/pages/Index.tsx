import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Gift } from "lucide-react";

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPresentAnimation, setShowPresentAnimation] = useState(false);
  const [presentOpened, setPresentOpened] = useState(false);
  const [showFullLetter, setShowFullLetter] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);

  // Target date
  const targetDate = new Date("2025-01-20T00:00:00");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsUnlocked(true);
        setShowPresentAnimation(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const letterParagraphs = [
    "Hi! It's 11 am and may exam on Monday and nag-eedit ako code, HAHHAHAHAH.",
    "Anyways, wala lang, kamusta? I hope the exam stress isn't getting too much for you.",
    "Andito nanaman pala tayo sa website na to, masyadong torpe magchat eh HAHHAHA. To keep this short, I hope you're doing great, and I hope you're not too stressed and having too much of a hard time for exam preparation. I know you'll do great on the exams, ikaw na yan eh. Goodluck ulit :))",
  ];

  const handleOpenPresent = () => {
    setPresentOpened(true);
  };

  const handleContinueReading = () => {
    if (currentParagraph < letterParagraphs.length - 1) {
      setCurrentParagraph(currentParagraph + 1);
    } else {
      setShowFullLetter(true);
    }
  };

  // Generate floating hearts (reduced)
  const floatingHearts = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 6,
    size: 12 + Math.random() * 16,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Floating Hearts Background */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-300 pointer-events-none animate-float-up"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}

      {/* Sparkle decorations */}
      <div className="absolute top-10 left-10 text-pink-300 animate-sparkle">
        <Sparkles size={24} />
      </div>
      <div className="absolute top-20 right-16 text-pink-400 animate-sparkle" style={{ animationDelay: "0.5s" }}>
        <Sparkles size={20} />
      </div>
      <div className="absolute bottom-32 left-20 text-pink-300 animate-sparkle" style={{ animationDelay: "1s" }}>
        <Sparkles size={18} />
      </div>
      <div className="absolute bottom-20 right-10 text-pink-400 animate-sparkle" style={{ animationDelay: "0.3s" }}>
        <Sparkles size={22} />
      </div>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          /* Countdown Display */
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center z-10"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="text-pink-400" size={24} />
                <h1 className="text-3xl md:text-4xl font-bold text-pink-600">
                  Something Special Awaits~
                </h1>
                <Sparkles className="text-pink-400" size={24} />
              </div>
              <p className="text-pink-500 text-lg">A little surprise is waiting for you!</p>
            </motion.div>

            <div className="flex gap-4 md:gap-6 justify-center mb-8">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-pink-200"
                >
                  <div className="text-3xl md:text-5xl font-bold text-pink-500">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-pink-400 text-sm md:text-base mt-1">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <Gift className="text-pink-400 mx-auto" size={48} />
            </motion.div>
          </motion.div>
        ) : showPresentAnimation && !presentOpened ? (
          /* Present Animation */
          <motion.div
            key="present"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="text-center z-10"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-bold text-pink-600 mb-8"
            >
              You have a message! 💌
            </motion.h2>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenPresent}
              className="cursor-pointer relative inline-block"
            >
              {/* Present box */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative"
              >
                {/* Box body */}
                <div className="w-40 h-32 bg-gradient-to-br from-pink-400 to-rose-400 rounded-lg shadow-xl relative">
                  {/* Ribbon vertical */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-6 h-full bg-pink-200" />
                  {/* Ribbon horizontal */}
                  <div className="absolute top-1/2 -translate-y-1/2 w-full h-6 bg-pink-200" />
                </div>
                {/* Box lid */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-44 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg shadow-lg" />
                {/* Bow */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <div className="absolute -left-5 w-6 h-8 bg-pink-200 rounded-full transform -rotate-45" />
                    <div className="absolute -right-5 w-6 h-8 bg-pink-200 rounded-full transform rotate-45" />
                    <div className="relative w-4 h-4 bg-pink-300 rounded-full z-10" />
                  </div>
                </div>
              </motion.div>

              <p className="text-pink-500 mt-6 text-lg">Tap to open~</p>
            </motion.div>
          </motion.div>
        ) : (
          /* Letter Display */
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl z-10"
          >
            <motion.div
              initial={{ rotateX: -90 }}
              animate={{ rotateX: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-pink-200 relative overflow-hidden"
            >
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 text-pink-300">
                <Sparkles size={14} />
              </div>
              <div className="absolute top-4 right-4 text-pink-300">
                <Sparkles size={14} />
              </div>
              <div className="absolute bottom-4 left-4 text-pink-300">
                <Sparkles size={14} />
              </div>
              <div className="absolute bottom-4 right-4 text-pink-300">
                <Sparkles size={14} />
              </div>

              {/* Letter header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="inline-flex items-center gap-2"
                >
                  <Sparkles className="text-pink-400" size={24} />
                  <h2 className="text-2xl md:text-3xl font-bold text-pink-600">
                    Hey there~
                  </h2>
                  <Sparkles className="text-pink-400" size={24} />
                </motion.div>
              </div>

              {/* Letter content */}
              <div className="space-y-6 text-pink-700 leading-relaxed">
                {!showFullLetter ? (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={currentParagraph}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-lg"
                      >
                        {letterParagraphs[currentParagraph]}
                      </motion.p>
                    </AnimatePresence>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleContinueReading}
                      className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 mx-auto"
                    >
                      {currentParagraph < letterParagraphs.length - 1 ? (
                        <>Continue reading~ ✨</>
                      ) : (
                        <>See full letter~ ✨</>
                      )}
                    </motion.button>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {letterParagraphs.map((paragraph, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className="text-lg"
                      >
                        {paragraph}
                      </motion.p>
                    ))}

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="pt-6 text-right"
                    >
                      <p className="text-pink-600 font-semibold text-xl">
                        With care,
                      </p>
                      <p className="text-pink-500 text-2xl font-bold mt-2">
                        Guian 💗
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

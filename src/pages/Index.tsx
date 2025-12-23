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
  const [showPresentAnimation, setShowPresentAnimation] = useState(true); // Preview mode
  const [presentOpened, setPresentOpened] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);

  const targetDate = new Date("2025-12-24T00:00:00");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsUnlocked(true);
        setShowPresentAnimation(true);
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
    "Anyways, to not, beat around the bush, I like you.",
    "I don't understand it myself. I guess one day, I just started to notice you despite never really knowing you. You caught my eye, and it wasn't fleeting. A day passed, a week and nothing changed, I really had developed a massive crush for you. And, when people found out that I liked you, I started hearing more about you, and all of that made me like you even more.",
    "Honestly, I just wanted to tell you myself that I liked you. Ang boring naman if narinig mo lang sa iba and not from me diba?",
    "Theres so much I'd like to say. How amazing your music taste is, how you radiate a kindness that feels genuinely warm, but I don't want this to be overwhelming. So, I'll end it like this. I'd be glad to get the chance to better get to know you better and to start that, I'd like to formally ask to be your friend :)",
    "Once again, Happy Birthday, I hope you appreciate this and not find this weird. I'm not expecting to have anything reciprocated, I just wanted to take the chance to say what I feel and tell you that I think you're an amazing person. I'd love to hear a response if you have one. Thanks for taking the time to read and have a great rest of your Birthday Day, Mary!"
  ];

  const handleOpenPresent = () => {
    setPresentOpened(true);
  };

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
        ) : showPresentAnimation && !presentOpened ? (
          <motion.div
            key="present-animation"
            className="text-center z-10 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
          >
            {/* Sparkle burst effect */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: Math.cos((i * 30 * Math.PI) / 180) * 150,
                  y: Math.sin((i * 30 * Math.PI) / 180) * 150,
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <Sparkles className="text-pink-400" size={20} />
              </motion.div>
            ))}

            {/* Present box */}
            <motion.div
              className="relative cursor-pointer"
              onClick={handleOpenPresent}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Present lid */}
              <motion.div
                className="relative z-10"
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, -3, 3, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Bow */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full shadow-lg" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-pink-300 rounded-full" />
                      {/* Bow loops */}
                      <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-8 h-6 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full transform -rotate-12" />
                      <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-8 h-6 bg-gradient-to-l from-rose-400 to-pink-400 rounded-full transform rotate-12" />
                    </div>
                  </motion.div>
                </div>
                
                {/* Lid top */}
                <div className="w-44 h-8 bg-gradient-to-b from-pink-400 to-pink-500 rounded-t-xl shadow-lg mx-auto relative">
                  <div className="absolute inset-x-0 top-0 h-2 bg-pink-300/50 rounded-t-xl" />
                </div>
              </motion.div>
              
              {/* Present box body */}
              <motion.div 
                className="w-40 h-32 bg-gradient-to-b from-pink-400 via-pink-500 to-rose-500 rounded-xl shadow-2xl mx-auto relative overflow-hidden"
                animate={{ 
                  boxShadow: [
                    "0 20px 60px -15px rgba(244, 114, 182, 0.5)",
                    "0 30px 80px -15px rgba(244, 114, 182, 0.7)",
                    "0 20px 60px -15px rgba(244, 114, 182, 0.5)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Ribbon vertical */}
                <div className="absolute left-1/2 -translate-x-1/2 w-6 h-full bg-gradient-to-b from-rose-300 to-rose-400" />
                {/* Ribbon horizontal */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-6 bg-gradient-to-r from-rose-300 via-rose-400 to-rose-300" />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              </motion.div>
            </motion.div>

            <motion.p
              className="text-pink-500 text-xl font-medium mt-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Tap to open your present!
            </motion.p>
            
            <motion.div
              className="mt-4"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Sparkles className="text-pink-400" size={24} />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
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

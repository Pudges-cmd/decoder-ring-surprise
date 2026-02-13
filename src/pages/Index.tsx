import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift, Star, Heart } from "lucide-react";

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
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [showFullLetter, setShowFullLetter] = useState(false);

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
    "Hey, I guess we're back here again, right HAHAHAHA? I guess that's just how being this shy goes I guess.",
    "Honestly, after my confession I never really got this far. The fact that we still have the streak surprises me every day I see it still alive.\n\nWhat I mean to say is, I'm glad that we still managed to stay friends all this time :).",
    "According to the Britannica Dictionary, Valentines Day is a day of expressing love, affection, and friendship through gifts, cards, and romantic gestures.\n\nAnd I guess this is my version of that. Just me typing this out in the middle of the night, hoping this makes your day better or at least makes you smile a little.",
    "I appreciate the little things you know?\n\nWhen you sometimes greet me, good morning.\nWhen it's late, tell me a good night before you sleep.\nWhen we talk on Instagram or Messenger notes.\n\nI don't know how it meant to you, but it meant a lot to me.",
    "I don't want this to be some big, dramatic confession part two. Nor, have this be something that makes things between us more awkward than we already are.\n\nBut, I just wanted to take the chance to tell you that whatever this friendship is—I appreciate it, more than you think.\n\nAnd that no matter what there's always someone in your corner, that's proud and cares about you.",
  ];

  const handleOpenPresent = () => {
    setPresentOpened(true);
  };

  const handleKeepReading = () => {
    setShowInitialMessage(false);
  };

  const handleContinueReading = () => {
    if (currentParagraph < letterParagraphs.length - 1) {
      setCurrentParagraph(currentParagraph + 1);
    } else {
      setShowFullLetter(true);
    }
  };

  // Generate scattered pulsating elements (sparkles + a few hearts)
  const scatteredElements = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: 5 + Math.random() * 90,
    top: 5 + Math.random() * 90,
    delay: Math.random() * 4,
    duration: 2.5 + Math.random() * 3,
    size: 10 + Math.random() * 14,
    glow: Math.random() > 0.5,
    type: i % 5 === 0 ? 'heart' as const : 'sparkle' as const, // ~20% hearts, ~80% sparkles
  }));

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative"
      style={{ background: `linear-gradient(135deg, hsl(340 70% 96%), hsl(345 60% 93%), hsl(350 65% 95%))` }}
    >
      {/* Pulsating Sparkles & Hearts Background */}
      {scatteredElements.map((el) => (
        <div
          key={el.id}
          className={`absolute pointer-events-none ${el.glow ? 'animate-star-glow' : 'animate-star-pulse'}`}
          style={{
            left: `${el.left}%`,
            top: `${el.top}%`,
            animationDelay: `${el.delay}s`,
            animationDuration: `${el.duration}s`,
            color: el.id % 3 === 0 ? 'hsl(340 50% 75%)' : el.id % 3 === 1 ? 'hsl(130 25% 65%)' : 'hsl(340 40% 80%)',
          }}
        >
          {el.type === 'heart' ? (
            <Heart size={el.size} fill="currentColor" />
          ) : (
            <Sparkles size={el.size} />
          )}
        </div>
      ))}

      {/* Sparkle decorations */}
      <div className="absolute top-10 left-10 text-pink-medium animate-sparkle">
        <Sparkles size={20} />
      </div>
      <div className="absolute top-20 right-16 animate-sparkle" style={{ animationDelay: "0.5s", color: 'hsl(130 25% 65%)' }}>
        <Sparkles size={16} />
      </div>
      <div className="absolute bottom-32 left-20 text-pink-medium animate-sparkle" style={{ animationDelay: "1s" }}>
        <Sparkles size={14} />
      </div>
      <div className="absolute bottom-20 right-10 animate-sparkle" style={{ animationDelay: "0.3s", color: 'hsl(130 28% 60%)' }}>
        <Sparkles size={18} />
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
                <Sparkles className="text-pink-primary" size={24} />
                <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'hsl(340 50% 45%)' }}>
                  Something Special Awaits~
                </h1>
                <Sparkles className="text-pink-primary" size={24} />
              </div>
              <p style={{ color: 'hsl(130 25% 45%)' }} className="text-lg">A little surprise is waiting for you!</p>
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
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg"
                  style={{ borderColor: 'hsl(130 25% 82%)', borderWidth: '1px' }}
                >
                  <div className="text-3xl md:text-5xl font-bold" style={{ color: 'hsl(340 60% 55%)' }}>
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div style={{ color: 'hsl(130 25% 50%)' }} className="text-sm md:text-base mt-1">
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
              <Gift className="text-pink-primary mx-auto" size={48} />
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
              className="text-2xl md:text-3xl font-bold mb-8"
              style={{ color: 'hsl(340 50% 45%)' }}
            >
              You have a message! ✨
            </motion.h2>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenPresent}
              className="cursor-pointer relative inline-block"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative"
              >
                {/* Envelope body */}
                <div className="w-48 h-32 rounded-md shadow-xl relative overflow-hidden"
                  style={{ background: 'hsl(340 60% 88%)' }}
                >
                  {/* Envelope flap (triangle) */}
                  <div className="absolute top-0 left-0 w-full h-0 border-l-[96px] border-r-[96px] border-t-[52px] border-l-transparent border-r-transparent"
                    style={{ borderTopColor: 'hsl(340 55% 78%)' }}
                  />
                  {/* Bottom fold lines */}
                  <div className="absolute bottom-0 left-0 w-full h-0 border-l-[96px] border-r-[96px] border-b-[40px] border-l-transparent border-r-transparent"
                    style={{ borderBottomColor: 'hsl(340 50% 82%)' }}
                  />
                  {/* Letter peeking out */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-36 h-8 rounded-t-sm"
                    style={{ background: 'white', boxShadow: '0 -2px 4px rgba(0,0,0,0.05)' }}
                  />
                </div>
              </motion.div>

              <p style={{ color: 'hsl(340 40% 50%)' }} className="mt-6 text-lg">Tap to open~</p>
            </motion.div>
          </motion.div>
        ) : showInitialMessage ? (
          /* Initial Message */
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="w-full max-w-2xl z-10"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
              style={{ borderColor: 'hsl(130 25% 82%)', borderWidth: '1px' }}
            >
              <div className="absolute top-4 left-4" style={{ color: 'hsl(130 25% 70%)' }}>
                <Star size={12} fill="currentColor" />
              </div>
              <div className="absolute top-4 right-4" style={{ color: 'hsl(340 50% 75%)' }}>
                <Star size={12} fill="currentColor" />
              </div>

              <div className="text-center mb-6">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: 'hsl(340 50% 45%)' }}
                >
                  Hey again :p
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg leading-relaxed text-center"
                style={{ color: 'hsl(340 30% 35%)' }}
              >
                Nakakainis ung mga nagbibigayan letter and flowers nung February 13 noh? HAHAHAH. Anyways, speaking of letters...
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleKeepReading}
                  className="px-6 py-3 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, hsl(340 60% 65%), hsl(130 28% 55%))' }}
                >
                  Keep Reading ✨
                </motion.button>
              </motion.div>
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
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
              style={{ borderColor: 'hsl(130 25% 82%)', borderWidth: '1px' }}
            >
              {/* Decorative corners */}
              <div className="absolute top-4 left-4" style={{ color: 'hsl(130 25% 70%)' }}>
                <Sparkles size={14} />
              </div>
              <div className="absolute top-4 right-4" style={{ color: 'hsl(340 50% 75%)' }}>
                <Sparkles size={14} />
              </div>
              <div className="absolute bottom-4 left-4" style={{ color: 'hsl(340 50% 75%)' }}>
                <Sparkles size={14} />
              </div>
              <div className="absolute bottom-4 right-4" style={{ color: 'hsl(130 25% 70%)' }}>
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
                  <Star className="text-pink-primary" size={20} fill="currentColor" />
                  <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'hsl(340 50% 45%)' }}>
                    Happy Valentines
                  </h2>
                  <Star className="text-pink-primary" size={20} fill="currentColor" />
                </motion.div>
              </div>

              {/* Letter content */}
              <div className="space-y-6 leading-relaxed" style={{ color: 'hsl(340 30% 30%)' }}>
                {!showFullLetter ? (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={currentParagraph}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-lg whitespace-pre-line"
                      >
                        {letterParagraphs[currentParagraph]}
                      </motion.p>
                    </AnimatePresence>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleContinueReading}
                      className="mt-6 px-6 py-3 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 mx-auto"
                      style={{ background: 'linear-gradient(135deg, hsl(340 60% 65%), hsl(130 28% 55%))' }}
                    >
                      {currentParagraph < letterParagraphs.length - 1 ? (
                        <>Continue Reading ✨</>
                      ) : (
                        <>See Full Letter ✨</>
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
                        className="text-lg whitespace-pre-line"
                      >
                        {paragraph}
                      </motion.p>
                    ))}

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="pt-6 text-right"
                    >
                      <p className="font-semibold text-xl" style={{ color: 'hsl(340 50% 45%)' }}>
                        "E"
                      </p>
                      <p className="text-sm mt-4 italic" style={{ color: 'hsl(130 25% 45%)' }}>
                        P.s Good luck sa card day!
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

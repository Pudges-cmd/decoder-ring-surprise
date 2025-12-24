import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Snowflake, TreePine, Star, Mail } from "lucide-react";

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLetterAnimation, setShowLetterAnimation] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [letterRevealed, setLetterRevealed] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);

  const targetDate = new Date("2025-12-25T00:00:00");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsUnlocked(true);
        setShowLetterAnimation(true);
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
    "Hi again! Last time was a Happy Birthday. This time it's Merry Christmas.",
    "I hope you had a great Birthday and had a fun time with your family! It was your Birthday after all you deserve to enjoy every bit of it :)",
    "With that being said I think I have to apologize. I didn't mean for it to be overwhelming for you.",
    "I know that you're having a hard time responding and I get that. Having feelings like this thrown onto you can be a lot, and it was never my intention for you to stress over this.",
    "I came into doing this because I wanted to tell you how I feel. It's a weird thing don't you think? Theres no metric for this kind of thing, all I really have to go by is how I feel and I can tell you from that is what I feel is genuine.",
    "I guess what I wanted to say is that, with whatever you respond with let it be true to you. Whether you decide to be friends or not, I respect it either way. Your feelings matters to me more than any specific answer.",
    "I know it's awkward, I went at it pretty backwards nga eh. Diba dapat friends muna before confession HAHHAHHA? I think we agree that its too early for anything more than that, and honestly, I was waiting for college or even farther than that before I pursue anything like that.",
    "But the idea of sitting idly and doing nothing felt like it was gnawing at me. I guess the mere thought of letting an opportunity like this slide is enough to push me into doing all of this. Going for it and confessing felt terrifying, but the thought of looking back and regretting not doing anything when I had the chance felt all the more heavier.",
    "What matters to me is that whatever happens next feels comfortable and honest for you. If in the future, being friends is where this stays for you, then I'd still genuinely appreciate that. I value you as a person and not as just a \"what could be\".",
    "It was never my intention to pressure you into a response, so don't feel the need to rush into one, just say what you truly want to say. Be it tomorrow or soon, I'll patiently wait if you do have a response :)",
    "Enjoy your Christmas!"
  ];

  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true);
    setTimeout(() => setLetterRevealed(true), 800);
  };

  const handleNextParagraph = () => {
    if (currentParagraph < letterParagraphs.length - 1) {
      setCurrentParagraph(prev => prev + 1);
    }
  };

  // Generate snowflakes
  const snowflakes = [...Array(50)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 10,
    size: 4 + Math.random() * 8,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--christmas-dark))] via-[hsl(150,35%,10%)] to-[hsl(150,40%,6%)] flex flex-col items-center justify-center p-6 relative overflow-hidden font-cute">
      {/* Snowfall */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute animate-snowfall text-[hsl(var(--snow))]"
            style={{
              left: `${flake.left}%`,
              animationDelay: `${flake.delay}s`,
              animationDuration: `${flake.duration}s`,
              fontSize: `${flake.size}px`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Twinkling stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[hsl(var(--christmas-gold))] rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Christmas trees silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <div className="flex justify-between items-end px-4">
          <TreePine className="w-16 h-24 md:w-24 md:h-36 text-[hsl(150,50%,15%)]" />
          <TreePine className="w-12 h-20 md:w-20 md:h-32 text-[hsl(150,50%,12%)]" />
          <TreePine className="w-20 h-28 md:w-28 md:h-40 text-[hsl(150,50%,18%)]" />
          <TreePine className="w-14 h-22 md:w-22 md:h-34 text-[hsl(150,50%,14%)]" />
          <TreePine className="w-16 h-24 md:w-24 md:h-36 text-[hsl(150,50%,16%)]" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center z-10"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Mail className="w-20 h-20 mx-auto text-[hsl(var(--christmas-red))] mb-6 drop-shadow-lg" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-script text-[hsl(var(--christmas-cream))] mb-2 drop-shadow-lg">
              A Letter Awaits
            </h1>
            <p className="text-[hsl(var(--christmas-gold))] mb-10 text-lg font-medium tracking-wide">
              Opens on Christmas Day ❄
            </p>

            <div className="flex gap-3 md:gap-5 justify-center mb-8">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Mins", value: timeLeft.minutes },
                { label: "Secs", value: timeLeft.seconds },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="bg-[hsl(var(--christmas-green))]/80 backdrop-blur-md rounded-2xl p-4 md:p-5 shadow-xl min-w-[70px] md:min-w-[90px] border border-[hsl(var(--christmas-gold))]/20"
                  whileHover={{ scale: 1.08, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.span
                    key={item.value}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="block text-3xl md:text-4xl font-bold text-[hsl(var(--christmas-cream))] font-cute"
                  >
                    {String(item.value).padStart(2, "0")}
                  </motion.span>
                  <span className="text-xs md:text-sm text-[hsl(var(--christmas-gold))] uppercase tracking-widest font-semibold">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.p 
              className="text-[hsl(var(--christmas-cream))]/60 text-sm font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Something special is coming~ ✨
            </motion.p>
          </motion.div>
        ) : showLetterAnimation && !envelopeOpened ? (
          <motion.div
            key="envelope"
            className="text-center z-10 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {/* Envelope */}
            <motion.div
              className="relative cursor-pointer"
              onClick={handleOpenEnvelope}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Envelope body */}
              <motion.div
                className="w-64 h-44 md:w-80 md:h-56 relative"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Envelope back */}
                <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--christmas-red))] to-[hsl(0,60%,40%)] rounded-lg shadow-2xl" />
                
                {/* Envelope front bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-[hsl(0,65%,45%)] to-[hsl(var(--christmas-red))] rounded-b-lg" />
                
                {/* Envelope flap (top triangle) */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1/2 origin-top"
                  style={{
                    clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                    background: "linear-gradient(180deg, hsl(0, 70%, 55%) 0%, hsl(0, 65%, 48%) 100%)",
                  }}
                />
                
                {/* Wax seal */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[hsl(var(--christmas-gold))] to-[hsl(35,80%,45%)] rounded-full shadow-lg flex items-center justify-center border-4 border-[hsl(35,90%,55%)]">
                    <Star className="w-6 h-6 md:w-8 md:h-8 text-[hsl(var(--christmas-dark))]" fill="currentColor" />
                  </div>
                </motion.div>

                {/* Decorative holly */}
                <div className="absolute -top-4 -right-4 text-2xl">🎄</div>
                <div className="absolute -bottom-4 -left-4 text-2xl">❄️</div>
              </motion.div>
            </motion.div>

            <motion.p
              className="text-[hsl(var(--christmas-cream))] text-xl font-medium mt-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Tap to open your letter!
            </motion.p>
            
            <motion.div
              className="mt-4 flex gap-2"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Snowflake className="text-[hsl(var(--christmas-cream))]" size={20} />
              <Snowflake className="text-[hsl(var(--christmas-gold))]" size={24} />
              <Snowflake className="text-[hsl(var(--christmas-cream))]" size={20} />
            </motion.div>
          </motion.div>
        ) : envelopeOpened && !letterRevealed ? (
          <motion.div
            key="opening"
            className="text-center z-10"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {/* Opening envelope animation */}
            <motion.div
              className="w-64 h-44 md:w-80 md:h-56 relative"
              initial={{ rotateX: 0 }}
              animate={{ rotateX: 0, scale: [1, 1.1, 0.5], opacity: [1, 1, 0] }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Envelope body */}
              <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--christmas-red))] to-[hsl(0,60%,40%)] rounded-lg shadow-2xl" />
              
              {/* Flap opening */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1/2 origin-top"
                style={{
                  clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                  background: "linear-gradient(180deg, hsl(0, 70%, 55%) 0%, hsl(0, 65%, 48%) 100%)",
                }}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: -180 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="w-full max-w-2xl z-10"
          >
            <motion.div
              className="bg-[hsl(var(--christmas-cream))] rounded-lg p-6 md:p-10 shadow-2xl relative overflow-hidden"
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(45, 100%, 96%) 0%, hsl(40, 80%, 92%) 100%)",
              }}
            >
              {/* Paper texture overlay */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              }} />

              {/* Decorative corners */}
              <div className="absolute top-2 left-2 text-[hsl(var(--christmas-red))]/20 text-4xl">❧</div>
              <div className="absolute top-2 right-2 text-[hsl(var(--christmas-green))]/20 text-4xl rotate-90">❧</div>
              <div className="absolute bottom-2 left-2 text-[hsl(var(--christmas-green))]/20 text-4xl -rotate-90">❧</div>
              <div className="absolute bottom-2 right-2 text-[hsl(var(--christmas-red))]/20 text-4xl rotate-180">❧</div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="flex justify-center gap-2 mb-3"
                  >
                    <TreePine className="w-6 h-6 text-[hsl(var(--christmas-green))]" />
                    <Star className="w-6 h-6 text-[hsl(var(--christmas-gold))]" fill="currentColor" />
                    <TreePine className="w-6 h-6 text-[hsl(var(--christmas-green))]" />
                  </motion.div>
                  <h2 className="text-2xl md:text-3xl font-script text-[hsl(var(--christmas-red))]">
                    Merry Christmas~
                  </h2>
                </div>

                <div className="space-y-5 mb-8 max-h-[50vh] overflow-y-auto pr-2">
                  {letterParagraphs.slice(0, currentParagraph + 1).map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="text-[hsl(var(--christmas-dark))] leading-relaxed text-sm md:text-base text-justify indent-6 font-medium"
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
                      className="bg-gradient-to-r from-[hsl(var(--christmas-red))] to-[hsl(0,60%,45%)] text-[hsl(var(--christmas-cream))] px-8 py-3 rounded-full font-semibold shadow-lg"
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
                      className="mt-10 text-right border-t border-[hsl(var(--christmas-green))]/20 pt-6"
                    >
                      <p className="text-[hsl(var(--christmas-green))] italic text-base font-medium mb-1">With warmth,</p>
                      <p className="text-2xl md:text-3xl font-script text-[hsl(var(--christmas-red))]">
                        Guian
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="mt-8 text-center"
                    >
                      <div className="flex justify-center gap-3 text-2xl">
                        <span>🎄</span>
                        <span>⭐</span>
                        <span>❄️</span>
                        <span>🎁</span>
                        <span>🎄</span>
                      </div>
                    </motion.div>
                  </>
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

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPresentAnimation, setShowPresentAnimation] = useState(false);
  const [presentOpened, setPresentOpened] = useState(false);

  // Already past the date, so unlock immediately
  useEffect(() => {
    setIsUnlocked(true);
    setShowPresentAnimation(true);
  }, []);

  const handleOpenPresent = () => {
    setPresentOpened(true);
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
            color: el.id % 3 === 0 ? 'hsl(340 50% 75%)' : el.id % 3 === 1 ? 'hsl(340 65% 70%)' : 'hsl(340 40% 80%)',
          }}
        >
          <Sparkles size={el.size} />
        </div>
      ))}

      {/* Sparkle decorations */}
      <div className="absolute top-10 left-10 text-pink-medium animate-sparkle">
        <Sparkles size={20} />
      </div>
      <div className="absolute top-20 right-16 text-pink-soft animate-sparkle" style={{ animationDelay: "0.5s" }}>
        <Sparkles size={16} />
      </div>
      <div className="absolute bottom-32 left-20 text-pink-medium animate-sparkle" style={{ animationDelay: "1s" }}>
        <Sparkles size={14} />
      </div>
      <div className="absolute bottom-20 right-10 text-pink-primary animate-sparkle" style={{ animationDelay: "0.3s" }}>
        <Sparkles size={18} />
      </div>

      <AnimatePresence mode="wait">
        {showPresentAnimation && !presentOpened ? (
          /* Envelope Animation */
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
              You have a brand new message
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
                  <div className="absolute top-0 left-0 w-full h-0 border-l-[96px] border-r-[96px] border-t-[52px] border-l-transparent border-r-transparent"
                    style={{ borderTopColor: 'hsl(340 55% 78%)' }}
                  />
                  <div className="absolute bottom-0 left-0 w-full h-0 border-l-[96px] border-r-[96px] border-b-[40px] border-l-transparent border-r-transparent"
                    style={{ borderBottomColor: 'hsl(340 50% 82%)' }}
                  />
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-36 h-8 rounded-t-sm"
                    style={{ background: 'white', boxShadow: '0 -2px 4px rgba(0,0,0,0.05)' }}
                  />
                </div>
              </motion.div>

              <p style={{ color: 'hsl(340 40% 50%)' }} className="mt-6 text-lg">hi po pakipindot</p>
            </motion.div>
          </motion.div>
        ) : presentOpened ? (
          /* Letter with Video */
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
              style={{ borderColor: 'hsl(340 50% 82%)', borderWidth: '1px' }}
            >
              {/* Decorative corners */}
              <div className="absolute top-4 left-4" style={{ color: 'hsl(340 50% 75%)' }}>
                <Sparkles size={14} />
              </div>
              <div className="absolute top-4 right-4" style={{ color: 'hsl(340 60% 70%)' }}>
                <Sparkles size={14} />
              </div>
              <div className="absolute bottom-4 left-4" style={{ color: 'hsl(340 60% 70%)' }}>
                <Sparkles size={14} />
              </div>
              <div className="absolute bottom-4 right-4" style={{ color: 'hsl(340 50% 75%)' }}>
                <Sparkles size={14} />
              </div>

              {/* Video */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl overflow-hidden shadow-lg mb-8"
              >
                <video
                  src="/apology-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full"
                />
              </motion.div>

              {/* Apology message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center space-y-4"
              >
                <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'hsl(340 30% 30%)' }}>
                  Sorry that I sent you that reel that gave you the middle finger, I am very sorry
                </p>
                <p className="font-semibold text-xl pt-4" style={{ color: 'hsl(340 50% 45%)' }}>
                  — 🙈
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Index;

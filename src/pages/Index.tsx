import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

type Line = { text: string; gif?: { id: string; ratio: number } };
const letter: Line[] = [
  { text: "Hey, so here we are again. It's been a while right?", gif: { id: "16881194684291730255", ratio: 1.56028 } },
  { text: "I know you have been a bit down recently, things have piled up on you and it had been really upsetting for you." },
  { text: "I just want to let you know that, when a door closes another one opens." },
  { text: "There are lots of opportunities out there still and I know you'll kill it there." },
  { text: "Life can get stressful." },
  { text: "And sometimes it feels like everything is falling out of our hands." },
  { text: "And the fact that we can't control any of it is frustrating." },
  { text: "But even when life can get that upsetting and frustrating, I know that your the type of person that can bounce back.", gif: { id: "20802161", ratio: 1 } },
  { text: "In the past almost a year of talking to you, I have always thought that you were an amazingly strong person." },
  { text: "Which is unfair really, because it's just made it impossible for me to not fall any more head over heels for you." },
  { text: "Also can I just ramble on for a bit, because you are so great" },
  { text: "It's kind of hard to just have in writing you know? But I have been all smiles since talking to you." },
  { text: "You are soooo unbelievably kind, sweet admirably smart." },
  { text: "I don't know if you're sick of it yet but you are sooo pretty." },
  { text: "Whenever I re-read our conversation, and I see a photo of you I just melt", gif: { id: "15911150", ratio: 1 } },
  { text: "You are that beautiful and cute" },
  { text: "Seriously, what kind of spell do you have me under?" },
  { text: "Anyways, I just wanted to compliment you, because well, I was hoping it would help cheer you up." },
  { text: "I hope you know that, you've cheered me up from everything that has gotten me down recently." },
  { text: "So, I want to do the same for you.", gif: { id: "26083121", ratio: 1.71123 } },
  { text: "Life can be hard, maybe sharing some of it with me might ease it all." },
  { text: "That's it, thank you for everything :))", gif: { id: "1217765935017775325", ratio: 1 } },
];


const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPresentAnimation, setShowPresentAnimation] = useState(false);
  const [presentOpened, setPresentOpened] = useState(false);
  const [sunflowers, setSunflowers] = useState<{ id: number; x: number; y: number; rotate: number; delay: number; size: number }[]>([]);

  // Already past the date, so unlock immediately
  useEffect(() => {
    setIsUnlocked(true);
    setShowPresentAnimation(true);
  }, []);

  const handleOpenPresent = () => {
    setPresentOpened(true);
    setSunflowers(
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 700,
        y: -150 - Math.random() * 450,
        rotate: (Math.random() - 0.5) * 540,
        delay: Math.random() * 0.35,
        size: 22 + Math.random() * 26,
      }))
    );
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
        {sunflowers.length > 0 && (
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
            {sunflowers.map((f) => (
              <motion.span
                key={f.id}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.3, rotate: 0 }}
                animate={{ opacity: [0, 1, 1, 0], x: f.x, y: f.y, scale: 1, rotate: f.rotate }}
                transition={{ duration: 2.2, delay: f.delay, ease: "easeOut" }}
                style={{ fontSize: f.size, position: "absolute" }}
              >
                🌻
              </motion.span>
            ))}
          </div>
        )}
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center space-y-4 text-lg md:text-xl leading-relaxed"
                style={{ color: 'hsl(340 30% 30%)' }}
              >
                {letter.map((item, i) => (
                  <div key={i} className="space-y-4">
                    <p>{item.text}</p>
                    {item.gif && (
                      <div className="mx-auto max-w-xs rounded-2xl overflow-hidden shadow-lg">
                        <iframe
                          src={`https://tenor.com/embed/${item.gif.id}`}
                          title="gif"
                          className="w-full border-0"
                          style={{ aspectRatio: String(item.gif.ratio) }}
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Index;

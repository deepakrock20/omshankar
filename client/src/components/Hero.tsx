import { motion, useScroll, useTransform } from "framer-motion";
import userImage from "@assets/Screenshot_2025-12-12_170229_1765539173413.png";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/30 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      {/* Parallax Content */}
      <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 md:order-1"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500 font-bold uppercase tracking-widest text-xs">
              Portfolio 2025
            </span>
          </motion.div>

          <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8">
            <span className="text-white">Creative</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Developer
            </span>
          </h1>

          <p className="font-sans text-lg text-white/70 leading-relaxed max-w-lg mb-10">
            I craft immersive digital experiences by blending technical expertise in web development with creative marketing strategies.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#experience"
              className="px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              View Work
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white font-bold uppercase tracking-wider"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>

        {/* Right Side Visual - User Image with Organic Shape */}
        <motion.div 
          style={{ y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="order-1 md:order-2 relative flex justify-center md:justify-end"
        >
           {/* Organic Shape Container */}
           <div className="relative w-full max-w-md aspect-square md:aspect-[4/5] group">
              {/* Animated Glow Behind */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"></div>
              
              {/* Organic Mask */}
              <div className="relative h-full w-full overflow-hidden" 
                   style={{ 
                     borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%", 
                     border: "1px solid rgba(255,255,255,0.1)",
                     boxShadow: "0 0 40px rgba(0,0,0,0.5)"
                   }}>
                   
                   <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent mix-blend-overlay z-10 pointer-events-none" />
                   
                   <img 
                     src={userImage} 
                     alt="Omshankar Passi" 
                     className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                   />
              </div>

              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-0 -left-6 bg-black/80 border border-white/20 backdrop-blur-md p-4 rounded-xl shadow-2xl z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                  <span className="font-bold text-sm text-white">Online & Creative</span>
                </div>
              </motion.div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}

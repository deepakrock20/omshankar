import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <section className="hero-critical relative h-screen flex flex-col justify-center overflow-hidden">
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
            {/* <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500 font-bold uppercase tracking-widest text-xs">
              Portfolio 2025
            </span> */}
          </motion.div>

          <h1 className="font-display text-1xl md:text-6xl font-bold leading-[1] tracking-tighter mb-8">
            <span className="text-white">Creative</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Digital Marketing SEO Expert | Web Developer |
               Multimidia & Graphic Designer | Artist
            </span>
          </h1>

          <p className="font-sans text-lg text-white/70 leading-relaxed max-w-lg mb-10">
            I’m Omshankar Passi, a results-driven Digital Marketing professional and Web Developer specializing in SEO, branding, and modern web experiences. I combine data-backed marketing strategies with creative design and clean development to help brands grow their online presence and conversions.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#experience"
              className="px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              View EXP
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

        {/* Right Side Visual - enlarged image with halo around image borders */}
        <motion.div
          style={{ y }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="order-1 md:order-2 relative flex justify-center md:justify-end"
        >
          <div className="relative w-full max-w-[720px] md:max-w-[1200px] aspect-[3/5] group">
            {/* Halo: slightly larger than image so it appears around image borders */}
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-90 filter blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100" />

            {/* Image fills the container; no extra background so no visible square box */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden">
              <picture>
                <source type="image/avif" srcSet="/images/profile-1200.avif 1200w, /images/profile-800.avif 800w, /images/profile-400.avif 400w" sizes="(max-width: 768px) 80vw, 40vw" />
                <source type="image/webp" srcSet="/images/profile-1200.webp 1200w, /images/profile-800.webp 800w, /images/profile-400.webp 400w" sizes="(max-width: 768px) 80vw, 40vw" />
                <img
                  src="/images/profile-1200.webp"
                  alt="Omshankar Passi portrait"
                  loading="eager"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 rounded-3xl"
                  width={1200}
                  height={2000}
                  {...({ fetchpriority: "high" } as any)}
                />
              </picture>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

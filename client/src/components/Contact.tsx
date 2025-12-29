import { motion } from "framer-motion";
import { Mail, Linkedin, Phone, Send } from "lucide-react";
// @ts-ignore
import bgImg from "@assets/generated_images/optimized/neon_cyber_gradient_background-1600.avif?url";

export default function Contact() {
  return (
    <footer id="contact" className="relative py-32 overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10" />
        <img src={bgImg} alt="" aria-hidden className="w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-6xl md:text-8xl font-bold mb-8">
              Let's Create <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                Magic
              </span>
            </h2>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Ready to elevate your digital presence? Reach out and let's discuss how we can build something extraordinary together.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-20">
              <a 
                href="mailto:deepakpassi574@gmail.com"
                className="group relative px-8 py-4 rounded-full bg-white text-black font-bold flex items-center gap-3 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Mail className="w-5 h-5" /> deepakpassi574@gmail.com
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
                <span className="relative z-10 group-hover:text-white transition-colors"></span>
              </a>

              <a 
                href="https://linkedin.com/in/omshankarpassi"
                target="_blank"
                className="px-8 py-4 rounded-full glass-panel border border-white/20 hover:bg-white/10 transition-colors font-bold flex items-center gap-3"
              >
                <Linkedin className="w-5 h-5 text-[#0077b5]" /> LinkedIn
              </a>

              <a 
                href="tel:+917028334796"
                className="px-8 py-4 rounded-full glass-panel border border-white/20 hover:bg-white/10 transition-colors font-bold flex items-center gap-3"
              >
                <Phone className="w-5 h-5 text-green-500" /> +91 7028334796
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>© 2025 Omshankar Passi. Crafted with ❤️ & ☕</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <span>Education: BCA (MES Vasant Joshi College)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

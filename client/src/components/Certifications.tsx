import { motion } from "framer-motion";
import { Award, BadgeCheck, BookOpen, Cpu, TrendingUp } from "lucide-react";

const certifications = [
  {
    title: "Digital Marketing Course",
    issuer: "Tutedude",
    date: "Nov 2025",
    description: "Mastered SEO, social media algorithms, and data-driven marketing strategies to maximize online reach and engagement.",
    icon: <TrendingUp className="w-8 h-8 text-pink-400" />,
    color: "from-pink-500/20 to-rose-500/20",
    border: "group-hover:border-pink-500/50"
  },
  {
    title: "Artificial Intelligence Internship",
    issuer: "Lenovo Leap NextGen Scholar",
    date: "2025",
    description: "Gained hands-on experience in AI models, machine learning concepts, and their practical applications in modern tech ecosystems.",
    icon: <Cpu className="w-8 h-8 text-cyan-400" />,
    color: "from-cyan-500/20 to-blue-500/20",
    border: "group-hover:border-cyan-500/50"
  },
  {
    title: "Information Technology",
    issuer: "Manipal Institute of Computer Education",
    date: "2022 – 2023",
    description: "Developed a strong foundation in computer systems, software development lifecycles, and IT infrastructure management.",
    icon: <BookOpen className="w-8 h-8 text-purple-400" />,
    color: "from-purple-500/20 to-indigo-500/20",
    border: "group-hover:border-purple-500/50"
  },
  {
    title: "Software Project Management",
    issuer: "Short-Term Course",
    date: "2024 – 2025",
    description: "Learned agile methodologies, resource planning, and project tracking tools to lead software projects efficiently.",
    icon: <BadgeCheck className="w-8 h-8 text-emerald-400" />,
    color: "from-emerald-500/20 to-teal-500/20",
    border: "group-hover:border-emerald-500/50"
  },
  {
    title: "Financial Literacy Achievement",
    issuer: "MES Vasant Joshi College",
    date: "2024",
    description: "Acquired essential knowledge in financial planning, investment strategies, and economic awareness.",
    icon: <Award className="w-8 h-8 text-yellow-400" />,
    color: "from-yellow-500/20 to-orange-500/20",
    border: "group-hover:border-yellow-500/50"
  }
];

export default function Certifications() {
  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-accent uppercase tracking-widest font-bold text-sm block mb-4">Credentials & Learning</span>
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase">
            Certifications
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative p-8 rounded-2xl glass-panel border border-white/10 transition-all duration-300 hover:bg-white/5 ${cert.border}`}
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 blur-xl`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 p-3 bg-white/5 rounded-xl w-fit border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  {cert.icon}
                </div>
                
                <h3 className="font-display text-2xl font-bold leading-tight mb-2 group-hover:text-white transition-colors">
                  {cert.title}
                </h3>
                
                <p className="text-white/60 text-sm font-bold uppercase tracking-wider mb-4">
                  {cert.issuer}
                </p>

                <p className="text-white/70 text-sm leading-relaxed mb-6 flex-grow">
                  {cert.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-white/40 group-hover:text-white/80 transition-colors">
                    Issued: {cert.date}
                  </span>
                  <BadgeCheck className="w-4 h-4 text-white/20 group-hover:text-green-400 transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

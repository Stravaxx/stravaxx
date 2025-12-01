import { ExternalLink } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main title with neon effect */}
        <h1 className="text-7xl md:text-9xl mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 via-slate-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            Stravaxx
          </span>
        </h1>

        {/* Subtitle */}
        <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
          <span className="text-2xl md:text-3xl text-blue-400">🇫🇷 Français</span>
          <span className="text-2xl md:text-3xl text-gray-600">|</span>
          <span className="text-2xl md:text-3xl text-slate-400">Développeur Backend</span>
        </div>

        {/* Glassmorphism card */}
        <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_8px_48px_0_rgba(59,130,246,0.15)] transition-all duration-300">
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            Passionné par la création d'applications performantes et innovantes
            avec les technologies modernes du web et du desktop.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center mt-10 flex-wrap">
          <a
            href="#projects"
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 flex items-center gap-2"
          >
            Voir mes projets
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="px-8 py-4 backdrop-blur-xl bg-white/[0.02] border border-blue-500/30 rounded-xl text-blue-400 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300"
          >
            Me contacter
          </a>
        </div>
      </div>
    </section>
  );
}

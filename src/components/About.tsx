export function About() {
  return (
    <section className="py-20 px-4" id="about">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <h2 className="text-5xl md:text-6xl mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-400 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            À propos de moi
          </span>
        </h2>

        {/* Content */}
        <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_8px_48px_0_rgba(59,130,246,0.1)] transition-all duration-300">
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            Je suis Stravaxx, développeur passionné spécialisé en{" "}
            <span className="text-blue-400">C#</span>,{" "}
            <span className="text-slate-400">C++</span>,{" "}
            <span className="text-blue-300">JavaScript</span>,{" "}
            <span className="text-slate-300">.NET</span>,{" "}
            <span className="text-blue-400">React</span> et{" "}
            <span className="text-green-400">NodeJS</span> pour le backend.
            J'aime créer des applications performantes et maintenables tout en
            explorant les dernières technologies et frameworks.
          </p>
        </div>
      </div>
    </section>
  );
}

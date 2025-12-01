import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { LanguageChart } from "./components/LanguageChart";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { useKonamiCode } from "./hooks/useKonamiCode";

export default function App() {
  const hackerMode = useKonamiCode();

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
      hackerMode 
        ? 'bg-gradient-to-br from-black via-green-950 to-black' 
        : 'bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950'
    }`}>
      {/* Animated background elements - darker */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-pulse ${
          hackerMode ? 'bg-green-500/20' : 'bg-blue-900/10'
        }`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
          hackerMode ? 'bg-emerald-500/20' : 'bg-slate-800/10'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse delay-500 ${
          hackerMode ? 'bg-lime-500/10' : 'bg-blue-950/10'
        }`}></div>
      </div>

      {/* Hacker Mode Matrix Effect */}
      {hackerMode && (
        <div className="fixed inset-0 pointer-events-none opacity-10">
          <div className="animate-matrix-rain text-green-500 text-xs font-mono overflow-hidden h-full">
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="inline-block mx-1 animate-fall" style={{ animationDelay: `${i * 0.1}s` }}>
                {Array.from({ length: 30 }).map((_, j) => (
                  <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <LanguageChart />
        <Skills />
        <Projects />
        <Contact />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNDgsIDE2MywgMTg0LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 pointer-events-none"></div>
    </div>
  );
}
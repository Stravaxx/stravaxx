import { ExternalLink } from "lucide-react";
import * as SimpleIcons from '@icons-pack/react-simple-icons';

const contacts = [
  {
    name: "GitHub",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    url: "https://github.com/stravaxx",
    username: "@stravaxx",
    color: "from-gray-700 to-gray-800",
  },
  {
    name: "GitHub²",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    url: "https://github.com/stravaxx-2",
    username: "@stravaxx²",
    color: "from-purple-700 to-purple-800",
  },
  {
    name: "Gitea",
    icon: <SimpleIcons.SiGitea className="w-full h-full" />,
    url: "http://vavaad.duckdns.org:84/vava",
    username: "Instance personnelle",
    color: "from-green-700 to-green-800",
  },
  {
    name: "Gitlab",
    icon: <SimpleIcons.SiGitlab className="w-full h-full" />,
    url: "https://gitlab.com/stravaxx",
    username: "@stravaxx",
    color: "from-orange-400 to-orange-700",
  },
  {
    name: "Discord",
    icon: <SimpleIcons.SiDiscord className="w-full h-full" />,
    url: "https://discord.com/users/863464160893468712",
    username: "stravaxx",
    color: "from-indigo-700 to-indigo-800",
  },
  {
    name: "Twitch",
    icon: <SimpleIcons.SiTwitch className="w-full h-full" />,
    url: "https://www.twitch.tv/dotvava",
    username: "dotvava",
    color: "from-fuchsia-500 to-fuchsia-950",
  },
];

export function Contact() {
  return (
    <section className="py-20 px-4 pb-32" id="contact">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-400 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            Contact
          </span>
        </h2>

        <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] mb-12">
          <p className="text-gray-400 text-lg text-center mb-12">
            N'hésitez pas à me contacter pour des collaborations, des questions
            ou simplement pour discuter de technologie !
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contacts.map((contact, index) => {
              return (
                <a
                  key={index}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 hover:border-blue-500/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] flex items-center gap-4"
                >
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${contact.color} border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all duration-300 text-white`}>
                    {contact.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl text-blue-400 mb-1">
                      {contact.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{contact.username}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="inline-block backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-xl px-8 py-4">
            <p className="text-gray-500">
              Développé avec{" "}
              <span className="text-red-500 animate-pulse">❤️</span> par{" "}
              <span className="text-blue-400">Stravaxx</span>
            </p>
            <p className="text-gray-600 text-sm mt-2">
              © 2025 - Tous droits réservés
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import * as SimpleIcons from '@icons-pack/react-simple-icons';
import React from 'react';
import CSharpIcon from '../components/icons/CSharpIcon';
export const languageConfig: Record<string, { color: string; icon?: string }> = {
  'JavaScript': { color: '#F7DF1E', icon: 'SiJavascript' },
  'TypeScript': { color: '#3178C6', icon: 'SiTypescript' },
  'C#': { color: '#239120', icon: undefined },
  'C++': { color: '#00599C', icon: 'SiCplusplus' },
  'Python': { color: '#3776AB', icon: 'SiPython' },
  'Java': { color: '#007396', icon: 'SiJava' },
  'Go': { color: '#00ADD8', icon: 'SiGo' },
  'Rust': { color: '#CE422B', icon: 'SiRust' },
  'PHP': { color: '#777BB4', icon: 'SiPhp' },
  'Ruby': { color: '#CC342D', icon: 'SiRuby' },
  'CSS': { color: '#1572B6', icon: 'SiCss3' },
  'HTML': { color: '#E34F26', icon: 'SiHtml5' },
  'Shell': { color: '#89E051', icon: 'SiGnometerminal' },
  'Dockerfile': { color: '#2496ED', icon: 'SiDocker' },
  'Vue': { color: '#4FC08D', icon: 'SiVuedotjs' },
  'C': { color: '#A8B9CC', icon: 'SiC' },
  'Swift': { color: '#F05138', icon: 'SiSwift' },
  'Kotlin': { color: '#7F52FF', icon: 'SiKotlin' },
  'Dart': { color: '#0175C2', icon: 'SiDart' },
  'R': { color: '#276DC3', icon: 'SiR' },
  'Scala': { color: '#DC322F', icon: 'SiScala' },
  'Lua': { color: '#2C2D72', icon: 'SiLua' },
  'Assembly': { color: '#6E4C13', icon: 'SiAssembly' },
  'Perl': { color: '#39457E', icon: 'SiPerl' },
  'Elixir': { color: '#4B275F', icon: 'SiElixir' },
  'PowerShell': { color: '#012456', icon: 'SiPowershell' },
  'Haskell': { color: '#5e5086', icon: 'SiHaskell' },
  'Clojure': { color: '#db5855', icon: 'SiClojure' },
  'Julia': { color: '#A270BA', icon: 'SiJulialang' },
  'OCaml': { color: '#3BE133', icon: 'SiOcaml' },
  'Fortran': { color: '#4d4d8b', icon: 'SiFortran' },   
  'Matlab': { color: '#ffcc00', icon: 'SiMatlab' },
  'Prolog': { color: '#742842', icon: 'SiProlog' },
};


export function getLanguageIcon(language: string): JSX.Element {
  const config = languageConfig[language];
  if (!config) {
    return (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  }
  // Special-case C# to use our custom SVG constant
  if (language === 'C#') {
    return (
      <div className="w-full h-full flex items-center justify-center" aria-label="C#">
        {CSharpIcon}
      </div>
    );
  }

  const IconComponent = config.icon ? (SimpleIcons as any)[config.icon] : null;
  if (IconComponent) {
    // Simple Icons accept a `color` prop and render the SVG
    return <IconComponent className="w-full h-full" color={config.color} />;
  }

  // fallback: circle with color
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor" style={{ color: config.color }}>
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export function getLanguageColor(language: string): string {
  return languageConfig[language]?.color || '#6B7280';
}

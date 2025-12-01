import { useEffect, useState } from "react";
import { getGithubHeaders, getGitlabHeaders, getGiteaHeaders } from "../utils/apiHeaders";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Loader2 } from "lucide-react";
import { getLanguageColor, getLanguageIcon } from "../utils/languageConfig";

interface LanguageData {
  name: string;
  value: number;
  bytes: number;
  color: string;
  projects: number;
  files: number;
}

export function LanguageChart() {
  const githubHeaders = getGithubHeaders();
  const gitlabHeaders = getGitlabHeaders();
  const giteaHeaders = getGiteaHeaders();
  const [data, setData] = useState<LanguageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sources, setSources] = useState<string[]>([]);

  useEffect(() => {
    const fetchLanguageStats = async () => {
      const languageStats: Record<string, { bytes: number; projects: Set<string>; files: number }> = {};
      const successfulSources: string[] = [];

      // Fetch from GitHub (stravaxx)
      try {
        const githubRepos = await fetch('https://api.github.com/users/stravaxx/repos?per_page=100', { headers: githubHeaders });
        if (githubRepos.ok) {
          const repos = await githubRepos.json();
          for (const repo of repos) {
            if (!repo.fork) {
              const langUrl = repo.languages_url;
              const langResponse = await fetch(langUrl, { headers: githubHeaders });
              if (langResponse.ok) {
                const languages = await langResponse.json();
                for (const [lang, bytes] of Object.entries(languages)) {
                  if (!languageStats[lang]) {
                    languageStats[lang] = { bytes: 0, projects: new Set(), files: 0 };
                  }
                  languageStats[lang].bytes += bytes as number;
                  languageStats[lang].projects.add(`gh1-${repo.name}`);
                  languageStats[lang].files += Math.max(1, Math.floor((bytes as number) / 1000));
                }
              }
            }
          }
          successfulSources.push('GitHub (stravaxx)');
        }
      } catch (e) {
        console.warn('GitHub stravaxx API error:', e);
      }

      // Fetch from GitHub (stravaxx-2)
      try {
        const github2Repos = await fetch('https://api.github.com/users/stravaxx-2/repos?per_page=100', { headers: githubHeaders });
        if (github2Repos.ok) {
          const repos = await github2Repos.json();
          for (const repo of repos) {
            if (!repo.fork) {
              const langUrl = repo.languages_url;
              const langResponse = await fetch(langUrl, { headers: githubHeaders });
              if (langResponse.ok) {
                const languages = await langResponse.json();
                for (const [lang, bytes] of Object.entries(languages)) {
                  if (!languageStats[lang]) {
                    languageStats[lang] = { bytes: 0, projects: new Set(), files: 0 };
                  }
                  languageStats[lang].bytes += bytes as number;
                  languageStats[lang].projects.add(`gh2-${repo.name}`);
                  languageStats[lang].files += Math.max(1, Math.floor((bytes as number) / 1000));
                }
              }
            }
          }
          successfulSources.push('GitHub (stravaxx-2)');
        }
      } catch (e) {
        console.warn('GitHub stravaxx-2 API error:', e);
      }

      // Fetch from Gitea (use VITE_GITEA_BASE or dev proxy /gitea to avoid CORS during development)
      try {
        const giteaBase = (import.meta as any).env?.VITE_GITEA_BASE || '/gitea';
        const giteaReposResp = await fetch(`${giteaBase}/api/v1/users/vava/repos`, {
          mode: 'cors',
          headers: giteaHeaders,
        });
        if (giteaReposResp.ok) {
          const repos = await giteaReposResp.json();
          // For each repo, fetch languages and aggregate like GitHub
          for (const repo of repos) {
            try {
              const langUrl = `${giteaBase}/api/v1/repos/vava/${encodeURIComponent(repo.name)}/languages`;
              const langResponse = await fetch(langUrl, { headers: giteaHeaders });
              if (langResponse.ok) {
                const languages = await langResponse.json();
                for (const [lang, bytes] of Object.entries(languages)) {
                  if (!languageStats[lang]) {
                    languageStats[lang] = { bytes: 0, projects: new Set(), files: 0 };
                  }
                  languageStats[lang].bytes += (bytes as number) || 0;
                  languageStats[lang].projects.add(`gitea-${repo.name}`);
                  languageStats[lang].files += Math.max(1, Math.floor(((bytes as number) || 0) / 1000));
                }
              }
            } catch (e) {
              // ignore per-repo failures
            }
          }
          successfulSources.push('Gitea');
        }
      } catch (e) {
        console.warn('Gitea API error (CORS or network issue):', e);
      }

      // Fetch from Gitlab
      try {
        const gitlabUser = await fetch('https://gitlab.com/api/v4/users?username=stravaxx', { headers: gitlabHeaders });
        if (gitlabUser.ok) {
          const users = await gitlabUser.json();
          if (users.length > 0) {
            const userId = users[0].id;
            const gitlabRepos = await fetch(`https://gitlab.com/api/v4/users/${userId}/projects?per_page=100`, { headers: gitlabHeaders });
            if (gitlabRepos.ok) {
              const repos = await gitlabRepos.json();
              for (const repo of repos) {
                const langUrl = `https://gitlab.com/api/v4/projects/${repo.id}/languages`;
                const langResponse = await fetch(langUrl, { headers: gitlabHeaders });
                if (langResponse.ok) {
                  const languages = await langResponse.json();
                  for (const [lang, percentage] of Object.entries(languages)) {
                    if (!languageStats[lang]) {
                      languageStats[lang] = { bytes: 0, projects: new Set(), files: 0 };
                    }
                    const estimatedBytes = (percentage as number) * 1000;
                    languageStats[lang].bytes += estimatedBytes;
                    languageStats[lang].projects.add(`gl-${repo.name}`);
                    languageStats[lang].files += Math.max(1, Math.floor(estimatedBytes / 1000));
                  }
                }
              }
              successfulSources.push('GitLab');
            }
          }
        }
      } catch (e) {
        console.warn('GitLab API error:', e);
      }

      setSources(successfulSources);

      // Convert to chart data
      const totalBytes = Object.values(languageStats).reduce((sum, stat) => sum + stat.bytes, 0);
      
      if (totalBytes > 0) {
        const chartData: LanguageData[] = Object.entries(languageStats)
          .map(([name, stats]) => ({
            name,
            value: Math.round((stats.bytes / totalBytes) * 100 * 10) / 10,
            bytes: stats.bytes,
            color: getLanguageColor(name),
            projects: stats.projects.size,
            files: stats.files,
          }))
          .filter(item => item.value >= 0.5)
          .sort((a, b) => b.value - a.value);

        setData(chartData);
      }
      
      setLoading(false);
    };

    fetchLanguageStats();
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="backdrop-blur-xl bg-slate-900/95 border border-blue-500/30 rounded-lg p-4 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
          <p className="text-blue-400 mb-2">{data.name}</p>
          <p className="text-white text-sm">{data.value}%</p>
          <p className="text-gray-400 text-sm">{data.projects} projets</p>
          <p className="text-gray-400 text-sm">{data.files} fichiers</p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap gap-4 justify-center mt-6">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-gray-400 text-sm">
              {entry.value} ({entry.payload.value}%)
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-400 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            Langages utilisés
          </span>
        </h2>

        <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_8px_48px_0_rgba(59,130,246,0.1)] transition-all duration-300">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
            </div>
          ) : data.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-gray-400">Aucune donnée de langage disponible</p>
            </div>
          ) : (
            <>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="hover:opacity-80 transition-opacity cursor-pointer stroke-slate-950"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={renderLegend} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Detailed Stats */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((lang, index) => (
                  <div
                    key={index}
                    className="backdrop-blur-sm bg-white/[0.02] border border-white/[0.05] rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-5 h-5" style={{ color: lang.color }}>
                        {getLanguageIcon(lang.name)}
                      </div>
                      <h3 className="text-slate-300">{lang.name}</h3>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {lang.value}% · {lang.projects} projets · {lang.files} fichiers
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {/* API Sources Info */}
          <div className="mt-6 text-center text-sm text-gray-500">
            {sources.length > 0 ? (
              <p>Données depuis: {sources.join(', ')}</p>
            ) : (
              <p>Impossible de charger les données des APIs</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

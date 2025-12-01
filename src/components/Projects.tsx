import { useState, useEffect } from "react";
import { getGithubHeaders, getGitlabHeaders, getGiteaHeaders } from "../utils/apiHeaders";
import { ExternalLink, Loader2, Star, GitFork } from "lucide-react";
import { getLanguageColor, getLanguageIcon } from "../utils/languageConfig";
import * as SimpleIcons from '@icons-pack/react-simple-icons';

interface Repository {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages?: Record<string, number>;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  source?: string;
}

export function Projects() {
  const githubHeaders = getGithubHeaders();
  const gitlabHeaders = getGitlabHeaders();
  const giteaHeaders = getGiteaHeaders();
  const [projects, setProjects] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allRepos: Repository[] = [];

        // Fetch from GitHub (stravaxx)
        try {
          const gh1Response = await fetch('https://api.github.com/users/stravaxx/repos?per_page=100&sort=updated', { headers: githubHeaders });
          if (gh1Response.ok) {
            const repos = await gh1Response.json();
            for (const repo of repos.filter((r: any) => !r.fork)) {
              try {
                const langResponse = await fetch(repo.languages_url, { headers: githubHeaders });
                const languages = langResponse.ok ? await langResponse.json() : {};
                allRepos.push({ ...repo, source: 'github', languages });
              } catch {
                allRepos.push({ ...repo, source: 'github' });
              }
            }
          }
        } catch (e) {
          console.warn('GitHub stravaxx error:', e);
        }

        // Fetch from GitHub (stravaxx-2)
        try {
          const gh2Response = await fetch('https://api.github.com/users/stravaxx-2/repos?per_page=100&sort=updated', { headers: githubHeaders });
          if (gh2Response.ok) {
            const repos = await gh2Response.json();
            for (const repo of repos.filter((r: any) => !r.fork)) {
              try {
                const langResponse = await fetch(repo.languages_url, { headers: githubHeaders });
                const languages = langResponse.ok ? await langResponse.json() : {};
                allRepos.push({ ...repo, source: 'github-2', languages });
              } catch {
                allRepos.push({ ...repo, source: 'github-2' });
              }
            }
          }
        } catch (e) {
          console.warn('GitHub stravaxx-2 error:', e);
        }

        // Fetch from Gitea (use VITE_GITEA_BASE or /gitea proxy in dev)
        try {
          const giteaBase = (import.meta as any).env?.VITE_GITEA_BASE || '/gitea';
          const giteaResponse = await fetch(`${giteaBase}/api/v1/users/vava/repos`, {
            mode: 'cors',
            headers: giteaHeaders
          });
          if (giteaResponse.ok) {
            const repos = await giteaResponse.json();
            // Fetch languages per repo in parallel to include `languages` field
            const enriched = await Promise.all(repos.map(async (r: any) => {
              let languages = {};
              try {
                const langResp = await fetch(`${giteaBase}/api/v1/repos/vava/${encodeURIComponent(r.name)}/languages`, { headers: giteaHeaders });
                if (langResp.ok) languages = await langResp.json();
              } catch (e) {
                // ignore
              }
              return {
                name: r.name,
                description: r.description,
                html_url: r.html_url,
                homepage: r.website,
                language: r.language,
                languages,
                topics: [],
                stargazers_count: r.stars_count,
                forks_count: r.forks_count,
                updated_at: r.updated_at,
                source: 'gitea'
              };
            }));
            allRepos.push(...enriched);
          }
        } catch (e) {
          console.warn('Gitea error:', e);
        }

        // Fetch from GitLab
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
                  try {
                    const langUrl = `https://gitlab.com/api/v4/projects/${repo.id}/languages`;
                    const langResponse = await fetch(langUrl, { headers: gitlabHeaders });
                    const languages = langResponse.ok ? await langResponse.json() : {};
                    
                    allRepos.push({
                      name: repo.name,
                      description: repo.description,
                      html_url: repo.web_url,
                      homepage: null,
                      language: Object.keys(languages)[0] || null,
                      languages,
                      topics: repo.topics || [],
                      stargazers_count: repo.star_count,
                      forks_count: repo.forks_count,
                      updated_at: repo.last_activity_at,
                      source: 'gitlab'
                    });
                  } catch {
                    allRepos.push({
                      name: repo.name,
                      description: repo.description,
                      html_url: repo.web_url,
                      homepage: null,
                      language: null,
                      topics: repo.topics || [],
                      stargazers_count: repo.star_count,
                      forks_count: repo.forks_count,
                      updated_at: repo.last_activity_at,
                      source: 'gitlab'
                    });
                  }
                }
              }
            }
          }
        } catch (e) {
          console.warn('GitLab error:', e);
        }

        // Sort by updated date
        allRepos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

        setProjects(allRepos);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const displayedProjects = showAll ? projects : projects.slice(0, 12);

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'github':
      case 'github-2':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case 'gitea':
        return (
          <SimpleIcons.SiGitea className="w-4 h-4" fill="currentColor"/>
        );
      case 'gitlab':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0537.8585.8585 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a6.0657 6.0657 0 0 0 2.0119 7.0105l.0113.0087.03.0213 4.976 3.7264 2.462 1.8633 1.4995 1.1321a1.0085 1.0085 0 0 0 1.2197 0l1.4995-1.1321 2.4619-1.8633 5.006-3.7489.0125-.01a6.0682 6.0682 0 0 0 2.0094-7.003z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const renderLanguageBar = (languages?: Record<string, number>) => {
    if (!languages || Object.keys(languages).length === 0) return null;

    const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    const languagePercentages = Object.entries(languages)
      .map(([name, bytes]) => ({
        name,
        percentage: (bytes / total) * 100,
        color: getLanguageColor(name)
      }))
      .sort((a, b) => b.percentage - a.percentage);

    return (
      <div className="mb-3">
        <div className="flex h-2 rounded-full overflow-hidden bg-white/5">
          {languagePercentages.map((lang, index) => (
            <div
              key={index}
              style={{ 
                width: `${lang.percentage}%`,
                backgroundColor: lang.color
              }}
              className="transition-all duration-300"
              title={`${lang.name}: ${lang.percentage.toFixed(1)}%`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {languagePercentages.slice(0, 3).map((lang, index) => (
            <div key={index} className="flex items-center gap-1">
              <div className="w-3 h-3" style={{ color: lang.color }}>
                {getLanguageIcon(lang.name)}
              </div>
              <span className="text-xs text-gray-500">{lang.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-20 px-4" id="projects">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              Projets
            </span>
          </h2>
          <div className="flex items-center justify-center h-96">
            <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4" id="projects">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-400 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            Projets
          </span>
        </h2>

        {/* Projects Grid - 4 columns x 3 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {displayedProjects.map((project, index) => (
            <div
              key={`${project.source}-${project.name}-${index}`}
              className="group backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_8px_48px_0_rgba(59,130,246,0.1)] hover:border-blue-500/20 transition-all duration-300 flex flex-col"
            >
              {/* Project Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl text-blue-400 flex-1 mr-2">{project.name}</h3>
                  <div className="text-gray-500">
                    {getSourceIcon(project.source || 'github')}
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  {project.description || "Pas de description"}
                </p>
              </div>

              {/* Language Bar */}
              {renderLanguageBar(project.languages)}

              {/* Topics */}
              {project.topics && project.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.topics.slice(0, 2).map((topic, topicIndex) => (
                    <span
                      key={topicIndex}
                      className="px-2 py-1 text-xs backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-md text-gray-500"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>{project.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  <span>{project.forks_count}</span>
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-3 mt-auto">
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-slate-700/20 border border-blue-500/20 rounded-lg text-blue-400 hover:border-blue-400/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-200 text-sm"
                >
                  {getSourceIcon(project.source || 'github')}
                  Code
                </a>
                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-3 py-2 backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-lg text-gray-400 hover:border-blue-500/30 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {projects.length > 12 && !showAll && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="group px-8 py-4 backdrop-blur-xl bg-white/[0.02] border border-blue-500/30 rounded-xl text-blue-400 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 flex items-center gap-2"
            >
              Voir tous les projets ({projects.length})
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {showAll && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll(false)}
              className="px-8 py-4 backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-xl text-gray-400 hover:border-blue-500/30 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300"
            >
              Voir moins
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { home } from "@/content/site-content";
import { personaThemeClasses } from "@/lib/persona-theme";

export function HomePage() {
  return (
    <>
      <section className="relative min-h-screen flex items-start overflow-hidden pt-32 md:pt-36">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-violet-50 to-white" />
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-gradient-radial from-violet-200/60 via-violet-100/20 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-radial from-blue-100/50 via-blue-50/20 to-transparent blur-3xl" />
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.06]"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="#7C00FF"
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 pb-6 w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-700 text-xs font-semibold mb-8 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              {home.hero.badge}
            </div>
            <h1 className="font-heading text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight text-foreground mb-8 whitespace-pre-line">
              {home.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-5">
              {home.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={home.hero.primaryCta.href}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:shadow-xl animate-glow-pulse"
              >
                {home.hero.primaryCta.label}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <a
                href={home.hero.secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-border text-foreground font-semibold text-base hover:bg-muted transition-colors"
              >
                {home.hero.secondaryCta.label}
                <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none">
          <div className="w-80 h-80 rounded-full bg-gradient-to-br from-violet-500 via-purple-400 to-blue-500 opacity-20 blur-2xl" />
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 opacity-30 blur-xl" />
        </div>
      </section>

      <section id="solutions" className="py-8 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              {home.personasSection.eyebrow}
            </p>
            <h2 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-foreground max-w-2xl leading-tight">
              {home.personasSection.title}
              <br />
              {home.personasSection.titleLine2}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {home.personaCards.map((persona) => {
              const theme = personaThemeClasses[persona.theme];
              return (
                <Link
                  key={persona.slug}
                  href={persona.href}
                  className={`group relative rounded-3xl border-2 p-8 cursor-pointer transition-all duration-300 ${theme.card}`}
                >
                  <div
                    className={`absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r ${theme.cardBorder} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5 ${theme.badge}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                    {persona.label}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2 leading-tight">
                    {persona.headline}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {persona.description}
                  </p>
                  <ul className="flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:max-h-0 md:group-hover:max-h-40 overflow-hidden">
                    {persona.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className={`flex items-center gap-2 text-xs font-medium ${theme.bullet}`}
                      >
                        <span className={`w-1 h-1 rounded-full ${theme.dot} shrink-0`} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <span
                    className={`mt-6 inline-flex items-center gap-1 text-xs font-semibold ${theme.text} md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300`}
                  >
                    Learn more <ChevronRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gradient-to-br from-violet-950 to-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#fff" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4">
                {home.statsSection.eyebrow}
              </p>
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                {home.statsSection.title}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                  {home.statsSection.titleHighlight}
                </span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                {home.statsSection.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {home.statsSection.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6"
                >
                  <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

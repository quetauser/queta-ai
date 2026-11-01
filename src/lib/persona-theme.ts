import type { PersonaTheme } from "@/content/site-content";

export const personaThemeClasses: Record<
  PersonaTheme,
  {
    badge: string;
    dot: string;
    card: string;
    cardBorder: string;
    cardHover: string;
    gradient: string;
    text: string;
    bullet: string;
    check: string;
  }
> = {
  violet: {
    badge: "text-violet-700 bg-white/70",
    dot: "bg-violet-500",
    card: "bg-violet-50 border-violet-200 hover:border-violet-400",
    cardBorder: "from-violet-600 to-purple-500",
    cardHover: "group-hover:opacity-100",
    gradient: "from-violet-500 via-purple-400 to-blue-500",
    text: "text-violet-700",
    bullet: "text-violet-700",
    check: "text-violet-700",
  },
  blue: {
    badge: "text-blue-700 bg-white/70",
    dot: "bg-blue-500",
    card: "bg-blue-50 border-blue-200 hover:border-blue-400",
    cardBorder: "from-blue-600 to-cyan-500",
    cardHover: "group-hover:opacity-100",
    gradient: "from-blue-500 to-cyan-400",
    text: "text-blue-700",
    bullet: "text-blue-700",
    check: "text-blue-700",
  },
  emerald: {
    badge: "text-emerald-700 bg-white/70",
    dot: "bg-emerald-500",
    card: "bg-emerald-50 border-emerald-200 hover:border-emerald-400",
    cardBorder: "from-emerald-500 to-teal-400",
    cardHover: "group-hover:opacity-100",
    gradient: "from-emerald-500 to-teal-400",
    text: "text-emerald-700",
    bullet: "text-emerald-700",
    check: "text-emerald-700",
  },
};

export const heroThemeBackground: Record<PersonaTheme, string> = {
  violet: "from-violet-50 via-white to-slate-50",
  blue: "from-blue-50 via-white to-slate-50",
  emerald: "from-emerald-50 via-white to-slate-50",
};

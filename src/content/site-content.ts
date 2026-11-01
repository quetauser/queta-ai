export type PersonaSlug = "lifestyle" | "realtor" | "trader";

export type PersonaTheme = "violet" | "blue" | "emerald";

export interface PersonaCard {
  slug: PersonaSlug;
  label: string;
  headline: string;
  description: string;
  bullets: string[];
  href: string;
  theme: PersonaTheme;
}

export interface SolutionFeature {
  title: string;
  description: string;
  tagline: string;
}

export interface Scenario {
  scenario: string;
  outcome: string;
}

export interface SolutionPageContent {
  slug: PersonaSlug;
  metaTitle: string;
  personaLabel: string;
  heroHeadline: string;
  heroDescription: string;
  theme: PersonaTheme;
  features: SolutionFeature[];
  scenarios: Scenario[];
  ctaHeadline: string;
  ctaDescription: string;
}

export type LegalRun =
  | { kind: "text"; text: string }
  | { kind: "bold"; text: string }
  | { kind: "break" }
  | { kind: "mail" };

export type LegalBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; runs: readonly LegalRun[] }
  | { kind: "bullets"; items: readonly (readonly LegalRun[])[] }
  | { kind: "numbers"; items: readonly (readonly LegalRun[])[] };

export type LegalDocument = {
  href: "/terms-of-use" | "/ai-legal-disclosure" | "/end-user-license-policy";
  navLabel: string;
  metaTitle: string;
  eyebrow?: string;
  subtitle?: string;
  blocks: readonly LegalBlock[];
};

export const site = {
  name: "Queta AI",
  domain: "https://www.queta.ai",
  defaultTitle: "Queta AI — Your AI. Your Persona. Your Edge.",
  defaultDescription:
    "Queta AI delivers persona-based agentic AI solutions for Lifestyle Users, Realtors, and Traders — eliminating operational overhead so you can focus on what matters.",
  footerBlurb:
    "Agentic AI solutions built around you. Choose your persona. Eliminate the overhead.",
  copyright: "© 2026 Queta AI. All rights reserved.",
} as const;

export const home = {
  hero: {
    badge: "Agentic AI Bots tailor made for you ..",
    title: "Your AI. Your Persona. Your Edge.",
    description:
      "Queta AI delivers agentic solutions built around who you are — eliminating mundane tasks so you can focus on what actually matters.",
    primaryCta: { label: "Request a Demo", href: "/contact" },
    secondaryCta: { label: "Explore Solutions", href: "#solutions" },
  },
  personasSection: {
    eyebrow: "Choose Your Persona",
    title: "One platform.",
    titleLine2: "Three superpowers.",
  },
  statsSection: {
    eyebrow: "The Numbers",
    title: "Work is about to get",
    titleHighlight: "radically different.",
    description:
      "Queta AI agents don't just assist — they act. Autonomously handling the tasks that drain your time, so you operate at a level that wasn't possible before.",
    stats: [
      { value: "10x", label: "Faster task completion" },
      { value: "80%", label: "Reduction in manual overhead" },
      { value: "24/7", label: "Always-on AI agents" },
      { value: "3", label: "Persona-tailored solutions" },
    ],
  },
  personaCards: [
    {
      slug: "lifestyle",
      label: "Lifestyle User",
      headline: "Live more. Manage less.",
      description:
        "Your personal AI agent handles scheduling, reminders, travel planning, and daily task management — so your life runs itself.",
      bullets: [
        "Smart scheduling & calendar sync",
        "Travel & errand automation",
        "Health & wellness tracking",
        "Personal finance insights",
      ],
      href: "/solutions/lifestyle",
      theme: "violet",
    },
    {
      slug: "realtor",
      label: "Realtor",
      headline: "Close faster. Work smarter.",
      description:
        "From lead follow-up to listing management, your AI agent keeps every deal moving without the manual grind.",
      bullets: [
        "Automated lead nurturing",
        "Listing & CRM sync",
        "Market analysis reports",
        "Client communication drafts",
      ],
      href: "/solutions/realtor",
      theme: "blue",
    },
    {
      slug: "trader",
      label: "Trader",
      headline: "React in milliseconds. Decide in seconds.",
      description:
        "Near real-time market intelligence and automated workflow execution — your AI agent never sleeps, never misses a signal.",
      bullets: [
        "Near real-time market monitoring",
        "Alert & signal automation",
        "Portfolio summary reports",
        "News sentiment analysis",
      ],
      href: "/solutions/trader",
      theme: "emerald",
    },
  ] satisfies PersonaCard[],
} as const;

export const pricing = {
  metaTitle: "Pricing — Queta AI",
  hero: {
    title: "One agent. Infinite leverage.",
    subtitle:
      "Simple, transparent pricing built around your persona. No hidden fees, just your edge.",
  },
  disclaimer: "Prices are subject to change without prior notice",
  launchBanner: "Launch pricing. Save on your first year through Nov 30.",
  launchBadge: "Launch offer",
  tiers: [
    {
      name: "Lifestyle User",
      launchAmount: "$279",
      regularAmount: "$399",
      launchMonthly: "$23.25",
      regularMonthly: "$33.25",
      offer: "First year when you sign up by Nov 30, 2026. Renews at $399/year.",
      description:
        "For individuals ready to reclaim their time and automate the basics.",
      features: [
        "Subscription Manager",
        "Shopper",
        "Travel Agent",
        "Chef",
        "Spending Coach",
        "Privacy Guardian",
        "Health Coach",
        "Personal Tutor",
        "Inbox Agent",
        "College Planner",
        "Retirement Planner",
        "Career Coach",
        "Home Maintenance Advisor",
        "Stock Analyst",
        "Queta Value Summary",
      ],
      cta: "Get Started",
      interestKey: "get-started-lifestyle-user",
    },
    {
      name: "Trader",
      launchAmount: "$449",
      regularAmount: "$549",
      launchMonthly: "$37.42",
      regularMonthly: "$45.75",
      offer: "First year when you sign up by Nov 30, 2026. Renews at $549/year.",
      description:
        "For active traders who need near real-time intelligence and automated execution.",
      features: [
        "Near Real-Time Market Scanner",
        "Options Flow Analyzer",
        "Portfolio Risk Monitor",
        "Earnings Calendar Agent",
        "News Sentiment Analyzer",
        "Trade Journal Automation",
      ],
      cta: "Get Started",
      interestKey: "get-started-trader",
    },
    {
      name: "Realtor",
      launchAmount: "$569",
      regularAmount: "$669",
      launchMonthly: "$47.42",
      regularMonthly: "$55.75",
      offer: "First year when you sign up by Nov 30, 2026. Renews at $669/year.",
      description:
        "For real estate professionals automating client and workflow tasks.",
      features: [
        "Listing Description Writer",
        "Client Follow-Up Agent",
        "Showing Scheduler",
        "Market Comparison Tool",
        "Document Summarizer",
        "Email & Calendar Manager",
      ],
      cta: "Get Started",
      interestKey: "get-started-realtor",
    },
  ],
  why: {
    eyebrow: "Why We Built This",
    title: "Built by people who ran out of time.",
    stats: [
      { value: "10x", label: "Productivity gain" },
      { value: "80%", label: "Time saved on tasks" },
      { value: "24/7", label: "Always on for you" },
    ],
    body: "We're founders, traders, and operators who spent years drowning in repetitive tasks. We built Queta AI because we needed it ourselves — and we knew others did too.",
  },
  bottomCta: {
    title: "Ready to get your edge?",
    description: "Join the waitlist and be first to access your AI persona.",
    buttonLabel: "Join the waitlist",
    interestKey: "waitlist",
  },
} as const;

export const about = {
  metaTitle: "About — Queta AI",
  hero: {
    eyebrow: "About Queta AI",
    title: "Built to give you your time back.",
    intro:
      "Queta AI was founded on the belief that the most capable people in the world should not be spending their days on tasks that don't require their talent.",
  },
  mission: {
    eyebrow: "Our Mission",
    paragraphs: [
      "Queta AI was founded by two co-founders who bring together deep expertise across software engineering, finance, and sales. Having spent years at the intersection of technology and high-performance industries, they witnessed firsthand how much time skilled professionals lose to repetitive, low-value tasks — scheduling, follow-ups, data management, and operational coordination.",
      "That observation became a conviction: AI should do more than answer questions. It should act. It should own workflows, execute decisions within defined parameters, and operate end-to-end on behalf of the people it serves — not simply suggest what to do next.",
      "Queta AI was built to solve that problem. Our agentic platform is designed around real personas and real workflows, giving every user a personal AI agent that thinks, acts, and executes on their behalf — so they can focus entirely on what only they can do.",
    ],
  },
  founders: {
    eyebrow: "Our Founders",
    title: "Deep expertise. A shared obsession with reclaiming time.",
    intro:
      "Queta AI was founded by two technology and business leaders with complementary backgrounds spanning software engineering, financial markets, and enterprise sales. Their combined experience across these disciplines gave them a unique vantage point: they understood both the technical potential of agentic AI and the real-world operational pain points that professionals face every day.",
    closing:
      "Together, they set out to build something different — not another productivity tool, but a true AI agent platform that executes on behalf of its users. The mission has remained constant from day one: make everyday tasks effortless, and give people back the time to focus on what is most important to them.",
    people: [
      {
        role: "Co-Founder & CEO",
        area: "Strategy & Business Development",
        bio: "Brings extensive experience in finance and enterprise sales, with a track record of building high-performance teams and taking products to market. Leads Queta AI's vision, partnerships, and go-to-market strategy.",
      },
      {
        role: "Co-Founder & CTO",
        area: "Engineering & Product",
        bio: "A seasoned software engineer with deep expertise in AI systems and platform architecture. Leads the design and development of Queta's agentic execution layer and persona-driven intelligence.",
      },
    ],
  },
  principles: {
    eyebrow: "What we believe",
    title: "Our principles.",
    items: [
      {
        title: "Agency over assistance",
        body: "We build agents that act, not chatbots that suggest. The difference between the two is everything.",
      },
      {
        title: "Persona-first design",
        body: "Generic AI produces generic results. We build for specific people with specific needs — and the depth shows in every interaction.",
      },
      {
        title: "Trust through transparency",
        body: "Your agent operates within boundaries you define. You always know what it is doing, why it is doing it, and how to adjust.",
      },
      {
        title: "Relentless execution",
        body: "We hold ourselves to the same standard we set for our agents — ship fast, iterate constantly, and never settle for good enough.",
      },
    ],
  },
  cta: {
    title: "Ready to get your time back?",
    description: "Request a personalized demo and see what Queta AI can do for you.",
  },
} as const;

export const contact = {
  metaTitle: "Contact Us — Queta AI",
  hero: {
    title: "Thank you for your interest in Queta AI",
    description:
      "Have a question or want to learn more about Queta AI? Send us a message and we'll get back to you within 24 hours.",
  },
  form: {
    submitLabel: "Submit",
    sendingLabel: "Sending…",
    successMessage:
      "Thanks for reaching out. We received your message and will get back to you within 24 hours.",
    errorMessage:
      "Something went wrong while sending your message. Please try again in a moment.",
    fields: {
      name: { label: "Name", placeholder: "Your full name", type: "text" as const },
      email: { label: "Email", placeholder: "you@example.com", type: "email" as const },
      phone: { label: "Phone Number", placeholder: "Your phone number", type: "tel" as const },
      interest: {
        label: "Interest",
        placeholder: "How can we help?",
        type: "text" as const,
      },
      comments: {
        label: "Comments",
        placeholder: "Tell us how we can help...",
        type: "textarea" as const,
      },
    },
  },
} as const;

const realtorSolution: SolutionPageContent = {
  slug: "realtor",
  metaTitle: "Realtor AI Agent — Queta AI",
  personaLabel: "Realtor",
  heroHeadline: "Close faster. Work smarter.",
  heroDescription:
    "Your AI agent keeps every deal moving — from first lead to final signature — without the manual follow-up, data entry, or missed opportunities.",
  theme: "blue",
  features: [
    {
      title: "Automated Lead Nurturing",
      description:
        "Your agent follows up with every lead on the right cadence — personalized messages, timely check-ins, and no lead left cold.",
      tagline: "Respond within minutes of a new inquiry, even when you're showing a property.",
    },
    {
      title: "Listing & CRM Sync",
      description:
        "New listings, price changes, and status updates flow automatically into your CRM and marketing channels.",
      tagline: "Your agent keeps every record current so you're never working from stale data.",
    },
    {
      title: "Market Analysis Reports",
      description:
        "Get instant comps, neighborhood trend summaries, and buyer/seller market insights — ready to share with clients.",
      tagline: "Walk into every meeting with data that builds trust and closes deals.",
    },
    {
      title: "Client Communication Drafts",
      description:
        "Your agent drafts emails, follow-ups, and offer summaries in your voice — you review and send.",
      tagline: "Cut hours of writing down to minutes without losing the personal touch.",
    },
    {
      title: "Showing Coordination",
      description:
        "Schedule showings, send confirmations, collect feedback, and log notes — all handled automatically.",
      tagline: "Your calendar stays organized and clients stay informed without back-and-forth.",
    },
    {
      title: "Transaction Timeline Tracking",
      description:
        "Monitor every deal's milestones — inspections, contingencies, closing dates — and get alerts before deadlines slip.",
      tagline: "Nothing falls through the cracks when your agent is watching every deal.",
    },
  ],
  scenarios: [
    {
      scenario: "New lead submits a contact form at 11pm",
      outcome: "Personalized follow-up sent within 5 minutes, meeting booked by morning",
    },
    {
      scenario: "Client asks for comps on a 3BR in Midtown",
      outcome: "Market analysis report generated and emailed in under 2 minutes",
    },
    {
      scenario: "Inspection deadline is in 3 days",
      outcome: "Proactive alert sent with checklist and vendor contacts ready",
    },
  ],
  ctaHeadline: "Ready to close more deals?",
  ctaDescription: "Request a demo and see your Realtor AI agent in action.",
};

const traderSolution: SolutionPageContent = {
  slug: "trader",
  metaTitle: "Trader AI Agent — Queta AI",
  personaLabel: "Trader",
  heroHeadline: "React in milliseconds. Decide in seconds.",
  heroDescription:
    "Your AI agent monitors markets around the clock, surfaces signals the moment they matter, and executes your defined workflows — so you never miss a move.",
  theme: "emerald",
  features: [
    {
      title: "Near Real-Time Market Monitoring",
      description:
        "Your agent watches price action, volume, and volatility across your watchlist 24/7 — alerting you the instant conditions match your criteria.",
      tagline: "Set your parameters once. Your agent never sleeps, never blinks.",
    },
    {
      title: "Alert & Signal Automation",
      description:
        "Define your entry and exit conditions. Your agent fires alerts via your preferred channel the moment a signal triggers.",
      tagline: "No more staring at charts. Your agent does the watching.",
    },
    {
      title: "Portfolio Summary Reports",
      description:
        "Get a clear daily or weekly snapshot of your positions, P&L, exposure, and performance — formatted for fast review.",
      tagline: "Know exactly where you stand before the market opens.",
    },
    {
      title: "News Sentiment Analysis",
      description:
        "Your agent scans financial news, earnings releases, and macro events — surfacing sentiment shifts that could move your positions.",
      tagline: "Stay ahead of the narrative, not behind it.",
    },
    {
      title: "Workflow Execution",
      description:
        "Automate your pre-market routine, post-trade logging, and end-of-day review — your agent runs the process so you focus on the decision.",
      tagline: "Consistent process. Consistent edge.",
    },
    {
      title: "Stock Analyst commentary",
      description: "Near real-time updates for stock upgrade and downgrade.",
      tagline: "Your agent keeps you informed on what stock analysts are saying.",
    },
  ],
  scenarios: [
    {
      scenario: "A stock on my watchlist breaks out on volume",
      outcome: "Alert fired in near real-time with price, volume, and news context attached",
    },
    {
      scenario: "I want a pre-market briefing every day at 8am",
      outcome: "Automated report: overnight moves, macro events, and watchlist status",
    },
    {
      scenario: "My portfolio is overexposed to tech",
      outcome: "Concentration alert triggered with rebalancing suggestions",
    },
  ],
  ctaHeadline: "Ready to trade with an edge?",
  ctaDescription: "Request a demo and see your Trader AI agent in action.",
};

const lifestyleSolution: SolutionPageContent = {
  slug: "lifestyle",
  metaTitle: "Lifestyle User AI Agent — Queta AI",
  personaLabel: "Lifestyle User",
  heroHeadline: "Live more. Manage less.",
  heroDescription:
    "Your personal AI agent handles the logistics of daily life — scheduling, errands, travel, finances — so you can spend your time on what actually matters.",
  theme: "violet",
  features: [
    {
      title: "Subscription Manager",
      description:
        "Analyzes your subscriptions and suggests ways to remove duplicates and optimize the household's spending. Runs a monthly check to avoid unnecessary spending.",
      tagline: "A monthly check so duplicate subscriptions don't linger.",
    },
    {
      title: "Shopper",
      description:
        "Researches and compares products across major retailers, including Shop.com, Costco, Target, Walmart, and Best Buy, to find the best value and place the order.",
      tagline: "The right product, at a price that holds up.",
    },
    {
      title: "Travel Agent",
      description:
        "Finds and compares flights, hotels, parking, ground transport, and restaurant reservations, researches destinations for family trips, and books the trip.",
      tagline: "The trip is compared and planned before you pack.",
    },
    {
      title: "Chef",
      description:
        "Helps you plan the week's meals around dietary restrictions, coordinates with your family on preferences, finalizes the menu and ingredients, builds the grocery list, and places the order with Walmart, Instacart, and other stores.",
      tagline: "Dinner is decided, and the list is ready.",
    },
    {
      title: "Spending Coach",
      description:
        "Helps you track the household's spending trends and coaches you on opportunities to save.",
      tagline: "A clear look at the week, without moving your money.",
    },
    {
      title: "Privacy Guardian",
      description:
        "Gets your personal and contact information removed from data brokers and people-search sites, and keeps it removed.",
      tagline: "Your details stay off the lists that sell them.",
    },
    {
      title: "Health Coach",
      description:
        "Offers friendly nudges and coaching for your health and wellness. Reminds you about medications and annual check-ups, provides daily yoga and meditation videos, connects to Oura, and guides you toward a healthy lifestyle.",
      tagline: "The small daily habits, prompted before they slip.",
    },
    {
      title: "Personal Tutor",
      description:
        "Helps you and your household understand complex topics, including with short generated videos. Get help explaining concepts to kids for their homework, or learn advanced topics to grow your career.",
      tagline: "A clear explanation, in the time you have.",
    },
    {
      title: "Inbox Agent",
      description:
        "Watches Outlook and Gmail, sends a daily digest of what needs a reply or action, helps draft and send responses as needed, and turns bills and deadlines into to-dos.",
      tagline: "The messages that need you, before the day gets away.",
    },
    {
      title: "College Planner",
      description:
        "Builds the college list and tracks deadlines and application status from the first school to the last submission.",
      tagline: "Every deadline is on the list, not in memory.",
    },
    {
      title: "Retirement Planner",
      description:
        "Models whether and how you can retire early on your real numbers, with a base case and a conservative case.",
      tagline: "The same plan, run both ways, so the choice is yours.",
    },
    {
      title: "Career Coach",
      description:
        "Polishes your resume and LinkedIn, watches for matching jobs, and helps you apply with a simple command.",
      tagline: "A stronger profile, and a nudge when a role fits.",
    },
    {
      title: "Home Maintenance Advisor",
      description:
        "Keeps home maintenance on schedule, from seasonal checklists and air filters to supplies, vent cleaning, and furnace service.",
      tagline: "The house stays ahead of the season.",
    },
    {
      title: "Stock Analyst",
      description:
        "A research-only markets desk for your watchlist, with morning and close briefs, charts, and a weekly macro recap. It flags opportunities or risks in near real-time.",
      tagline: "Research only. The list is watched so you are not glued to a screen.",
    },
    {
      title: "Queta Value Summary",
      description:
        "Recaps what your Queta agents got done each week and shows the value they provided, including money and time saved.",
      tagline: "A weekly account of what your agents did for you.",
    },
  ],
  scenarios: [
    {
      scenario: "Book a weekend trip to Asheville for two",
      outcome: "Flights, hotel, and restaurant reservations handled in minutes",
    },
    {
      scenario: "Remind me to renew my car insurance before it lapses",
      outcome: "Proactive alert 30 days out with renewal link ready",
    },
    {
      scenario: "I want to eat healthier this month",
      outcome: "Meal plan drafted, grocery list created, delivery scheduled",
    },
  ],
  ctaHeadline: "",
  ctaDescription: "",
};

export const solutions: Record<PersonaSlug, SolutionPageContent> = {
  lifestyle: lifestyleSolution,
  realtor: realtorSolution,
  trader: traderSolution,
};

export const legalDocuments = [
  {
    href: "/terms-of-use",
    navLabel: "Terms of Use",
    metaTitle: "Terms of Use — Queta AI",
    eyebrow: "QUETA AI LLC",
    blocks: [
      {
        kind: "paragraph",
        runs: [
          {
            kind: "bold",
            text: "Effective Date:"
          },
          {
            kind: "text",
            text: " October 31, 2026"
          },
          {
            kind: "break"
          },
          {
            kind: "bold",
            text: "Last Updated:"
          },
          {
            kind: "text",
            text: " October 31, 2026"
          }
        ]
      },
      {
        kind: "heading",
        text: "1. Acceptance of Terms"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "These Terms of Use (\"Terms\") govern your access to and use of the websites, applications, AI agents, software, services, and related products provided by Queta AI LLC (\"Queta AI,\" \"Queta,\" \"we,\" \"us,\" or \"our\")."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "By accessing or using our services, creating an account, or purchasing a subscription, you acknowledge that you have read and agree to these Terms."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "If you do not agree to these Terms, you must not access or use our services."
          }
        ]
      },
      {
        kind: "heading",
        text: "2. License and Authorized Use"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI grants each authorized subscriber a limited, personal, non-exclusive, non-transferable, and revocable license to access and use the services for their intended purposes, subject to these Terms and the applicable subscription plan."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Unless expressly authorized in a separate written agreement signed by Queta AI, each subscription permits use by "
          },
          {
            kind: "bold",
            text: "one individual user through one registered account"
          },
          {
            kind: "text",
            text: "."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Your subscription does not grant you ownership of the software, AI agents, underlying models, proprietary technology, or intellectual property associated with the services."
          }
        ]
      },
      {
        kind: "heading",
        text: "3. Single-User Account Policy"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Each account is licensed to one individual and may be used only by that individual."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You agree that you will not:"
          }
        ]
      },
      {
        kind: "bullets",
        items: [
          [
            {
              kind: "text",
              text: "Share your account credentials, login information, authentication tokens, or access credentials with another person."
            }
          ],
          [
            {
              kind: "text",
              text: "Allow another individual to log in to or use your account."
            }
          ],
          [
            {
              kind: "text",
              text: "Share, sublicense, resell, rent, lease, distribute, or otherwise provide access to Queta AI's services or AI agents to another person without prior written authorization from Queta AI."
            }
          ],
          [
            {
              kind: "text",
              text: "Permit third parties to use your account, directly or indirectly, whether for personal, commercial, or other purposes."
            }
          ],
          [
            {
              kind: "text",
              text: "Circumvent account restrictions, user limits, authentication requirements, or subscription limitations."
            }
          ],
          [
            {
              kind: "text",
              text: "Use a single-user subscription to provide services to multiple individuals."
            }
          ]
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Purchasing a subscription does not authorize you to provide access to other members of your household, colleagues, employees, clients, customers, or other third parties."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "bold",
            text: "Exceptions require prior written consent from Queta AI LLC."
          },
          {
            kind: "text",
            text: " Any approved exception may be subject to additional fees, licensing conditions, or a separate commercial agreement."
          }
        ]
      },
      {
        kind: "heading",
        text: "4. Account Security and Responsibility"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You are responsible for maintaining the confidentiality of your account credentials and for activities conducted through your account, to the extent permitted by applicable law."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You agree to notify Queta AI promptly if you suspect unauthorized access, credential theft, or misuse of your account."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI may implement reasonable security measures, access controls, authentication procedures, and usage monitoring to protect its services and enforce subscription restrictions."
          }
        ]
      },
      {
        kind: "heading",
        text: "5. Prohibited Activities"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You may not use the services to:"
          }
        ]
      },
      {
        kind: "bullets",
        items: [
          [
            {
              kind: "text",
              text: "Violate applicable laws or regulations."
            }
          ],
          [
            {
              kind: "text",
              text: "Infringe upon the intellectual property or other legal rights of Queta AI or third parties."
            }
          ],
          [
            {
              kind: "text",
              text: "Reverse engineer, decompile, or attempt to extract source code, model weights, or proprietary components, except to the extent such restrictions are prohibited by applicable law."
            }
          ],
          [
            {
              kind: "text",
              text: "Circumvent security controls, access restrictions, rate limits, or usage restrictions."
            }
          ],
          [
            {
              kind: "text",
              text: "Interfere with the integrity, availability, or security of the services."
            }
          ],
          [
            {
              kind: "text",
              text: "Copy, reproduce, distribute, or commercially exploit proprietary components without authorization."
            }
          ],
          [
            {
              kind: "text",
              text: "Use the services in a manner that constitutes fraud, abuse, unauthorized access, or unlawful conduct."
            }
          ]
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Additional restrictions may apply to specific products or services."
          }
        ]
      },
      {
        kind: "heading",
        text: "6. Enforcement, Suspension, and Termination"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI reserves the right to investigate suspected violations of these Terms."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Where reasonably necessary to protect users, the company, its technology, or its services, Queta AI may suspend or restrict access while investigating a suspected violation."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "If Queta AI determines that you have materially violated these Terms, including by sharing your account or providing unauthorized access to another person, Queta AI may suspend or terminate your account or subscription."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Where appropriate, Queta AI may provide notice and an opportunity to remedy a violation. However, immediate suspension or termination may be appropriate in cases involving serious security risks, deliberate circumvention, repeated violations, or unauthorized commercial distribution."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Termination does not eliminate payment obligations or other rights and remedies that accrued before termination."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Refunds, if any, will be governed by the applicable subscription terms and refund policy, subject to applicable law."
          }
        ]
      },
      {
        kind: "heading",
        text: "7. Intellectual Property"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "The services, software, user interfaces, branding, logos, documentation, proprietary AI agents, and related materials are owned by or licensed to Queta AI LLC and are protected by applicable intellectual property laws."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Except for the limited license expressly granted under these Terms, no rights are transferred to you."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You may not use Queta AI's name, trademarks, branding, or proprietary materials in a manner that suggests an affiliation, endorsement, or authorization that does not exist."
          }
        ]
      },
      {
        kind: "heading",
        text: "8. AI-Generated Content"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI provides AI-powered services that may generate recommendations, summaries, analyses, predictions, communications, and other outputs."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "AI-generated content may be inaccurate, incomplete, outdated, misleading, or unsuitable for a particular purpose."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You are responsible for reviewing and evaluating outputs before relying on them or taking action based on them."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI does not guarantee that any AI-generated output will be accurate, reliable, uninterrupted, or suitable for your specific circumstances."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Additional disclosures and limitations may apply to particular AI agents or features."
          }
        ]
      },
      {
        kind: "heading",
        text: "9. Third-Party Services"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Certain features may rely on third-party software, APIs, AI models, data providers, or other services."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Your use of third-party services may be subject to additional terms and privacy policies."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI is not responsible for independent third-party services to the extent permitted by applicable law."
          }
        ]
      },
      {
        kind: "heading",
        text: "10. Changes to the Services or Terms"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI may modify, improve, suspend, or discontinue features of its services."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "We may update these Terms from time to time. Material changes will be communicated through reasonable means where required by law."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "The revised Terms will identify their effective date. Where affirmative acceptance is legally required, we will obtain that acceptance before applying the relevant changes."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Your continued use of the services after revised Terms become effective constitutes acceptance only to the extent permitted by applicable law."
          }
        ]
      },
      {
        kind: "heading",
        text: "11. Limitation of Liability"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "To the maximum extent permitted by applicable law, Queta AI LLC and its officers, employees, affiliates, licensors, and service providers will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, including loss of profits, revenue, data, business opportunities, or anticipated savings, arising from or related to your use of the services."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "To the maximum extent permitted by applicable law, Queta AI's aggregate liability arising from or related to the services will be limited to the amount you paid to Queta AI for the applicable service during the twelve months preceding the event giving rise to the claim."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "These limitations do not apply to liability that cannot lawfully be excluded or limited."
          }
        ]
      },
      {
        kind: "heading",
        text: "12. Indemnification"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "To the extent permitted by applicable law, you agree to indemnify and hold harmless Queta AI LLC and its officers, employees, and affiliates against third-party claims, damages, liabilities, and reasonable legal expenses arising from your unlawful use of the services, your infringement of third-party rights, or your material breach of these Terms."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "This provision does not apply to the extent a claim results from conduct for which you cannot lawfully be required to indemnify Queta AI."
          }
        ]
      },
      {
        kind: "heading",
        text: "13. Governing Law"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "These Terms will be governed by the laws of the State of New Jersey, without regard to its conflict-of-law principles, except where applicable law requires otherwise."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Any legal proceedings will be brought in a court of competent jurisdiction located in New Jersey, subject to applicable jurisdictional requirements and any mandatory rights you may have under applicable law."
          }
        ]
      },
      {
        kind: "heading",
        text: "14. General Provisions"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "If any provision of these Terms is found unenforceable, the remaining provisions will remain in effect to the extent permitted by law."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Failure to enforce a provision does not constitute a waiver of the right to enforce it later."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "These Terms, together with any applicable subscription terms and other agreements incorporated into them, govern your use of the services."
          }
        ]
      },
      {
        kind: "heading",
        text: "15. Contact Information"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "For questions regarding these Terms, account restrictions, licensing, or authorization to share access, please contact:"
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "bold",
            text: "Queta AI LLC"
          },
          {
            kind: "break"
          },
          {
            kind: "text",
            text: "Email: "
          },
          {
            kind: "mail"
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Website: www.queta.ai"
          },
          {
            kind: "break"
          },
          {
            kind: "text",
            text: "Business Address: 2 Ascot Ln, Belle Mead, NJ 08502"
          }
        ]
      }
    ]
  },
  {
    href: "/ai-legal-disclosure",
    navLabel: "AI and Legal Disclosure",
    metaTitle: "AI and Legal Disclosure — Queta AI",
    subtitle: "AI DISCLAIMER AND LEGAL DISCLOSURE",
    blocks: [
      {
        kind: "paragraph",
        runs: [
          {
            kind: "bold",
            text: "Effective Date:"
          },
          {
            kind: "text",
            text: " 31 October, 2026"
          }
        ]
      },
      {
        kind: "heading",
        text: "1. General AI Disclaimer"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI LLC provides artificial intelligence-powered software, assistants, agents, and related services intended to help users organize information, automate tasks, explore options, and make more informed decisions."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Our services use AI technologies that may produce responses based on patterns, available information, user inputs, and third-party data sources."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "AI-generated responses are not guaranteed to be accurate, complete, current, unbiased, or appropriate for every situation."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You acknowledge that artificial intelligence has limitations and that outputs may contain errors, omissions, unsupported conclusions, or fabricated information."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You should independently verify important information before relying on it."
          }
        ]
      },
      {
        kind: "heading",
        text: "2. No Professional Advice"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Unless expressly stated in a separate written agreement, Queta AI does not provide legal, medical, tax, accounting, investment, or other regulated professional services."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Information provided by our AI agents is for general informational and assistance purposes and is not a substitute for advice from a qualified professional who understands your circumstances."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You should consult an appropriate professional before making significant decisions involving your health, finances, taxes, legal rights, or other matters requiring specialized expertise."
          }
        ]
      },
      {
        kind: "heading",
        text: "3. Financial and Investment Disclosure"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Any financial information, spending analysis, retirement projections, investment research, market commentary, stock analysis, or financial planning assistance provided by Queta AI is for informational and educational purposes only."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Unless expressly agreed in a separate arrangement that complies with applicable law, Queta AI does not act as your investment adviser, broker, dealer, fiduciary, or financial planner."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "AI-generated financial information is not a guarantee of investment performance, financial outcomes, retirement income, or future market behavior."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Financial markets involve risk, including the possible loss of principal. Past performance does not guarantee future results."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You are responsible for evaluating your financial circumstances and consulting qualified professionals when appropriate."
          }
        ]
      },
      {
        kind: "heading",
        text: "4. Health and Wellness Disclosure"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Health, fitness, nutrition, sleep, and wellness information generated by Queta AI is intended for general informational and wellness-support purposes."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Our AI agents are not a substitute for a licensed physician, qualified healthcare professional, emergency medical service, or individualized medical evaluation."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Do not disregard professional medical advice or delay seeking care because of information generated by an AI agent."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "If you believe you are experiencing a medical emergency, contact emergency services immediately."
          }
        ]
      },
      {
        kind: "heading",
        text: "5. Automation and Actions"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Certain Queta AI features may assist with preparing communications, organizing information, scheduling activities, generating recommendations, or performing other automated tasks."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Depending on the feature, outputs or actions may require your review, confirmation, or authorization."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You are responsible for reviewing material communications, transactions, bookings, submissions, and other consequential actions before approving them, where applicable."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI does not guarantee that automated actions will always execute successfully, promptly, or without error."
          }
        ]
      },
      {
        kind: "heading",
        text: "6. Third-Party Information"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Our services may rely on third-party APIs, external data sources, AI models, integrations, and service providers."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI does not guarantee the accuracy, availability, completeness, or continued operation of independent third-party services."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Information supplied by third parties may be delayed, incomplete, or inaccurate."
          }
        ]
      },
      {
        kind: "heading",
        text: "7. No Guarantee of Results"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI does not guarantee specific personal, professional, commercial, financial, health, or productivity outcomes from using its services."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "The usefulness of AI-generated recommendations depends on various factors, including the quality of available information, the user's instructions, third-party systems, and circumstances outside our control."
          }
        ]
      },
      {
        kind: "heading",
        text: "8. Limitation of Reliance"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You agree to exercise independent judgment when evaluating AI-generated information."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You remain responsible for decisions and actions you take based on the services, subject to any rights or protections that cannot lawfully be waived."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Nothing in this disclosure excludes liability that applicable law does not permit Queta AI to exclude."
          }
        ]
      },
      {
        kind: "heading",
        text: "9. Privacy and Data Handling"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Your use of Queta AI may involve the processing of personal information, account information, user inputs, and AI conversations."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Our collection, use, disclosure, retention, and protection of personal information are governed by our Privacy Policy and any applicable product-specific disclosures."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Please review the Privacy Policy before submitting sensitive personal, financial, medical, or confidential information."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Do not assume that information submitted to an AI agent is protected by attorney-client privilege, doctor-patient privilege, or another professional confidentiality privilege."
          }
        ]
      },
      {
        kind: "heading",
        text: "10. Contact Information"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "For questions about these disclosures or the limitations of our services, contact:"
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "bold",
            text: "Queta AI LLC"
          },
          {
            kind: "break"
          },
          {
            kind: "text",
            text: "Email: "
          },
          {
            kind: "mail"
          },
          {
            kind: "break"
          },
          {
            kind: "text",
            text: "Website: www.queta.ai"
          }
        ]
      }
    ]
  },
  {
    href: "/end-user-license-policy",
    navLabel: "End User License Policy",
    metaTitle: "End User License Policy — Queta AI",
    subtitle: "ACCOUNT SHARING AND LICENSE ENFORCEMENT POLICY",
    blocks: [
      {
        kind: "paragraph",
        runs: [
          {
            kind: "bold",
            text: "One Subscription. One User. One Account."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI LLC provides individually licensed access to its AI-powered products and services."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Each individual subscription authorizes "
          },
          {
            kind: "bold",
            text: "one registered user to access and use the applicable Queta AI service through one account"
          },
          {
            kind: "text",
            text: ". Account sharing is prohibited unless Queta AI LLC provides prior written authorization."
          }
        ]
      },
      {
        kind: "heading",
        text: "Unauthorized Use Is Prohibited"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You may not share your login credentials, provide another person with access to your account, sublicense your subscription, or permit another individual to use your licensed AI agents."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "This restriction applies regardless of whether the unauthorized use is temporary, occasional, recurring, or provided without charge."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Household members, friends, coworkers, employees, and other individuals must obtain their own authorized access unless Queta AI expressly approves an exception in writing."
          }
        ]
      },
      {
        kind: "heading",
        text: "Consequences of Violations"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI LLC takes unauthorized account sharing and access seriously."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "If we reasonably determine that you have violated this policy, we reserve the right to:"
          }
        ]
      },
      {
        kind: "numbers",
        items: [
          [
            {
              kind: "text",
              text: "Suspend or terminate your account or subscription."
            }
          ],
          [
            {
              kind: "text",
              text: "Restrict access to affected services or features."
            }
          ],
          [
            {
              kind: "text",
              text: "Revoke unauthorized access and take reasonable steps to protect our systems."
            }
          ],
          [
            {
              kind: "text",
              text: "Pursue compensation for actual losses and any other damages or remedies available under applicable law."
            }
          ],
          [
            {
              kind: "text",
              text: "Seek appropriate injunctive or other legal relief when warranted."
            }
          ]
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Depending on the circumstances, we may take action without advance notice when necessary to protect the security or integrity of our services or prevent ongoing unauthorized use."
          }
        ]
      },
      {
        kind: "heading",
        text: "Contractual Damages"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Unauthorized sharing may expose Queta AI LLC to losses involving licensing revenue, unauthorized commercial use, technology misuse, and other harm."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI LLC reserves all rights to pursue available legal remedies arising from unauthorized access or use."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Any fixed amount of contractual damages will apply only if established in a separate, properly drafted agreement or provision that is enforceable under applicable law. Any such amount must satisfy the legal requirements applicable to liquidated damages and must not operate as an unlawful penalty."
          }
        ]
      },
      {
        kind: "heading",
        text: "Requesting Authorization"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "If you wish to share access for a legitimate business, family, team, or organizational purpose, please contact Queta AI LLC to discuss an appropriate license."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "No exception is effective unless Queta AI LLC provides written authorization through an authorized representative."
          }
        ]
      },
      {
        kind: "heading",
        text: "Acceptance"
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "By creating an account, purchasing a subscription, or using Queta AI services, you acknowledge that you are responsible for complying with the applicable licensing and account-sharing restrictions."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "bold",
            text: "Questions about licensing or authorization:"
          },
          {
            kind: "break"
          },
          {
            kind: "text",
            text: "Queta AI LLC  | "
          },
          {
            kind: "mail"
          }
        ]
      }
    ]
  }
] as const satisfies readonly LegalDocument[];

export const navigation = {
  solutions: [
    { label: "Lifestyle User", href: "/solutions/lifestyle" },
    { label: "Realtor", href: "/solutions/realtor" },
    { label: "Trader", href: "/solutions/trader" },
  ] as const,
  links: [
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as const,
  legal: {
    label: "Legal",
    links: legalDocuments.map((document) => ({
      label: document.navLabel,
      href: document.href,
    })),
  },
  cta: { label: "Request a Demo", href: "/contact" },
} as const;

export const publicRoutes = [
  "/",
  "/pricing",
  "/about",
  "/contact",
  "/solutions/lifestyle",
  "/solutions/realtor",
  "/solutions/trader",
  ...legalDocuments.map((document) => document.href),
] as const;

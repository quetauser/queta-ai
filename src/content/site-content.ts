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
  tagline?: string;
  points?: readonly string[];
}

export interface SolutionFeatureGroup {
  title: string;
  span: "half" | "full";
  features: readonly SolutionFeature[];
}

export interface SolutionGuide {
  howItWorks: {
    eyebrow: string;
    title: string;
    steps: readonly { title: string; text: string }[];
    principles: readonly string[];
  };
  gettingStarted: {
    title: string;
    steps: readonly { title: string; text: string }[];
  };
  limits: {
    title: string;
    items: readonly string[];
  };
  closing: string;
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
  featuresHeading?: string;
  featureGroups?: readonly SolutionFeatureGroup[];
  guide?: SolutionGuide;
}

export type LegalRun =
  | { kind: "text"; text: string }
  | { kind: "bold"; text: string }
  | { kind: "break" }
  | { kind: "mail" }
  | { kind: "link"; href: string; text: string };

export type LegalBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; runs: readonly LegalRun[] }
  | { kind: "bullets"; items: readonly (readonly LegalRun[])[] }
  | { kind: "numbers"; items: readonly (readonly LegalRun[])[] };

export type LegalDocument = {
  href: "/terms-of-use" | "/privacy-policy" | "/ai-legal-disclosure" | "/end-user-license-policy";
  navLabel: string;
  metaTitle: string;
  title?: string;
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
  copyright: "© 2026 Queta AI. All rights reserved.",
} as const;

export const home = {
  hero: {
    badge: "Think It. Queta It.",
    title: "Queta Companion - Gets your Work Done !",
    description:
      "Queta AI solutions, powered by Grok Bot, are built around who you are — eliminating mundane tasks so you can focus on what actually matters.",
    primaryCta: { label: "Sign Up", href: "/subscribe" },
    secondaryCta: { label: "Explore Solutions", href: "#solutions" },
  },
  personaPoweredBy: "powered by Grok Bot",
  statsSection: {
    eyebrow: "The Numbers",
    title: "Work is about to get",
    titleHighlight: "radically different.",
    description:
      "Queta AI agents, powered by Grok Bot, don't just assist — they act. Autonomously handling the tasks that drain your time, so you operate at a level that wasn't possible before.",
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
      label: "Queta Lifestyle",
      headline: "Live more. Manage less.",
      description:
        "Your Digital Companion which helps you complete tasks in every aspect of your lifestyle, including scheduling, shopping, travel, finance, health and many others.",
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
      slug: "trader",
      label: "Queta Trader",
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
    {
      slug: "realtor",
      label: "Queta Realtor",
      headline: "Close faster. Work smarter.",
      description:
        "From Lead creation to Deal closure, your Queta Realtor Companion that keeps every deal moving without the manual grind.",
      bullets: [
        "New-listing alerts and comps",
        "Net proceeds and offer comparison",
        "Listing-to-closing deal tracker",
        "MLS listing prep packet",
      ],
      href: "/solutions/realtor",
      theme: "blue",
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
  compareLink: { label: "Compare Pricing", href: "/compare" },
  launchBanner: "Launch pricing. Save on your first year through Nov 22.",
  launchBadge: "Launch offer",
  tiers: [
    {
      name: "Lifestyle User",
      launchAmount: "$279",
      regularAmount: "$399",
      launchMonthly: "$23.25",
      offer: "First year when you sign up by Nov 22, 2026. Renews at $399/year.",
      description:
        "For individuals ready to reclaim their time and get things done with Queta Companion.",
      features: [
        "Subscription Manager",
        "Shopper",
        "Travel Agent",
        "Health & Nutrition Coach",
        "Spending Coach",
        "Privacy Guardian",
        "Student Guide",
        "Inbox Agent",
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
      offer: "First year when you sign up by Nov 22, 2026. Renews at $549/year.",
      description:
        "For active traders who need near real-time intelligence and automated execution.",
      features: [
        "Near Real-Time Market Scanner",
        "Options Flow Analyzer",
        "Portfolio Risk Monitor",
        "Earnings Calendar Agent",
        "News Sentiment Analyzer",
        "Trade Journal Automation",
        "Paper Trading",
      ],
      cta: "Get Started",
      interestKey: "get-started-trader",
    },
    {
      name: "Realtor",
      launchAmount: "$569",
      regularAmount: "$669",
      launchMonthly: "$47.42",
      offer: "First year when you sign up by Nov 22, 2026. Renews at $669/year.",
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
    nextSteps:
      "Once you submit your request, our team will email you instructions on the next steps to get started with your Queta solution.",
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

export const subscribe = {
  metaTitle: "Subscribe — Queta AI",
  heading: "Thank you for your interest in Queta AI solutions",
  steps: {
    details: "1. Your details",
    products: "2. Products of interest",
    review: "3. Review & accept",
  },
  productsLegend: "Products",
  productsRequired: "Select at least one product.",
  fields: {
    firstName: { label: "First Name", placeholder: "First name" },
    lastName: { label: "Last Name", placeholder: "Last name" },
    email: { label: "Email", placeholder: "you@example.com" },
    confirmEmail: { label: "Confirm email", placeholder: "you@example.com" },
    phone: { label: "Phone number (optional)", placeholder: "Phone number" },
  },
  errors: {
    firstName: "Enter your first name.",
    lastName: "Enter your last name.",
    email: "Enter your email.",
    emailFormat: "Enter an email address like you@example.com.",
    emailMatch: "Emails don't match.",
  },
  accept: "Accept",
  decline: "Decline",
  readDisclaimer:
    "Read the Terms of Use, Privacy Policy, End User License Agreement, AI and Legal Disclosure",
  scrollHint: "Scroll to the end to continue",
  reachedEnd: "You've reached the end",
  stillNeeded: "Still needed:",
  disclaimerNeeded: "Accept the Queta Disclaimer to subscribe.",
  disclaimerDeclined: "You declined the Queta Disclaimer. Accept it to subscribe.",
  submitLabel: "Sign Up",
  sendingLabel: "Sending…",
  backHome: "Back to home",
  startOver: "Start over",
  sendErrorLead: "We couldn't send your request. Email ",
  sendErrorEmail: "subscribe@queta.ai",
  sendErrorTail: " and we will take it from there.",
  confirmationBefore: "You will receive an email from Queta team with ",
  confirmationNextSteps: "Next Steps",
  confirmationBetween: " and ",
  confirmationGuide: "Getting Started Guide",
  confirmationAfter:
    ". Please check your Spam/Junk folder if you do not receive an email within 24 hours. Feel free to contact us on ",
  confirmationEmail: "info@queta.ai",
} as const;

export const faq = {
  metaTitle: "FAQ | Queta AI",
  headline: "Frequently Asked Questions",
  intro:
    "Answers to common questions about Queta AI solutions, how they work, and how your data is protected.",
  grokCta: {
    label: "Visit the Grok Bot FAQs",
    href: "https://cursor.com/help/grok-bot/faqs",
  },
  groups: [
    {
      title: "Getting Started",
      items: [
        {
          question: "How will I get my Queta solution?",
          answer:
            "Once you subscribe, you will receive an email with a Getting Started guide and your solution package.",
        },
        {
          question: "What platform do Queta AI solutions run on?",
          answer:
            "Queta AI solutions run on the Grok Bot platform. You subscribe to the Grok platform under your own username, and your Queta solution runs inside your individual Grok account.",
        },
        {
          question: "How do I migrate from ChatGPT to Grok Bot while preserving my memories and data?",
          answer:
            "You can bring your ChatGPT memories and data into Grok Bot so you do not have to start from scratch. First, copy your saved memories from ChatGPT (Settings > Personalization > Memory > Manage) and request a full data export (Settings > Data controls > Export data). Then open a chat with your Grok Bot, paste in your memories, ask it to remember them, and share files from your export so it can pick out what matters. The video below walks through each step.",
          video: {
            src: "/videos/migrate-chatgpt.mp4",
            poster: "/videos/migrate-chatgpt-poster.jpg",
            label: "Migrate from ChatGPT to Grok Bot",
          },
        },
        {
          question: "How do I migrate from Claude to Grok Bot while preserving my memories and data?",
          answer: "Below is the step by step guide to migrate from Claude to Grok Bot",
          video: {
            src: "/videos/migrate-claude.mp4",
            poster: "/videos/migrate-claude-poster.jpg",
            label: "Migrate from Claude to Grok Bot",
          },
        },
      ],
    },
    {
      title: "Your Account and Data",
      items: [
        {
          question: "Does the Queta AI team have access to my account?",
          answer:
            "No. Your Queta solution runs inside your own Grok account, and the Queta AI team has no access to, or visibility into, your account.",
        },
        {
          question: "Who manages security and privacy?",
          answer: "All security and privacy measures are managed by the Grok platform.",
        },
      ],
    },
    {
      title: "Security and Privacy",
      items: [
        {
          question: "Can a bot do more than I can?",
          answer: "No. A bot acts only on your behalf and never holds more access than you do.",
        },
        {
          question: "How are my passwords, cards, and connector tokens protected?",
          answer:
            "Connector tokens stay on the Grok Bot platform's backend, and saved passwords and cards are managed by Grok Bot. For detailed information, review the following resources:",
          links: [
            { label: "Grok Bot Vault", href: "https://docs.x.ai/grok-bot/vault" },
            { label: "Grok Bot FAQs", href: "https://cursor.com/help/grok-bot/faqs" },
          ],
        },
        {
          question: "What happens before a bot takes a consequential action?",
          answer: "Consequential actions go through Auto Review and require your approval.",
        },
      ],
    },
    {
      title: "More Resources",
      items: [
        {
          question: "Where can I learn more about Grok Bot?",
          links: [
            { label: "Grok Bot FAQs", href: "https://cursor.com/help/grok-bot/faqs" },
            { label: "Grok Bot Security", href: "https://docs.x.ai/grok-bot/security" },
            { label: "Grok Bot Security FAQ", href: "https://docs.x.ai/grok-bot/security-faq" },
            {
              label: "Approvals, Security and Privacy",
              href: "https://docs.x.ai/grok-bot/approvals-security-and-privacy",
            },
          ],
        },
        {
          question: "Still have a question?",
          answer: "Read the Privacy Policy.",
          links: [
            { label: "Privacy Policy", href: "/privacy-policy" },
          ],
        },
      ],
    },
  ],
} as const;

const realtorSolution: SolutionPageContent = {
  slug: "realtor",
  metaTitle: "Queta Realtor — Queta AI",
  personaLabel: "Queta Realtor",
  heroHeadline: "Close faster. Work smarter.",
  heroDescription:
    "Queta Realtor, powered by Grok Bot, keeps every deal moving — from first lead to final signature — without the manual follow-up, data entry, or missed opportunities.",
  theme: "blue",
  features: [],
  featureGroups: [
    {
      title: "Buyer Side",
      span: "half",
      features: [
        {
          title: "New-listing alerts",
          description:
            "A daily check against each client's criteria. It reports only new listings and price drops.",
        },
        {
          title: "Facing direction",
          description: "Listing text, satellite view, and map math, with a confidence level.",
        },
        {
          title: "Comps",
          description:
            "A brokerage-style CMA with comp and adjustment grids and a low / likely / high range.",
        },
        {
          title: "Pre-offer playbook",
          description: "From affordability and showings through the offer, inspection request, and move-in checklist.",
          points: [
            "Affordability, monthly payment math, and a lender shortlist",
            "Showing tour route and scorecard",
            "Due diligence: taxes, flood zone, permits, schools, radon, and oil tank",
            "Offer strategy: aggressive / balanced / conservative",
            "Inspection repair request draft",
            "Homeowners insurance options",
            "NJ closing cost estimate",
            "Move-in checklist",
          ],
        },
        {
          title: "NJ offer documents",
          description: "Buyer checklist, offer form, and seller disclosure links.",
        },
        {
          title: "Under-contract tracker",
          description: "Dated tasks from attorney review to closing.",
        },
      ],
    },
    {
      title: "Seller Side",
      span: "half",
      features: [
        {
          title: "Comps and pricing",
          description: "A sourced CMA and list-price strategy, labeled an estimate.",
        },
        {
          title: "Net proceeds",
          description:
            "Commissions, NJ transfer fee, payoff, and prorations, with a low / likely / high range.",
        },
        {
          title: "MLS listing prep packet",
          description:
            "Sourced property facts, a room-by-room breakdown, a public remarks draft, a documents checklist, and a photo shot list.",
        },
        {
          title: "Flat-fee MLS comparison",
          description: "Sourced prices, inclusions, fees, and trade-offs versus full service.",
        },
        {
          title: "Listing-to-closing tracker",
          description: "Dated tasks from go-live to closing.",
        },
        {
          title: "Weekly showing and price review",
          description: "Feedback, new competition, and a hold / adjust / improve recommendation.",
        },
        {
          title: "Offer comparison",
          description: "Side-by-side net and risk for each offer.",
        },
        {
          title: "Repair request response",
          description: "Repair, credit, or decline for each item, with the new net.",
        },
        {
          title: "Move-out checklist",
          description: "Utilities, services, keys, mail, and movers.",
        },
      ],
    },
    {
      title: "Linked Deals",
      span: "full",
      features: [
        {
          title: "Buy-and-sell timing plan",
          description: "Sell first, buy first, contingent, or back-to-back closings.",
        },
        {
          title: "Linked client deals",
          description: "One client's buyer and seller deals stay linked.",
        },
        {
          title: "Sale proceeds and date clashes",
          description: "Sale proceeds feed the purchase budget, and date clashes are flagged.",
        },
      ],
    },
    {
      title: "Deal Tracker",
      span: "full",
      features: [
        {
          title: "Clients, deals, and tasks",
          description: "Clients, deals, and tasks in one client and deal tracker.",
        },
        {
          title: "Dependent dates",
          description: "Dependent dates recalculate when one date moves.",
        },
        {
          title: "Daily reminder",
          description: "A daily reminder for tasks due soon or overdue.",
        },
      ],
    },
    {
      title: "Referral Pages",
      span: "full",
      features: [
        {
          title: "Attorneys",
          description: "5 to 8 local real estate attorneys, with sourced ratings and questions to ask.",
        },
        {
          title: "Inspectors",
          description: "License lookup, add-on services, and a local risk checklist.",
        },
        {
          title: "Recommended by",
          description: "A \"Recommended by\" column for your referrals.",
        },
      ],
    },
  ],
  scenarios: [],
  ctaHeadline: "",
  ctaDescription: "",
  guide: {
    howItWorks: {
      eyebrow: "One assistant, built on Grok Bot",
      title: "How it works",
      steps: [
        {
          title: "Runs on Grok Bot",
          text: "Each feature is a tested skill, so work comes out the same way every time.",
        },
        {
          title: "Connects to your tools",
          text: "Your email, calendar, and client and deal tracker, with your approval.",
        },
        {
          title: "Set up from a template",
          text: "A ready-made bot template plus a ready-made client and deal tracker.",
        },
      ],
      principles: [
        "Every figure sourced and dated",
        "Estimates labeled as estimates",
        "Nothing sent without your OK",
        "No task marked done without your confirmation",
      ],
    },
    gettingStarted: {
      title: "Getting started",
      steps: [
        {
          title: "Set up",
          text: "Install the bot template and add the client and deal tracker.",
        },
        {
          title: "Connect",
          text: "Link your email, calendar, and tracker.",
        },
        {
          title: "Add a client",
          text: "Buying, selling, or both. It asks a few questions, one at a time.",
        },
        {
          title: "Ask for a first action",
          text: "Comps, a listing alert, a listing packet, or a tracker for an accepted offer.",
        },
      ],
    },
    limits: {
      title: "What it doesn't do",
      items: [
        "It is not legal, tax, or financial advice. Confirm decisions with attorneys and lenders.",
        "You, the agent, sign and submit every document. It drafts and organizes; it never posts to the MLS.",
      ],
    },
    closing: "Spend more time with clients, less on paperwork.",
  },
};

const traderSolution: SolutionPageContent = {
  slug: "trader",
  metaTitle: "Trader AI Agent — Queta AI",
  personaLabel: "Trader",
  heroHeadline: "React in milliseconds. Decide in seconds.",
  heroDescription:
    "Queta Trader, powered by Grok Bot, monitors markets, surfaces signals, and executes trades based on your rules - so you never miss a move.",
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
      title: "Paper Trading",
      description:
        "Test your strategies with simulated trades on real market data, no capital at risk. Refine entries, exits, and position sizing until the approach performs to your liking, then move it to your live brokerage account with confidence.",
      tagline: "Prove the plan on paper before it risks real money.",
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

export const traderSamples = {
  heading: "Sample outputs",
  subtext: "Real examples of what Queta Trader sends you",
  disclaimer: "Sample output for illustration. Not investment advice.",
  openLabel: "See sample outputs",
  closeLabel: "Close",
  previousLabel: "Previous sample",
  nextLabel: "Next sample",
  items: [
    {
      src: "/images/trader-samples/pattern-brief.webp",
      width: 730,
      height: 695,
      caption: "Morning pattern brief",
      alt: "Chat sample of a morning pattern brief. It lists a confirmed META double top, TSLA closing under its 200-day average, and other watchlist notes, with small chart thumbnails along the bottom.",
    },
    {
      src: "/images/trader-samples/meta-chart.webp",
      width: 484,
      height: 286,
      caption: "Annotated technical chart",
      alt: "Daily META price and volume chart titled double top confirmed, close 641.39 on November 10, 2026, with a 50-day average, a 200-day average, marked peaks, and a neckline.",
    },
    {
      src: "/images/trader-samples/portfolio-summary.webp",
      width: 526,
      height: 346,
      caption: "Daily portfolio summary",
      alt: "Portfolio summary card for November 10, 2026, with real and paper account values, cash balances, and small gains and losses.",
    },
  ],
} as const;

export const lifestyleSamples = {
  heading: "Sample outputs",
  subtext: "Real examples of what Queta Lifestyle sends you",
  disclaimer: "Sample output for illustration.",
  lightboxNote: "Sample output with example data.",
  openLabel: "See sample outputs",
  closeLabel: "Close",
  previousLabel: "Previous sample",
  nextLabel: "Next sample",
  items: [
    {
      src: "/images/lifestyle-samples/job-search-dashboard.webp",
      width: 1024,
      height: 741,
      caption: "Job search dashboard",
      alt: "Job search dashboard for the week of November 9 to 13, 2026, compared with an example $130k salary. It shows applications sent, interviews, a salary bar chart, a status donut, and a table of example roles.",
    },
    {
      src: "/images/lifestyle-samples/workout-plan.webp",
      width: 846,
      height: 1280,
      caption: "Workout plan with exercise demos",
      alt: "A 30-minute leg-day workout with warm-up notes, exercise pairs, demo video links, and illustrated cards for squats, deadlifts, lunges, hip thrusts, and stretches.",
    },
    {
      src: "/images/lifestyle-samples/subscription-finds.webp",
      width: 1130,
      height: 1160,
      caption: "Subscription savings finds",
      alt: "Example subscription findings that match card charges with email, including a duplicate streaming charge, a trial that became paid, a price increase, and an unused card perk.",
    },
    {
      src: "/images/lifestyle-samples/month-snapshot.webp",
      width: 929,
      height: 1280,
      caption: "Monthly money snapshot",
      alt: "Example November 2026 money snapshot with income, spending by category, projected totals, savings, card limits, and flags that groceries and dining are above average.",
    },
    {
      src: "/images/lifestyle-samples/student-dashboard.webp",
      width: 1024,
      height: 757,
      caption: "Student school dashboard",
      alt: "Student dashboard mock with an overdue algebra assignment, a field-trip form due Monday, a November calendar, and a table of forms to sign.",
    },
  ],
} as const;

const lifestyleSolution: SolutionPageContent = {
  slug: "lifestyle",
  metaTitle: "Lifestyle User AI Agent — Queta AI",
  personaLabel: "Queta Lifestyle",
  heroHeadline: "Live more. Manage less.",
  heroDescription:
    "Queta Lifestyle, powered by Grok Bot, your Digital Companion that handles the logistics of daily life — scheduling, errands, travel, finances, shopping, others and gets the work done — so you can spend your time on what actually matters.",
  featuresHeading: "Queta Lifestyle solutions",
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
      title: "Health & Nutrition Coach",
      description:
        "Helps you plan the week's meals around dietary restrictions, coordinates with your family on preferences, finalizes the menu and ingredients, builds the grocery list, and places the order with Walmart, Instacart, and other stores. It offers friendly nudges and coaching for your health and wellness. It reminds you about medications and annual check-ups, provides daily yoga and meditation videos, connects to Oura, and guides you toward a healthy lifestyle.",
      tagline: "Dinner is decided, and the list is ready. The small daily habits, prompted before they slip.",
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
      title: "Student Guide",
      description:
        "Helps you and your household understand complex topics with short generated videos, from kids' homework to advanced topics for a career. It also guides families through college applications, building the college list and tracking deadlines and application status. Student Guide connects to Genesis so school and application information stays current without manual re-entry.",
      tagline: "Homework, career learning, and the college list, kept on track.",
    },
    {
      title: "Inbox Agent",
      description:
        "Watches Outlook and Gmail, sends a daily digest of what needs a reply or action, helps draft and send responses as needed, and turns bills and deadlines into to-dos.",
      tagline: "The messages that need you, before the day gets away.",
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
    eyebrow: "Queta AI LLC",
    blocks: [
      {
        kind: "paragraph",
        runs: [
          { kind: "bold", text: "Effective Date:" },
          { kind: "text", text: " November 2, 2026" },
          { kind: "break" },
          { kind: "bold", text: "Last Updated:" },
          { kind: "text", text: " November 2, 2026" },
        ],
      },
      { kind: "heading", text: "1. Acceptance of Terms" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "These Terms of Use (\"Terms\") govern your access to and use of the websites, applications, Queta AI agents, solution, software, services, and related products provided by Queta AI LLC (\"Queta AI,\" \"Queta,\" \"we,\" \"us,\" or \"our\"). All Queta AI solutions are powered by Grok Bot.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "By accessing or using our services, creating an account, or purchasing a subscription, you acknowledge that you have read and agree to these Terms and also terms from Grok Bot - ",
          },
          { kind: "link", href: "https://x.ai/legal/grok-bot-terms", text: "https://x.ai/legal/grok-bot-terms" },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "If you do not agree to these Terms, you must not access or use our services.",
          },
        ],
      },
      { kind: "heading", text: "2. License and Authorized Use" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI grants each authorized subscriber a limited, personal, non-exclusive, non-transferable, and revocable license to access and use the services for their intended purposes, subject to these Terms and the applicable subscription plan.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Unless expressly authorized in a separate written agreement signed by Queta AI, each subscription permits use by one individual user through one registered account.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Your subscription does not grant you ownership of the software, AI agents, underlying models, proprietary technology, or intellectual property associated with the services.",
          },
        ],
      },
      { kind: "heading", text: "3. Single-User Account Policy" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Each account is licensed to one individual and may be used only by that individual.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [{ kind: "text", text: "You agree that you will not:" }],
      },
      {
        kind: "bullets",
        items: [
          [{ kind: "text", text: "Share your account credentials, login information, authentication tokens, or access credentials with another person." }],
          [{ kind: "text", text: "Allow another individual to log in to or use your account." }],
          [{ kind: "text", text: "Share, sublicense, resell, rent, lease, distribute, or otherwise provide access to Queta AI's services or AI agents to another person without prior written authorization from Queta AI." }],
          [{ kind: "text", text: "Permit third parties to use your account, directly or indirectly, whether for personal, commercial, or other purposes." }],
          [{ kind: "text", text: "Circumvent account restrictions, user limits, authentication requirements, or subscription limitations." }],
          [{ kind: "text", text: "Use a single-user subscription to provide services to multiple individuals." }],
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Purchasing a subscription does not authorize you to provide access to other members of your household, colleagues, employees, clients, customers, or other third parties.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Exceptions require prior written consent from Queta AI LLC. Any approved exception may be subject to additional fees, licensing conditions, or a separate commercial agreement.",
          },
        ],
      },
      { kind: "heading", text: "4. Account Security and Responsibility" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI does not store any user data. Users create a direct subscription to Grok Bot platform. You are responsible for maintaining the confidentiality of your account credentials and for activities conducted through your account, to the extent permitted by applicable law.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You agree to notify Queta AI and Grok Bot promptly if you suspect unauthorized access, credential theft, or misuse of your account.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          { kind: "text", text: "Please refer to Grok Bot Security available here - " },
          { kind: "link", href: "https://docs.x.ai/grok-bot/security", text: "https://docs.x.ai/grok-bot/security" },
        ],
      },
      { kind: "heading", text: "5. Prohibited Activities" },
      {
        kind: "paragraph",
        runs: [{ kind: "text", text: "You may not use the services to:" }],
      },
      {
        kind: "bullets",
        items: [
          [{ kind: "text", text: "Violate applicable laws or regulations." }],
          [{ kind: "text", text: "Infringe upon the intellectual property or other legal rights of Queta AI or third parties." }],
          [{ kind: "text", text: "Reverse engineer, decompile, or attempt to extract source code, model weights, or proprietary components, except to the extent such restrictions are prohibited by applicable law." }],
          [{ kind: "text", text: "Circumvent security controls, access restrictions, rate limits, or usage restrictions." }],
          [{ kind: "text", text: "Interfere with the integrity, availability, or security of the services." }],
          [{ kind: "text", text: "Copy, reproduce, distribute, or commercially exploit proprietary components without authorization." }],
          [{ kind: "text", text: "Use the services in a manner that constitutes fraud, abuse, unauthorized access, or unlawful conduct." }],
        ],
      },
      {
        kind: "paragraph",
        runs: [
          { kind: "text", text: "Additional restrictions may apply to specific products or services." },
        ],
      },
      { kind: "heading", text: "6. Enforcement, Suspension, and Termination" },
      {
        kind: "paragraph",
        runs: [
          { kind: "text", text: "Queta AI reserves the right to investigate suspected violations of these Terms." },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Where reasonably necessary to protect users, the company, its technology, or its services, Queta AI may suspend or restrict access while investigating a suspected violation.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "If Queta AI determines that you have materially violated these Terms, including by sharing your account or providing unauthorized access to another person, Queta AI may suspend or terminate your account or subscription.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Where appropriate, Queta AI may provide notice and an opportunity to remedy a violation. However, immediate suspension or termination may be appropriate in cases involving serious security risks, deliberate circumvention, repeated violations, or unauthorized commercial distribution.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Termination does not eliminate payment obligations or other rights and remedies that accrued before termination.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Refunds, if any, will be governed by the applicable subscription terms and refund policy, subject to applicable law.",
          },
        ],
      },
      { kind: "heading", text: "7. Intellectual Property" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "The services, software, user interfaces, branding, logos, documentation, and related materials are owned by or licensed to Queta AI LLC and are protected by applicable intellectual property laws.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          { kind: "text", text: "Except for the limited license expressly granted under these Terms, no rights are transferred to you." },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You may not use Queta AI's name, trademarks, branding, or proprietary materials in a manner that suggests an affiliation, endorsement, or authorization that does not exist.",
          },
        ],
      },
      { kind: "heading", text: "8. AI-Generated Content" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI uses Grok Bot platform, AI agents and model, for services that may generate recommendations, summaries, analyses, predictions, communications, and other outputs.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "AI-generated content may be inaccurate, incomplete, outdated, misleading, or unsuitable for a particular purpose.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You are responsible for reviewing and evaluating outputs before relying on them or taking action based on them.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI does not guarantee that any AI-generated output will be accurate, reliable, uninterrupted, or suitable for your specific circumstances.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          { kind: "text", text: "Additional disclosures and limitations may apply to particular AI agents or features." },
        ],
      },
      { kind: "heading", text: "9. Third-Party Services" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Certain features may rely on third-party software, APIs, AI models, data providers, or other services.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          { kind: "text", text: "Your use of third-party services may be subject to additional terms and privacy policies." },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI is not responsible for independent third-party services to the extent permitted by applicable law.",
          },
        ],
      },
      { kind: "heading", text: "10. Changes to the Services or Terms" },
      {
        kind: "paragraph",
        runs: [
          { kind: "text", text: "Queta AI may modify, improve, suspend, or discontinue features of its services." },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "We may update these Terms from time to time. Material changes will be communicated through reasonable means where required by law.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "The revised Terms will identify their effective date. Where affirmative acceptance is legally required, we will obtain that acceptance before applying the relevant changes.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Your continued use of the services after revised Terms become effective constitutes acceptance only to the extent permitted by applicable law.",
          },
        ],
      },
      { kind: "heading", text: "11. Limitation of Liability" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "To the maximum extent permitted by applicable law, Queta AI LLC and its officers, employees, affiliates, licensors, and service providers will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, including loss of profits, revenue, data, business opportunities, or anticipated savings, arising from or related to your use of the services.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "To the maximum extent permitted by applicable law, Queta AI's aggregate liability arising from or related to the services will be limited to the amount you paid to Queta AI for the applicable service during the twelve months preceding the event giving rise to the claim.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          { kind: "text", text: "These limitations do not apply to liability that cannot lawfully be excluded or limited." },
        ],
      },
      { kind: "heading", text: "12. Indemnification" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "To the extent permitted by applicable law, you agree to indemnify and hold harmless Queta AI LLC and its officers, employees, and affiliates against third-party claims, damages, liabilities, and reasonable legal expenses arising from your unlawful use of the services, your infringement of third-party rights, or your material breach of these Terms.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "This provision does not apply to the extent a claim results from conduct for which you cannot lawfully be required to indemnify Queta AI.",
          },
        ],
      },
      { kind: "heading", text: "13. Governing Law" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "These Terms will be governed by the laws of the State of New Jersey, without regard to its conflict-of-law principles, except where applicable law requires otherwise.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Any legal proceedings will be brought in a court of competent jurisdiction located in New Jersey, subject to applicable jurisdictional requirements and any mandatory rights you may have under applicable law.",
          },
        ],
      },
      { kind: "heading", text: "14. General Provisions" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "If any provision of these Terms is found unenforceable, the remaining provisions will remain in effect to the extent permitted by law.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          { kind: "text", text: "Failure to enforce a provision does not constitute a waiver of the right to enforce it later." },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "These Terms, together with any applicable subscription terms and other agreements incorporated into them, govern your use of the services.",
          },
        ],
      },
      { kind: "heading", text: "15. Contact Information" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "For questions regarding these Terms, account restrictions, licensing, or authorization to share access, please contact:",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          { kind: "text", text: "Queta AI LLC" },
          { kind: "break" },
          { kind: "text", text: "Email: " },
          { kind: "mail" },
          { kind: "break" },
          { kind: "text", text: "Website: www.queta.ai" },
          { kind: "break" },
          { kind: "text", text: "Business Address: 2 Ascot Ln, Belle Mead, NJ 08502" },
        ],
      },
    ],
  },
  {
    href: "/privacy-policy",
    navLabel: "Privacy Policy",
    metaTitle: "Privacy Policy — Queta AI",
    eyebrow: "Queta AI LLC",
    blocks: [
      {
        kind: "paragraph",
        runs: [
          { kind: "bold", text: "Effective Date:" },
          { kind: "text", text: " November 2, 2026" },
          { kind: "break" },
          { kind: "bold", text: "Last Updated:" },
          { kind: "text", text: " November 2, 2026" },
        ],
      },
      { kind: "heading", text: "1. Introduction and Scope" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "This Privacy Policy describes how Queta AI LLC (\"Queta AI,\" \"we,\" \"us,\" or \"our\") handles personal information in connection with www.queta.ai and the marketing pages we operate (the \"website\").",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI LLC provides solutions that run on the Grok Bot platform. This website does not offer user accounts or logins. People subscribe directly to Grok Bot. Information processed by the AI agents, including prompts and conversations, is handled by Grok Bot under its own terms and policies, as described in Section 4.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "This policy covers messages you send through the Contact and Feedback forms on this website. It does not replace the ",
          },
          { kind: "link", href: "/terms-of-use", text: "Terms of Use" },
          {
            kind: "text",
            text: " or the terms that apply to your use of the Grok Bot platform.",
          },
        ],
      },
      { kind: "heading", text: "2. Information We Collect" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Contact form. If you use the Contact page, we collect your name, email address, phone number, the interest you describe, and your comments.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Feedback form. If you use the Feedback page, we collect your name, email address, phone number, and comments.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "We do not ask you to create an account on this website, and we do not collect payment card information here.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Technical data. The website does not include analytics, advertising, or other tracking tools, and it does not set analytics or advertising cookies. Our hosting provider may collect essential technical data, such as server logs that can include an IP address, browser type, the page requested, and the date and time of the request, in order to operate and secure the site.",
          },
        ],
      },
      { kind: "heading", text: "3. How We Use Information" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "We use Contact submissions to respond to your request and to email you instructions on the next steps to get started with a Queta solution. We use Feedback submissions to review what you sent and reply. We do not sell this information.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "We rely on essential technical data only as needed to deliver the website, keep it available, and investigate abuse or technical problems.",
          },
        ],
      },
      { kind: "heading", text: "4. Grok Bot Platform" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI solutions run on the Grok Bot platform. Users subscribe directly to Grok Bot. Consistent with our Terms of Use, Queta AI does not store user data from the agents or AI conversations. Data processed by those agents is handled by Grok Bot under its own terms and policies.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          { kind: "text", text: "Grok Bot terms: " },
          { kind: "link", href: "https://x.ai/legal/grok-bot-terms", text: "https://x.ai/legal/grok-bot-terms" },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          { kind: "text", text: "Grok Bot security: " },
          { kind: "link", href: "https://docs.x.ai/grok-bot/security", text: "https://docs.x.ai/grok-bot/security" },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Questions about information held in a Grok Bot account, including AI conversations, should be directed to Grok Bot. Queta AI cannot delete records that Grok Bot holds.",
          },
        ],
      },
      { kind: "heading", text: "5. Sharing and Service Providers" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "We do not sell personal information. We share website information only with service providers that host the site or deliver messages you send us:",
          },
        ],
      },
      {
        kind: "bullets",
        items: [
          [{ kind: "text", text: "Vercel hosts the website." }],
          [
            {
              kind: "text",
              text: "FormSubmit (formsubmit.co) delivers Contact form submissions by email to info@queta.ai and Feedback form submissions by email to sushant@queta.ai.",
            },
          ],
          [
            {
              kind: "text",
              text: "Microsoft 365 is the email service we use to receive those messages and reply.",
            },
          ],
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "These providers process the information to perform those services. We may also disclose information if required by law, to protect the rights or security of Queta AI or others, or as part of a business transfer such as a merger, where applicable law allows it.",
          },
        ],
      },
      { kind: "heading", text: "6. Cookies" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "This website does not use analytics cookies, advertising cookies, or similar tracking technologies. The site code does not load an analytics or advertising script, so there is no cookie banner.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Essential technical data, such as server logs collected by the hosting provider, is described in Section 2. If we later add non-essential cookies, we will update this policy before using them.",
          },
        ],
      },
      { kind: "heading", text: "7. Data Retention" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "We keep Contact and Feedback messages in our email inboxes for as long as needed to respond, provide next steps, and keep a record of the correspondence. We delete them when they are no longer needed for those purposes, or sooner if you ask us to delete them and the law does not require us to keep them.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI does not keep a database of agent conversations or subscription accounts on this website. Server logs kept by the hosting provider are retained under that provider's practices.",
          },
        ],
      },
      { kind: "heading", text: "8. Security" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "We use service providers to host the website and deliver email. No method of transmission or storage is completely secure. Please do not send passwords, payment card numbers, or other highly sensitive records through the Contact or Feedback forms.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          { kind: "text", text: "Information submitted to an AI agent is subject to Grok Bot's security practices, described at " },
          { kind: "link", href: "https://docs.x.ai/grok-bot/security", text: "https://docs.x.ai/grok-bot/security" },
          { kind: "text", text: "." },
        ],
      },
      { kind: "heading", text: "9. Your Rights and Choices" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Depending on where you live, you may have the right to access, correct, or delete personal information we hold, and to appeal a decision on a request. Residents of California, and of other US states with consumer privacy laws, may also have the right to know the categories of personal information collected and to opt out of the sale or sharing of personal information.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "We do not sell personal information, and we do not share it for cross-context behavioral advertising. To ask for access, correction, or deletion of information we hold from the Contact or Feedback forms, email ",
          },
          { kind: "mail" },
          {
            kind: "text",
            text: ". We may need to confirm that the request comes from you. We will not discriminate against you for making a privacy request. If we deny a request, you may reply to that decision to appeal where the law provides an appeal.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Requests about a Grok Bot subscription or AI conversation must be sent to Grok Bot. Queta AI does not hold those records.",
          },
        ],
      },
      { kind: "heading", text: "10. Children's Privacy" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "This website is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child under 13 has sent us personal information through this website, email us and we will delete it.",
          },
        ],
      },
      { kind: "heading", text: "11. International Users" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI LLC is located in New Jersey, in the United States. If you use this website from outside the United States, information you submit is processed in the United States. The Grok Bot platform may process information in locations described in its own policies.",
          },
        ],
      },
      { kind: "heading", text: "12. Changes to This Policy" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "We may update this Privacy Policy from time to time. When we do, we will change the Last Updated date above. The updated policy applies when it is posted on this page.",
          },
        ],
      },
      { kind: "heading", text: "13. Contact Information" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Questions about this Privacy Policy, and requests to access or delete personal information we hold, can be sent to:",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          { kind: "text", text: "Queta AI LLC" },
          { kind: "break" },
          { kind: "text", text: "Email: " },
          { kind: "mail" },
          { kind: "break" },
          { kind: "text", text: "Website: www.queta.ai" },
          { kind: "break" },
          { kind: "text", text: "Business Address: 2 Ascot Ln, Belle Mead, NJ 08502" },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "This Privacy Policy is governed by the laws of the State of New Jersey, except where applicable law requires otherwise.",
          },
        ],
      },
    ],
  },
  {
    href: "/ai-legal-disclosure",
    navLabel: "AI and Legal Disclosure",
    metaTitle: "AI Disclaimer and Legal Disclosure — Queta AI",
    title: "AI Disclaimer and Legal Disclosure",
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
            text: "Queta AI LLC provides a solution that runs on top of Grok Bot platform which leverages many Grok Bot capabilities including artificial intelligence-powered software, assistants, agents, and related services intended to help users organize information, automate tasks, explore options, and make more informed decisions."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Our services use AI technologies from Grok Bot that may produce responses based on patterns, available information, user inputs, and third-party data sources."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "AI-generated responses from Grok Bot are not guaranteed to be accurate, complete, current, unbiased, or appropriate for every situation."
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
            text: "Unless expressly stated in a separate written agreement, Queta AI does not provide legal, financial, medical, tax, accounting, investment, or other regulated professional services."
          }
        ]
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Information provided by our Queta AI solutions, powered by Grok Bot, is for general informational and assistance purposes and is not a substitute for advice from a qualified professional who understands your circumstances."
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
            text: "Our collection, use, disclosure, retention, and protection of personal information are governed by our ",
          },
          { kind: "link", href: "/privacy-policy", text: "Privacy Policy" },
          { kind: "text", text: " and any applicable product-specific disclosures." },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          { kind: "text", text: "Please review the " },
          { kind: "link", href: "/privacy-policy", text: "Privacy Policy" },
          {
            kind: "text",
            text: " before submitting sensitive personal, financial, medical, or confidential information.",
          },
        ],
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
    title: "Account Sharing and License Enforcement Policy",
    subtitle: "One Subscription. One User. One Account.",
    blocks: [
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI LLC provides solution individually licensed access to which is powered by Grok Bot platform.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Each individual subscription authorizes one registered user to access and use the applicable Queta AI solution through one account. Account sharing is prohibited unless Queta AI LLC provides prior written authorization.",
          },
        ],
      },
      { kind: "heading", text: "Unauthorized Use Is Prohibited" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "You may not share your login credentials, bot templates, provide another person with access to your account, sublicense your subscription, or permit another individual to use your licensed AI agents. Additionally all the terms and account sharing rules for Grok Bot platform are also applicable.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "This restriction applies regardless of whether the unauthorized use is temporary, occasional, recurring, or provided without charge.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Household members, friends, coworkers, employees, and other individuals must obtain their own authorized access unless Queta AI expressly approves an exception in writing.",
          },
        ],
      },
      { kind: "heading", text: "Consequences of Violations" },
      {
        kind: "paragraph",
        runs: [
          { kind: "text", text: "Queta AI LLC takes unauthorized account sharing and access seriously." },
        ],
      },
      {
        kind: "paragraph",
        runs: [{ kind: "text", text: "If we reasonably determine that you have violated this policy, we reserve the right to:" }],
      },
      {
        kind: "bullets",
        items: [
          [{ kind: "text", text: "Suspend or terminate your account or subscription." }],
          [{ kind: "text", text: "Restrict access to affected services or features." }],
          [{ kind: "text", text: "Revoke unauthorized access and take reasonable steps to protect our systems." }],
          [{ kind: "text", text: "Pursue compensation for actual losses and any other damages or remedies available under applicable law." }],
          [{ kind: "text", text: "Seek appropriate injunctive or other legal relief when warranted." }],
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Depending on the circumstances, we may take action without advance notice when necessary to protect the security or integrity of our services or prevent ongoing unauthorized use.",
          },
        ],
      },
      { kind: "heading", text: "Contractual Damages" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Unauthorized sharing may expose Queta AI LLC to losses involving licensing revenue, unauthorized commercial use, technology misuse, and other harm.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Queta AI LLC reserves all rights to pursue available legal remedies arising from unauthorized access or use.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "Any fixed amount of contractual damages will apply only if established in a separate, properly drafted agreement or provision that is enforceable under applicable law. Any such amount must satisfy the legal requirements applicable to liquidated damages and must not operate as an unlawful penalty.",
          },
        ],
      },
      { kind: "heading", text: "Requesting Authorization" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "If you wish to share access for a legitimate business, family, team, or organizational purpose, please contact Queta AI or Grok Bot Support to discuss an appropriate license.",
          },
        ],
      },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "No exception is effective unless Queta AI LLC and Grok Bot Support provide written authorization through an authorized representative.",
          },
        ],
      },
      { kind: "heading", text: "Acceptance" },
      {
        kind: "paragraph",
        runs: [
          {
            kind: "text",
            text: "By creating an account in Grok Bot platform, purchasing a subscription on Grok Bot platform, or using Queta AI services, you acknowledge that you are responsible for complying with the applicable licensing and account-sharing restrictions for both Queta AI LLC and Grok Bot platform.",
          },
        ],
      },
    ],
  }
] as const satisfies readonly LegalDocument[];

export const navigation = {
  solutions: [
    { label: "Queta Lifestyle", href: "/solutions/lifestyle" },
    { label: "Queta Trader", href: "/solutions/trader" },
    { label: "Queta Realtor", href: "/solutions/realtor" },
  ] as const,
  links: [
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ] as const,
  legal: {
    label: "Legal",
    links: legalDocuments.map((document) => ({
      label: document.navLabel,
      href: document.href,
    })),
  },
  faq: { label: "FAQ", href: "/faq" },
  cta: { label: "Sign Up", href: "/subscribe" },
} as const;

export const compare = {
  metaTitle: "Average User spends $167/month on subscriptions — Queta AI",
  title: "Average User spends $167/month on subscriptions.\nQueta Companion solution- $33.25 / month",
  columns: {
    agent: "Queta Lifestyle agent",
    app: "Comparable app",
    cost: "Monthly cost",
  },
  rows: [
    {
      agent: "Shopper",
      app: "ShopSavvy Pro",
      href: "https://shopsavvy.com/pricing",
      cost: "$2.99",
      logo: "/logos/shopsavvy.png",
      logoAlt: "ShopSavvy logo",
    },
    {
      agent: "Travel Agent",
      app: "TripIt Pro",
      href: "https://www.tripit.com/web/pro",
      cost: "$4.08*",
      logo: "/logos/tripit.png",
      logoAlt: "TripIt logo",
    },
    {
      agent: "Health Coach",
      app: "MyFitnessPal Premium",
      href: "https://www.myfitnesspal.com/premium",
      cost: "$19.99",
      logo: "/logos/myfitnesspal.png",
      logoAlt: "MyFitnessPal logo",
    },
    {
      agent: "Chef",
      app: "Samsung Food+",
      cost: "$6.99",
      logo: "/logos/samsung-food.png",
      logoAlt: "Samsung Food logo",
    },
    {
      agent: "Personal Tutor",
      app: "Khanmigo",
      href: "https://www.khanmigo.ai/pricing",
      cost: "$4.00",
      logo: "/logos/khanmigo.png",
      logoAlt: "Khanmigo logo",
    },
    {
      agent: "Spending Coach",
      app: "Monarch Money",
      href: "https://www.monarchmoney.com/pricing",
      cost: "$14.99",
      logo: "/logos/monarch.png",
      logoAlt: "Monarch Money logo",
    },
    {
      agent: "Subscription Manager",
      app: "Rocket Money Premium+",
      cost: "$15.00",
      logo: "/logos/rocket-money.png",
      logoAlt: "Rocket Money logo",
    },
    {
      agent: "Inbox Agent",
      app: "Superhuman",
      href: "https://superhuman.com/plans/mail",
      cost: "$30.00",
      logo: "/logos/superhuman.png",
      logoAlt: "Superhuman logo",
    },
    {
      agent: "Home Maintenance",
      app: "HomeZada Premium",
      href: "https://www.homezada.com/buyers-sellers/pricing",
      cost: "$21.98",
      logo: "/logos/homezada.png",
      logoAlt: "HomeZada logo",
    },
    {
      agent: "College Planner",
      app: "AdmitOdds",
      href: "https://admitodds.com/pricing",
      cost: "$20.00",
      logo: "/logos/admitodds.png",
      logoAlt: "AdmitOdds logo",
    },
    {
      agent: "Stock Analyst",
      app: "Motley Fool Stock Advisor",
      href: "https://www.fool.com/services/compare/",
      cost: "$16.58*",
      logo: "/logos/motley-fool.png",
      logoAlt: "Motley Fool logo",
    },
    {
      agent: "Privacy Guardian",
      app: "DeleteMe",
      cost: "$10.75*",
      logo: "/logos/deleteme.png",
      logoAlt: "DeleteMe logo",
    },
  ],
  totalLabel: "Total",
  totalCost: "$167.35/mo",
  calloutLead: "Queta Companion solution- ",
  calloutPrice: "$33.25 / month",
} as const;

export const publicRoutes = [
  "/",
  "/pricing",
  "/about",
  "/contact",
  "/subscribe",
  "/queta-disclaimer",
  "/compare",
  "/faq",
  "/solutions/lifestyle",
  "/solutions/realtor",
  "/solutions/trader",
  ...legalDocuments.map((document) => document.href),
] as const;

export const replicaOnlyRoutes = [
  "/subscribe",
  "/queta-disclaimer",
  "/compare",
  "/faq",
  ...legalDocuments.map((document) => document.href),
] as const;

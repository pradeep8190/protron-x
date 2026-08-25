export interface CompanyTestimonial {
  id: string
  name: string
  role: string
  author: string
  quote: string
  metric: string
  metricLabel: string
  tag: string
}

export const COMPANY_TESTIMONIALS: CompanyTestimonial[] = [
  {
    id: 'vercel',
    name: 'Vercel',
    author: 'Guillermo Rauch',
    role: 'CEO & Founder',
    quote:
      'Protron X gives us the complete stack for AI. Model routing, vector search, and edge computing in one unified SDK cut our infrastructure complexity to zero.',
    metric: '1.4M / sec',
    metricLabel: 'AI Inference Calls',
    tag: 'Complete AI Stack',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    author: 'Sam Altman',
    role: 'Infrastructure Team',
    quote:
      'Running LLM pipelines with direct SQL database sync and drop-in authentication is game-changing. It is the fastest way to ship production-grade AI.',
    metric: '< 4ms',
    metricLabel: 'Model Gateway Latency',
    tag: 'AI Models',
  },
  {
    id: 'resend',
    name: 'Resend',
    author: 'Zeno Rocha',
    role: 'Founder & CEO',
    quote:
      'Orchestrating AI workflows alongside transactional emails and instant database triggers has never been this seamless. Zero configuration overhead.',
    metric: '99.999%',
    metricLabel: 'Workflow Reliability',
    tag: 'Email & Notifications',
  },
  {
    id: 'linear',
    name: 'Linear',
    author: 'Karri Saarinen',
    role: 'Co-Founder & Designer',
    quote:
      'Software should feel instant and tactile. Protron X brings that exact speed and aesthetic engineering discipline to modern AI backends.',
    metric: '0 Config',
    metricLabel: 'Unified AI Runtime',
    tag: 'Product Systems',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    author: 'Paul Copplestone',
    role: 'Co-Founder & CEO',
    quote:
      'The hybrid Vector and SQL database integration with Protron AI model gateway allows developers to build semantic search apps in minutes.',
    metric: '< 8ms',
    metricLabel: 'Vector & SQL Sync',
    tag: 'Database Engine',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    author: 'Patrick Collison',
    role: 'CEO & Co-Founder',
    quote:
      'Handling AI billing, instant payment events, and background agent execution through a single declarative SDK is rock solid at planetary scale.',
    metric: '100% SLA',
    metricLabel: 'Deterministic Payments',
    tag: 'Fintech Scale',
  },
  {
    id: 'github',
    name: 'GitHub',
    author: 'Thomas Dohmke',
    role: 'CEO',
    quote:
      'Developer velocity increases 10x when auth, models, serverless compute, and database disappear into a single declarative AI SDK.',
    metric: '10x Faster',
    metricLabel: 'AI Ship Speed',
    tag: 'Developer Tooling',
  },
  {
    id: 'raycast',
    name: 'Raycast',
    author: 'Thomas Paul Mann',
    role: 'Co-Founder & CEO',
    quote:
      'Sub-millisecond AI model routing and instant edge compute workers make our desktop AI assistants feel remarkably fast worldwide.',
    metric: '300ms Global',
    metricLabel: 'Edge Roundtrip',
    tag: 'AI Assistants',
  },
  {
    id: 'retool',
    name: 'Retool',
    author: 'David Hsu',
    role: 'Founder & CEO',
    quote:
      'We connected AI models, vector stores, and email automation in an afternoon. Protron X is the default complete stack for AI engineers.',
    metric: '500+ Hours',
    metricLabel: 'Engineering Saved',
    tag: 'Enterprise AI',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    author: 'Michael Truell',
    role: 'Co-Founder & CEO',
    quote:
      'Autonomous AI coding agents need a unified backend for models, storage, and serverless compute. Protron X is the ultimate execution layer.',
    metric: 'Sub-second',
    metricLabel: 'Agent Execution',
    tag: 'Agentic Workflows',
  },
]

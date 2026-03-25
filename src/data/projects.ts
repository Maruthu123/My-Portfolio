export interface Project {
  id: number
  title: string
  sub: string
  desc: string
  long: string
  tech: string[]
  cat: string
  grad: string
  accent: string
  imgBg: string
  emoji: string
  stats: Record<string, string>
  hl: string[]
  gh: string
  live: string
  featured: boolean
}

export const PROJECTS: Project[] = [
  {
  id: 2,
  title: 'Growwake EduTech Platform',
  sub: 'Student Registration & Management Website',
  desc: 'A full-featured website built for Growwake Private Limited to manage student registrations and streamline data sharing with the office team.',
  long: 'Developed a complete web platform for Growwake Private Limited, an Edutech and Software Development company. The platform allows students to register online, submit their details, and automatically share the data with the office management system. It includes admin dashboards, secure data storage, and real-time form submissions.',
  
  tech: ['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
  
  cat: 'Edutech',
  
  grad: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
  
  accent: '#3B82F6',
  
  imgBg: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 50%,#0f172a 100%)',
  
  emoji: '🎓',
  
  stats: { 
    students: '5K+', 
    submissions: '1000+', 
    uptime: '99.9%' 
  },
  
  hl: [
    'Online student registration system',
    'Automatic data sharing to office dashboard',
    'Secure database storage',
    'Admin panel for managing students'
  ],
  
  gh: 'https://github.com/yourusername/growwake-edutech-platform',
  
  live: 'https://thzd7gm5-3001.inc1.devtunnels.ms/',
  
  featured: true
},
 {
  id: 2,
  title: 'HiLook Nisha Boutique',
  sub: 'Online Fashion Store with Payment Gateway',
  desc: 'An e-commerce website built for HiLook Nisha Boutique that allows customers to browse dresses and purchase them online using a secure payment gateway.',
  
  long: 'Developed a complete e-commerce platform for HiLook Nisha Boutique. The website enables customers to explore a wide range of dresses, view product details, add items to cart, and complete purchases using a secure online payment gateway. The platform also includes an admin dashboard where the store owner can add, update, or remove products, manage pricing, monitor orders, and track customer purchases. The system is designed with a modern UI, responsive design, and secure payment processing.',
  
  tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Razorpay', 'TailwindCSS'],
  
  cat: 'E-Commerce',
  
  grad: 'linear-gradient(135deg,#ec4899,#8b5cf6)',
    accent: '#EC4899',
  
  imgBg: 'linear-gradient(135deg,#4c1d95 0%,#831843 50%,#4c1d95 100%)',
  
  emoji: '🛍️',
  
  stats: { 
    products: '500+', 
    customers: '2K+', 
    orders: '1K+' 
  },
  
  hl: [
    'Online dress purchasing system',
    'Secure payment gateway integration',
    'Admin dashboard for product management',
    'Order tracking and management',
    'Responsive mobile-friendly design'
  ],
  
  gh: 'https://github.com/yourusername/hilooknisha-boutique',
  
  live: 'https://hilooknishaboutique.com',
  
  featured: true
},
  {
  id: 3,
  title: 'Meesayamuruku Event Planner',
  sub: 'Wedding & Event Planning Website',
  desc: 'A professional website developed for Meesayamuruku Event Planner to showcase wedding designs, event services, and allow clients to explore and enquire about different event packages.',
  
  long: 'Built a modern website for Meesayamuruku Event Planner to present their wedding planning and event management services online. The platform includes separate pages for each service such as wedding decoration, stage design, catering coordination, photography, and complete event planning. Visitors can browse services, view design portfolios, understand service details, and submit enquiries directly through the website. The design focuses on elegant visuals, easy navigation, and mobile responsiveness.',
  
  tech: [ 'React', 'Node.js',  'TailwindCSS'],
  
  cat: 'Event Management',
  
  grad: 'linear-gradient(135deg,#f59e0b,#ef4444)',
  
  accent: '#F59E0B',
  
  imgBg: 'linear-gradient(135deg,#451a03 0%,#7c2d12 50%,#451a03 100%)',
  
  emoji: '💍',
  
  stats: { 
    events: '300+', 
    clients: '150+', 
    services: '10+'   
  },
  
  hl: [
    'Wedding design showcase',
    'Separate pages for each event service',
    'Service portfolio gallery',
    'Client enquiry form',
    'Mobile responsive design'
  ],
  
  gh: 'https://github.com/yourusername/meesayamuruku-event-website',
  
  live: 'https://thzd7gm5-5173.inc1.devtunnels.ms/',
  
  featured: true
},
  // {
  //   id: 4,
  //   title: 'DevBoard',
  //   sub: 'Developer Productivity Suite',
  //   desc: 'All-in-one developer dashboard integrating GitHub, Jira, Slack, and 30+ tools.',
  //   long: 'OAuth integrations with major dev tools. Smart notification grouping, automated standups, code review assistance, and sprint analytics.',
  //   tech: ['Next.js', 'TypeScript', 'GraphQL', 'Prisma'],
  //   cat: 'DevTools',
  //   grad: 'linear-gradient(135deg,#d97706,#dc2626)',
  //   accent: '#F59E0B',
  //   imgBg: 'linear-gradient(135deg,#431407 0%,#78350f 50%,#450a0a 100%)',
  //   emoji: '🔥',
  //   stats: { integrations: '30+', teams: '500+', saved: '3hr/day' },
  //   hl: ['30+ integrations', 'AI code review', 'Smart notifications', 'Sprint analytics'],
  //   gh: 'https://github.com/panum/devboard',
  //   live: 'https://devboard.dev',
  //   featured: false
  // },
  // {
  //   id: 5,
  //   title: 'MapForge',
  //   sub: 'Interactive Map Builder',
  //   desc: 'No-code platform for custom interactive maps with data overlays and animations.',
  //   long: 'Built on Mapbox GL JS with custom WebGL shader programming. Features choropleth maps, 3D terrain, and a visual query builder.',
  //   tech: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
  //   cat: 'DataViz',
  //   grad: 'linear-gradient(135deg,#0284c7,#4f46e5)',
  //   accent: '#0EA5E9',
  //   imgBg: 'linear-gradient(135deg,#0c1445 0%,#164e63 50%,#1e3a5f 100%)',
  //   emoji: '🌍',
  //   stats: { maps: '25K+', embeds: '100K+', countries: '40+' },
  //   hl: ['WebGL shaders', 'PostGIS queries', '3D terrain', 'Live data feeds'],
  //   gh: 'https://github.com/panum/mapforge',
  //   live: 'https://mapforge.io',
  //   featured: false
  // },
  // {
  //   id: 6,
  //   title: 'ChainLink CMS',
  //   sub: 'Headless CMS with Web3',
  //   desc: 'Modern headless CMS with blockchain content ownership, NFT gating, and IPFS storage.',
  //   long: 'Smart contract-based permissions on Ethereum. Content on IPFS/Filecoin for true decentralization. Token-gating and DAO governance.',
  //   tech: ['React', 'Solidity', 'Node.js', 'GraphQL'],
  //   cat: 'Web3',
  //   grad: 'linear-gradient(135deg,#65a30d,#059669)',
  //   accent: '#84CC16',
  //   imgBg: 'linear-gradient(135deg,#14532d 0%,#166534 50%,#064e3b 100%)',
  //   emoji: '🌿',
  //   stats: { articles: '10K+', creators: '2K+', chains: '5' },
  //   hl: ['IPFS storage', 'NFT gating', 'DAO governance', 'Multi-chain'],
  //   gh: 'https://github.com/panum/chainlink-cms',
  //   live: 'https://chainlinkcms.io',
  //   featured: false
  // }
]

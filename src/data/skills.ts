export interface Skill {
  cat: string
  color: string
  bg: string
  border: string
  catSvg: string
  items: string[]
}

export const SKILLS: Skill[] = [
{
  cat: 'Frontend',
  color: '#818cf8',
  bg: 'rgba(129,140,248,.12)',
  border: 'rgba(129,140,248,.3)',
  catSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS']
},
  {
    cat: 'Backend',
    color: '#34d399',
    bg: 'rgba(52,211,153,.12)',
    border: 'rgba(52,211,153,.3)',
    catSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    items: ['Node.js', 'Express', 'Python', 'Django', 'GraphQL']
  },
  {
    cat: 'Database',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,.12)',
    border: 'rgba(245,158,11,.3)',
    catSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    items: ['PostgreSQL', 'MongoDB', 'Firebase', ]
  },
  {
    cat: 'DevOps & Cloud',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,.12)',
    border: 'rgba(96,165,250,.3)',
    catSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
    items: ['AWS', 'Docker',  'Vercel', ]
  },
  {
    cat: 'Tools',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,.12)',
    border: 'rgba(167,139,250,.3)',
    catSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
items: ['Git', 'Figma', 'EmailJS', 'Adobe Photoshop', 'VS Code']
  },
  {
    cat: 'Mobile',
    color: '#fb7185',
    bg: 'rgba(251,113,133,.12)',
    border: 'rgba(251,113,133,.3)',
    catSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="#fb7185" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    items: ['React Native', 'TensorFlow']
  }
]

export const FOOTER_TECH = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Git', 'Figma', 'GraphQL', 'Redux', 'TensorFlow', 'Kubernetes']
   
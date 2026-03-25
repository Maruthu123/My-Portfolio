export interface Experience {
  role: string
  company: string
  period: string
  desc: string
  tech: string[]
  icon: string
  iconBg: string
}

/* Work Experience */

export const EXPERIENCE: Experience[] = [
  {
    role: 'Full Stack Developer',
    company: 'Growwake Private Limited - Trichy',
    period: '2025 - 2026',
    desc: 'Developed 5 production-ready websites including e-commerce platforms and corporate office sites. Implemented responsive UI, integrated backend APIs, and optimized performance for a smooth user experience.',
    tech: ['React', 'Node.js'],
    icon: '💼',
    iconBg: 'rgba(124,58,237,.2)'
  },
  {
    role: 'Data Operator & Technical Support',
    company: 'NB Media Tech - Madurai',
    period: '2024 - 2025',
    desc: 'Handled data entry and record management with high accuracy. Provided technical support for system and software issues to ensure smooth daily operations.',
    tech: ['MS Excel', 'Data Management', 'Technical Support', 'System Maintenance'],
    icon: '💻',
    iconBg: 'rgba(59,130,246,.2)'
  }
]

/* Internship */

export const INTERNSHIP: Experience[] = [
  {
    role: 'Frontend Developer Intern',
    company: 'crystal delta - chennai',
    period: 'Internship',
    desc: 'Assisted in developing responsive web interfaces and learned modern frontend technologies while supporting the development team.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Git'],
    icon: '🎨',
    iconBg: 'rgba(16,185,129,.2)'
  },
  {
  role: 'Java Fullstack Developer Intern',
  company: 'Nmakes Infotech Pvt. Ltd - Kochi',
  period: 'Internship',
  desc: 'Assisted in developing full-stack web applications using Java and Spring Boot for backend and HTML, CSS, JavaScript for frontend. Worked with MySQL database integration, bug fixing, and gained hands-on experience in building scalable web modules.',
  tech: ['Java', 'Spring Boot', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
  icon: '☕',
  iconBg: 'rgba(245,158,11,.2)'
}
]
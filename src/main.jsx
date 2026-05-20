import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { SmoothCursor } from './components/SmoothCursor';
import { ScrollVelocityContainer, ScrollVelocityRow } from './components/ScrollVelocity';
import { InteractiveHoverButton } from './components/InteractiveHoverButton';
import { OrbitingCircles } from './components/OrbitingCircles';
import './styles.css';

const MotionSection = motion.section;
const MotionP = motion.p;
const MotionH1 = motion.h1;
const MotionDiv = motion.div;
const MotionArticle = motion.article;

const profile = {
  name: 'Meesum Abbas',
  role: 'Full Stack Developer | AI Integration Specialist',
  location: 'Karachi, Pakistan',
  email: 'meesum979@gmail.com',
  website: 'https://meesumabbasnaqvi.vercel.app',
  github: 'https://github.com/meesum-abbas',
  linkedin: 'https://www.linkedin.com/in/meesum-abbas-naqvi/',
  instagram: 'https://www.instagram.com/imnot_meesum/',
  resume: '/Meesum_Abbas_Resume.pdf',
};

const navItems = ['Projects', 'Experience', 'Education', 'Skills', 'Contact'];

const stats = [
  { value: 4, suffix: '+', label: 'Years building production systems', meta: 'Full-stack delivery' },
  { value: 10000, suffix: '+', label: 'Students and faculty supported', meta: 'LMS and ERP scale' },
  { value: 40, suffix: '%', label: 'Faster backend response times', meta: 'Query and caching gains' },
  { value: 4, suffix: '', label: 'Large ERP systems delivered', meta: 'Academic operations' },
];

const skills = [
  {
    group: 'Frontend Engineering',
    summary: 'Interfaces built for real product workflows, dashboards, and responsive business systems.',
    items: ['React', 'JavaScript', 'TypeScript', 'Angular', 'Responsive UI', 'Performance-focused interfaces'],
  },
  {
    group: 'Backend Development',
    summary: 'Production APIs, business logic, authentication flows, and maintainable server-side systems.',
    items: ['Node.js', 'Express.js', 'PHP', 'Laravel', 'CodeIgniter', 'Flask', 'Python', 'REST APIs'],
  },
  {
    group: 'Database & Performance',
    summary: 'Relational and document data modeling, query optimization, caching, and reporting workflows.',
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Query optimization', 'Caching strategies', 'Relational schema design'],
  },
  {
    group: 'APIs & Integrations',
    summary: 'Third-party service integrations, AI workflows, and clean frontend-backend contracts.',
    items: ['AI integrations', 'Google Meet API integration', 'Third-party services', 'Frontend-backend contracts'],
  },
  {
    group: 'Delivery Workflow',
    summary: 'Practical engineering habits for shipping, debugging, documenting, and leading delivery.',
    items: ['Git', 'Vercel', 'Postman', 'Docker', 'Linux', 'Hugging Face', 'Team leadership', 'Agile delivery', 'Technical documentation'],
  },
];

const projects = [
  {
    title: 'AI-Powered LMS Platform',
    type: 'LMS Platform',
    problem: 'Learning teams needed a scalable platform for course operations, student workflows, and AI-assisted academic processes.',
    stack: ['React', 'Node.js', 'Laravel', 'PostgreSQL', 'AI Integrations', 'Google Meet API', 'REST APIs'],
    features: ['Role-based dashboards', 'Course and student workflows', 'API-first architecture', 'AI-assisted learning tools'],
    impact: 'Delivered an AI-powered LMS platform that supports 7000+ students and faculty with scalable course management and learning features.',
    media: 'AI LMS',
    liveUrl: 'https://laureate.org.uk/',
    videoUrl: '/laureate-browser.mp4',
  },
  {
    title: 'Institute ERP & LMS Management System',
    type: 'ERP & LMS System',
    problem: 'Academic administration needed a reliable way to manage high-volume student and faculty operations.',
    stack: ['Codeignitor', 'PHP', 'MySQL', 'Bootstrap', 'REST APIs'],
    features: ['Academic modules', 'Admin workflows', 'Reporting interfaces', 'Optimized database access'],
    impact: 'Delivered large-scale ERP & LMS system used by 3000+ students and faculty.',
    media: 'ERP',
    liveUrl: 'https://ait.smartcampuses.com/',
    videoUrl: '/aitVideo.mp4',
  },
  {
    title: 'University ERP & LMS Management System',
    type: 'ERP & LMS System',
    problem: 'Academic administration needed a reliable way to manage high-volume student and faculty operations.',
    stack: ['Codeignitor', 'PHP', 'MySQL', 'Bootstrap', 'REST APIs'],
    features: ['Academic modules', 'Admin workflows', 'Reporting interfaces', 'Optimized database access'],
    impact: 'Delivered large-scale ERP & LMS system used by 3000+ students and faculty.',
    media: 'ERP',
    liveUrl: 'https://ums.smartcampusses.co/',
    videoUrl: '/universityVideo.mp4',
  },
  {
    title: 'Email Marketing Tool',
    type: 'Marketing Tool',
    problem: 'Business teams needed a structured way to manage leads, campaigns, segmentation, and follow-up communication.',
    stack: ['Django', 'Python', 'PostgreSQL', 'Bootstrap'],
    features: ['Lead management', 'Campaign workflows', 'Contact segmentation', 'Admin reporting'],
    impact: 'Built a custom email marketing tool that improved lead organization and campaign management for the client’s sales team.',
    media: 'Marketing',
    liveUrl: 'https://cadproconnect.org/',
    videoUrl: '/emailmarketing.mp4',
  },
  {
    title: 'CRM & Automation System',
    type: 'CRM',
    problem: 'Internal teams were spending too much time on whatsapp groups.',
    stack: ['React', 'Express', 'Node.js', 'PostgreSQL', 'Google Meet API'],
    features: ['Operational dashboards', 'Automation flows', 'User management', 'Data exports', 'Communication tools', 'Google Meet scheduling', 'Performance optimizations'],
    impact: 'Built a custom CRM and automation system that reduced manual admin work by 50% and improved team communication.',
    media: 'CRM',
    liveUrl: 'https://entiregroupcrm.co.uk/',
    videoUrl: '/entirecrm-browser.mp4',
  },
  {
    title: 'E Commerce Store',
    type: 'E Commerce',
    problem: 'Client needed a way to manage products, inventory, and orders for their growing online store.',
    stack: ['Php', 'Laravel', 'MySQL', 'Bootstrap', 'REST APIs'],
    features: ['Product management', 'Inventory tracking', 'Order processing', 'Admin dashboard', 'Performance optimizations'],
    impact: 'Built a scalable online store management system that supported the client’s growth and improved operational efficiency.',
    media: 'E Commerce',
    liveUrl: 'https://daniyal-jenny-fashion-store.infinityfreeapp.com/',
    videoUrl: '/FashionStore.mp4',
  },
  {
    title: 'Aptech Project Techwiz 4',
    type: 'Soccer Verse',
    problem: 'A soccer gaming platform was needed to provide live scoring, player management, match scheduling, and performance optimizations for a competitive project.',
    stack: ['Php', 'MySQL', 'Bootstrap', 'REST APIs'],
    features: ['Live Scoring', 'Player Management', 'Match Scheduling', 'Performance optimizations'],
    impact: 'Built a soccer gaming platform that provided live scoring, player management, match scheduling, and performance optimizations for a competitive project.',
    media: 'Soccer Verse',
    liveUrl: 'https://daniyal-khan-soccer-verse.netlify.app/',
    videoUrl: '/soccerVerse.mp4',
  },
];

const experience = [
  {
    company: 'Birmingham Business Innovadors Hub (UK Based Company)',
    title: 'Full Stack Developer',
    period: 'Jan 2025 to Present (Remote)',
    details: 'Building and improving PHP-based business systems with a focus on maintainable backend logic, database reliability, and client-facing product delivery.',
    highlights: ['Backend feature delivery', 'Database reliability', 'Client-facing product improvements'],
  },
  {
    company: 'AG Consultraining',
    title: 'Senior PHP Developer',
    period: 'Nov 2023 to Oct 2025',
    details: 'Delivered LMS, ERP, CRM, and automation tools; led a team of 3 developers; improved database queries and caching to reduce response times by 40%.',
    highlights: ['Led 3 developers', 'Delivered LMS, ERP, and CRM tools', 'Reduced response times by 40%'],
  },
  {
    company: 'Digitalflexsolutions',
    title: 'PHP/Laravel Developer',
    period: 'Jan 2024 to Mar 2024',
    details: 'Developed PHP application features, supported backend workflows, and contributed to business web systems with production-focused delivery.',
    highlights: ['PHP/Laravel feature development', 'Backend workflow support', 'Business web systems'],
  },
];

const education = [
  {
    degree: 'Bachelors in Computer Science',
    institution: 'Virtual University of Pakistan',
    period: '2025 - Present',
    detail: 'Focusing on advanced algorithms, software engineering principles, database management systems, and discrete mathematics.',
  },
  {
    degree: 'Diploma in Software Engineering',
    institution: 'Aptech Computer Education',
    period: '2022 - 2025',
    detail: 'Rigorous curriculum encompassing full-stack web architectures, enterprise application design, API development, and object-oriented programming.',
  },
  {
    degree: 'Intermediate (Pre-Engineering)',
    institution: 'CAA Model College Karachi',
    period: '2020 - 2022',
    detail: 'Completed intermediate studies with a focus on mathematics, physics, and analytical problem-solving, building a strong foundation for software engineering and technology',
  },
  {
    degree: 'Matriculation (Computer Science)',
    institution: 'CAA Model School Karachi',
    period: '2006 - 2020',
    detail: 'Established a strong foundation in computer science and analytical thinking.',
  },
];

const achievements = [
  {
    title: 'Top 10 worldwide in Techwiz APtech Competition',
    detail: 'Ranked Top 10 worldwide two times in Techwiz Competition, showing competitive problem-solving under pressure.',
    metric: '2x',
  },
  {
    title: '3 large ERP systems delivered',
    detail: 'Delivered ERP platforms used by 3000+ students and faculty across academic operations.',
    metric: '3',
  },
  {
    title: 'Performance improved by 40%',
    detail: 'Optimized database queries and caching to reduce backend response times for production systems.',
    metric: '40%',
  },
  {
    title: 'Manual admin work reduced',
    detail: 'Built internal tools and automation workflows that reduced repeated administrative effort.',
    metric: '50%',
  },
  {
    title: 'Team delivery leadership',
    detail: 'Led a team of 3 developers while delivering LMS, ERP, CRM, and automation projects.',
    metric: '3',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const timelineCard = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <MotionSection
      id={id}
      className={`section ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      variants={fadeUp}
    >
      <div className="section-heading">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </MotionSection>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    return localStorage.getItem('theme') || 'dark';
  });
  const themeTimerRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      if (themeTimerRef.current) {
        window.clearTimeout(themeTimerRef.current);
      }
    };
  }, []);

  const handleThemeToggle = () => {
    const root = document.documentElement;

    root.classList.add('theme-transitioning');
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));

    if (themeTimerRef.current) {
      window.clearTimeout(themeTimerRef.current);
    }

    themeTimerRef.current = window.setTimeout(() => {
      root.classList.remove('theme-transitioning');
      themeTimerRef.current = null;
    }, 520);
  };

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Meesum Abbas home">
          <img src="/faviconprofolio.png" alt="" aria-hidden="true" width="38" height="38" />
          <strong>Meesum Abbas</strong>
        </a>
        <button className="menu-button" type="button" aria-label="Toggle navigation menu" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
        <div className={`nav-links ${open ? 'is-open' : ''}`} id="site-menu">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>
              {item}
            </a>
          ))}
          <a className="nav-cta" href={`mailto:${profile.email}`}>
            Hire Me
          </a>
        </div>
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-pressed={theme === 'light'}
          onClick={handleThemeToggle}
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path d="M21 12.8A8.4 8.4 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
}

function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <MotionP className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Meesum Abbas - Karachi, Pakistan
        </MotionP>
        <MotionH1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}>
          Full-stack developer for scalable business platforms.
        </MotionH1>
        <MotionP className="typing-line" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.14 }}>
          <span>React, Node.js, Laravel, AI Integrations</span>
        </MotionP>
        <MotionP className="hero-subtitle" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.16 }}>
          I build LMS, ERP, CRM, dashboards, REST APIs, and AI-powered workflows for teams that need reliable product engineering, clean backend architecture, and measurable operational impact.
        </MotionP>
        <MotionDiv className="hero-actions" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.24 }}>
          <InteractiveHoverButton className="primary" href="#projects" icon="grid">View Projects</InteractiveHoverButton>
          <InteractiveHoverButton className="secondary" href={profile.resume} download icon="download">Download Resume</InteractiveHoverButton>
          <InteractiveHoverButton className="ghost" href={`mailto:${profile.email}?subject=Project%20inquiry%20for%20Meesum%20Abbas`} icon="mail">Contact Me</InteractiveHoverButton>
        </MotionDiv>
        <MotionDiv className="hero-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.36 }}>
          <span>{profile.location}</span>
          <div className="social-buttons" aria-label="Social profiles">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <SocialIcon type="github" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              <SocialIcon type="linkedin" />
            </a>
            <a href={profile.instagram} target="_blank" rel="noreferrer" aria-label="Instagram profile">
              <SocialIcon type="instagram" />
            </a>
          </div>
        </MotionDiv>
      </div>
      <MotionDiv
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={shouldReduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: 1, y: [0, -12, 0] }}
        transition={{
          opacity: { duration: 0.75, delay: 0.15 },
          scale: { duration: 0.75, delay: 0.15 },
          y: shouldReduceMotion ? { duration: 0.75, delay: 0.15 } : { duration: 7.5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="portrait-frame">
          <img
            src="/meesum-abbas-pic.jpeg"
            alt="Portrait of Meesum Abbas, full stack developer in Karachi"
            width="900"
            height="1600"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="hero-signal-card" aria-hidden="true">
          <span>Available for</span>
          <strong>Full Stack Positions</strong>
        </div>
      </MotionDiv>
    </section>
  );
}

function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <MotionSection ref={ref} className="stats" aria-label="Professional impact metrics" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
      {stats.map((stat) => (
        <StatCard stat={stat} isInView={isInView} key={stat.label} />
      ))}
    </MotionSection>
  );
}

function VelocityBand() {
  return (
    <section className="velocity-band" aria-label="Core technical focus">
      <ScrollVelocityContainer>
        <ScrollVelocityRow baseVelocity={114} direction={1}>
          React - Node.js - Laravel - MongoDB - Django - AI Integrations - Google Meet API - REST APIs - Dashboard Development - Workflow Automation -
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={114} direction={-1}>
          LMS Platforms - ERP Systems - REST APIs - Automation Tools - Database Optimization - AI-powered Business Features - Scalable Product Architecture - Backend Reliability -
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </section>
  );
}

function SocialIcon({ type }) {
  if (type === 'github') {
    return (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M9 19c-4.3 1.4-4.3-2.2-6-2.7" />
        <path d="M15 22v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 3.8 5.4 4.1 5.4 4.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 10.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22" />
      </svg>
    );
  }

  if (type === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-12h4v2a4.8 4.8 0 0 1 2-2Z" />
        <path d="M2 9h4v11H2z" />
        <path d="M4 4.5v.1" />
      </svg>
    );
  }

  if (type === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M17.5 6.8v.1" />
      </svg>
    );
  }

  return null;
}

function StackIcon({ type }) {
  if (type === 'react') {
    return (
      <svg viewBox="-11.5 -10.23174 23 20.46348" focusable="false" aria-hidden="true">
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  if (type === 'node') {
    return (
      <svg viewBox="0 0 256 289" focusable="false" aria-hidden="true">
        <path fill="currentColor" d="M128 0 13.6 66v132L128 264l114.4-66V66L128 0Zm0 27.8 90.4 52.2v104.4L128 236.6 37.6 184.4V80L128 27.8Z" />
        <path fill="currentColor" d="M101.3 180.5c-5.8 0-10.7-1-14.7-3.1-4-2.1-7.4-5.3-10.2-9.7l16.4-9.4c2 3.2 4.7 4.8 8.1 4.8 2.5 0 4.5-.8 6-2.3 1.5-1.5 2.2-4 2.2-7.3v-50.4h19.6v51.2c0 8.2-2.4 14.7-7.2 19.3-4.8 4.6-11.5 6.9-20.2 6.9Zm61.7 0c-8.1 0-15.1-1.6-21.1-4.9-6-3.2-10.6-7.9-13.8-14l16.6-9.6c4.3 7.4 10.8 11.1 19.3 11.1 3.9 0 6.9-.7 9-2.1 2.1-1.4 3.1-3.3 3.1-5.7 0-2.7-1.3-4.8-3.9-6.3-2.6-1.5-6.7-3.1-12.3-4.7-5.1-1.5-9.3-3-12.7-4.5-3.4-1.5-6.4-3.9-9.1-7.2-2.7-3.3-4-7.5-4-12.7 0-7.6 2.9-13.6 8.6-18.1 5.8-4.5 12.8-6.7 21.1-6.7 7 0 13.2 1.5 18.6 4.5 5.4 3 9.8 7.3 13.2 12.9l-16.3 9.5c-3.7-6.3-8.9-9.4-15.5-9.4-3.1 0-5.6.6-7.4 1.9-1.8 1.3-2.7 3-2.7 5.2 0 2.4 1.1 4.3 3.4 5.8 2.3 1.5 6 3 11.2 4.5 5.5 1.7 10 3.3 13.6 4.9 3.6 1.6 6.8 4.1 9.6 7.4 2.8 3.4 4.2 7.7 4.2 13.1 0 7.8-3 14-8.9 18.4-5.9 4.4-13.8 6.6-23.6 6.6Z" />
      </svg>
    );
  }

  if (type === 'laravel') {
    return (
      <svg viewBox="0 0 256 264" focusable="false" aria-hidden="true">
        <path fill="currentColor" d="M255.7 59.6v82.8c0 6.5-3.5 12.5-9.1 15.7l-70.2 40.5-70.3 40.6c-5.6 3.2-12.6 3.2-18.2 0l-70.2-40.6C12 195.4 8.5 189.4 8.5 182.9V100c0-6.5 3.5-12.5 9.1-15.7l70.2-40.5L158.1 3.2c5.6-3.2 12.6-3.2 18.2 0l70.2 40.6c5.7 3.2 9.2 9.3 9.2 15.8ZM96.8 220.1l55.5-32.1v-64.1L96.8 156v64.1Zm73.7-32.1 55.5-32V91.8l-55.5 32.1V188ZM32.2 91.8V156l55.5 32v-64.1L32.2 91.8Zm64.6 48.4 55.5-32.1-55.5-32-55.5 32 55.5 32.1Zm73.7-48.4 55.5-32.1-55.5-32-55.5 32 55.5 32.1Z" />
      </svg>
    );
  }

  if (type === 'docker') {
    return (
      <svg viewBox="0 0 256 185" focusable="false" aria-hidden="true">
        <path fill="currentColor" d="M250.7 87.4c-5.6-3.8-18.4-5.2-28.2-3.3-1.2-8.7-6.1-16.3-14.8-23.1l-5-3.8-3.3 5.4c-4.1 6.7-5.8 16.2-5.1 25.1.3 3.2 1.1 6.5 2.4 9.5-9.2 5.1-24.1 4-27.1 3.8H5.1l-.5 4.7c-1.5 14.1 1.1 27.2 7.7 38.2 6.1 10.3 15.2 18.1 27.1 23.4 13.2 5.8 34.4 9.1 58.2 9.1 10.8 0 22.1-.7 33.5-2.1 15.8-2 30.7-5.9 43.9-11.6 10.9-4.7 20.7-10.8 29.1-18.1 14.1-12.2 22.6-25.8 28.9-37.8 9.3.5 18.3-2.2 22.9-8.7 1.8-2.5 2.7-5.6 3-9.2l.4-4-3.6-2.2Zm-204.4 18H23.7v22.6h22.6v-22.6Zm28.2 0H51.9v22.6h22.6v-22.6Zm28.2 0H80.1v22.6h22.6v-22.6Zm28.2 0h-22.6v22.6h22.6v-22.6Zm28.2 0h-22.6v22.6h22.6v-22.6ZM74.5 77.2H51.9v22.6h22.6V77.2Zm28.2 0H80.1v22.6h22.6V77.2Zm28.2 0h-22.6v22.6h22.6V77.2Zm28.2 0h-22.6v22.6h22.6V77.2ZM102.7 49H80.1v22.6h22.6V49Zm28.2 0h-22.6v22.6h22.6V49Zm28.2 0h-22.6v22.6h22.6V49Zm0-28.2h-22.6v22.6h22.6V20.8Z" />
      </svg>
    );
  }

  if (type === 'php') {
    return (
      <svg viewBox="0 0 256 134" focusable="false" aria-hidden="true">
        <ellipse cx="128" cy="67" rx="122" ry="61" fill="none" stroke="currentColor" strokeWidth="12" />
        <path fill="currentColor" d="M50 42h33c10 0 17 3 21 8 4 5 5 12 3 21-2 10-7 17-14 22-7 5-16 7-27 7H55l-5 24H31l19-82Zm16 18-5 22h10c5 0 9-.9 12-2.8 3-1.9 5-4.8 5.7-8.6.8-3.7.2-6.4-1.8-8-2-1.7-5.4-2.6-10.1-2.6H66Zm63-18h19l-5 22h18c9 0 15 1.9 18 5.8 3 3.8 3.6 9.8 1.8 17.8L178 100h-19l3-13c.9-4.2.8-7.1-.4-8.7-1.2-1.5-4-2.3-8.4-2.3h-13l-5 24h-19l12-58Zm70 0h33c10 0 17 3 21 8 4 5 5 12 3 21-2 10-7 17-14 22-7 5-16 7-27 7h-11l-5 24h-19l19-82Zm16 18-5 22h10c5 0 9-.9 12-2.8 3-1.9 5-4.8 5.7-8.6.8-3.7.2-6.4-1.8-8-2-1.7-5.4-2.6-10.1-2.6H215Z" />
      </svg>
    );
  }

  if (type === 'angular') {
    return (
      <svg viewBox="0 0 256 272" focusable="false" aria-hidden="true">
        <path fill="currentColor" d="M128 0 8 43l18 156 102 73 102-73 18-156L128 0Zm0 32 75 168h-28l-15-37H96l-15 37H53L128 32Zm0 58-23 53h46l-23-53Z" />
      </svg>
    );
  }

  if (type === 'ai') {
    return (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path fill="currentColor" d="M11.9 2.2c1.5 0 2.8.8 3.5 2.1a4.2 4.2 0 0 1 5.2 5.2 4.2 4.2 0 0 1-2.7 7.3 4.2 4.2 0 0 1-5.9 4.8 4.2 4.2 0 0 1-5.9-4.8 4.2 4.2 0 0 1-2.7-7.3 4.2 4.2 0 0 1 5.2-5.2 4 4 0 0 1 3.3-2.1Zm0 3.1a2.1 2.1 0 0 0-2 1.5l-.4 1.3-1.3-.5a2.1 2.1 0 0 0-2.7 2.7l.5 1.3-1.3.4a2.1 2.1 0 0 0 0 4l1.3.4-.5 1.3a2.1 2.1 0 0 0 2.7 2.7l1.3-.5.4 1.3a2.1 2.1 0 0 0 4 0l.4-1.3 1.3.5a2.1 2.1 0 0 0 2.7-2.7l-.5-1.3 1.3-.4a2.1 2.1 0 0 0 0-4l-1.3-.4.5-1.3a2.1 2.1 0 0 0-2.7-2.7l-1.3.5-.4-1.3a2.1 2.1 0 0 0-2-1.5Z" />
        <circle cx="12" cy="12" r="2.1" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'database') {
    return (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path fill="currentColor" d="M12 2.5c4.7 0 8 1.7 8 4.1v10.8c0 2.4-3.3 4.1-8 4.1s-8-1.7-8-4.1V6.6c0-2.4 3.3-4.1 8-4.1Zm0 2.2c-3.6 0-5.8 1.1-5.8 1.9S8.4 8.5 12 8.5s5.8-1.1 5.8-1.9S15.6 4.7 12 4.7Zm5.8 5.1c-1.4.7-3.4 1.1-5.8 1.1s-4.4-.4-5.8-1.1v2.8c0 .8 2.2 1.9 5.8 1.9s5.8-1.1 5.8-1.9V9.8Zm0 6c-1.4.7-3.4 1.1-5.8 1.1s-4.4-.4-5.8-1.1v1.6c0 .8 2.2 1.9 5.8 1.9s5.8-1.1 5.8-1.9v-1.6Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ProjectVideo({ src, title }) {
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const [useStaticPreview, setUseStaticPreview] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(max-width: 900px), (hover: none), (pointer: coarse)');
    const updatePreviewMode = () => setUseStaticPreview(mediaQuery.matches);

    updatePreviewMode();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePreviewMode);

      return () => mediaQuery.removeEventListener('change', updatePreviewMode);
    }

    mediaQuery.addListener(updatePreviewMode);

    return () => mediaQuery.removeListener(updatePreviewMode);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || useStaticPreview) return undefined;

    const startPlayback = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay can still be blocked by the browser; controls remain available.
      }
    };

    startPlayback();

    return undefined;
  }, [src, useStaticPreview]);

  if (failed || useStaticPreview) {
    return (
      <div className="project-media-fallback">
        <strong>{title}</strong>
        <span>{useStaticPreview ? 'Tap the live link to open the project' : 'Video preview unavailable'}</span>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className="project-media-video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onLoadedMetadata={() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }}
      onError={() => setFailed(true)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

function StatCard({ stat, isInView }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `${Math.round(latest).toLocaleString()}${stat.suffix}`);

  useEffect(() => {
    if (!isInView) {
      return undefined;
    }

    const controls = animate(count, stat.value, {
      duration: stat.value > 100 ? 1.9 : 1.25,
      ease: 'easeOut',
    });

    return controls.stop;
  }, [count, isInView, stat.value]);

  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <strong>
          <motion.span>{rounded}</motion.span>
        </strong>
        <em>{stat.meta}</em>
      </div>
      <span>{stat.label}</span>
      <div className="stat-progress" aria-hidden="true">
        <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: isInView ? 1 : 0 }} transition={{ duration: 1, ease: 'easeOut' }} />
      </div>
    </div>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About" title="Business-minded full-stack engineering">
      <div className="about-grid">
        <p>
          I am a full-stack developer based in Karachi with 3+ years of hands-on experience building systems that support real business operations. My work covers LMS platforms, ERP systems, CRM tools, email marketing workflows, dashboards, and third-party integrations.
        </p>
        <p>
          The strongest parts of my work are practical product thinking, backend reliability, and admin workflow design. I build clean APIs, optimize database performance, and create interfaces that reduce repeated manual work for teams, students, faculty, and business users.
        </p>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Capabilities" title="Stack built for scalable products">
      <div className="skills-command">
        <div className="skills-orbit-panel">
          <div className="orbit-stage">
            <OrbitingCircles iconSize={64} radius={150} speed={26}>
              <StackIcon type="react" />
              <StackIcon type="node" />
              <StackIcon type="database" />
              <StackIcon type="docker" />
            </OrbitingCircles>
            <OrbitingCircles iconSize={48} radius={92} reverse speed={18}>
              <StackIcon type="laravel" />
              <StackIcon type="php" />
              <StackIcon type="angular" />
            </OrbitingCircles>
            <div className="orbit-core">
              <span>Full</span>
              <strong>Stack</strong>
            </div>
          </div>
          <div className="skills-orbit-copy">
            <span>Engineering Stack</span>
            <strong>Full-stack systems, integrations, and business automation.</strong>
            <p>Specialized in designing and developing end-to-end software systems that transform ideas into scalable digital products. Built around practical product delivery with modern user interfaces, robust backend services, seamless third-party integrations, optimized data architectures, and AI-powered workflows. Focused on creating reliable, maintainable, and high-performing solutions across LMS platforms, ERP systems, CRM applications, and enterprise software ecosystems.</p>
          </div>
        </div>
        <div className="skills-lanes">
          {skills.map((skill) => (
            <article className="skill-lane" key={skill.group}>
              <div className="skill-lane-head">
                <div>
                  {/* <span>{skill.group.slice(0, 2).toUpperCase()}</span> */}
                  <h3>{skill.group}</h3>
                </div>
                <small>{skill.items.length} tools</small>
              </div>
              <p>{skill.summary}</p>
              <div className="skill-meter" aria-hidden="true"><i></i></div>
              <div className="skill-tags">
                {skill.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" eyebrow="Featured Projects" title="Project gallery for scalable systems and product workflows">
      <div className="project-gallery">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-media">
              <div className={`project-media-screen ${project.videoUrl ? 'has-video' : ''}`}>
                {project.videoUrl ? (
                  <ProjectVideo src={project.videoUrl} title={project.title} />
                ) : (
                  <span>{project.media}</span>
                )}
              </div>
              <div className="project-media-actions">
                <a
                  className={project.liveUrl ? '' : 'is-disabled'}
                  href={project.liveUrl || `mailto:${profile.email}?subject=${encodeURIComponent(`Live project request: ${project.title}`)}`}
                  target={project.liveUrl ? '_blank' : undefined}
                  rel={project.liveUrl ? 'noreferrer' : undefined}
                >
                  Live Link
                </a>
                {/* <a
                  className={project.videoUrl ? '' : 'is-disabled'}
                  href={project.videoUrl || `mailto:${profile.email}?subject=${encodeURIComponent(`Video walkthrough request: ${project.title}`)}`}
                  target={project.videoUrl ? '_blank' : undefined}
                  rel={project.videoUrl ? 'noreferrer' : undefined}
                >
                  Watch Video
                </a> */}
              </div>
            </div>
            <div className="project-content">
              <div className="project-topline">
                <span>{project.type}</span>
                <a href={`mailto:${profile.email}?subject=${encodeURIComponent(`Project discussion: ${project.title}`)}`}>Discuss</a>
              </div>
              <h3>{project.title}</h3>
              <p>{project.problem}</p>
              <div className="project-detail">
                <strong>Features</strong>
                <ul>
                  {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </div>
              <div className="pill-list compact">
                {project.stack.map((tech) => <span key={tech}>{tech}</span>)}
              </div>
              <div className="impact">{project.impact}</div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Impact-focused delivery across product teams">
      <div className="experience-board">
        {experience.map((item, index) => (
          <MotionArticle
            className="experience-card"
            key={`${item.company}-${item.period}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
            variants={timelineCard}
          >
            <div className="experience-meta-block">
              <span>{item.period}</span>
              <strong>{item.title}</strong>
            </div>
            <div className="experience-main-block">
              <h3>{item.company}</h3>
              <p>{item.details}</p>
              <ul>
                {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </div>
          </MotionArticle>
        ))}
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic foundation and continued learning" className="education-section">
      <div className="education-timeline" aria-label="Education timeline">
        {education.map((item, index) => (
          <MotionArticle
            className="education-item"
            key={`${item.degree}-${item.institution}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
            variants={timelineCard}
          >
            <div className="education-node" aria-hidden="true">
              <span></span>
            </div>
            <div className="education-card">
              <div className="education-meta">
                <span>{item.period}</span>
                <small>Education</small>
              </div>
              <h3>{item.degree}</h3>
              <strong>{item.institution}</strong>
              <p>{item.detail}</p>
            </div>
          </MotionArticle>
        ))}
      </div>
    </Section>
  );
}

function Achievements() {
  return (
    <Section id="achievements" eyebrow="Recognition" title="Proof of delivery, scale, and competitive performance">
      <div className="achievement-grid">
        {achievements.map((achievement) => (
          <article key={achievement.title}>
            <span>{achievement.metric}</span>
            <strong>{achievement.title}</strong>
            <p>{achievement.detail}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const [formStatus, setFormStatus] = useState({ state: 'idle', message: '' });

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setFormStatus({ state: 'loading', message: 'Sending your message...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get('content-type') || '';
      const result = contentType.includes('application/json')
        ? await response.json()
        : { message: await response.text() };

      if (!response.ok) {
        throw new Error(result.message || 'Message could not be sent.');
      }

      form.reset();
      setFormStatus({ state: 'success', message: 'Message sent. I will reply by email soon.' });
    } catch (error) {
      setFormStatus({
        state: 'error',
        message: error.message.includes('Failed to fetch')
          ? 'Contact API is not available in local development. Please deploy to Vercel or email me directly.'
          : error.message || 'Message could not be sent. Please email me directly.',
      });
    }
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build your next scalable product">
      <div className="contact-grid">
        <div className="contact-panel">
          <p>Share the product, workflow, or integration you want to build. I can help with full-stack architecture, API delivery, database performance, and AI-powered business features.</p>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.github} target="_blank" rel="noreferrer">github.com/meesum-abbas</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/meesum-abbas-naqvi</a>
            <a href={profile.instagram} target="_blank" rel="noreferrer">instagram.com/imnot_meesum</a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <label>
            Name
            <input name="name" type="text" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" placeholder="you@example.com" required />
          </label>
          <label>
            Project Type
            <select name="projectType" defaultValue="Full-stack product">
              <option>Full-stack product</option>
              <option>LMS or ERP system</option>
              <option>API integration</option>
              <option>AI integration</option>
              <option>Dashboard or automation</option>
            </select>
          </label>
          <label>
            Message
            <textarea name="message" rows="5" placeholder="Tell me what you want to build" required></textarea>
          </label>
          <InteractiveHoverButton as="button" className="primary" type="submit" icon="send" disabled={formStatus.state === 'loading'}>
            {formStatus.state === 'loading' ? 'Sending...' : 'Send Message'}
          </InteractiveHoverButton>
          {formStatus.message ? (
            <p className={`form-status is-${formStatus.state}`} role="status">
              {formStatus.message}
            </p>
          ) : null}
        </form>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>Meesum Abbas</strong>
        <span>Full Stack Developer | AI Integration Specialist</span>
      </div>
      <div className="footer-links">
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={profile.instagram} target="_blank" rel="noreferrer">Instagram</a>
        <a href={`mailto:${profile.email}`}>Email</a>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SmoothCursor />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <VelocityBand />
        <About />
        <Projects />
        <Experience />
        <Education />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);

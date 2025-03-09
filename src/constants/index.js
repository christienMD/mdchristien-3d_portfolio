import {
  creator,
  css,
  gamehub,
  git,
  html,
  javascript,
  jiraclone,
  laravel,
  mobile,
  mySQL,
  nextJs,
  obilli,
  prisma,
  reactjs,
  reactNative,
  tailwind,
  typescript,
  web,
  zustand,
  cyril,
  desline
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Front end Developer",
    icon: web,
  },
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Full Stack Developer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "React Native",
    icon: reactNative,
  },
  {
    name: "Next JS",
    icon: nextJs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Laravel",
    icon: laravel,
  },
  {
    name: "MySQL",
    icon: mySQL,
  },
  {
    name: "Zustand",
    icon: zustand,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "Prisma",
    icon: prisma,
  },
];

const experiences = [
  {
    title: "Software Developer",
    company_name: "Tech Chantier",
    icon: "",
    iconBg: "#383E56",
    date: "March 2024 - Present",
    points: [
      "Collaborated in developing Nguava, a platform empowering global creators with tools for content creation, distribution, and monetization.",
      "Improved platform security by 30% by implementing core authentication features using React.js and TypeScript.",
      "Built responsive interfaces with modern UI components while efficiently consuming Laravel backend APIs.",
      "Contributed to a multi-tenant Laravel platform for dynamic content management across different tenant websites.",
      "Co-trained React/React Native bootcamp participants and mentored junior developers to complete real-life projects.",
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "Touko Banix",
    icon: "",
    iconBg: "#E6DEDD",
    date: "Feb 2024 - May 2024",
    points: [
      "Engineered an intuitive admin dashboard for Scout Giant, a football scouting platform, using Next.js and Tailwind CSS with Daisy UI.",
      "Implemented comprehensive user management features for tracking and managing scouts, players, and platform activities.",
      "Successfully integrated Firebase backend services while learning the technology on the job.",
      "Developed responsive interfaces ensuring consistent experience across devices.",
      "Mentored interns by providing quality support, learning materials, and organizing sessions to help them gain hands-on experience.",
    ],
  },
  {
    title: "Frontend Developer Mentor",
    company_name: "Wicon",
    icon: "",
    iconBg: "#383E56",
    date: "Jan 2024 - April 2024",
    points: [
      "Led a comprehensive mentorship program for frontend development interns, providing video tutorials and personalized support.",
      "Conducted regular online evaluation sessions to assess interns' progress and understanding of frontend concepts.",
      "Utilized interactive online sessions to foster engagement and facilitate collaborative learning experiences.",
      "Promoted knowledge sharing, peer-to-peer support, and teamwork through group projects and pair programming sessions.",
    ],
  },
  {
    title: "Frontend Developer Intern",
    company_name: "Loop Technologies",
    icon: "",
    iconBg: "#E6DEDD",
    date: "June 2023 - Jan 2024",
    points: [
      "Worked on the LEAD Frontend project, a real-life food delivery application, developing according to the Software Requirements Specification.",
      "Built responsive and intuitive user interfaces using React and Next.js for user registration, restaurant search, and order management.",
      "Developed user-friendly web forms with validation and error handling.",
      "Created modular, reusable components and abstracted specific styles to enhance code maintainability and scalability.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Md Christien proved me wrong.",
    name: "Nkwi Cyril",
    designation: "CEO",
    company: "Cyrix",
    image: cyril
    // image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Md Christien does.",
    name: "Ashu Boris",
    designation: "UI/UX Designer",
    company: "Tech Chantier",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Md Christien optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Egnr. Desline Vevanje",
    designation: "President",
    company: "T T Technologies",
    image: desline
    // image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Jira Clone",
    description:
      "A lightweight Jira-inspired task management app with real-time synchronization, responsive layouts, and optimized drag-and-drop functionality. Features modern authentication flows, performance-optimized rendering, and accessibility standards implementation.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "typescript",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "appwrite",
        color: "orange-text-gradient",
      },
    ],
    image: jiraclone,
    source_code_link: "https://github.com/christienMD/jira-clone.git",
  },
  {
    name: "Game-Hub",
    description:
      "A video game discovery web application allowing users to search, filter, and explore games by various criteria. A mini version of the Rawg website with beautiful UI and responsive design for optimal viewing on any device.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "typescript",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: gamehub,
    source_code_link: "https://github.com/christienMD/game-hub",
  },
  {
    name: "Obilli",
    description:
      "A comprehensive Fiverr-style marketplace platform that connects freelancers with clients. The platform offers intuitive navigation and responsive design for seamless user experience across all devices.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "typescript",
        color: "green-text-gradient",
      },
      {
        name: "supabase",
        color: "pink-text-gradient",
      },
      {
        name: "cloudinary",
        color: "orange-text-gradient",
      },
    ],
    image: obilli,
    source_code_link: "https://github.com/christienMD/production-bonas-app",
  },
];

export { experiences, projects, services, technologies, testimonials };


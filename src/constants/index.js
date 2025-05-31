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
  desline,
  lmsCourse,
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
    title: "Full Stack Developer",
    icon: creator,
  },
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
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
    title: "Frontend Developer - Full-time",
    company_name: "Terrax Africa - Switzerland - Remote",
    icon: "",
    iconBg: "#383E56",
    date: "May 2024 - Present",
    points: [
      "Built scalable and performant web applications using Next.js, implementing server-side rendering and optimizing frontend performance for enhanced user experience.",
      "Collaborated with backend developers and designers to solve complex technical challenges and deliver seamless integration solutions.",
    ],
  },
  {
    title: "Full-Stack Developer - Contract",
    company_name: "Njomi Tech Solutions - Douala - Remote",
    icon: "",
    iconBg: "#383E56",
    date: "Feb 2024 - May 2024",
    points: [
      "Contributed to Educlynk, a peer-to-peer educational platform connecting role models with youths across Africa and Asia.",
      "Developed both frontend and backend features to support the platform's mission of educational empowerment and mentorship.",
    ],
  },
  {
    title: "Software Developer - Full-time",
    company_name: "Tech Chantier - Buea Cameroon - Onsite",
    icon: "",
    iconBg: "#383E56",
    date: "March 2024 - March 2025",
    points: [
      "Engineered core authentication features and interactive UI components for Nguava platform using React.js and TypeScript, improving security by 30% while ensuring seamless consumption of Laravel backend APIs.",
      "Collaborated with UI/UX designers in an agile environment to deliver pixel-perfect implementations of design specifications.",
      "Contributed to a multi-tenant Laravel platform, building the admin dashboard and implementing dynamic content management features across different tenant websites.",
      "Mentored junior developers during company-organized React/React Native bootcamps, helping 10+ developers complete real-world projects.",
    ],
  },
  {
    title: "Frontend Developer - Contract",
    company_name: "Touko Banix - Buea Cameroon - Remote",
    icon: "",
    iconBg: "#E6DEDD",
    date: "Feb 2023 - April 2023",
    points: [
      "Engineered an intuitive admin dashboard for Scout Giant, a football scouting platform, using Next.js and Tailwind CSS with Daisy UI.",
      "Implemented comprehensive user management features for tracking and managing scouts, players, and platform activities.",
      "Successfully integrated Firebase backend services while learning the technology on the job.",
      "Developed responsive interfaces ensuring consistent experience across devices.",
      "Mentored interns by providing quality support, learning materials, and organizing sessions to help them gain hands-on experience.",
    ],
  },
  {
    title: "Frontend Developer - Intern",
    company_name: "Loop Technologies - Buea Cameroon - Onsite",
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
    image: cyril,
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
    image: desline,
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
    live_demo_link: "https://mdchristien-jira-clone.vercel.app",
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
    live_demo_link: "https://mdchristien-gamehub.vercel.app",
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
    live_demo_link: "https://www.obilli.com",
  },
  {
    name: "LMS Course platform",
    description:
      "A comprehensive Learning Management System enabling educators to create, manage, and monetize online courses. Features include interactive content delivery, video streaming with MUX, drag-and-drop chapter organization, secure payment processing, and real-time progress tracking for students.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "prisma",
        color: "green-text-gradient",
      },
      {
        name: "mysql",
        color: "orange-text-gradient",
      },
      {
        name: "shadcn",
        color: "blue-text-gradient",
      },
    ],
    image: lmsCourse,
    source_code_link: "https://github.com/christienMD/lms-course-platform",
    live_demo_link: "https://lmscourse-platform.vercel.app",
  },
];

export { experiences, projects, services, technologies, testimonials };

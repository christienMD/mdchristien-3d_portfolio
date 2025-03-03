import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
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
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Software Developer",
    company_name: "Tech Chantier",
    icon: starbucks,
    iconBg: "#383E56",
    date: "March 2024 - Present",
    points: [
      "Collaborated in developing Nguava, a platform empowering global creators with tools for content creation, distribution, and monetization.",
      "Improved platform security by 30% by implementing core authentication features using React.js and TypeScript.",
      "Built responsive interfaces with modern UI components while efficiently consuming Laravel backend APIs.",
      "Contributed to a multi-tenant Laravel platform for dynamic content management across different tenant websites.",
      "Co-trained React/React Native bootcamp participants and mentored junior developers to complete real-life projects."
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "Touko Banix",
    icon: starbucks,
    iconBg: "#E6DEDD",
    date: "Feb 2024 - May 2024",
    points: [
      "Engineered an intuitive admin dashboard for Scout Giant, a football scouting platform, using Next.js and Tailwind CSS with Daisy UI.",
      "Implemented comprehensive user management features for tracking and managing scouts, players, and platform activities.",
      "Successfully integrated Firebase backend services while learning the technology on the job.",
      "Developed responsive interfaces ensuring consistent experience across devices.",
      "Mentored interns by providing quality support, learning materials, and organizing sessions to help them gain hands-on experience."
    ],
  },
  {
    title: "Frontend Developer Mentor",
    company_name: "Wicon",
    icon: starbucks,
    iconBg: "#383E56",
    date: "Jan 2024 - April 2024",
    points: [
      "Led a comprehensive mentorship program for frontend development interns, providing video tutorials and personalized support.",
      "Conducted regular online evaluation sessions to assess interns' progress and understanding of frontend concepts.",
      "Utilized interactive online sessions to foster engagement and facilitate collaborative learning experiences.",
      "Promoted knowledge sharing, peer-to-peer support, and teamwork through group projects and pair programming sessions."
    ],
  },
  {
    title: "Frontend Developer Intern",
    company_name: "Loop Technologies",
    icon: starbucks,
    iconBg: "#E6DEDD",
    date: "June 2023 - Jan 2024",
    points: [
      "Worked on the LEAD Frontend project, a real-life food delivery application, developing according to the Software Requirements Specification.",
      "Built responsive and intuitive user interfaces using React and Next.js for user registration, restaurant search, and order management.",
      "Developed user-friendly web forms with validation and error handling.",
      "Created modular, reusable components and abstracted specific styles to enhance code maintainability and scalability."
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };

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
  styledcomponent,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  dashboard,
  jobit,
  zambia,
  TBC,
  friendlink,
  cinematrix,
  Blink02,
  blinklogo,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
    path: "/#about"
  },
  {
    id: "work",
    title: "Work",
    path: "/#work"
  },
  {
    id: "contact",
    title: "Contact",
    path: "/#contact"
  },
  {
    // id: "add-project",
    // title: "Add Project",
    path: "/add-project"
  }
];

const services = [
  {
    title: "Software Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Product Designer",
    icon: backend,
  },
  {
    title: "Content Creator",
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
    name: "Styled Component",
    icon: styledcomponent,
  },
  // {
  //   name: "Node JS",
  //   icon: nodejs,
  // },
  // {
  //   name: "MongoDB",
  //   icon: mongodb,
  // },
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
  // {
  //   name: "docker",
  //   icon: docker,
  // },
];

const experiences = [
  {
    title: "Typescript React.js Developer",
    company_name: "Blink",
    icon: blinklogo,
    iconBg: "#E6DEDD",
    date: "March 2020 - April 2021",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "React Native Developer",
    company_name: "Migremit",
    icon: zambia,
    iconBg: "#383E56",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Crafted and maintained a mobile applications, leveraging React Native and other relevant technologies.",
      "Collaborated closely with cross-functional teams, including designers, product managers, and fellow developers, to deliver a high-caliber product.",
      "Implemented internationalization across the mobile app.",
      "Implemented responsive design and ensuring compatibility across various mobile devices.",
      "Actively participated in code reviews, offering constructive feedback to fellow developers.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "The Branding Champs",
    icon: TBC,
    iconBg: "#E6DEDD",
    date: "Jan 2022 - Jan 2023",
    points: [
      "Develop and maintain complex web applications using React.js and state-of-the-art libraries.",
      "Collaborate effectively with cross-functional teams to define user needs, translate them into product vision, and deliver high-quality solutions.",
      "Implement responsive design principles to ensure optimal user experience across all devices and browsers.",
      "Participate actively in code reviews, providing constructive feedback to foster collaboration and improve code quality.",
    ],
  },
  // {
  //   title: "Full stack Developer",
  //   company_name: "Meta",
  //   icon: meta,
  //   iconBg: "#E6DEDD",
  //   date: "Jan 2023 - Present",
  //   points: [
  //     "Developing and maintaining web applications using React.js and other related technologies.",
  //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //     "Implementing responsive design and ensuring cross-browser compatibility.",
  //     "Participating in code reviews and providing constructive feedback to other developers.",
  //   ],
  // },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Ikot proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Ikot does.",
    name: "Matt Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Sage optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Pixel Ecommerce",
    description:
      "Effortlessly manage your ecommerce business with our platform. Seamlessly handle customer interactions and employee tasks, all in one convenient dashboard. See how your business is doing through various charts. Truth is Pixel is just a beta version to show what your ecommerce store could look like. ",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "syncfusion",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: dashboard,
    source_code_link: "https://github.com/Sageikot001/Initial-Dashboard-Commit.git",
    live_demo_link: "https://pixel-ten-alpha.vercel.app/"
  },
  {
    name: "Blink",
    description:
    "A data management and processing software used to view and manage client and employees activities as well as daily cost of operations, average delivery time per employees and analysis of overall performance of the business and affiliated businesses in a more user friendly interface.",
    tags: [
      {
        name: "Typescript",
        color: "blue-text-gradient",
      },
      {
        name: "styled Component",
        color: "green-text-gradient",
      },
      {
        name: "MaterialUI",
        color: "pink-text-gradient",
      },
    ],
    image: Blink02,
    source_code_link: "https://github.com/jacquesikot/blinck-data-manager.git",
    live_demo_link: "https://github.com/jacquesikot/blinck-data-manager.git"
  },
  {
    name: "Cinematrix",
    description:
    "Cinematrix offers a diverse library of films for every taste, ensuring endless entertainment. With lightning-fast downloads and seamless streaming, enjoy your favorite movies anytime, anywhere. Whether you're a cinephile or casual viewer, Cinematrix caters to all.",
    tags: [
      {
        name: "React.JS",
        color: "blue-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: cinematrix,
    source_code_link: "https://github.com/Sageikot001/Cinematrix.git",
    live_demo_link: "https://cinematrix-eta.vercel.app/"
  },
  {
    name: "Friendlink",
    description:
    "Friendlink is a social media application in the making with a diverse array of features both for users. With several pages housing several functionalities such as the ability to make posts, edit posts, like and even save posts. With more features currently in build such as your own personal Ai chatbot, etc. This is going to be an epic one for now, you can access a beta version through here.",
    tags: [
      {
        name: "React.JS",
        color: "green-text-gradient",
      },
      {
        name: "Typescript",
        color: "blue-text-gradient",
      },
      {
        name: "Tanstack Query",
        color: "pink-text-gradient",
      },
      {
        name: "Tailwindcss",
        color: "yellow-text-gradient",
      },
      {
        name: "appwrite",
        color: "pink-text-gradient"
      }
    ],
    image: friendlink,
    source_code_link: "https://github.com/Sageikot001/Cinematrix.git",
    live_demo_link: "https://friendlink-flax.vercel.app/"
  },
];

export { services, technologies, experiences, testimonials, projects };

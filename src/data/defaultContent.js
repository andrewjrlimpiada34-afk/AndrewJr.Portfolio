import logo from "../Assets/logo.png";
import profileImage from "../Assets/andrew.png";
import homeIllustration from "../Assets/home-main.svg";
import severino from "../Assets/Projects/severino.png";
import juniorhigh from "../Assets/AcadCertificates/juniorhigh.jpg";
import grade10 from "../Assets/AcadCertificates/grade10.jpg";
import grade10Alt from "../Assets/AcadCertificates/grade10-1.jpg";
import grade10Wh from "../Assets/AcadCertificates/grade10-wh.jpg";
import grade11 from "../Assets/AcadCertificates/grade11.jpg";
import grade11Alt from "../Assets/AcadCertificates/grade11-1.jpg";
import wika from "../Assets/AcadCertificates/wika.jpg";

export const defaultSettings = {
  logoUrl: "",
  githubProfile: "https://github.com/andrewjrlimpiada34-afk",
};

export const defaultHomeContent = {
  kicker: "Hello World! I'm",
  firstName: "Andrew B.",
  lastName: "Limpiada Jr.",
  roleLines: [
    "Aspiring Computer Engineer",
    "Student Builder",
    "React.js Learner",
    "Problem Solver",
  ],
  introPrimary:
    "I'm an aspiring Computer Engineer currently pursuing my studies at Marinduque State College. I'm passionate about technology, creativity, and continuous learning.",
  introSecondary:
    "This portfolio reflects who I am as a student, builder, and lifelong learner. I enjoy understanding how systems work, solving problems through code, and turning ideas into reality.",
  highlights: [
    { label: "Location", value: "Paye, Mogpog, Marinduque" },
    { label: "Current Path", value: "BS Computer Engineering" },
    { label: "Focus", value: "Practical web solutions" },
  ],
  socialLinks: {
    github: "https://github.com/andrewjrlimpiada34-afk",
    twitter: "https://x.com/DrewJrLimpiada",
    linkedin: "https://www.linkedin.com/in/limpiada-andrew-jr-b-3299513b7",
    instagram: "https://www.instagram.com/ajr_leo",
  },
  logoUrl: logo,
  heroImageUrl: homeIllustration,
};

export const defaultAboutContent = {
  heading: "More about my journey",
  profileImageUrl: profileImage,
  supportText:
    "These are the technologies I currently use and keep improving as I grow my foundation in software and web development.",
  storyIntro:
    "I enjoy exploring how systems work, solving problems through code, and building ideas into something real and useful. Every project is a chance for me to learn deeper, think better, and create something with purpose.",
  storySecondary:
    "I'm still growing, but I care a lot about consistency, curiosity, and building skills that can create meaningful solutions for everyday life.",
  storyCards: [
    {
      title: "How I learn",
      description:
        "By building projects, revisiting mistakes, and improving one small step at a time.",
    },
    {
      title: "What I value",
      description:
        "Hard work, resilience, and staying grounded while aiming for bigger goals.",
    },
    {
      title: "What I want to build",
      description:
        "Technology that improves processes, solves real problems, and feels useful to people.",
    },
  ],
  paragraphs: [
    "I come from Paye, Mogpog, Marinduque, a place that shaped my values, perspective, and determination to pursue my goals. Growing up in a simple environment taught me the importance of hard work, resilience, and staying grounded while aiming high.",
    "I am currently taking up Bachelor of Science in Computer Engineering at Marinduque State College. As a student in this field, I am continuously developing my skills in programming, problem-solving, and system design. I am especially interested in how technology can improve everyday processes and create meaningful solutions.",
    "Beyond academics, I enjoy experiences that keep me inspired, focused, and creative.",
    "I believe that learning does not stop inside the classroom. Every experience contributes to who I am, how I think, and how I hope to grow as a future engineer.",
  ],
  hobbies: [
    "Playing mobile games",
    "Listening to music",
    "Watching movies",
    "Reading Marvel comics",
  ],
  quote:
    "I believe that growth comes from continuous learning, and success is built through persistence, passion, and purpose.",
  footerName: "Andrew B. Limpiada Jr.",
  focusCards: [
    {
      title: "How I think",
      description:
        "I like breaking down problems step by step and understanding why a system works, not just how to make it run.",
    },
    {
      title: "What keeps me balanced",
      description:
        "Music, games, movies, and comics help me recharge while also sharpening creativity and perspective.",
    },
    {
      title: "What I am building toward",
      description:
        "A strong career in technology where I can build useful tools and contribute meaningful solutions through engineering.",
    },
  ],
  skills: [
    {
      label: "Java",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
    {
      label: "MongoDB",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      label: "MySQL",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      label: "Git",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      label: "React.js",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
  ],
};

export const defaultProjects = [
  {
    id: "default-severino",
    title: "Severino",
    status: "Owned Project",
    description:
      "A web-based shop project focused on creating a smoother online shopping experience. It is still improving, but the current version already includes working user-facing features and Google-based sign in.",
    stack: ["React", "Google Auth", "Web App"],
    imageUrl: severino,
    ghLink: "https://github.com/andrewjrlimpiada34-afk/severino_webapp_shop",
    demoLink: "https://severino-webapp-shop.vercel.app",
  },
];

export const defaultCertificates = [
  { id: "cert-1", title: "Junior High Certificate", imageUrl: juniorhigh },
  { id: "cert-2", title: "Grade 10 Certificate", imageUrl: grade10 },
  { id: "cert-3", title: "Grade 10 Certificate 2", imageUrl: grade10Alt },
  { id: "cert-4", title: "Grade 10 Wika Certificate", imageUrl: grade10Wh },
  { id: "cert-5", title: "Grade 11 Certificate", imageUrl: grade11 },
  { id: "cert-6", title: "Grade 11 Certificate 2", imageUrl: grade11Alt },
  { id: "cert-7", title: "Wika Certificate", imageUrl: wika },
];

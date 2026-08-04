/**
 * programDetails - Krystal Tech Hub
 * ------------------------------------------------------------
 * Long-form content for each program detail page (/programs/[slug]).
 * Keyed by the same slug used in the programs grid + TRACKS list.
 *
 * NOTE: Fees are placeholders modelled on the ICT example - confirm
 * the real pricing with the business before launch.
 */

export type AudienceItem = { n: string; title: string; body: string };

export type ProgramDetail = {
  slug: string;
  category: string; // hero eyebrow
  titleTop: string; // first line of hero heading
  titleBottom: string; // second (emphasised) line
  intro: string[]; // hero paragraphs
  image: string; // /public image
  whoShouldAttend: AudienceItem[];
  whyChooseUs: string;
  badges: string[];
  courseContent: string[];
  duration: string;
  fee: string;
  discountFee: string;
};

export const PROGRAM_DETAILS: Record<string, ProgramDetail> = {
  "ict-fundamentals": {
    slug: "ict-fundamentals",
    category: "Computer Training in Port Harcourt, Nigeria",
    titleTop: "Become A Proficient",
    titleBottom: "Computer User",
    intro: [
      "In today's world it has become absolutely paramount for individuals of this day and age to acquire the basic IT skills to proficiently use a computer. This course will help you understand how computers work and how to use them. We'll talk about how to set up a computer, the difference between hardware and software, and the types of computers you can use. We'll also explore operating systems and basic computing applications.",
      "Our ICT Fundamentals training is beginner-friendly, practical and project-based. It is designed to help participants gain mastery of basic computer applications and operations, and to give you real-world experience that can get you a job and grow your career.",
    ],
    image: "/hero-image.jpg",
    whoShouldAttend: [
      {
        n: "01",
        title: "Complete Beginners",
        body: "Anyone touching a computer for the first time who wants a confident, solid start.",
      },
      {
        n: "02",
        title: "Career Switch",
        body: "Those moving into the tech industry for freelancing or to land a remote job.",
      },
      {
        n: "03",
        title: "Everyday Skills",
        body: "Professionals and students who need practical computer skills for work and study.",
      },
    ],
    whyChooseUs:
      "Krystal Tech Hub is a leading IT training institute with years of hands-on experience. Our courses are taught by professionals with real industry background, and our approach is beginner-friendly, practical and project-based - so you leave with skills you can actually use.",
    badges: ["Expert Tutors", "Career Ready", "Certificate"],
    courseContent: [
      "Introduction to Computers",
      "What Is a Computer?",
      "Types of Computers",
      "Computer Hardware Components",
      "Computer Software",
      "Computer Operating Systems",
      "Typing Tutorials",
      "Application Fundamentals",
      "Internet and Printing",
    ],
    duration: "6 Weeks",
    fee: "N80,000",
    discountFee: "N60,000",
  },

  "scratch-programming": {
    slug: "scratch-programming",
    category: "Coding for Beginners in Port Harcourt, Nigeria",
    titleTop: "Start Coding With",
    titleBottom: "Scratch Programming",
    intro: [
      "Scratch is a visual, drag-and-drop programming language that teaches real coding logic without the barrier of syntax. Learners snap colourful blocks together to control characters, sound and motion - and pick up loops, events and conditions along the way.",
      "This track is playful but serious about fundamentals. By the end, students think like programmers and have built games and animations they are proud to show off.",
    ],
    image: "/hero-image.jpg",
    whoShouldAttend: [
      {
        n: "01",
        title: "Young Builders",
        body: "Children and teens taking their very first steps into coding and computational thinking.",
      },
      {
        n: "02",
        title: "Curious Creators",
        body: "Anyone who loves games and stories and wants to build their own from scratch.",
      },
      {
        n: "03",
        title: "Future Developers",
        body: "Learners who want a gentle on-ramp before moving into text-based programming.",
      },
    ],
    whyChooseUs:
      "We make first coding experiences joyful and confidence-building. Small cohorts, patient mentors and a project every session mean learners stay engaged and always have something to show.",
    badges: ["Beginner-Friendly", "Project-Based", "Certificate"],
    courseContent: [
      "The Scratch Interface",
      "Sprites, Costumes and Stages",
      "Motion and Looks",
      "Loops and Repetition",
      "Events and Messages",
      "Conditions and Logic",
      "Variables and Scores",
      "Building a Playable Game",
      "Creating an Animation",
    ],
    duration: "8 Weeks",
    fee: "N70,000",
    discountFee: "N50,000",
  },

  "web-development": {
    slug: "web-development",
    category: "Web Development Training in Port Harcourt, Nigeria",
    titleTop: "Build For The",
    titleBottom: "Modern Web",
    intro: [
      "The web runs on three core technologies: HTML for structure, CSS for style, and JavaScript for behaviour. This track teaches all three from the ground up, so you understand how the web actually works before you build on it.",
      "It is intensive, practical and project-based. You will finish with a real, responsive website that you deploy and share - the kind of work that starts a portfolio and a career.",
    ],
    image: "/software-developer.jpg",
    whoShouldAttend: [
      {
        n: "01",
        title: "Aspiring Developers",
        body: "Anyone who wants to build websites and web apps and step into a tech career.",
      },
      {
        n: "02",
        title: "Next Level",
        body: "Those with some coding skills who want to take them further with real-life projects.",
      },
      {
        n: "03",
        title: "Freelancers",
        body: "People wanting a marketable, in-demand skill for remote and freelance work.",
      },
    ],
    whyChooseUs:
      "Our web track is taught by working developers and built around shipping real projects, not just watching tutorials. You write code every session and leave with a deployed site in your portfolio.",
    badges: ["Industry Mentors", "Portfolio Project", "Certificate"],
    courseContent: [
      "How the Web Works",
      "HTML Structure and Semantics",
      "Styling with CSS",
      "Responsive Layouts",
      "JavaScript Fundamentals",
      "DOM and Interactivity",
      "Working with APIs",
      "Version Control with Git",
      "Deploying a Live Website",
    ],
    duration: "12 Weeks",
    fee: "N150,000",
    discountFee: "N120,000",
  },

  "graphics-design": {
    slug: "graphics-design",
    category: "Graphics Design Training in Port Harcourt, Nigeria",
    titleTop: "Design Work That",
    titleBottom: "People Notice",
    intro: [
      "Great design is more than software - it is colour, layout, type and composition working together. This track trains your eye and your hands so you can create work people actually stop to look at.",
      "It is beginner-friendly and project-based. You will finish with a poster, a logo and a small brand kit built around a real idea.",
    ],
    image: "/ui1.jpg",
    whoShouldAttend: [
      {
        n: "01",
        title: "Creative Beginners",
        body: "Anyone drawn to visuals who wants the skills to bring their ideas to life.",
      },
      {
        n: "02",
        title: "Business Owners",
        body: "Entrepreneurs who want to create their own brand assets and marketing visuals.",
      },
      {
        n: "03",
        title: "Freelancers",
        body: "Those seeking a creative skill they can offer clients and earn from.",
      },
    ],
    whyChooseUs:
      "We teach design principles first and tools second, so your work looks intentional - not just filtered. Hands-on briefs and real feedback build a portfolio you can be proud of.",
    badges: ["Design Principles", "Real Briefs", "Certificate"],
    courseContent: [
      "Design Foundations",
      "Colour Theory",
      "Typography",
      "Layout and Composition",
      "Working with Shapes and Images",
      "Designing a Poster",
      "Logo Design",
      "Building a Brand Kit",
      "Exporting for Print and Screen",
    ],
    duration: "8 Weeks",
    fee: "N90,000",
    discountFee: "N70,000",
  },

  "video-editing": {
    slug: "video-editing",
    category: "Video Editing Training in Port Harcourt, Nigeria",
    titleTop: "Turn Footage Into",
    titleBottom: "A Real Story",
    intro: [
      "Editing is where raw clips become something worth watching. This track covers cutting, pacing, sound and colour - the craft of shaping footage into a finished piece.",
      "It is practical from day one. You will edit a short video start to finish and understand the decisions behind every cut.",
    ],
    image: "/the-dev.jpg",
    whoShouldAttend: [
      {
        n: "01",
        title: "Content Creators",
        body: "Anyone making videos for social media, YouTube or a personal brand.",
      },
      {
        n: "02",
        title: "Storytellers",
        body: "People who want to shape footage into films, ads and highlight reels.",
      },
      {
        n: "03",
        title: "Freelancers",
        body: "Those wanting an in-demand editing skill for paid work.",
      },
    ],
    whyChooseUs:
      "We focus on storytelling and rhythm, not just buttons. You edit real footage every session and finish with a polished video for your reel.",
    badges: ["Hands-On", "Finished Reel", "Certificate"],
    courseContent: [
      "The Editing Workspace",
      "Importing and Organising Footage",
      "Cuts and Transitions",
      "Pacing and Rhythm",
      "Working with Audio",
      "Titles and Graphics",
      "Colour Correction",
      "Exporting for Platforms",
      "Editing a Complete Short",
    ],
    duration: "6 Weeks",
    fee: "N80,000",
    discountFee: "N60,000",
  },

  "ui-ux-design": {
    slug: "ui-ux-design",
    category: "UI/UX Design Training in Port Harcourt, Nigeria",
    titleTop: "Design Screens That",
    titleBottom: "Feel Effortless",
    intro: [
      "Good product design makes screens people find easy and pleasant to use. This track takes you from research and wireframes all the way to a clickable prototype.",
      "It is intermediate and project-based. You will design a real app experience in Figma and learn to defend your decisions.",
    ],
    image: "/ui1.jpg",
    whoShouldAttend: [
      {
        n: "01",
        title: "Aspiring Designers",
        body: "Those who want to enter product design for freelancing or a remote job.",
      },
      {
        n: "02",
        title: "Developers",
        body: "Programmers who want design skills to build better, more usable products.",
      },
      {
        n: "03",
        title: "Founders",
        body: "People building a product who want to design and prototype it themselves.",
      },
    ],
    whyChooseUs:
      "We teach the full process - research, wireframe, prototype, test - the way real teams work. You leave with a clickable prototype and the reasoning to back it.",
    badges: ["Figma", "Prototype", "Certificate"],
    courseContent: [
      "UX Fundamentals",
      "User Research Basics",
      "Information Architecture",
      "Wireframing",
      "Visual and UI Design",
      "Design Systems and Components",
      "Prototyping in Figma",
      "Usability Testing",
      "Presenting Your Design",
    ],
    duration: "10 Weeks",
    fee: "N130,000",
    discountFee: "N100,000",
  },

  robotics: {
    slug: "robotics",
    category: "Robotics Training in Port Harcourt, Nigeria",
    titleTop: "Program Things That",
    titleBottom: "Move And Respond",
    intro: [
      "Robotics brings sensors, motors and code together. In this track learners program physical devices that sense their surroundings and react - the meeting point of hardware and software.",
      "It is hands-on and intermediate. Students finish with a working robot they built and programmed themselves.",
    ],
    image: "/people-pointing-up.jpg",
    whoShouldAttend: [
      {
        n: "01",
        title: "STEM Enthusiasts",
        body: "Learners fascinated by how machines sense, decide and move.",
      },
      {
        n: "02",
        title: "Young Engineers",
        body: "Students who enjoy building and want to combine electronics with code.",
      },
      {
        n: "03",
        title: "Next Level",
        body: "Those with some coding experience ready to apply it to the physical world.",
      },
    ],
    whyChooseUs:
      "We pair real components with guided projects so learners see cause and effect immediately. Small cohorts mean plenty of hands-on time with the kit.",
    badges: ["Hands-On Kit", "Working Robot", "Certificate"],
    courseContent: [
      "Introduction to Robotics",
      "Electronics Basics",
      "Sensors and Inputs",
      "Motors and Movement",
      "Programming Logic",
      "Reading and Reacting to Sensors",
      "Building the Chassis",
      "Assembling the Robot",
      "Programming Autonomous Behaviour",
    ],
    duration: "10 Weeks",
    fee: "N140,000",
    discountFee: "N110,000",
  },

  "intro-to-ai": {
    slug: "intro-to-ai",
    category: "Artificial Intelligence Training in Port Harcourt, Nigeria",
    titleTop: "Put AI To Work",
    titleBottom: "On Real Tasks",
    intro: [
      "AI is everywhere - this track cuts through the hype to show what it is, where it genuinely helps, and where it does not. You will learn prompting, automation and how to apply AI tools responsibly.",
      "It is practical and project-based. You will build a small AI-assisted tool that solves a problem you choose.",
    ],
    image: "/software-developer.jpg",
    whoShouldAttend: [
      {
        n: "01",
        title: "Curious Professionals",
        body: "Anyone who wants to use AI tools well and stay relevant at work.",
      },
      {
        n: "02",
        title: "Builders",
        body: "Developers and creators who want to add AI features to their projects.",
      },
      {
        n: "03",
        title: "Next Level",
        body: "Those ready to move from using AI casually to applying it to real tasks.",
      },
    ],
    whyChooseUs:
      "We keep it grounded and hands-on - real tools, real tasks, honest about limits. You leave able to put AI to work, not just talk about it.",
    badges: ["Practical", "Build a Tool", "Certificate"],
    courseContent: [
      "What AI Really Is",
      "How Models Work",
      "Effective Prompting",
      "AI Tools and Workflows",
      "Automating Everyday Tasks",
      "Working with Text and Images",
      "Limits, Bias and Ethics",
      "Planning an AI Project",
      "Building an AI-Assisted Tool",
    ],
    duration: "6 Weeks",
    fee: "N100,000",
    discountFee: "N80,000",
  },
};

/**
 * Clean, ordered labels for menus (NavBar dropdown, footer, etc.).
 * Single source of truth so a new program shows up everywhere at once.
 */
export type ProgramNavItem = { label: string; href: string };

export const PROGRAM_NAV: ProgramNavItem[] = [
  { label: "ICT Fundamentals", href: "/programs/ict-fundamentals" },
  { label: "Scratch Programming", href: "/programs/scratch-programming" },
  { label: "Web Development", href: "/programs/web-development" },
  { label: "Graphics Design", href: "/programs/graphics-design" },
  { label: "Video Editing", href: "/programs/video-editing" },
  { label: "UI/UX Design", href: "/programs/ui-ux-design" },
  { label: "Robotics", href: "/programs/robotics" },
  { label: "Intro to AI", href: "/programs/intro-to-ai" },
];

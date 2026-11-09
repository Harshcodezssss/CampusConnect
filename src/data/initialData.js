// Initial Mock Data for CampusConnect

export const INITIAL_USER_PROFILE = {
  id: "user-me",
  name: "Aarav Sharma",
  email: "aarav.sharma@campus.edu",
  department: "Computer Science & Engineering",
  year: "3rd Year",
  studentId: "CS2023-0492",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  bio: "Full-stack developer focused on React & Node.js. Excited about building high-impact products, competing in national hackathons, and exploring generative AI.",
  skills: ["React.js", "JavaScript", "Node.js", "Tailwind CSS", "Git", "REST APIs"],
  interests: ["Hackathons", "Web Development", "Open Source", "FinTech", "System Design"],
  preferredRoles: ["Frontend Lead", "Full Stack Developer"],
  availability: "Available for Hackathons", // "Available for Hackathons", "Open for Projects", "Busy with Academics"
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  portfolio: "https://aaravsharma.dev"
};

export const INITIAL_EVENTS = [
  {
    id: "evt-1",
    title: "HackCampus 2026: 36-Hour National Hackathon",
    organizer: "Campus Coding Society & ACM Chapter",
    category: "Hackathons",
    date: "2026-11-20",
    time: "09:00 AM - 09:00 PM (36h)",
    venue: "Main Auditorium & Tech Complex",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    description: "The flagship annual innovation hackathon. Solve challenges across FinTech, HealthTech, AI Agents, and Green Logistics. $10,000+ in prizes, live mentor sessions, and top-tier company recruitment.",
    seatsAvailable: 48,
    totalSeats: 300,
    tags: ["Hackathon", "AI", "Prizes", "Mentorship"],
    prizes: "$10,000 Prize Pool + Cloud Credits",
    featured: true
  },
  {
    id: "evt-2",
    title: "Hands-on Workshop: Deep Learning with PyTorch",
    organizer: "Data Science & AI Club",
    category: "Workshops",
    date: "2026-11-15",
    time: "02:00 PM - 05:30 PM",
    venue: "Turing Lab, CS Building (Room 304)",
    banner: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800",
    description: "Build neural networks from scratch. Learn tensor manipulation, backpropagation, CNN architectures, and deploy your first vision classification model to production.",
    seatsAvailable: 12,
    totalSeats: 60,
    tags: ["PyTorch", "AI/ML", "Hands-on"],
    prizes: "Certificate of Completion",
    featured: true
  },
  {
    id: "evt-3",
    title: "Design Systems & Micro-Interactions in Figma",
    organizer: "UX/UI Designers Guild",
    category: "Workshops",
    date: "2026-11-18",
    time: "04:00 PM - 06:30 PM",
    venue: "Design Media Studio (Block B)",
    banner: "https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&q=80&w=800",
    description: "Master design tokens, auto-layout 5.0, responsive components, and interactive micro-animations. Led by Senior Product Designers from leading tech startups.",
    seatsAvailable: 24,
    totalSeats: 50,
    tags: ["UI/UX", "Figma", "Design Systems"],
    prizes: "Design Component Kit + Stickers",
    featured: false
  },
  {
    id: "evt-4",
    title: "Annual Tech Expo: Robotics & IoT Showcase",
    organizer: "Robotics & Embedded Systems Club",
    category: "Technical Events",
    date: "2026-11-25",
    time: "10:00 AM - 04:00 PM",
    venue: "Central Campus Quad & Innovation Hall",
    banner: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    description: "Explore 50+ student drone demos, autonomous rovers, smart home IoT prototypes, and competitive combat robot matches. Open to all students and faculty.",
    seatsAvailable: 150,
    totalSeats: 400,
    tags: ["Robotics", "IoT", "Exhibition"],
    prizes: "Best Hardware Prototype Awards",
    featured: false
  },
  {
    id: "evt-5",
    title: "Career Talk: Cracking Tier-1 Tech Interviews",
    organizer: "Career & Placement Cell",
    category: "Seminars",
    date: "2026-11-14",
    time: "05:00 PM - 07:00 PM",
    venue: "Seminar Hall 2 & Hybrid Stream",
    banner: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    description: "An insider breakdown of DSA preparation, system design fundamentals, resume filtering, and behavioral interviews with campus alumni now at Google, Microsoft, and Uber.",
    seatsAvailable: 85,
    totalSeats: 250,
    tags: ["Career", "Interview Prep", "DSA"],
    prizes: "Mock Interview Guidebook PDF",
    featured: true
  },
  {
    id: "evt-6",
    title: "Vibrance 2026: Inter-Collegiate Cultural Festival",
    organizer: "Student Cultural Committee",
    category: "Cultural Events",
    date: "2026-12-02",
    time: "11:00 AM - 10:00 PM",
    venue: "Open Air Amphitheatre",
    banner: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    description: "The grand cultural celebration featuring battle of the bands, street play competitions, western acoustic nights, culinary contests, and celebrity musical performance.",
    seatsAvailable: 320,
    totalSeats: 1200,
    tags: ["Music", "Art", "Dance", "Celebration"],
    prizes: "Trophies & Cash Awards across 14 events",
    featured: false
  },
  {
    id: "evt-7",
    title: "Intra-College 3v3 Basketball Tournament",
    organizer: "Campus Athletics Department",
    category: "Sports",
    date: "2026-11-28",
    time: "08:00 AM - 06:00 PM",
    venue: "Outdoor Sports Complex Court 1 & 2",
    banner: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800",
    description: "Fast-paced half-court basketball tournament. Teams of 4 (3 playing, 1 sub). Medals, certificates, and college sports gear for finalists.",
    seatsAvailable: 8,
    totalSeats: 32,
    tags: ["Sports", "Basketball", "Fitness"],
    prizes: "Championship Trophy + Athletic Gear",
    featured: false
  },
  {
    id: "evt-8",
    title: "Cloud Native Architecture & Kubernetes Summit",
    organizer: "DevOps & Cloud Computing Circle",
    category: "Technical Events",
    date: "2026-12-05",
    time: "01:30 PM - 05:00 PM",
    venue: "Computing Labs 101-103",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    description: "Deploy microservices on distributed clusters with CI/CD automation, ingress management, and monitoring using Prometheus and Grafana.",
    seatsAvailable: 20,
    totalSeats: 80,
    tags: ["Cloud", "Kubernetes", "DevOps"],
    prizes: "Cloud Certification Vouchers",
    featured: false
  }
];

export const INITIAL_STUDENTS = [
  {
    id: "std-1",
    name: "Rhea Sen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    skills: ["Python", "PyTorch", "FastAPI", "NLP", "Scikit-Learn"],
    interests: ["Generative AI", "Hackathons", "Research", "EdTech"],
    preferredRoles: ["AI/ML Engineer", "Backend Developer"],
    bio: "Passionate about NLP and LLM agents. Built an automated research summarizer and looking for a frontend partner for HackCampus 2026.",
    availability: "Available for Hackathons",
    rating: 4.9,
    projectsCompleted: 6
  },
  {
    id: "std-2",
    name: "Devansh Patel",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    department: "Information Technology",
    year: "4th Year",
    skills: ["Node.js", "Express", "PostgreSQL", "Docker", "Go", "Redis"],
    interests: ["System Design", "Cloud Infrastructure", "FinTech"],
    preferredRoles: ["Backend Lead", "DevOps Engineer"],
    bio: "Specializing in distributed systems and high-throughput databases. Looking to collaborate on robust web applications and fintech prototypes.",
    availability: "Available for Hackathons",
    rating: 4.8,
    projectsCompleted: 9
  },
  {
    id: "std-3",
    name: "Ananya Iyer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250",
    department: "Design & Media Studies",
    year: "2nd Year",
    skills: ["Figma", "UI/UX", "User Research", "Wireframing", "Tailwind CSS"],
    interests: ["Product Design", "Design Systems", "Web3", "Social Impact"],
    preferredRoles: ["UI/UX Designer", "Product Designer"],
    bio: "Crafting delightful and accessible user journeys. Love collaborating with engineers to turn complex backend logic into intuitive digital interfaces.",
    availability: "Open for Projects",
    rating: 4.95,
    projectsCompleted: 5
  },
  {
    id: "std-4",
    name: "Karan Malhotra",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    department: "Electronics & Communication",
    year: "3rd Year",
    skills: ["C++", "Arduino", "Raspberry Pi", "IoT Protocols", "Python", "MQTT"],
    interests: ["Robotics", "Hardware Hacking", "Smart Cities", "Autonomous Systems"],
    preferredRoles: ["Hardware Engineer", "IoT Specialist"],
    bio: "Building sensory edge computing nodes and robotic drive trains. Seeking full-stack developers to hook sensor telemetry into sleek web dashboards.",
    availability: "Available for Hackathons",
    rating: 4.7,
    projectsCompleted: 7
  },
  {
    id: "std-5",
    name: "Meera Nair",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    skills: ["Flutter", "Dart", "Firebase", "State Management", "Mobile UI"],
    interests: ["Cross-platform Apps", "HealthTech", "Startups"],
    preferredRoles: ["Mobile App Developer"],
    bio: "Published 2 cross-platform apps on Google Play Store. Eager to team up for civic tech or campus utility projects.",
    availability: "Open for Projects",
    rating: 4.85,
    projectsCompleted: 4
  },
  {
    id: "std-6",
    name: "Vikram Joshi",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250",
    department: "Data Science & AI",
    year: "4th Year",
    skills: ["Data Analysis", "SQL", "Tableau", "Pandas", "Scikit-Learn", "R"],
    interests: ["Business Intelligence", "Sports Analytics", "Quantitative Finance"],
    preferredRoles: ["Data Analyst", "Data Engineer"],
    bio: "Numbers tell stories. Currently mining campus energy usage metrics. Interested in data visualization and predictive modeling teams.",
    availability: "Busy with Academics",
    rating: 4.6,
    projectsCompleted: 8
  },
  {
    id: "std-7",
    name: "Sneha Reddy",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250",
    department: "Computer Science & Engineering",
    year: "2nd Year",
    skills: ["Solidity", "Ethereum", "Web3.js", "React.js", "Smart Contracts"],
    interests: ["Blockchain", "DeFi", "Decentralized Identity", "Security"],
    preferredRoles: ["Blockchain Developer", "Full Stack Developer"],
    bio: "Exploring decentralized identity protocols for student credentials. Seeking backend and security enthusiasts to build resilient dApps.",
    availability: "Available for Hackathons",
    rating: 4.75,
    projectsCompleted: 3
  },
  {
    id: "std-8",
    name: "Tanya Choudhury",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    department: "Business & Management",
    year: "3rd Year",
    skills: ["Product Management", "Pitching", "Market Research", "Agile / Scrum", "Financial Modeling"],
    interests: ["Venture Capital", "Startup Incubators", "EdTech", "Marketing"],
    preferredRoles: ["Product Lead", "Pitch Presenter"],
    bio: "Winner of 2 collegiate pitch competitions. I love structuring problem definitions, crafting compelling pitch decks, and validating business feasibility.",
    availability: "Available for Hackathons",
    rating: 4.9,
    projectsCompleted: 5
  },
  {
    id: "std-9",
    name: "Aditya Verma",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=250",
    department: "Cyber Security & Forensics",
    year: "4th Year",
    skills: ["Penetration Testing", "Network Security", "Linux", "Python", "Cryptography", "OWASP"],
    interests: ["CTF Challenges", "Application Security", "Threat Intelligence"],
    preferredRoles: ["Security Auditor", "Backend Developer"],
    bio: "Top 50 ranking on TryHackMe. Let's make sure our hackathon project doesn't have SQL injection or insecure API endpoints!",
    availability: "Open for Projects",
    rating: 4.88,
    projectsCompleted: 7
  },
  {
    id: "std-10",
    name: "Pooja Hegde",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=250",
    department: "Information Technology",
    year: "2nd Year",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "GraphQL", "Supabase"],
    interests: ["Modern Web", "Developer Tooling", "SaaS", "Design Systems"],
    preferredRoles: ["Frontend Lead", "Full Stack Developer"],
    bio: "Obsessed with clean component architecture, snappy page speeds, and responsive typography. Ready to build something awesome.",
    availability: "Available for Hackathons",
    rating: 4.82,
    projectsCompleted: 4
  }
];

export const INITIAL_OPPORTUNITIES = [
  {
    id: "opp-1",
    title: "Summer Software Engineering Intern 2027",
    organization: "Microsoft India Development Center",
    category: "Internships",
    location: "Bengaluru / Hyderabad (Hybrid)",
    deadline: "2026-12-15",
    stipend: "INR 1,25,000 / month",
    eligibility: "Pre-final year B.Tech/B.E students with CGPA 8.0+",
    description: "Join the Core OS & Azure Cloud teams to design scalable services, optimize distributed storage, and write production software used by millions worldwide.",
    tags: ["Software Engineering", "Cloud", "Tier-1", "Paid"],
    requirements: ["Proficiency in C++, Java, or C#", "Solid Data Structures & Algorithms", "Strong problem-solving skills"],
    link: ""
  },
  {
    id: "opp-2",
    title: "Google Summer of Code (GSoC) 2027 Mentorship Program",
    organization: "Google Open Source",
    category: "Student Programs",
    location: "Remote / Online",
    deadline: "2026-12-30",
    stipend: "$1,500 - $3,000 Stipend",
    eligibility: "All enrolled university students aged 18+",
    description: "Work with top open-source organizations on real-world codebases with 1-on-1 industry mentorship. Great launchpad for high-visibility developer careers.",
    tags: ["Open Source", "Google", "Remote", "Mentorship"],
    requirements: ["Git experience", "Contribution to public open source repos", "Draft project proposal"],
    link: ""
  },
  {
    id: "opp-3",
    title: "Global AI Agents & LLM Builders Hackathon",
    organization: "Anthropic & Weights & Biases",
    category: "Hackathons",
    location: "Online / Global",
    deadline: "2026-11-28",
    stipend: "$50,000 Cash Pool",
    eligibility: "Open to student teams of 1 to 4 members",
    description: "Build autonomous multi-agent systems, multimodal assistants, or evaluation frameworks. Free access to frontier LLM API credits provided to registered teams.",
    tags: ["AI Hackathon", "LLMs", "Cash Prizes"],
    requirements: ["Working prototype submission", "Open source GitHub repo", "3-minute demo video"],
    link: ""
  },
  {
    id: "opp-4",
    title: "National Merit STEM Research Fellowship",
    organization: "Council of Scientific & Industrial Research",
    category: "Scholarships",
    location: "Campus / Institutional",
    deadline: "2026-12-20",
    stipend: "INR 50,000 Merit Grant",
    eligibility: "Undergraduate students conducting original scientific research",
    description: "Prestigious fellowship grant supporting student-led research papers, laboratory equipment, and international conference travel grants.",
    tags: ["Research", "Scholarship", "Grant"],
    requirements: ["Faculty recommendation letter", "Research abstract", "Academic transcripts"],
    link: ""
  },
  {
    id: "opp-5",
    title: "CodeChef National Collegiate Programming Cup",
    organization: "CodeChef & Unacademy",
    category: "Coding Competitions",
    location: "Online Contest Platform",
    deadline: "2026-11-22",
    stipend: "INR 2,00,000 Total Prizes",
    eligibility: "Any undergraduate or postgraduate college student",
    description: "A fast-paced algorithmic coding challenge covering graph algorithms, dynamic programming, number theory, and combinatorics.",
    tags: ["Competitive Programming", "Algorithms", "DSA"],
    requirements: ["Active CodeChef handle", "Individual participation"],
    link: ""
  },
  {
    id: "opp-6",
    title: "Undergraduate ML Research Assistantship",
    organization: "Campus AI & Cognitive Systems Lab",
    category: "Research Programs",
    location: "Campus Labs (Part-time)",
    deadline: "2026-11-30",
    stipend: "INR 15,000 / month + Co-authorship",
    eligibility: "2nd to 4th year students with Python & linear algebra foundation",
    description: "Collaborate with senior faculty on medical image segmentation using transformer models. Excellent opportunity to get a top conference publication.",
    tags: ["Computer Vision", "Research", "Lab", "Paper Publication"],
    requirements: ["PyTorch/TensorFlow fluency", "Minimum 12 hrs/week dedication"],
    link: ""
  },
  {
    id: "opp-7",
    title: "Product Design & Frontend Intern",
    organization: "Razorpay Innovation Labs",
    category: "Internships",
    location: "Bengaluru (Hybrid)",
    deadline: "2026-12-10",
    stipend: "INR 60,000 / month",
    eligibility: "Students graduating in 2027 or 2028 with a public design/code portfolio",
    description: "Bridge the gap between design and engineering. Build modular UI libraries, animate checkout transitions, and participate in usability audits.",
    tags: ["Frontend", "UI/UX", "Fintech", "Design Systems"],
    requirements: ["React/TypeScript fluency", "Figma component mastery", "Live portfolio link"],
    link: ""
  },
  {
    id: "opp-8",
    title: "GitHub Campus Expert Ambassador Program",
    organization: "GitHub Education",
    category: "Student Programs",
    location: "Campus Leadership",
    deadline: "2027-01-15",
    stipend: "Exclusive Swag, Event Budget & Training",
    eligibility: "Passionate student community organizers and event leads",
    description: "Lead technical workshops, organize open-source hackathons, and receive direct leadership mentorship and event funding from GitHub.",
    tags: ["Leadership", "Community", "GitHub", "Ambassador"],
    requirements: ["Active student community member", "Passionate about open source education"],
    link: ""
  }
];

export const INITIAL_COMMUNITY_POSTS = [
  {
    id: "post-1",
    authorId: "std-1",
    authorName: "Rhea Sen",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
    authorDept: "CSE",
    category: "Technical",
    createdAt: "2 hours ago",
    content: "Just open-sourced our campus paper summarizer using Llama 3 & LangChain! Would love feedback on the chunking strategy and prompt templates. Check it out on GitHub: /campus-ai-summarizer 🚀",
    likes: 18,
    isLiked: false,
    comments: [
      {
        id: "c-1",
        authorName: "Devansh Patel",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
        content: "Awesome work Rhea! Are you using ChromaDB or pgvector for semantic retrieval?",
        createdAt: "1 hour ago"
      },
      {
        id: "c-2",
        authorName: "Rhea Sen",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
        content: "Currently using pgvector with Docker. Seamless integration with our relational DB!",
        createdAt: "45 mins ago"
      }
    ]
  },
  {
    id: "post-2",
    authorId: "std-3",
    authorName: "Ananya Iyer",
    authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250",
    authorDept: "Design",
    category: "Events",
    createdAt: "4 hours ago",
    content: "Reminder for anyone joining the Figma Micro-Interactions workshop this Wednesday: Please ensure you've installed Figma Desktop and the 'LottieFiles' plugin in advance. We'll be creating high-fidelity prototypes!",
    likes: 24,
    isLiked: true,
    comments: [
      {
        id: "c-3",
        authorName: "Pooja Hegde",
        authorAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=250",
        content: "Can't wait! Really looking forward to the auto-layout and spring physics demo.",
        createdAt: "3 hours ago"
      }
    ]
  },
  {
    id: "post-3",
    authorId: "std-8",
    authorName: "Tanya Choudhury",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    authorDept: "Management",
    category: "Opportunities",
    createdAt: "6 hours ago",
    content: "Heads up! The Microsoft Summer Engineering Internship application window closes in 3 weeks. If anyone wants a free resume review specifically tailored for technical screening ATS, drop a comment or connect!",
    likes: 42,
    isLiked: false,
    comments: [
      {
        id: "c-4",
        authorName: "Sneha Reddy",
        authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250",
        content: "Sent you a message Tanya, thanks a ton for offering this!",
        createdAt: "5 hours ago"
      }
    ]
  },
  {
    id: "post-4",
    authorId: "std-4",
    authorName: "Karan Malhotra",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    authorDept: "ECE",
    category: "General",
    createdAt: "Yesterday",
    content: "Lost a grey Logitech MX Master 3S mouse near the Central Library 2nd-floor study cubicles yesterday evening around 6 PM. If anyone spotted or handed it to lost & found, please let me know!",
    likes: 8,
    isLiked: false,
    comments: [
      {
        id: "c-5",
        authorName: "Aditya Verma",
        authorAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=250",
        content: "Check with Mr. Thomas at the security reception desk, I saw someone submit a Logitech device there this morning.",
        createdAt: "Yesterday"
      }
    ]
  },
  {
    id: "post-5",
    authorId: "std-9",
    authorName: "Aditya Verma",
    authorAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=250",
    authorDept: "CyberSec",
    category: "Academics",
    createdAt: "Yesterday",
    content: "Quick tip for everyone preparing for the Operating Systems mid-terms: Focus heavily on Peterson's algorithm, Banker's algorithm for deadlock avoidance, and TLB address translation calculation problems. Those usually carry 35% of the exam weightage.",
    likes: 67,
    isLiked: false,
    comments: []
  },
  {
    id: "post-6",
    authorId: "std-2",
    authorName: "Devansh Patel",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    authorDept: "IT",
    category: "Technical",
    createdAt: "2 days ago",
    content: "Benchmarked Redis caching vs In-memory Go sync.Map for our club's event registration system under simulated 5,000 req/sec load. Redis added only 1.2ms network latency while keeping multi-instance worker processes synchronized perfectly.",
    likes: 31,
    isLiked: false,
    comments: []
  },
  {
    id: "post-7",
    authorId: "std-5",
    authorName: "Meera Nair",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    authorDept: "CSE",
    category: "Events",
    createdAt: "2 days ago",
    content: "Our campus Women in Tech chapter is hosting a mentoring circle this Friday evening. We'll discuss project portfolios, negotiating first job offers, and beating imposter syndrome. Refreshments provided!",
    likes: 53,
    isLiked: true,
    comments: []
  },
  {
    id: "post-8",
    authorId: "std-10",
    authorName: "Pooja Hegde",
    authorAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=250",
    authorDept: "IT",
    category: "General",
    createdAt: "3 days ago",
    content: "Anyone else notice how peaceful the garden cafeteria is around sunset? Great place to decompress and review lecture notes without headphone noise.",
    likes: 29,
    isLiked: false,
    comments: []
  }
];

export const INITIAL_COLLAB_REQUESTS = [
  {
    id: "req-1",
    fromStudentId: "std-1",
    toStudentId: "user-me",
    type: "incoming",
    status: "pending", // "pending", "accepted", "rejected"
    projectTitle: "HackCampus 2026 - AI Agent Platform",
    message: "Hi Aarav! Saw your React and frontend skills. I've built the NLP backend and would love to partner up for the 36-hour hackathon.",
    timestamp: "2026-11-08T10:30:00Z"
  },
  {
    id: "req-2",
    fromStudentId: "user-me",
    toStudentId: "std-3",
    type: "outgoing",
    status: "pending",
    projectTitle: "Campus Marketplace UI",
    message: "Hey Ananya! Would love your UI/UX design input on our student resource exchange platform.",
    timestamp: "2026-11-07T16:15:00Z"
  }
];


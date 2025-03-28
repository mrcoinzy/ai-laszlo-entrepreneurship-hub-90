
import React from "react";
import { Code, DollarSign, Rocket, BarChart2, Zap } from "lucide-react";

export interface CourseModule {
  title: string;
  lessons: string[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  icon: React.ReactNode;
  buttonText: string;
  featured?: boolean;
  lessons: number;
  duration: string;
  learningPoints?: string[];
  modules?: CourseModule[];
}

export const courses: Course[] = [
  {
    id: 1,
    title: "AI Prompt Engineering Course",
    description: "Master the art of prompt engineering to get the most out of AI tools.",
    fullDescription: "Master the art of prompt engineering to get the most out of AI tools. Learn how to craft effective prompts that deliver precise results every time, optimize your workflow, and create sophisticated chains of prompts for complex tasks.",
    icon: <Zap className="h-6 w-6 text-white" />,
    buttonText: "Start Learning",
    featured: true,
    lessons: 12,
    duration: "4 hours",
    learningPoints: [
      "Understand how large language models process prompts",
      "Craft precise prompts for specific tasks and outputs",
      "Use advanced techniques like chain-of-thought prompting",
      "Optimize prompts for different AI tools and platforms",
      "Build prompt templates for consistent results",
      "Debug and iterate on prompts for better outcomes"
    ],
    modules: [
      {
        title: "Introduction to Prompt Engineering",
        lessons: [
          "What is Prompt Engineering?",
          "How AI Models Process Prompts",
          "The Core Components of Effective Prompts"
        ]
      },
      {
        title: "Basic Prompt Techniques",
        lessons: [
          "Clarity and Specificity in Prompts",
          "Formatting for Better Results",
          "Using Examples in Prompts"
        ]
      },
      {
        title: "Advanced Prompt Engineering",
        lessons: [
          "Chain-of-Thought Prompting",
          "Few-Shot Learning Techniques",
          "Creating Prompt Templates"
        ]
      },
      {
        title: "Practical Applications",
        lessons: [
          "Prompting for Content Creation",
          "Prompting for Code Generation",
          "Prompting for Data Analysis"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Start with $0",
    description: "Learn how to bootstrap your business without initial capital.",
    fullDescription: "Learn how to bootstrap your business without initial capital. Discover strategies to launch and grow your startup with minimal resources, leverage free tools, and build a sustainable business model that doesn't require significant upfront investment.",
    icon: <DollarSign className="h-6 w-6 text-white" />,
    buttonText: "Start Learning",
    lessons: 8,
    duration: "3 hours",
    learningPoints: [
      "Identify business opportunities that require minimal startup capital",
      "Use free and low-cost tools to build your online presence",
      "Implement bartering and creative partnership strategies",
      "Develop pre-selling techniques to fund production",
      "Create and leverage digital products with zero manufacturing costs",
      "Build a customer base through organic marketing methods"
    ],
    modules: [
      {
        title: "Zero-Budget Business Models",
        lessons: [
          "Service-Based Businesses You Can Start Today",
          "Digital Product Creation Fundamentals",
          "Finding Your Zero-Cost Niche"
        ]
      },
      {
        title: "Free Tools & Resources",
        lessons: [
          "Building Your Digital Presence for Free",
          "No-Cost Marketing Strategies",
          "Free Productivity and Management Tools"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "10 AI Software That Works 20x Faster",
    description: "Discover AI tools that will dramatically increase your productivity.",
    fullDescription: "Discover AI tools that will dramatically increase your productivity. Automate repetitive tasks and focus on what truly matters using cutting-edge AI software designed to supercharge your workflow and decision-making processes.",
    icon: <Rocket className="h-6 w-6 text-white" />,
    buttonText: "Start Learning",
    lessons: 10,
    duration: "3.5 hours",
    learningPoints: [
      "Automate content creation with AI writing tools",
      "Streamline design processes with AI-powered design tools",
      "Implement AI for customer service and engagement",
      "Use AI for data analysis and business insights",
      "Optimize your schedule with AI time management tools",
      "Integrate multiple AI tools for comprehensive workflow automation"
    ],
    modules: [
      {
        title: "AI for Content Creation",
        lessons: [
          "Text Generation and Copywriting Tools",
          "AI Image and Graphics Generation",
          "Video and Audio Production with AI"
        ]
      },
      {
        title: "AI for Business Operations",
        lessons: [
          "Customer Service Automation",
          "AI-Powered Analytics",
          "Meeting and Schedule Optimization"
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Marketing Course",
    description: "Learn modern marketing strategies to grow your business effectively.",
    fullDescription: "Learn modern marketing strategies to grow your business effectively. From social media to content marketing, cover all essential aspects of digital marketing to attract and retain customers in today's competitive landscape.",
    icon: <BarChart2 className="h-6 w-6 text-white" />,
    buttonText: "Start Learning",
    lessons: 15,
    duration: "6 hours",
    learningPoints: [
      "Develop a comprehensive digital marketing strategy",
      "Master social media marketing across multiple platforms",
      "Create engaging content that converts visitors to customers",
      "Implement SEO techniques for increased organic traffic",
      "Design effective email marketing campaigns",
      "Analyze marketing performance and optimize for better results"
    ],
    modules: [
      {
        title: "Marketing Strategy Fundamentals",
        lessons: [
          "Understanding Your Target Audience",
          "Competitive Analysis Techniques",
          "Building Your Marketing Framework"
        ]
      },
      {
        title: "Content Marketing Mastery",
        lessons: [
          "Content Creation That Converts",
          "Content Distribution Strategies",
          "Measuring Content Performance"
        ]
      },
      {
        title: "Social Media Marketing",
        lessons: [
          "Platform-Specific Strategies",
          "Building Engaged Communities",
          "Paid Social Advertising"
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Vibe Coding Step by Step",
    description: "Learn coding with a focus on creating visually appealing interfaces.",
    fullDescription: "Learn coding with a focus on creating visually appealing interfaces. Perfect for entrepreneurs who want to understand the technical side of web development while creating aesthetically pleasing and functional websites or applications.",
    icon: <Code className="h-6 w-6 text-white" />,
    buttonText: "Start Learning",
    lessons: 20,
    duration: "8 hours",
    learningPoints: [
      "Understand HTML, CSS, and JavaScript fundamentals",
      "Create responsive designs that work on all devices",
      "Implement modern UI/UX principles in your code",
      "Use CSS frameworks like Tailwind efficiently",
      "Add animations and interactive elements to your websites",
      "Build complete web projects from concept to deployment"
    ],
    modules: [
      {
        title: "Web Development Foundations",
        lessons: [
          "HTML Structure and Semantics",
          "CSS Styling Fundamentals",
          "JavaScript Basics for Interactivity"
        ]
      },
      {
        title: "Modern CSS Techniques",
        lessons: [
          "Flexbox and Grid Layouts",
          "CSS Variables and Custom Properties",
          "Responsive Design Principles"
        ]
      },
      {
        title: "UI Animation and Effects",
        lessons: [
          "CSS Transitions and Animations",
          "Interactive UI Elements",
          "Performance Optimization"
        ]
      }
    ]
  }
];

import code_icon from './code-icon.png';
import edu_icon from './edu-icon.png';
import project_icon from './project-icon.png';
import firebase from './firebase.png';
import figma from './figma.png';
import git from './git.png';
import right_arrow_white from './right-arrow-white.png';
import logo from './logo.png';
import mail_icon from './mail_icon.png';
import profile_img from './profile-img.png';
import download_icon from './download-icon.png';
import hand_icon from './hand-icon.png';
import header_bg_color from './header-bg-color.png';
import arrow_icon from './arrow-icon.png';
import menu_black from './menu-black.png';
import close_black from './close-black.png';
import right_arrow from './right-arrow.png';
import send_icon from './send-icon.png';
import right_arrow_bold from './right-arrow-bold.png';
import nctech_icon from './nctech-icon.png';
import jlr_icon from './jlr-icon.png';
import smc_icon from './smc-icon.png';
import rexroth_icon from './rexroth-icon.png';
import li_logo from './li-logo.png';
import gazatteer from './gazatteer.png'
import github_icon from './github-icon.png'

export const assets = {
    code_icon,
    edu_icon,
    project_icon,
    firebase,
    figma,
    git,
    right_arrow_white,
    logo,
    mail_icon,
    profile_img,
    download_icon,
    hand_icon,
    header_bg_color,
    arrow_icon,
    menu_black,
    close_black,
    right_arrow,
    send_icon,
    right_arrow_bold,
    nctech_icon,
    jlr_icon,
    smc_icon,
    rexroth_icon,
    li_logo,
    gazatteer,
    github_icon
};

export const projects = [
    {
        id: "gazatteer",
        title: "Gazatteer",
        subtitle: "Interactive Geospatial Web Application",
        tags: ["React", "Leaflet", "JavaScript", "Web APIs", "Vercel"],
        text: "Gazatteer is an interactive geospatial web application that allows users to explore countries worldwide and view real-time geographic, demographic, and weather data.",
        image: '/gazatteer.png',
        githubUrl: "https://github.com/you/repo",
        links: [
      { label: "Try it out", href: '/gazatteer' },
    ],
        features:[
'Implemented dynamic data fetching from multiple public APIs and normalized responses for consistent UI rendering.',
'Integrated Leaflet maps with custom markers, layers, and popups to visualize country-specific information.',
'Designed and developed a responsive user interface optimized for desktop and mobile devices.',
'Structured the application using reusable React components and modern JavaScript patterns.',
'Deployed and hosted the application on Vercel with production build configuration and environment variables.'
    ]
    },
    {
        id: "company-directory",
        title: "Company Directory",
        subtitle: "Full-Stack Web Application",
        tags: ["Next.js", "Node.js", "PostgreSQL", "JavaScript", "Vercel"],

        text: "Company Directory a full-stack company management system supporting CRUD operations for personnel, departments, and locations.",
        image: '/companydirectory.png',
        githubUrl: "https://github.com/you/repo",
        links: [
      { label: "Try it out", href: '/companydirectory' },
    ],
     features:[
'        Designed RESTful APIs in Node.js and implemented PostgreSQL database schema and queries.',
'Built a responsive Next.js front-end with server-side rendering and client-side interactivity.',
'Implemented advanced search, filtering, sorting, and pagination to efficiently manage large datasets.',
'Added form validation, error handling, and user feedback to improve usability and data integrity.',
'Connected front-end and back-end layers through clean API contracts, demonstrating end-to-end application design.',
'Deployed and hosted the application on Vercel, configuring environment variables and production builds.'

        ]
    }
];
export const serviceData = [
    {
        icon: assets.nctech_icon, title: 'Front End Engineer – NCTech, Edinburgh, UK (March 2021 – November 2025)',
        description: 'Working in the geospatial industry, making use of React to contribute to products in an agile environment.',
        duties: ['Built and shipped production React features across multiple geospatial products in a fast-paced agile environment, contributing to regular releases and product demos for technical and non-technical stakeholders.',
            'Developed reusable UI components and improved front-end architecture, reducing duplicated code and improving long-term maintainability.',
            'Led accessibility improvements across products (WCAG), implementing semantic HTML, keyboard navigation, and contrast fixes to support users with visual impairments.',
            'Ensured fully responsive layouts across desktop, tablet, and mobile using modern CSS and layout techniques.',
            'Wireframed and prototyped new features in Figma to communicate design ideas and accelerate development.',
            'Mentored junior developers, onboarding them to the codebase and providing code reviews and technical guidance.',
            'Collaborated with Product Owners and backend engineers to define sprint scope, estimate work, and plan technical solutions.']
    },
    {
        icon: assets.jlr_icon, title: 'Electrical Engineer - Jaguar Land Rover, Gaydon, UK (September 2017 – June 2018)',
        description: 'Working in an electrification and advanced driver assistance systems department contributing to the development of new car lines and product features.',
        duties: ['Created a tool to assess how much CO2 reduction per car model is required to meet government regulated emissions standards.',
            'Completed performance tests on prototype MHEV vehicles, using Canalyzer to assess the success of the vehicle in varying states of operation.',
            'Defined the Lidar requirements for different autonomous features, while creating a customisable sensor simulation in Matlab used to test Lidar parameters in different scenarios.'
        ]
    },
    {
        icon: assets.smc_icon, title: 'Project Engineer - SMC Pneumatics, Milton Keynes, UK (October 2015 – March 2017)',
        description: 'Working in a European technical centre on a variety of projects for several products including chillers, filters, pumps and air dryers.',
        duties: ['Provided product support and troubleshooting to subsidiaries across Europe.',
            'Designed tests based on electrical standards to commission chiller units for operation at -20C.',
            'Performed benchmarking tests on competitor products that concluded with concise detailed technical reports sent to Japanese headquarters.'
        ]
    },
    {
        icon: assets.rexroth_icon, title: 'Research and Development Engineer - Bosch Rexroth, Glenrothes, UK (January 2014 – August 2014) ',
        description: 'Working in a R&D department, focussing on improvements to the hydraulic motors product line.',
        duties: ['Improved the starting efficiency of the hydraulic motors in a cost effective manner.',
            'Tested the hardness of new components resulting in avoiding unnecessary costly heat treating of said components.',
            'Fault finding defective customer units with detailed reports for technical and non technical staff.'
        ]
    },
]


export const infoList = [
  {
    icon: assets.code_icon,
    title: 'Languages and Software Skills',
    description: 'Proficient in a range of programming languages and tools.',
    skills: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Node.js',
      'Next.js',
      'Figma',
      'SQL',
      'Python',
    ],
  },
  {
    icon: assets.edu_icon,
    title: 'Education',
    description: 'MEng in Electrical and Mechanical Engineering - The University of Edinburgh (2015)',
    skills: [], // No badges for education
  },
];
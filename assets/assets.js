import user_image from './user-image.png';
import code_icon from './code-icon.png';
import code_icon_dark from './code-icon-dark.png';
import edu_icon from './edu-icon.png';
import edu_icon_dark from './edu-icon-dark.png';
import project_icon from './project-icon.png';
import project_icon_dark from './project-icon-dark.png';
import vscode from './vscode.png';
import firebase from './firebase.png';
import figma from './figma.png';
import git from './git.png';
import mongodb from './mongodb.png';
import right_arrow_white from './right-arrow-white.png';
import logo from './logo.png';
import logo_dark from './logo_dark.png';
import mail_icon from './mail_icon.png';
import mail_icon_dark from './mail_icon_dark.png';
import profile_img from './profile-img.png';
import download_icon from './download-icon.png';
import hand_icon from './hand-icon.png';
import header_bg_color from './header-bg-color.png';
import moon_icon from './moon_icon.png';
import sun_icon from './sun_icon.png';
import arrow_icon from './arrow-icon.png';
import arrow_icon_dark from './arrow-icon-dark.png';
import menu_black from './menu-black.png';
import menu_white from './menu-white.png';
import close_black from './close-black.png';
import close_white from './close-white.png';
import web_icon from './web-icon.png';
import mobile_icon from './mobile-icon.png';
import ui_icon from './ui-icon.png';
import graphics_icon from './graphics-icon.png';
import right_arrow from './right-arrow.png';
import send_icon from './send-icon.png';
import right_arrow_bold from './right-arrow-bold.png';
import right_arrow_bold_dark from './right-arrow-bold-dark.png';
import nctech_icon from './nctech-icon.png';
import jlr_icon from './jlr-icon.png';
import smc_icon from './smc-icon.png';
import rexroth_icon from './rexroth-icon.png';
import li_logo from './li-logo.png'

export const assets = {
    user_image,
    code_icon,
    code_icon_dark,
    edu_icon,
    edu_icon_dark,
    project_icon,
    project_icon_dark,
    vscode,
    firebase,
    figma,
    git,
    mongodb,
    right_arrow_white,
    logo,
    logo_dark,
    mail_icon,
    mail_icon_dark,
    profile_img,
    download_icon,
    hand_icon,
    header_bg_color,
    moon_icon,
    sun_icon,
    arrow_icon,
    arrow_icon_dark,
    menu_black,
    menu_white,
    close_black,
    close_white,
    web_icon,
    mobile_icon,
    ui_icon,
    graphics_icon,
    right_arrow,
    send_icon,
    right_arrow_bold,
    right_arrow_bold_dark,
    nctech_icon,
    jlr_icon,
    smc_icon,
    rexroth_icon,
    li_logo
};

export const workData = [
    {
        title: 'Gazatteer',
        description: 'Geospacial country infromation',
        bgImage: '/work-1.png',
        link: '/Gazatteer'
    },
    {
        title: 'Company Directory',
        description: 'View, Create, Edit and Delete users in a company',
        bgImage: '/work-2.png',
        link: '/CompanyDirectory'
    },
]

export const serviceData = [
    { icon: assets.nctech_icon, title: 'Front End Engineer – NCTech, Edinburgh, UK (March 2021 – November 2025)',
        description: 'Working in the geospatial industry, making use of React to contribute to products in an agile environment.', 
        duties: ['Created features to advance the functionality of several products in a high pace agile environment, presenting features at demos to technical and non technical staff.', 
                'Wireframed designs to communicate ideas to team members and plan feature development.',
                'Mentored junior Developers, introducing them to the new codebase and reviewing code acrossdifferent departments.',
                'Reviewed the accessibility of products, and made changes for those with visual impairments, while ensuring layouts worked correctly on different screen sizes.',
                'Organised planning meetings with Product Owners and Back end team members to decide the direction of the next sprint.' ] },
    { icon: assets.jlr_icon, title: 'Electrical Engineer - Jaguar Land Rover, Gaydon, UK (September 2017 – June 2018)', 
        description: 'Working in an electrification and advanced driver assistance systems department contributing to the development of new car lines and product features.',
        duties: ['Created a tool to assess how much CO2 reduction per car model is required to meet government regulated emissions standards.',
                'Completed performance tests on prototype MHEV vehicles, using Canalyzer to assess the success of the vehicle in varying states of operation.',
                'Defined the Lidar requirements for different autonomous features, while creating a customisable sensor simulation in Matlab used to test Lidar parameters in different scenarios.'
        ] },
    { icon: assets.smc_icon, title: 'Project Engineer - SMC Pneumatics, Milton Keynes, UK (October 2015 – March 2017)', 
        description: 'Working in a European technical centre on a variety of projects for several products including chillers, filters, pumps and air dryers.', 
        duties: ['Provided product support and troubleshooting to subsidiaries across Europe.',
            'Designed tests based on electrical standards to commission chiller units for operation at -20C.',
            'Performed benchmarking tests on competitor products that concluded with concise detailed technical reports sent to Japanese headquarters.'
        ] },
    { icon: assets.rexroth_icon, title: 'Research and Development Engineer - Bosch Rexroth, Glenrothes, UK (January 2014 – August 2014) ', 
        description: 'Working in a R&D department, focussing on improvements to the hydraulic motors product line.', 
        duties: ['Improved the starting efficiency of the hydraulic motors in a cost effective manner.',
            'Tested the hardness of new components resulting in avoiding unnecessary costly heat treating of said components.',
            'Fault finding defective customer units with detailed reports for technical and non technical staff.'
        ] },
]

export const infoList = [
    { icon: assets.code_icon, iconDark: assets.code_icon_dark, title: 'Languages and Software Skills', description: 'HTML, CSS, JavaScript React Js, Next Js, Figma, SQL' },
    { icon: assets.edu_icon, iconDark: assets.edu_icon_dark, title: 'Education', description: 'MEng in Electrical and Mechanical Engineering - The University of Edinburgh (2015)' },
];

export const toolsData = [
    assets.vscode, assets.firebase, assets.mongodb, assets.figma, assets.git
];
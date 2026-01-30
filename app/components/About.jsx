import { assets } from '../../assets/assets'
import React from 'react'
import Image from 'next/image'

export default function About() {

  const aboutList = [
    'Software Engineer with 5 years of experience building modern web applications using React, Next.js, and JavaScript.',
    'Experienced in designing and developing user-focused interfaces with clean architecture and scalable front-end patterns.',
    'Transitioned from Electrical & Mechanical Engineering to Software Engineering, driven by a passion for fast-paced, impact-driven, problem-solving environments.',
    'Recently relocated from Scotland to Canada, actively pursuing opportunities to grow within the North American tech industry.',
    'Outside of coding I enjoy playing guitar and performing stand-up comedy.',
  ]

  return (
    <div id='about' className='w-full px-5 sm:px-10 lg:px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-1 text-xs uppercase tracking-widest text-gray-500 font-Ovo'>Introduction</h4>
      <h2 className='text-center text-5xl font-Ovo'>About Me</h2>

      <div className='flex w-full flex-col lg:flex-row items-center gap-20 lg:gap-20 my-14'>
        <div className='w-64 sm:w-80 rounded-3xl max-w-none'>
            <Image src={assets.profile_img} alt='user' 
            className='w-full rounded-3xl' />
        </div>
        <div className='flex-1'>
                  <ul className="list-disc list-inside space-y-1.5 mt-2">
          {aboutList?.map((duty, index) => (
            <li
              key={index}
              className="text-[13px] sm:text-sm text-gray-600 leading-relaxed"
            >
              {duty}
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  )
}

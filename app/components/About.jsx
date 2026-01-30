import { assets } from '../../assets/assets'
import React from 'react'
import Image from 'next/image'

export default function About() {
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
            <p className='mb-3 max-w-2xl font-Ovo'>
                I am a Software Engineer with 4+ years of experience in the geospatial industry, building modern web applications using technologies such as React and Next.js. Born and raised in Scotland, I recently relocated to Canada and am excited to continue my software engineering career in North America. For more details about my professional background, please see the &apos;Experience&apos; section below.
           </p>
           <p className='mb-3 max-w-2xl font-Ovo'>
                Before transitioning into software engineering, I earned a Master&apos;s degree in Electrical and Mechanical Engineering and worked across several engineering industries. While valuable, this experience led me to pursue software development for its fast-paced, problem-solving-focused nature. 
          </p>
           <p>
                Outside of software engineering, I enjoy playing guitar and performing stand-up comedy.
            </p>

        </div>
      </div>
    </div>
  )
}

import { assets, infoList } from '../../assets/assets'
import React from 'react'
import Image from 'next/image'

export default function About() {
  return (
    <div id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 text-lg font-Ovo'>Introduction</h4>
      <h2 className='text-center text-5xl font-Ovo'>About Me</h2>

      <div className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
        <div className='w-64 sm:w-80 rounded-3xl max-w-none'>
            <Image src={assets.profile_img} alt='user' 
            className='w-full rounded-3xl' />
        </div>
        <div className='flex-1'>
            <p className='mb-3 max-w-2xl font-Ovo'>
                I am a Frontend Developer with 5 years of experience in the geospacial industry.
                Having been born and raised in Scotland I have recently decided to relocate to Canada, and I am excited to continue my software engineering journey in North America.
                For more information about my profesional history, see the &apos;Experience&apos; section below.
           </p>
           <p className='mb-3 max-w-2xl font-Ovo'>
                Prior to Software engineering I obtained a Masters degree in Electrical and Mechanical Engineering. 
                I worked in the field across several industries for 3 years, however this experience made me realise I would prefer the fast paced nature of software engineering. 
          </p>
           <p>
                Outside of software engineering I enjoy playing guitar and performing stand up comedy.
            </p>

        </div>
      </div>
    </div>
  )
}

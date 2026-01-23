import { assets } from '../../assets/assets'
import Image from 'next/image'
import React from 'react'

export default function Contact() {
  return (
    <div id='contact' className='w-full px-[12%] py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")] bg-no-repeat bg-center bg-[length:90%_auto]'>
              <h4 className='text-center mb-2 text-lg font-Ovo'>Connect with me</h4>
      <h2 className='text-center text-5xl font-Ovo'>Get in touch</h2>
      <p className='text-center max-w-2xl mx-auto mt-5 mb-6 font-Ovo'>
        I&apos;d love to hear from you! Please contact me through one of the methods below!
      </p>
      <div>
        <div className='w-max flex items-center gap-2 mx-auto mb-2' >
          <Image src={assets.mail_icon} alt='' className='w-6' />
          anindya.gopal.b@gmail.com
        </div>
        <div className='w-max flex items-center gap-2 mx-auto mb-4' >
          <Image src={assets.mail_icon} alt='' className='w-6' />
          +1 (437) 463-8740
        </div>
          <div className='w-max flex items-center gap-2 mx-auto' >
          <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/anindya-bhattacharyya-a3b50167/'><Image src={assets.li_logo} alt='' className='w-28' /></a>
        </div>
          <Image src={assets.logo} alt='' className='w-36 mx-auto mb-2' />
      </div>
    </div>
  )
}

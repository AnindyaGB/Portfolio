import { serviceData } from '../../assets/assets'
import Image from 'next/image'
import React from 'react'

export default function Experience() {
  return (
    <div id='experience' className='w-full px-5 sm:px-10 lg:px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 text-lg font-Ovo'>Employment History</h4>
      <h2 className='text-center text-5xl font-Ovo'>Engineering Experience</h2>

      <div className='grid grid-cols-1 gap-6 my-10'>
        {serviceData.map(({icon, title, description, duties}, index) => (
          <div key={index} className='border border-gray-400 rounded-lg px-8 py-12'>
            <Image src={icon} alt='' className='w-30'/>
            <h3 className='text-lg my-4'>{title}</h3>
            <p className='text-sm  leading-5'>{description}</p>
            <ul className='list-disc px-4'>
            {duties?.map((duty, index) => (
              <li key={index} className='text-sm text-gray-600 leading-5'>{duty}</li>
            ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

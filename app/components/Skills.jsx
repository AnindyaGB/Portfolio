import React from 'react'
import Image from 'next/image'
import { assets, infoList } from '../../assets/assets'

export default function Skills() {
  return (
    <div id='skills' className='w-full px-5 sm:px-10 lg:px-[12%] py-10 scroll-mt-20'>  
        <h4 className='text-center mb-2 text-lg font-Ovo'>Skills</h4>
        <h2 className='text-center text-5xl font-Ovo'>Languages and Education</h2>
                    
        <div className='flex-1'>

            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-6 my-10'>
                {infoList.map(({icon, title, description}, index) => (
                    <li className='border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer' key={index}>
                        <Image src={icon} alt='title' className='w-7 mt-3'/>
                        <h3 className='my-4 font-semibold txt-gray-700'>{title}</h3>
                        <p className='text-gray-600 text-sm'>{description}</p>
                    </li>
                ))}
            </ul>
            </div>
    </div>
  )
}

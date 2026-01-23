import React from 'react'
import { assets, workData } from '../../assets/assets'
import Image from 'next/image'
export default function Projects() {
  return (
    <div id='projects' className='w-full px-[12%] py-10 scroll-mt-20'>
        <h4 className='text-center mb-2 text-lg font-Ovo'>My Portfolio</h4>
      <h2 className='text-center text-5xl font-Ovo'>Personal Projects</h2>

      <div className='grid grid-cols-2 my-10 gap-5'>
        {workData.map((project, index) => (
          <a href={project.link} key={index} >
            <div 
            className='aspect-square bg-no-repeat bg-cover bg-center rounded-lg
            relative cursor-pointer group'
            style={{backgroundImage: `url(${project.bgImage})`}}>
                <div className='bg-white w-10/12 rounded-md absolute bottom-5
                left-1/2 -translate-x-1/2 py-3 px-5 flex items-center
                justify-between duration-500 group-hover:bottom-7'>
                <div>
                    <h2 className='font-semibold'>{project.title}</h2>
                    <p className='text-sm text-gray-700'>{project.description}</p>
                </div>
                <div className='border rounded-full border-black w-9
                aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition'>
                    <Image src={assets.send_icon} alt='send icon'
                    className='w-5'/>
                </div>
                </div>
            </div>
            </a>
        ))}
      </div>
    </div>
  )
}

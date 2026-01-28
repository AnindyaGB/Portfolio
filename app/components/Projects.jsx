import React from 'react'
import { assets, workData, projects } from '../../assets/assets'
import Image from 'next/image'
import Cards from './Card';


export default function Projects() {
  return (
    <div id='projects' className='w-full px-5 sm:px-10 lg:px-[12%] py-10 scroll-mt-20'>
        <h4 className='text-center mb-2 text-lg font-Ovo'>My Portfolio</h4>
      <h2 className='text-center text-5xl font-Ovo'>Personal Projects</h2>

<Cards projects={projects}/>


    </div>
  )
}

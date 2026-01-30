import React from 'react'
import { projects } from '../../assets/assets'
import Cards from './Card';

export default function Projects() {
  return (
    <div id='projects' className='w-full px-5 sm:px-10 lg:px-[12%] py-10 scroll-mt-20'>
        <h4 className='text-center mb-1 text-xs uppercase tracking-widest text-gray-500 font-Ovo'>My Portfolio</h4>
      <h2 className='text-center text-5xl font-Ovo'>Personal Projects</h2>
<p className='text-center max-w-2xl mx-auto mt-5 mb-6 font-Ovo'>
        Select a Project Card to view details and try out a demo.
      </p>
<Cards projects={projects}/>


    </div>
  )
}

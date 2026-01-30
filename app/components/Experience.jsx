'use client'

import { serviceData } from '../../assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'

export default function Experience() {
  return (
    <section
      id="experience"
      className="w-full px-5 sm:px-10 lg:px-[12%] py-14 scroll-mt-20"
    >
      <h4 className="text-center mb-1 text-xs uppercase tracking-widest text-gray-500 font-Ovo">
        Employment History
      </h4>

      <h2 className="text-center text-3xl sm:text-4xl font-Ovo mb-12">
        Engineering Experience
      </h2>

      <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">
        {serviceData.map(({ icon, title, description, duties }, index) => (
          <ExperienceCard
            key={index}
            icon={icon}
            title={title}
            description={description}
            duties={duties}
          />
        ))}
      </div>
    </section>
  )
}


function ExperienceCard({ icon, title, description, duties }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="
        bg-white
        border border-gray-200
        rounded-xl
        p-7
      "
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 relative shrink-0">
          <Image
            src={icon}
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <h3 className="text-[15px] sm:text-base font-semibold text-gray-900 leading-tight">
          {title}
        </h3>
      </div>

      <p className="text-[13px] sm:text-sm text-gray-700 leading-relaxed mb-3">
        {description}
      </p>

      <div
        className={`
    overflow-hidden
    transition-all duration-300 ease-in-out
    ${expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
    sm:max-h-none sm:opacity-100
  `}
      >

        <ul className="list-disc list-inside space-y-1.5 mt-2">
          {duties?.map((duty, index) => (
            <li
              key={index}
              className="text-[13px] sm:text-sm text-gray-600 leading-relaxed"
            >
              {duty}
            </li>
          ))}
        </ul>
      </div>


      {duties?.length > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="
            sm:hidden
            mt-3
            text-sm
            text-blue-600/80 hover:text-blue-600
            font-medium
          "
        >
          {expanded ? 'Show less' : 'Show more'}        </button>
      )}
    </div>
  )
}

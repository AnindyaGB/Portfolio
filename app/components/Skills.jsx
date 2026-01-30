import React from 'react';
import Image from 'next/image';
import { infoList } from '../../assets/assets';

export default function Skills() {
  return (
    <div id="skills" className="w-full px-5 sm:px-10 lg:px-[12%] py-10 scroll-mt-20">
      
      <h4 className="text-center mb-1 text-xs uppercase tracking-widest text-gray-500 font-Ovo">
        Skills
      </h4>
      <h2 className="text-center text-5xl font-Ovo mb-10">
        Languages and Education
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {infoList.map(({ icon, title, description, skills }, index) => (
          <div
            key={index}
            className="border-[0.5px] border-gray-400 rounded-xl p-6 
                       hover:scale-105 hover:shadow-lg transition-transform duration-300"
            aria-label={title}
          >
            <div className="flex justify-center mb-4">
              <Image src={icon} alt={`${title} icon`} width={28} height={28} />
            </div>

            <h3 className="text-center mb-4 font-semibold text-gray-700">{title}</h3>

            <p className="text-center text-gray-600 text-sm mb-4">{description}</p>

            {skills && skills.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

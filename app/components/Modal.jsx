import React from "react";

export default function Modal({ isOpen, onClose, project }) {
  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm"      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full shadow-lg overflow-hidden relative"
         onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {project.title}
          </h3>
          {project.subtitle && (
            <h4 className="text-gray-600 mt-1">{project.subtitle}</h4>
          )}
          {project.text && (
            <p className="text-gray-700 mt-2">{project.text}</p>
          )}

            <ul className='list-disc px-4'>
            {project.features?.map((feature, index) => (
              <li key={index} className='text-sm text-gray-600 leading-5'>{feature}</li>
            ))}
            </ul>
          {/* Project Links */}
          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {project.links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium text-sm hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

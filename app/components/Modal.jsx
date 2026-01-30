import React from "react";
import Image from "next/image";

export default function Modal({ isOpen, onClose, project }) {
  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white
          rounded-2xl
          max-w-2xl
          w-full
          shadow-2xl
          relative
          animate-fadeInScale
          overflow-hidden
          max-h-[90vh] overflow-y-auto
        "
      >
        <button
          className="
            absolute top-4 right-4 z-20
            text-white bg-black/40
            hover:bg-black/60
            rounded-full w-8 h-8
            flex items-center justify-center
            transition
          "
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {project.image && (
          <div className="
  relative w-full
  h-40
  sm:h-48
  md:h-56
">
            <Image
              src={project.image}
              alt={project.title}
              layout="fill"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute bottom-4 left-6 right-6 space-y-2">
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                {project.title}
              </h3>

              {project.subtitle && (
                <p className="text-sm text-gray-200">
                  {project.subtitle}
                </p>
              )}

              {project.tags?.length > 0 && (
  <div className="flex flex-wrap gap-2 pt-2">
    {project.tags.map((tag, index) => (
      <span
        key={index}
        className="
          text-xs
          px-2.5 py-1
          rounded-full
          bg-gray-100
          text-gray-700
          border
        "
      >
        {tag}
      </span>
    ))}
  </div>
)}

            </div>

          </div>
        )}

        <div className="
  px-5 py-5
  sm:px-8 sm:py-6
  space-y-5
">          {!project.image && (
            <>
              <h3 className="text-2xl font-semibold text-gray-900">
                {project.title}
              </h3>

              {project.subtitle && (
                <p className="text-sm text-gray-500 mt-1">
                  {project.subtitle}
                </p>
              )}
            </>
          )}

          {project.text && (
            <p className="text-gray-700 leading-relaxed">
              {project.text}
            </p>
          )}

          {project.features?.length > 0 && (
            <ul className="space-y-2 list-disc list-inside">
              {project.features.map((feature, index) => (
                <li
                  key={index}
                  className="text-gray-600 text-sm"
                >
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {project.links?.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-4">
              {project.links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-5 py-2.5
                    rounded-lg
                    bg-blue-600
                    text-white
                    text-sm
                    font-medium
                    shadow-md
                    hover:bg-blue-700
                    hover:shadow-lg
                    transition-all
                  "
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

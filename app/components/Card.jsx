"use client";

import React, {Fragment, useState} from "react";
import Modal from "./Modal";

function Card({ project, onClick }) {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4 flex-shrink-0">
        <h5 className="text-lg font-semibold text-gray-900">{project.title}</h5>
        {project.subtitle && (
          <h6 className="text-gray-500 text-sm mt-1">{project.subtitle}</h6>
        )}
      </div>

      {project.image && (
        <div className="w-full flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-contain"
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        {project.text && <p className="text-gray-700 text-sm flex-grow">{project.text}</p>}
      </div>
    </div>
  );
}


export default function cards({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
<Fragment>

      <div className="grid gap-6 justify-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))] mt-8">
        {projects.map((project, index) => (
          <Card
            key={index}
            project={project}
            onClick={() => openModal(project)}
          />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} />
    </Fragment>
  );
}

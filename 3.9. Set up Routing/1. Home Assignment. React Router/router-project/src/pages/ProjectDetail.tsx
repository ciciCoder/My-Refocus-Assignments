import React, { useCallback, useMemo } from 'react';
import projectData from '../data/projects.json';
import { useParams } from 'react-router-dom';
import './ProjectDetail.css';

function ProjectDetail() {
  const { id } = useParams();
  const project = useMemo(
    () => projectData.find(data => data.id === Number(id)),
    [id]
  );

  const imgOnLoad: React.ReactEventHandler<HTMLImageElement> = useCallback(
    e => {
      const el = e.target;
      if (!(el instanceof HTMLImageElement)) return;
      el.classList.add('loaded');
    },
    []
  );

  return (
    <section className="ProjectDetail max-w-[1300px] flex gap-x-[40px] py-[54px] m-auto">
      <div className="flex flex-col w-[847px] gap-y-[20px]">
        {project?.profileImgs.map(img => (
          <div className="bg-slate-100">
            <img
              key={img}
              src={img}
              className="lazy-img"
              alt=""
              onLoad={imgOnLoad}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="flex flex-col gap-y-[18px] fixed">
          <span className="category">{project?.category}</span>
          <h2 className="title">{project?.title}</h2>
          <span className="share max-w-xs text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            eaque in deleniti voluptas, nam esse quas beatae provident sed
            voluptatibus.
          </span>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetail;

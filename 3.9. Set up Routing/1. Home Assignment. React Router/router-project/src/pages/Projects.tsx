import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './Projects.css';
import { useQuery } from '../hooks/useQuery';
import projectData from '../data/projects.json';
import { NavLink, NavLinkProps } from 'react-router-dom';

export function Projects() {
  const query = useQuery();
  const [limit, setLimit] = useState(9);
  const currenCategory = query.get('category');

  const projects = useMemo(() => {
    const list = projectData.filter(item => {
      const category = item.category.toLowerCase().replace(/[\s]/g, c => '-');
      return !currenCategory || category === currenCategory;
    });
    return list;
  }, [currenCategory]);

  const showMore = limit < projects.length;
  const limitedProjects = useMemo(() => {
    const list = [...projects];
    if (showMore) list.length = limit;
    return list;
  }, [projects, limit, showMore]);

  const imgOnLoad: React.ReactEventHandler<HTMLImageElement> = useCallback(
    e => {
      const el = e.target;
      if (!(el instanceof HTMLImageElement)) return;
      el.classList.add('loaded');
    },
    []
  );

  useEffect(() => {
    setLimit(9);
  }, [currenCategory]);

  const increaseLimit = () => {
    setLimit(p => p + 9);
  };

  const isActiveNavLink = (category: string) => {
    console.log(category === currenCategory);
    return category === currenCategory ? 'active-category' : '';
  };

  return (
    <section className="Projects max-w-[1330px] m-auto mt-[33px] pt-[48px] pb-[63px] flex flex-col items-center">
      <h2 className="h-project">Projects</h2>
      <h3 className="h-title mt-3">ALL PROJECTS</h3>
      <nav className="mt-[52px]">
        <ul className="flex justify-center gap-x-8 nav-link">
          <li>
            <NavLink className={isActiveNavLink('')} end to="/projects">
              All
            </NavLink>
          </li>
          <li>
            <NavLink
              className={isActiveNavLink('homes')}
              end
              to="/projects?category=homes"
            >
              Homes
            </NavLink>
          </li>
          <li>
            <NavLink
              className={isActiveNavLink('hotels')}
              end
              to="/projects?category=hotels"
            >
              Hotels
            </NavLink>
          </li>
          <li>
            <NavLink
              className={isActiveNavLink('restaurants')}
              end
              to="/projects?category=restaurants"
            >
              Restaurants
            </NavLink>
          </li>
          <li>
            <NavLink
              className={isActiveNavLink('high-rise-amenities')}
              end
              to="/projects?category=high-rise-amenities"
            >
              Hight Rise Amenities
            </NavLink>
          </li>
          <li>
            <NavLink
              className={isActiveNavLink('showrooms')}
              end
              to="/projects?category=showrooms"
            >
              Showrooms
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="grid grid-cols-3 mt-[36px]">
        {limitedProjects.map(project => (
          <div
            key={project.id}
            className="bg-slate-100 overflow-hidden catalog"
          >
            <NavLink to={`/projects/${project.id}`}>
              <img
                className="lazy-img"
                src={project.img}
                loading="lazy"
                onLoad={imgOnLoad}
                alt=""
              />
              <div className="catalog-content absolute top-0 z-10 w-full h-full flex flex-col items-center justify-center">
                <span className="catalog-title">{project.title}</span>
                <hr className="catalog-separator" />
                <span className="catalog-category">{project.category}</span>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
      {showMore && (
        <button
          className="btn-primary font-medium mt-[40px] mb-[32px] uppercase text-xs"
          onClick={increaseLimit}
        >
          show more
        </button>
      )}
    </section>
  );
}

export default Projects;

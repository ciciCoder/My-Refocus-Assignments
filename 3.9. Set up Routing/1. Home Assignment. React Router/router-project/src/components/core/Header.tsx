import React, { useMemo, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const locations = useMemo(() => {
    const paths = location.pathname.split('/').filter(path => path);
    let pathCache = '/';
    const pathMap = paths.map(path => {
      pathCache += `${path}/`;
      return {
        name: path,
        to: pathCache,
      };
    });
    return [{ name: 'home', to: '/' }, ...pathMap];
  }, [location]);

  const getRoute = (index: number) => {
    const paths = location.pathname.split('/');
    paths.splice(index + 1);
    return paths.join('/');
  };

  return (
    <header
      ref={headerRef}
      className="Header flex z-[50] text-xs px-20 h-[60px] bg-white items-center justify-between shadow-lg"
    >
      <nav className="logo min-w-[213px]">
        <NavLink to="/">
          <img
            src="https://designhq.net/wp-content/uploads/2018/07/designhq-logo-straight-12pad.png"
            alt=""
            width={118.14}
            height={90}
          />
        </NavLink>
      </nav>
      <nav className="">
        <ul className="flex gap-3">
          <li>
            <NavLink to="/" className="navlink">
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="navlink">
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className="navlink">
              PROJECTS
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav className="social w-[213px] flex gap-x-[5px]">
        {locations.map((item, index) => (
          <>
            {Boolean(index) && <span>&gt;</span>}
            <span>
              <NavLink to={item.to}>{item.name}</NavLink>
            </span>
          </>
        ))}
      </nav>
    </header>
  );
}

export default Header;

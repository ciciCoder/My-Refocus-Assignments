import React from 'react';
import './Header.css';
import { useLocation, NavLink, BrowserRouter } from 'react-router-dom';

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function NavLinks() {
  const location = useLocation();
  const navLinks = [
    { link: '', text: 'Home' },
    { link: '#blogs', text: 'Blogs' },
    { link: '#contactme', text: 'Contact Me' },
  ];
  return (
    <div className="Header w-full flex justify-end h-14 bg-orange-400 px-14">
      <nav className="flex items-center gap-4 text-white">
        {navLinks.map((navLink, idx) => (
          <NavLink
            key={idx}
            to={navLink.link}
            className={() => (location.hash === navLink.link ? 'active' : '')}
          >
            {navLink.text}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default function Header(props: HeaderProps) {
  return (
    <header {...props}>
      <BrowserRouter>
        <NavLinks {...props} />
      </BrowserRouter>
    </header>
  );
}

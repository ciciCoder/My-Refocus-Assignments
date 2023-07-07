import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="Footer w-full h-[184px] flex items-center">
      <ul className="flex items-center justify-around w-full text">
        <li>
          <span className="flex flex-col">INTERIOR DESIGN</span>
          <span>MANILA, PHILIPPINES</span>
        </li>
        <li>
          <span className="flex flex-col">INFO@DESIGNHQ.NET</span>
          <span>632.89214172</span>
        </li>
        <li className="font-light">
          <span className="flex flex-col">
            COPYRIGHT © 2005-2020 DESIGN HIRAYAMA+QUESADA. ALL RIGHTS RESERVED.
          </span>
          <span>FUELED BY TEKNIKULAY.</span>
        </li>
      </ul>
    </div>
  );
}

export default Footer;

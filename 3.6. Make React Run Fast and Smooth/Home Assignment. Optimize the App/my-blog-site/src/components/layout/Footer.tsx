import React from 'react';
import { MdFacebook } from 'react-icons/md';
import { AiFillTwitterCircle, AiOutlineInstagram } from 'react-icons/ai';

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Footer(props: FooterProps) {
  return (
    <footer
      {...props}
      className="w-full flex flex-col md:flex-row lg:flex-row justify-between h-60 md:h-36 lg:h-36 bg-orange-950 px-14 py-5 text-white"
    >
      <div className="text-left">
        <h3 className="text-amber-300 text-lg font-bold mb-3">
          Contact Information:
        </h3>
        <p className="text-sm">Email: example@example.com</p>
        <p className="text-sm">Phone: +1 123-456-7890</p>
        <p className="text-sm">
          Address: 1234 Street Name, City, State, Country
        </p>
      </div>
      <div className="social-media flex flex-col gap-3">
        <h3 className="text-left text-lg font-bold text-amber-300">
          Follow Us:
        </h3>
        <ul className="flex gap-3">
          <li>
            <a href="#">
              <MdFacebook className="text-4xl" />
            </a>
          </li>
          <li>
            <a href="#">
              <AiFillTwitterCircle className="text-4xl" />
            </a>
          </li>
          <li>
            <a href="#">
              <AiOutlineInstagram className="text-4xl" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

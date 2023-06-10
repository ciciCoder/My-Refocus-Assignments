import React from 'react';
// import './Main.css';
interface MainProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Main(props: MainProps) {
  const { children, ...attrs } = props;
  return (
    <main
      {...attrs}
      className="Main min-h-[calc(100vh-240px-56px)] md:min-h-[calc(100vh-144px-56px)] max-w-md sm:max-w-none w-full m-auto px-3 sm:px-14 py-4"
    >
      {children}
    </main>
  );
}

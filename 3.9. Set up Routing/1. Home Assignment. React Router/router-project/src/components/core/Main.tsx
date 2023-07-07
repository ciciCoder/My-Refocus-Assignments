import React from 'react';

type MainProps = {} & JSX.IntrinsicElements['div'];

function Main(props: MainProps) {
  const { children, ...attrs } = props;
  return (
    <main
      className="min-h-[calc(100vh-60px-184px)] overflow-x-hidden bg-slate-50"
      {...attrs}
    >
      {children}
    </main>
  );
}

export default Main;

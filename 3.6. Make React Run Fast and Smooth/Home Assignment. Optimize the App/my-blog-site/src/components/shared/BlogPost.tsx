import React from 'react';
import NoContent from './NoContent';

interface BlogPostProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function BlogPost(props: BlogPostProps) {
  const { children, ...attrs } = props;
  return (
    <>
      {(() => {
        if (Array.isArray(children) && !children.length)
          return <NoContent></NoContent>;
        return (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-7xl m-auto"
            {...attrs}
          >
            {children}
          </div>
        );
      })()}
    </>
  );
}

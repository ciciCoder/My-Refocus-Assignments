import React, { ReactNode } from 'react';

interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  author?: string;
  content?: string;
  date?: string;
  actions?: ReactNode;
}

const BlogCard = React.memo((props: BlogCardProps) => {
  const { title, author, content, date, actions, ...attrs } = props;
  return (
    <div className="card shadow-md border-0 bg-white" {...attrs}>
      <div className="card text-left px-3 pt-7 pb-3 flex flex-col justify-between">
        <div>
          <div className="card-title">{title}</div>
          <div className="card-subtitle">
            {new Date(date ?? '').toDateString()}
          </div>
          <hr className="divider" />
          <div className="card-subtitle">by {author}</div>
          <div className="card-caption">{content}</div>
        </div>
        <div className="flex gap-3">{actions}</div>
      </div>
    </div>
  );
});

export default BlogCard;

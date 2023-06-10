import React, { useCallback, useMemo } from 'react';
import NoContent from './NoContent';
import { profilerOnRender } from '../../utils';
import BlogCard from './BlogCard';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { IBlogPost, IBlogPostId } from '../../hooks/useBlogPost';
import Modal from './Modal';

interface BlogPostProps extends React.HTMLAttributes<HTMLDivElement> {
  blogposts: IBlogPost[];
  onShow?: (id: IBlogPostId) => void;
  onEdit?: (id: IBlogPostId) => void;
  onDelete?: (id: IBlogPostId) => void;
}

type BlogPostActionProps = React.HTMLAttributes<HTMLDivElement> & {
  onEdit: React.MouseEventHandler<HTMLButtonElement>;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
};

type BlogPostModalProps = React.HTMLAttributes<HTMLDivElement> & {
  blogpost?: IBlogPost;
  onClose?: () => void;
  onEdit?: (id: IBlogPostId) => void;
  onDelete?: (id: IBlogPostId) => void;
};

export const BlogPostModal = React.memo((props: BlogPostModalProps) => {
  const { blogpost, onEdit, onDelete, onClose, ...attrs } = props;
  const showModal = useMemo(() => !!blogpost, [blogpost]);
  const onEditHandler = useCallback(() => {
    if (!blogpost) throw new Error('no blogpost found');
    onEdit?.(blogpost.id);
  }, []);
  const onDeleteHandler = useCallback(() => {
    if (!blogpost) throw new Error('no blogpost found');
    onDelete?.(blogpost.id);
  }, []);
  return (
    <Modal
      show={showModal}
      onClose={onClose}
      className="bg-transparent max-w-md"
      {...attrs}
    >
      <BlogCard
        {...blogpost}
        actions={
          <BlogPostAction onEdit={onEditHandler} onDelete={onDeleteHandler} />
        }
      />
    </Modal>
  );
});

export const BlogPostAction = React.memo((props: BlogPostActionProps) => {
  const { onEdit, onDelete, ...attrs } = props;
  return (
    <div className="w-full grid grid-cols-2 gap-3" {...attrs}>
      <button
        onClick={onEdit}
        className="btn btn-warning flex items-center px-0 justify-center"
      >
        <AiFillEdit />
        Edit
      </button>
      <button
        onClick={onDelete}
        className="btn btn-danger flex items-center px-0 justify-center"
      >
        <AiOutlineDelete />
        Delete
      </button>
    </div>
  );
});

const BlogPost = React.memo((props: BlogPostProps) => {
  const { blogposts, onShow, onEdit, onDelete, ...attrs } = props;

  const showBlogHandler =
    (id: IBlogPostId): React.MouseEventHandler<HTMLDivElement> =>
    e => {
      if (!(e.target instanceof HTMLDivElement)) return;
      onShow?.(id);
    };

  return (
    <React.Profiler id="BlogPost-profiler" onRender={profilerOnRender}>
      {(() => {
        if (!blogposts.length) return <NoContent></NoContent>;
        return (
          <div
            // className="grid grid-cols-[repeat(auto-fill,minmax(0, 448px))] gap-3 max-w-7xl m-auto"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-7xl m-auto"
            {...attrs}
          >
            {blogposts.map(blogpost => (
              <BlogCard
                key={blogpost.id}
                {...blogpost}
                className="cursor-pointer"
                onClick={showBlogHandler(blogpost.id)}
                actions={
                  <BlogPostAction
                    onEdit={() => onEdit?.(blogpost.id)}
                    onDelete={() => onDelete?.(blogpost.id)}
                  />
                }
              />
            ))}
          </div>
        );
      })()}
    </React.Profiler>
  );
});

export default BlogPost;

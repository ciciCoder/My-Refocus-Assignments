import './App.css';
import 'animate.css';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import BlogPost from './components/shared/BlogPost';
import BlogCard from './components/shared/BlogCard';
import BlogForm from './components/shared/BlogForm';
import useBlogPost, {
  IBlogPost,
  IBlogPostUserInputs,
} from './hooks/useBlogPost';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import Modal from './components/shared/Modal';

function App() {
  const [blogPosts, blogPostDispatch] = useBlogPost();
  const [editBlogPostId, setEditBlogPostId] = useState<string>('');
  const [showBlogPostId, setShowBlogPostId] = useState<string>('');

  useEffect(() => {
    blogPostDispatch({ type: 'fetch' });
  }, [blogPostDispatch]);

  const storeBlog = useCallback(
    (inputs: IBlogPostUserInputs) => {
      blogPostDispatch({ type: 'store', payload: inputs });
    },
    [blogPostDispatch]
  );

  const getBlogPost = (id: IBlogPost['id']) =>
    blogPosts.find(item => item.id === id);

  const updateBlog = useCallback(
    (id: IBlogPost['id'], values: IBlogPostUserInputs) => {
      blogPostDispatch({ type: 'update', payload: [id, values] });
      setEditBlogPostId('');
      setEditBlogPostId('');
    },
    [blogPostDispatch]
  );

  const deleteBlog = useCallback(
    (id: string) => () => {
      blogPostDispatch({ type: 'delete', payload: id });
      setShowBlogPostId('');
      setEditBlogPostId('');
    },
    [blogPostDispatch]
  );

  const editHandler = (id: IBlogPost['id']) => () => {
    setEditBlogPostId(id);
    setShowBlogPostId('');
  };

  const cancelUpdate = useCallback(() => {
    setEditBlogPostId('');
  }, []);

  const blogPostShowHandler =
    (id: IBlogPost['id']): React.MouseEventHandler =>
    e => {
      if (!(e.target instanceof HTMLDivElement)) return;
      setShowBlogPostId(id);
    };

  const blogPostShowOnCloseHandler = () => {
    setShowBlogPostId('');
  };

  return (
    <div className="App">
      <Modal
        show={!!showBlogPostId}
        onClose={blogPostShowOnCloseHandler}
        className="bg-transparent max-w-md"
      >
        <BlogCard
          {...getBlogPost(showBlogPostId)}
          actions={
            <div className="w-full grid grid-cols-2 gap-3">
              <button
                onClick={editHandler(showBlogPostId)}
                className="btn btn-warning flex items-center px-0 justify-center"
              >
                <AiFillEdit />
                Edit
              </button>
              <button
                onClick={deleteBlog(showBlogPostId)}
                className="btn btn-danger flex items-center px-0 justify-center"
              >
                <AiOutlineDelete />
                Delete
              </button>
            </div>
          }
        />
      </Modal>
      <Header />
      <Main>
        <BlogForm
          editProps={getBlogPost(editBlogPostId)}
          onUpdate={updateBlog}
          onSubmit={storeBlog}
          onCancel={cancelUpdate}
        />
        <div className="divider"></div>
        <BlogPost>
          {blogPosts.map(blogpost => (
            <BlogCard
              key={blogpost.id}
              {...blogpost}
              className="cursor-pointer"
              onClick={blogPostShowHandler(blogpost.id)}
              actions={
                <div className="w-full grid grid-cols-2 gap-3">
                  <button
                    onClick={editHandler(blogpost.id)}
                    className="btn btn-warning flex items-center px-0 justify-center"
                  >
                    <AiFillEdit />
                    Edit
                  </button>
                  <button
                    onClick={deleteBlog(blogpost.id)}
                    className="btn btn-danger flex items-center px-0 justify-center"
                  >
                    <AiOutlineDelete />
                    Delete
                  </button>
                </div>
              }
            />
          ))}
        </BlogPost>
      </Main>
      <Footer />
    </div>
  );
}

export default App;

import './App.css';
import 'animate.css';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import BlogPost from './components/shared/BlogPost';
import BlogCard from './components/shared/BlogCard';
import BlogForm from './components/shared/BlogForm';
import useBlogPost, { IBlogPost } from './hooks/useBlogPost';
import { useCallback, useEffect, useState } from 'react';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import Modal from './components/shared/Modal';

function App() {
  const [blogPosts, blogPostDispatch] = useBlogPost();
  const [editBlogPostIndex, setEditBlogPostIndex] = useState<number>(-1);
  const [showBlogPostIndex, setShowBlogPostIndex] = useState<number>(-1);

  useEffect(() => {
    blogPostDispatch({ type: 'fetch' });
  }, [blogPostDispatch]);

  const storeBlog = (inputs: IBlogPost) => {
    blogPostDispatch({ type: 'store', payload: inputs });
  };

  const updateBlog = (index: number, values: IBlogPost) => {
    blogPostDispatch({ type: 'update', payload: { index, values } });
    setEditBlogPostIndex(-1);
    setEditBlogPostIndex(-1);
  };

  const deleteBlog = (index: number) => {
    console.log('delete');
    return () => {
      blogPostDispatch({ type: 'delete', payload: index });
      setShowBlogPostIndex(-1);
      setEditBlogPostIndex(-1);
    };
  };

  const editHandler = useCallback(
    (index: number) => {
      console.log('edit');
      return () => {
        setEditBlogPostIndex(index);
        setShowBlogPostIndex(-1);
      };
    },
    [setEditBlogPostIndex, setShowBlogPostIndex]
  );
  const cancelUpdate = () => {
    setEditBlogPostIndex(-1);
  };

  const blogPostShowHandler =
    (index: number): React.MouseEventHandler =>
    e => {
      if (!(e.target instanceof HTMLDivElement)) return;
      setShowBlogPostIndex(index);
    };

  const blogPostShowOnCloseHandler = () => {
    setShowBlogPostIndex(-1);
  };

  return (
    <div className="App">
      <Modal
        show={showBlogPostIndex > -1}
        onClose={blogPostShowOnCloseHandler}
        className="bg-transparent max-w-md"
      >
        <BlogCard
          {...blogPosts[showBlogPostIndex]}
          actions={
            <div className="w-full grid grid-cols-2 gap-3">
              <button
                onClick={editHandler(showBlogPostIndex)}
                className="btn btn-warning flex items-center px-0 justify-center"
              >
                <AiFillEdit />
                Edit
              </button>
              <button
                onClick={deleteBlog(showBlogPostIndex)}
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
          editProps={
            editBlogPostIndex > -1
              ? {
                  ...blogPosts[editBlogPostIndex],
                  index: editBlogPostIndex,
                }
              : undefined
          }
          onUpdate={updateBlog}
          onSubmit={storeBlog}
          onCancel={cancelUpdate}
        />
        <div className="divider"></div>
        <BlogPost>
          {blogPosts.map((blogpost, idx) => (
            <BlogCard
              key={idx}
              {...blogpost}
              className="cursor-pointer"
              onClick={blogPostShowHandler(idx)}
              actions={
                <div className="w-full grid grid-cols-2 gap-3">
                  {/* <button
                    onClick={editHandler(idx)}
                    className="btn btn-warning flex items-center px-0 justify-center"
                  >
                    <AiFillEdit />
                    Edit
                  </button>
                  <button
                    onClick={deleteBlog(idx)}
                    className="btn btn-danger flex items-center px-0 justify-center"
                  >
                    <AiOutlineDelete />
                    Delete
                  </button> */}
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

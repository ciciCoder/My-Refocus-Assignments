import './App.css';
import 'animate.css';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import BlogPost, {
  BlogPostAction,
  BlogPostModal,
} from './components/shared/BlogPost';
import BlogCard from './components/shared/BlogCard';
import BlogForm from './components/shared/BlogForm';
import useBlogPost, {
  IBlogPost,
  IBlogPostUserInputs,
} from './hooks/useBlogPost';
import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';
import Modal from './components/shared/Modal';
import SearchInput from './components/common/SearchInput';

function App() {
  const [blogPosts, blogPostDispatch] = useBlogPost();
  const [editBlogPostId, setEditBlogPostId] = useState('');
  const [showBlogPostId, setShowBlogPostId] = useState('');
  const [searchBlog, setSearchBlog] = useState('');
  const id = useId();

  const blogPostFilteredList = useMemo(() => {
    const searchRegex = new RegExp(searchBlog, 'i');
    return blogPosts.filter(
      blog => searchRegex.test(blog.title) || searchRegex.test(blog.author)
    );
  }, [blogPosts, searchBlog]);

  useEffect(() => {
    blogPostDispatch({ type: 'fetch' });
  }, [blogPostDispatch]);

  const storeBlog = useCallback(
    (inputs: IBlogPostUserInputs) => {
      blogPostDispatch({ type: 'store', payload: inputs });
    },
    [blogPostDispatch]
  );

  const getBlogPost = useCallback(
    (id: IBlogPost['id']) => blogPosts.find(item => item.id === id),
    [blogPosts]
  );

  const updateBlog = useCallback(
    (id: IBlogPost['id'], values: IBlogPostUserInputs) => {
      blogPostDispatch({ type: 'update', payload: [id, values] });
      setEditBlogPostId('');
      setEditBlogPostId('');
    },
    [blogPostDispatch]
  );

  const deleteBlog = useCallback(
    (id: string) => {
      blogPostDispatch({ type: 'delete', payload: id });
      setShowBlogPostId('');
      setEditBlogPostId('');
    },
    [blogPostDispatch]
  );

  const editBlog = useCallback((id: IBlogPost['id']) => {
    setEditBlogPostId(id);
    setShowBlogPostId('');
  }, []);

  const cancelUpdate = useCallback(() => {
    setEditBlogPostId('');
  }, []);

  const showBlog = useCallback((id: IBlogPost['id']) => {
    setShowBlogPostId(id);
  }, []);

  const closeModal = useCallback(() => {
    setShowBlogPostId('');
  }, []);

  const searchHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      setSearchBlog(e.target.value);
    },
    []
  );

  return (
    <div className="App">
      <Header />
      <Main>
        <BlogPostModal
          blogpost={getBlogPost(showBlogPostId)}
          onClose={closeModal}
          onEdit={editBlog}
          onDelete={deleteBlog}
        />
        <BlogForm
          editProps={getBlogPost(editBlogPostId)}
          onUpdate={updateBlog}
          onSubmit={storeBlog}
          onCancel={cancelUpdate}
        />

        <div className="divider"></div>
        <div className="flex justify-start max-w-[80rem] mx-auto mb-3">
          <SearchInput onChange={searchHandler} />
        </div>
        <BlogPost
          blogposts={blogPostFilteredList}
          onEdit={editBlog}
          onDelete={deleteBlog}
          onShow={showBlog}
        ></BlogPost>
      </Main>
      <Footer />
    </div>
  );
}

export default App;

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import Home from '../pages/Home';
import React from 'react';

const LazyAbout = React.lazy(() => import('../pages/About'));
const LazyProjects = React.lazy(() => import('../pages/Projects'));
const LazyProjectDetail = React.lazy(() => import('../pages/ProjectDetail'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<LazyAbout />} />
      <Route path="/projects" element={<LazyProjects />} />
      <Route path="/projects/:id" element={<LazyProjectDetail />} />
    </Route>
  )
);

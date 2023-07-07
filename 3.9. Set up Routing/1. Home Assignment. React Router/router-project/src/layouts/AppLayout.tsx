import React from 'react';
import Header from '../components/core/Header';
import Main from '../components/core/Main';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/core/Footer';

function AppLayout() {
  const location = useLocation();

  const isHome = location.pathname === '/';
  return (
    <div>
      <Header />
      <Main>
        <Outlet />
      </Main>
      {!isHome && <Footer />}
    </div>
  );
}

export default AppLayout;

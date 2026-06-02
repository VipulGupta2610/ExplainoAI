import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const AppLayout = () => {

  return (
    <div className="min-w-0 overflow-x-hidden">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default AppLayout;

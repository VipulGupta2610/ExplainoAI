import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './Layout/AppLayout';
import Home from './Pages/Home';
import GeneratePage from './Pages/GeneratePage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Features from './Pages/Features';
import Dashboard from './Pages/Dashboard';
import PricingPage from './Pages/PricingPage';

const App = () => {

const router = createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/GeneratePage/:userid",
        element:<GeneratePage/>
      },
      {
        path:"/PricingPage",
        element:<PricingPage/>
      },
      {
        path:"/user/Login",
        element:<Login/>
      },
      {
        path:"/Dashboard/:userid",
        element:<Dashboard/>
      },
      {
        path:"/Features",
        element:<Features/>
      },
      {
        path:"/user/Signup",
        element:<Signup/>
      },
    ]
  }
])

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

import React from 'react';

import Home from "../pages/Home/Home";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";

export const PrimarySiteRoutes = [
  {
    path: '/',
    label: 'Home',
    key: 'home',
    element: <>
      <Home />
    </>,
  },
  {
    path: '/about',
    label: 'About',
    key: 'about',
    element: <>
      <div>About</div>
    </>,
  },
  {
    path: '/contact',
    label: 'Contact',
    key: 'contact',
    element: <>
      <div>Contact</div>
    </>,
  },
  {
    path: '/dashboard',
    label: 'Dashboard',
    key: 'dashboard',
    element: <>
      <div>Dashboard</div>
    </>,
  }
];

export const SecondarySiteRoutes = [
  {
    path: '/sign-in',
    label: 'Sign In',
    key: 'sign-in',
    element: <>
      <SignIn />
    </>,
  },
  {
    path: '/sign-up',
    label: 'Sign Up',
    key: 'sign-up',
    element: <>
      <SignUp />
    </>,
  },
];
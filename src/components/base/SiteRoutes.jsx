import React from "react";

import Home from "../pages/Home/Home";

import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";

import Contact from "../pages/Contact/Contact";
import Dashboard from "../pages/Dashboard/Dashboard";

export const GuestRoutes = [
  {
    path: "/",
    label: "Home",
    key: "home",
    element: (
      <>
        <Home />
      </>
    ),
  },
  {
    path: "/about",
    label: "About",
    key: "about",
    element: (
      <>
        <div>About</div>
      </>
    ),
  },
  {
    path: "/contact",
    label: "Contact",
    key: "contact",
    element: (
      <>
        <Contact />
      </>
    ),
  },
];

export const AuthRoutes = [
  {
    path: "/sign-in",
    label: "Sign In",
    key: "sign-in",
    element: (
      <>
        <SignIn />
      </>
    ),
  },
  {
    path: "/sign-up",
    label: "Sign Up",
    key: "sign-up",
    element: (
      <>
        <SignUp />
      </>
    ),
  },
];

export const UserRoutes = [
  {
    path: "/dashboard",
    label: "Dashboard",
    key: "dashboard",
    element: (
      <>
        <Dashboard />
      </>
    ),
  },
  {
    path: "/catboard",
    label: "Catboard",
    key: "catboard",
    element: (
      <>
        <div>Catboard</div>
      </>
    ),
  },
];

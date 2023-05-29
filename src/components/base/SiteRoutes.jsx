import React from "react";

import Home from "../pages/Home/Home";

import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";

import Contact from "../pages/Contact/Contact";
import Dashboard from "../pages/Dashboard/Dashboard";

export const ROLE_ADMIN = 0xFA; // 250
export const ROLE_USER = 0xFB; // 251
export const ROLE_GUEST = 0xFC; // 252
export const ROLE_MODERATOR = 0xFD; // 253

export const FEATURE_AUTH = 0x15E; // 350

const SiteRoutes = [
  {
    path: "/",
    label: "Home",
    key: "home",
    element: (
      <>
        <Home />
      </>
    ),
    roles: [ROLE_GUEST],
    features: [],
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
    roles: [ROLE_GUEST],
    features: [],
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
    roles: [ROLE_GUEST],
    features: [],
  },
  {
    path: "/sign-in",
    label: "Sign In",
    key: "sign-in",
    element: (
      <>
        <SignIn />
      </>
    ),
    roles: [ROLE_GUEST],
    features: [FEATURE_AUTH],
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
    roles: [ROLE_GUEST],
    features: [FEATURE_AUTH],
  },
  {
    path: "/dashboard",
    label: "Dashboard",
    key: "dashboard",
    element: (
      <>
        <Dashboard />
      </>
    ),
    roles: [ROLE_USER],
    features: [],
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
    roles: [ROLE_USER],
    features: [],
  },
];

export default SiteRoutes;

export function getRoutesByRoles(roles) {
  let r = SiteRoutes.filter((route) => route.roles.some((role) => roles.includes(role)));
  // remove all routes that have features
  r = r.filter((route) => route.features.length === 0);
  return r;
}

export function getRoutesByFeatures(features) {
  return SiteRoutes.filter((route) =>
    route.features.some((feature) => features.includes(feature))
  );
}

export function getRoutesByRolesAndFeatures(roles, features) {
  return SiteRoutes.filter((route) => route.roles.some((role) => roles.includes(role)))
    .filter((route) => route.features.some((feature) => features.includes(feature)));
}

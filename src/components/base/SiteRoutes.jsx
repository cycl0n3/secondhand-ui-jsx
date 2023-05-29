import React from "react";

import Home from "../pages/Home/Home";

import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";

import Contact from "../pages/Contact/Contact";
import Dashboard from "../pages/Dashboard/Dashboard";

export const ROLE_ADMIN = "ADMIN";
export const ROLE_USER = "USER";
export const ROLE_GUEST = "GUEST";
export const ROLE_MODERATOR = "MODERATOR";

export const FEATURE_AUTH = "AUTH";

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

export function getAdminRoutes() {
  return SiteRoutes.filter((route) => route.roles.includes(ROLE_ADMIN))
    .filter((route) => !route.features.includes(FEATURE_AUTH));
}

export function getGuestRoutes() {
  return SiteRoutes.filter((route) => route.roles.includes(ROLE_GUEST))
    .filter((route) => !route.features.includes(FEATURE_AUTH));
}

export function getUserRoutes() {
  return SiteRoutes.filter((route) => route.roles.includes(ROLE_USER))
    .filter((route) => !route.features.includes(FEATURE_AUTH));
}

export function getModeratorRoutes() {
  return SiteRoutes.filter((route) => route.roles.includes(ROLE_MODERATOR))
    .filter((route) => !route.features.includes(FEATURE_AUTH));
}

export function getRoutesByRoles(roles) {
  return SiteRoutes.filter((route) => route.roles.some((role) => roles.includes(role)))
    .filter((route) => !route.features.includes(FEATURE_AUTH));
}

export function getRoutesByFeatures(features) {
  return SiteRoutes.filter((route) =>
    route.features.some((feature) => features.includes(feature))
  );
}

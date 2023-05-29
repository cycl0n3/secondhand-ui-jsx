import "./App.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import SiteLayout from "./components/base/SiteLayout";

import SiteRoutes from "./components/base/SiteRoutes";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<SiteLayout />}>
        <Route index element={SiteRoutes[0].element} />

        {SiteRoutes.slice(1).map((route) => (
          <Route key={route.key} path={route.path} element={route.element} />
        ))}

        <Route path="*" element={<div>404</div>} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

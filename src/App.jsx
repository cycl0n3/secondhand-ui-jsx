import "./App.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements, RouterProvider,
} from "react-router-dom";

import SiteLayout from "./components/_base/SiteLayout";

import {PrimarySiteRoutes, SecondarySiteRoutes} from "./components/_base/SiteRoutes";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<SiteLayout />}>
        <Route index element={PrimarySiteRoutes[0].element} />

        {PrimarySiteRoutes.slice(1).map((route) => (
          <Route key={route.key} path={route.path} element={route.element} />
        ))}

        {SecondarySiteRoutes.map((route) => (
          <Route key={route.key} path={route.path} element={route.element} />
        ))}

        <Route path="*" element={<div>404</div>} />
      </Route>
    )
  );

  return (<>
    <RouterProvider router={router} />
  </>);
}

export default App;

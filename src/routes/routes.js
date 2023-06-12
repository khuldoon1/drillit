import React from 'react';
import App from '../App';
import {
    createBrowserRouter,
  } from "react-router-dom";
const router = createBrowserRouter([
    {
      path: "/",
      element: (
      <App/>
      ),
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ]);

  export default router;

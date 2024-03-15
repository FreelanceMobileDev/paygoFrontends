import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PrivacyPolicy from './Components/PrivacyPolicyOther';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginComponent from './Components/LoginComponents';
import DashboardComponent from './Components/DashboardComponent';
import UserComponent from './Components/UserComponents';
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginComponent />,
  },
  {
    path:"/privacy",
    element:<PrivacyPolicy />
  },
  {
    path:"/dashboard",
    element:<DashboardComponent />
  },
  {
    path:"/user",
    element:<UserComponent />
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();

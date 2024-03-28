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
import CarLoanListingComponent from './Components/CarLoanListingComponent';
import ContactUsComponent from './Components/ContactUsComponent';
import AddBrandComponent from './Components/AddBrandComponent';
import AddCarComponent from './Components/AddCarComponent';
const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardComponent />,
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
  },
  {
    path:"/contact-us", 
    element:<ContactUsComponent/>
  },
  {
    path:"/add-brand",
    element:<AddBrandComponent/>
  },
  {
    path:"/add-car",
    element:<AddCarComponent/>
  },
  {
    path:"/insurance-loan",
    element:<CarLoanListingComponent/>
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();

import React from 'react';
import ReactDom from "react-dom/client"; 
import { RouterProvider } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PrivacyPolicy from './Components/PrivacyPolicyOther';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  createBrowserRouter
} from "react-router-dom";
import LoginComponent from './Components/LoginComponents';
import DashboardComponent from './Components/DashboardComponent';
import UserComponent from './Components/UserComponents';
import CarLoanListingComponent from './Components/insuranceLoanListing';
import ContactUsComponent from './Components/ContactUsComponent';
import AddBrandComponent from './Components/AddBrandComponent';
import AddCarComponent from './Components/AddCarComponent';
import ApprovedUserComponent from './Components/ApprovedUserComponent';
import FinancialLoanListing from './Components/FinancialLoanComponent';
import ClaimLodgeListing from './Components/ClaimLodgeListingComponent';
import FinancialLoanApprovedRejectListing from './Components/FinancialLoanApproveRejectComponent';
import InsuranceLoanApproveRejectList from './Components/insuranceLoanApproveRejectListing.js';
import BlockUserComponent from './Components/BlockUserComponent.js';
const AppComponent = () => {
  return (
    <>
        <Outlet />
    </>
  );
};  
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppComponent />,
    children: [
      {
        path: "/",
        element: <DashboardComponent />,
      },
      {
        path: "/approved-user",
        element: <ApprovedUserComponent />,
      },
      {
        path: "/dashboard",
        element: <DashboardComponent />,
      },
      { path: "/user", element: <UserComponent /> },
      {
        path: "/contact-us",
        element: <ContactUsComponent />,
      },
      {
        path:"/add-brand",
        element:<AddBrandComponent  />
      }
    ],

  },
]);




const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import PrivacyPolicy from "./Components/PrivacyPolicyOther";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginComponent from "./Components/LoginComponents";
import DashboardComponent from "./Components/DashboardComponent";
import UserComponent from "./Components/UserComponents";
import CarLoanListingComponent from "./Components/CarLoanListingComponent";
import ContactUsComponent from "./Components/ContactUsComponent";
import AddBrandComponent from "./Components/AddBrandComponent";
import AddCarComponent from "./Components/AddCarComponent";
import ApprovedUserComponent from "./Components/ApprovedUserComponent";
import FinancialLoanListing from "./Components/FinancialLoanComponent";
import ClaimLodgeListing from "./Components/ClaimLodgeListingComponent";
const AppComponent = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
const App = createBrowserRouter([
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
        path: "/user",
        element: <UserComponent />,
      },
      {
        path: "/contact-us",
        element: <ContactUsComponent />,
      },
      { path: "/add-brand", element: <AddBrandComponent /> },
      { path: "/add-car", element: <AddCarComponent /> },
    ],
  },
]);
const router = createBrowserRouter([
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
        path: "/user",
        element: <UserComponent />,
      },
      {
        path: "/contact-us",
        element: <ContactUsComponent />,
      },
      { path: "/add-brand", element: <AddBrandComponent /> },
      { path: "/add-car", element: <AddCarComponent /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


reportWebVitals();

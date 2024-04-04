import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PrivacyPolicy from './Components/PrivacyPolicyOther';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  BrowserRouter as Router,
  RouterProvider,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import LoginComponent from './Components/LoginComponents';
import DashboardComponent from './Components/DashboardComponent';
import UserComponent from './Components/UserComponents';
import CarLoanListingComponent from './Components/CarLoanListingComponent';
import ContactUsComponent from './Components/ContactUsComponent';
import AddBrandComponent from './Components/AddBrandComponent';
import AddCarComponent from './Components/AddCarComponent';
import ApprovedUserComponent from './Components/ApprovedUserComponent';
import FinancialLoanListing from './Components/FinancialLoanComponent';
import ClaimLodgeListing from './Components/ClaimLodgeListingComponent';
const App = createBrowserRouter([
  {
    path: "/",
    element: <DashboardComponent />,
 
  children: [
      {
        path:"/approved-user",
        element:<ApprovedUserComponent />
      }
 
]
},
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <RouterProvider router={App} />
</React.StrictMode>
);

reportWebVitals();

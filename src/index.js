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
  },
  {
    path:"/approved-user",
    element:<ApprovedUserComponent />
  }
]);
// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<DashboardComponent />} />
//       <Route path="/privacy" element={<PrivacyPolicy />} />
//       <Route path="/approved-user" element={<ApprovedUserComponent />} />
//       <Route path="/dashboard" element={<DashboardComponent />} />
//       <Route path="/user" element={<UserComponent />} />
//       <Route path="/contact-us" element={<ContactUsComponent />} />
//       <Route path="/add-brand" element={<AddBrandComponent />} />
//       <Route path="/add-car" element={<AddCarComponent />} />
//       <Route path="/insurance-loan" element={<CarLoanListingComponent />} />
//       <Route path="/finance-loan" element={<FinancialLoanListing />} />
//       <Route path="/claim-lodge" element={<ClaimLodgeListing />} />
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   </Router>
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <RouterProvider router={App} />
</React.StrictMode>
);

reportWebVitals();

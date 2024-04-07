import React from "react";
import ReactDom from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import PrivacyPolicy from "./Components/PrivacyPolicyOther";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  createBrowserRouter,
} from "react-router-dom";
import LoginComponent from "./Components/LoginComponents";
import DashboardComponent from "./Components/DashboardComponent";
import UserComponent from "./Components/UserComponents";
import CarLoanListingComponent from "./Components/insuranceLoanListing";
import ContactUsComponent from "./Components/ContactUsComponent";
import AddBrandComponent from "./Components/AddBrandComponent";
import AddCarComponent from "./Components/AddCarComponent";
import ApprovedUserComponent from "./Components/ApprovedUserComponent";
import FinancialLoanListing from "./Components/FinancialLoanComponent";
import ClaimLodgeListing from "./Components/ClaimLodgeListingComponent";
import FinancialLoanApprovedRejectListing from "./Components/FinancialLoanApproveRejectComponent";
import InsuranceLoanApproveRejectList from "./Components/insuranceLoanApproveRejectListing.js";
import BlockUserComponent from "./Components/BlockUserComponent.js";
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<DashboardComponent />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/approved-user" element={<ApprovedUserComponent />} />
      <Route path="/dashboard" element={<DashboardComponent />} />
      <Route path="/user" element={<UserComponent />} />
      <Route path="/contact-us" element={<ContactUsComponent />} />
      <Route path="/add-brand" element={<AddBrandComponent />} />
      <Route path="/add-car" element={<AddCarComponent />} />
      <Route path="/insurance-loan" element={<CarLoanListingComponent />} />
      <Route path="/finance-loan" element={<FinancialLoanListing />} />
      <Route path="/claim-lodge" element={<ClaimLodgeListing />} />
      <Route path="/insurance-loan-approve-reject" element={<InsuranceLoanApproveRejectList />} />
      <Route path="/finance-loan-approve-reject" element={<FinancialLoanApprovedRejectListing />} />
      <Route path="/block-user" element={<BlockUserComponent />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);
ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PrivacyPolicy from './Components/PrivacyPolicyOther';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
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
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

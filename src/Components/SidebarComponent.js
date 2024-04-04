import React from "react";
import { LOGO } from "../constants/constantMessages";
import { Link } from "react-router-dom";
const SidebarComponent = () => {
  return (
    <div className="sideBarComponent">
        <img className="logoSideBarComponent" src={LOGO} alt="sidebar logo" />
      <div className="main">
        <ul className="menu">
          <li>
            <Link to="/">
              <span> Home</span>
            </Link>
          </li>
          <li>
            <Link to="/approved-user"><span>Users</span></Link>
          </li>
          <li>
            <Link to="/user">
              {" "}
              <span> User Request</span>
            </Link>
          </li>
          <li>
            <Link to="/insurance-loan">
              {" "}
              <span> Insurance Request</span>
            </Link>
          </li>
          <li>
            <Link to="/insurance-loan-approve-reject"><span>Insurance Loan</span></Link>
          </li>
          <li>
            <Link to="/finance-loan"><span> Financial Request</span></Link>
          </li>
          <li>
            <Link to="/finance-loan-approve-reject"><span> Financial Loan</span></Link>
          </li>
        
          <li>
              <Link to="/contact-us"><span>Contact Us</span></Link>
          </li>
        
          <li>
            <Link to="/claim-lodge"><span> Claim Lodge Listing</span></Link>
          </li>
          <li>
            <Link to="/add-brand"><span>Add Brand</span></Link>
          </li>
          <li>
            <Link to="/add-car"><span>Add Models</span></Link>
          </li>
          <li>
           <Link><span>Add agent</span></Link>
          </li>
          <li>
           <Link> <span> Messages</span></Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarComponent;

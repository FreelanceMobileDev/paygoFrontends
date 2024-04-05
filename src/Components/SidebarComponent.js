import React, { useState } from "react";
import { LOGO } from "../constants/constantMessages";
import { Link, useLocation } from "react-router-dom";

const SidebarComponent = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const location = useLocation();

  const handleMenuItemClick = (menuName) => {
    setActiveMenu(menuName);
  };

  const isMenuItemActive = (menuPath) => {
    return location.pathname === menuPath ? "active-menu" : "inactive-menu";
  };

  return (
    <div className="sideBarComponent">
      <img className="logoSideBarComponent" src={LOGO} alt="sidebar logo" />
      <div className="main">
        <ul className="menu">
          <li className={isMenuItemActive("/")}>
            <Link to="/" onClick={() => handleMenuItemClick("/")}>
              <span> Home</span>
            </Link>
          </li>
          <li className={isMenuItemActive("/approved-user")}>
            <Link
              to="/approved-user"
              onClick={() => handleMenuItemClick("/approved-user")}
            >
              <span>Users</span>
            </Link>
          </li>
          <li className={isMenuItemActive("/user")}>
            <Link to="/user" onClick={() => handleMenuItemClick("/user")}>
              {" "}
              <span> User Request</span>
            </Link>
          </li>
          <li className={isMenuItemActive("/block-user")}>
            <Link
              to="/block-user"
              onClick={() => handleMenuItemClick("/block-user")}
            >
              <span>Block Users</span>
            </Link>
          </li>
          <li className={isMenuItemActive("/insurance-loan")}>
            <Link to="/insurance-loan">
              {" "}
              <span> Insurance Request</span>
            </Link>
          </li>
          <li className={isMenuItemActive("/insurance-loan-approve-reject")}>
            <Link to="/insurance-loan-approve-reject">
              <span>Insurance Loan</span>
            </Link>
          </li>
          <li className={isMenuItemActive("/finance-loan")}>
            <Link to="/finance-loan">
              <span> Financial Request</span>
            </Link>
          </li>
          <li className={isMenuItemActive("/finance-loan-approve-reject")}>
            <Link to="/finance-loan-approve-reject">
              <span> Financial Loan</span>
            </Link>
          </li>
          <li className={isMenuItemActive("/contact-us")}>
            <Link to="/contact-us">
              <span>Contact Us</span>
            </Link>
          </li>
          <li className={isMenuItemActive("/claim-lodge")}>
            <Link to="/claim-lodge">
              <span> Claim Lodge Listing</span>
            </Link>
          </li>
          <li className={isMenuItemActive("/add-brand")}>
            <Link to="/add-brand">
              <span>Add Brand</span>
            </Link>
          </li>
          <li className={isMenuItemActive("/add-car")}>
            <Link to="/add-car">
              <span>Add Models</span>
            </Link>
          </li>
          <li>
            <Link>
              <span>Add agent</span>
            </Link>
          </li>
          <li>
            <Link>
              {" "}
              <span> Messages</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarComponent;

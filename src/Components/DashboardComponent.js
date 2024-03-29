import React from "react";
import SidebarComponent from "./SidebarComponent";
const DashboardComponent = () => {
  return (
    <>
      <div className="header-container">
        <SidebarComponent />
        <div className="dashboard">
          <h1>Dashboard</h1>
          <div class="dashboard-menu-container">
          <div className="dashboard-menu">
                <div className="dashboard-menu-box">
                   <h1> User Approval Request </h1> 
                </div>
                <div className="dashboard-menu-box">
                    <h1> Loan Approval Request </h1>
                </div>
                <div className="dashboard-menu-box">
                    <h1> Total insurance</h1>
                </div>
                <div className="dashboard-menu-box">
                    <h1> Total Loan Approval</h1>
                </div>
                <div className="dashboard-menu-box">
                    <h1> Total Enquiry</h1>
                </div>
                <div className="dashboard-menu-box">
                    <h1> Total Car Insurance</h1>
                </div>
                <div className="dashboard-menu-box">
                    <h1> Total Cars</h1>
                </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardComponent;

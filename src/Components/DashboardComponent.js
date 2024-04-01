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
                <h1> User Approval Request <br/><br/>10</h1>
              </div>
              <div className="dashboard-menu-box">
                <h1> Loan Approval Request <br/><br/>10 </h1>
              </div>
              <div className="dashboard-menu-box">
                <h1> Total insurance <br/><br/>10</h1>
              </div>
              <div className="dashboard-menu-box">
                <h1> Total Loan Approval <br/><br/>10</h1>
              </div>
              <div className="dashboard-menu-box">
                <h1> Total Enquiry <br/><br/>10</h1>
              </div>
              <div className="dashboard-menu-box">
                <h1> Total Car Insurance <br/><br/>10</h1>
              </div>
              <div className="dashboard-menu-box">
                <h1> Total Cars <br/><br/>10</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardComponent;

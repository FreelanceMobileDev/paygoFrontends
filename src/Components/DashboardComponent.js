import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarComponent from "./SidebarComponent";
const DashboardComponent = () => {
  const [insuranceLoan,setInsuranceLoan] = useState([])
  const [approvedUser,setApprovedUser] = useState([])
  const [userRequest,setUserRequest] = useState([])
  const [approvedRejectedInsurance,setApprovedRejectedInsurance] = useState([])
  const [approvedRejectedFinance,setApprovedRejectedFinance] = useState([])
  const [requestFinance,setRequestFinance] = useState([])
  const [blockUser,setBlockUser] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const approvedUser = await axios.get(
          "http://13.127.84.202:3213/api/user/get-approved-user"
        );
        const blockUsers = await axios.get(
          "http://13.127.84.202:3213/api/get-block-user"
        );
        const insuranceLoanRequest = await axios.get(
          "http://13.127.84.202:3213/api/insurance/get-insurance"
        );
        const userRequests = await axios.get(
          "http://13.127.84.202:3213/api/user/list-user-details"
        );
        const approvedRejectedinsurance = await axios.get(
          "http://13.127.84.202:3213/api/insurance/get-approved-reject-insurance"
        );
        const AapprovedRejectedFinance = await axios.get(
          "http://13.127.84.202:3213/api/insurance/get-approved-reject-finance"
        );
        const financeRequest = await axios.get(
          "http://13.127.84.202:3213/api/insurance/get-financial-list"
        );
        console.log(approvedRejectedinsurance?.data?.data)
        setBlockUser(blockUsers?.data?.data)
        setApprovedUser(approvedUser?.data?.data)
        setApprovedRejectedInsurance(approvedRejectedinsurance?.data?.data)
        setUserRequest(userRequests?.data?.data);
        setInsuranceLoan(insuranceLoanRequest?.data?.data || []);
        setApprovedRejectedFinance(AapprovedRejectedFinance?.data?.data)
        setRequestFinance(financeRequest?.data?.data)
      } catch (error) {
        console.error("Error fetching insurance data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="header-container">
        <SidebarComponent />
        <div className="dashboard">
          <h1>Dashboard</h1>
          <div class="dashboard-menu-container">
            <div className="dashboard-menu">
              <div className="dashboard-menu-box">
                <h1> User Approval Request <br/><br/>{userRequest?.getUserCount}</h1>
              </div>
              <div className="dashboard-menu-box">
                <h1> Active Users <br/><br/>{approvedUser?.length}</h1>
              </div>
              <div className="dashboard-menu-box">
                <h1> Block Users <br/><br/>{blockUser?.length}</h1>
              </div>
              <div className="dashboard-menu-box">
                <h1> Insurance Loan Approval Request <br/><br/>{insuranceLoan?.length} </h1>
              </div>
              <div className="dashboard-menu-box">
                <h1> Total insurance <br/><br/>{approvedRejectedInsurance?.length}</h1>
              </div>
              <div className="dashboard-menu-box">
                <h1> Finance Loan Requests<br/><br/>{requestFinance?.length}</h1>
              </div>
              <div className="dashboard-menu-box">
                <h1> Finance Loan  <br/><br/>{approvedRejectedFinance?.length}</h1>
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

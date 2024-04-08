import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";

const FinancialLoanListing = () => {
  const [financialLoan, setFinancialLoan] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://13.127.84.202:3213/api/insurance/get-financial-list"
        );
        setFinancialLoan(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching insurance data:", error);
        // Optionally, set state to indicate error to the user
      }
    };
    fetchData();
  }, []);

  const handleShowUserInfo = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateStatus = async (user, status) => {
    try {
      await axios.put(
        `http://13.127.84.202:3213/api/insurance/update-financial-status?id=${user._id}`,
        { status }
      );
      const updatedFinancialLoan = financialLoan.map((item) =>
        item.id === user.id ? { ...item, status } : item
      );
      setFinancialLoan(updatedFinancialLoan);
    } catch (error) {
      console.error("Error updating financial status:", error);
      // Optionally, set state to indicate error to the user
    }
  };

  return (
    <div>
      <div className="header-container">
        <SidebarComponent />
        <div className="user-container">
          <h1>Finance Loans Request</h1>
          <div className="user-table-data">
            <Table
              striped
              bordered
              hover
              size="sm"
              style={{ borderRadius: "5px" }}
            >
              <thead>
                <tr>
                  <th>S.NO.</th>
                  <th>Name</th>
                  <th>Financial Loan Type</th>
                  <th>Loan Amount</th>
                  <th>Action</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {financialLoan.length === 0 ? (
                  <tr>
                    <td colSpan="6">No Request is available Right now</td>
                  </tr>
                ) : (
                  financialLoan.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user?.userId?.name}</td>
                      <td>{user?.loanType}</td>
                      <td>{user?.loanAmount}</td>
                      <td>
                        <Button
                          variant="success"
                          className="mr-2"
                          onClick={() => handleUpdateStatus(user, "approved")}
                        >
                          Approved
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleUpdateStatus(user, "rejected")}
                        >
                          Reject
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="secondary"
                          onClick={() => handleShowUserInfo(user)}
                        >
                          Loan Info
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Finance Loan Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <div className="drivingLicence">
                <img
                  className="drivingLicenceImage"
                  src={selectedUser?.tinRegistrationImage}
                  alt="Facial Picture"
                />
              </div>
              <p><strong>Loan Terms:</strong>{selectedUser?.loanTerms}</p>
              <p><strong>Loan Amount:</strong>{selectedUser?.loanAmount}</p>
              <p><strong>Reason For Loan:</strong>{selectedUser?.reasonForLoan}</p>
              <p><strong>Bank Account Number:</strong> {selectedUser?.accountNumber}</p>
              <p><strong>Bank Name:</strong> {selectedUser?.bankName}</p>
              <p><strong>Name:</strong> {selectedUser?.userId?.name}</p>
              <p><strong>Upload Id:</strong> {selectedUser?.uploadid}</p>
              <p><strong>Colletral:</strong> {selectedUser?.collateral}</p>
              <p><strong>Collateral Value ApprovedBy:</strong> {selectedUser?.collateralValueApprovedBy}</p>
              <p><strong>Reason For Loan:</strong> {selectedUser?.reasonForLoan}</p>
              <p><strong>Tin Number:</strong> {selectedUser?.tinNumber}</p>
              <p><strong>Company Name:</strong> {selectedUser?.companyName}</p>
              <p><strong>Address:</strong> {selectedUser?.address}</p>
              <p><strong>Employement Address:</strong> {selectedUser?.employementAddress}</p>
              <p><strong>Policy Number:</strong> {selectedUser?.policyNumber}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FinancialLoanListing;

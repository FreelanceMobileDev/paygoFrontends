import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import axios from "axios";
import { Table, Button, Modal, Dropdown } from "react-bootstrap";

const InsuranceLoanApproveRejectList = () => {
  const [insuranceLoan, setInsuranceLoan] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://13.127.84.202:3213/api/insurance/get-approved-reject-insurance"
        );
        console.log(response);
        setInsuranceLoan(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching insurance data:", error);
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
  return (
    <div>
      <div className="header-container">
        <SidebarComponent />
        <div className="user-container">
          <h1>Insurance Loans Request </h1>
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
                  <th>Mobile Number</th>
                  <th>Loan Term</th>
                  <th>Vehicle Value</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {insuranceLoan.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user?.userId?.name}</td>
                    <td>{user?.userId?.phoneNumber}</td>
                    <td>{user?.loanTerm}</td>
                    <td>{user?.vehicleValue}</td>
                    <td>
                      <Button
                        variant={
                          user.status === "rejected" ? "danger" : "success"
                        }
                        style={
                          user.status === "in_progress"
                            ? {
                                backgroundColor: "#FF914D",
                                borderColor: "#FF914D",
                                color: "white",
                              }
                            : {}
                        }
                      >
                        {user.status === "in_progress"
                          ? "In Progress"
                          : user.status === "approved"
                          ? "Approved"
                          : user.status === "rejected"
                          ? "Rejected"
                          : user.status}
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
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Insurance Loan Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="drivingLicence">
            <img
              className="drivingLicenceImage"
              src={selectedUser?.drivingLicenceImage}
              alt="Driving License"
            />
          </div>

          <p>
            <strong>Bank Account Number:</strong>{" "}
            {selectedUser?.bankAccountNumber}
          </p>
          <p>
            <strong>Bank Name:</strong> {selectedUser?.bankName}
          </p>
          <p>
            <strong>Name:</strong> {selectedUser?.userId?.name}
          </p>
          <p>
            <strong>Mobile Number:</strong> {selectedUser?.userId?.phoneNumber}
          </p>
          <p>
            <strong>Car Condition:</strong> {selectedUser?.carCondition}
          </p>
          <p>
            <strong>Color:</strong> {selectedUser?.color}
          </p>
          <p>
            <strong>Employment Address:</strong>{" "}
            {selectedUser?.employmentAddress}
          </p>
          <p>
            <strong>Engine No.:</strong> {selectedUser?.engineNo}
          </p>
          <p>
            <strong>Form Filled By:</strong> {selectedUser?.formFilledBy}
          </p>
          <p>
            <strong>Fuel Type:</strong> {selectedUser?.fuelType}
          </p>
          <p>
            <strong>Insurance Company:</strong> {selectedUser?.insuranceCompany}
          </p>
          <p>
            <strong>License Plate No:</strong> {selectedUser?.licensePlateNo}
          </p>
          <p>
            <strong>Loan Term:</strong> {selectedUser?.loanTerm}
          </p>
          <p>
            <strong>Vehicle Brand:</strong> {selectedUser?.vehicleBrand}
          </p>
          <p>
            <strong>Vehicle Libre:</strong> {selectedUser?.vehicleLibre}
          </p>
          <p>
            <strong>Vehicle Model:</strong> {selectedUser?.vehicleModel}
          </p>
          <p>
            <strong>Vehicle Name:</strong> {selectedUser?.vehicleName}
          </p>
          <p>
            <strong>Vehicle Registration No:</strong>{" "}
            {selectedUser?.vehicleRegistrationNo}
          </p>
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

export default InsuranceLoanApproveRejectList;

import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import axios from "axios";
import { Table, Button,Modal  } from "react-bootstrap";

const CarLoanListingComponent = () => {
  //Car loan Insurance
  const [insuranceLoan, setInsuranceLoan] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://13.234.27.39:3213/api/insurance/get-insurance"
        );
        console.log(response?.data);
        setInsuranceLoan(response?.data?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
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
          <h1>Insurance Loans</h1>
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
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {insuranceLoan.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user?.userId?.name}</td>
                    <td>{user?.userId?.phoneNumber}</td>
                    <td>
                      <Button
                        variant={`outline-${
                          user?.userId?.gender === "male" ? "warning" : "info"
                        }`}
                      >
                        {user?.userId?.gender === "male" ? "Male" : "Female"}
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => handleShowUserInfo(user)}
                      >
                        Show User Info
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
        <p>DrivingLicenceImage:<img src="https://imgd.aeplcdn.com/272x153/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-75.jpeg?isig=0&q=80"/></p>
          <p>Application Date : {selectedUser?.applicationDate.split("T")[0]}</p>
          <p>Bank Account Number : {selectedUser?.bankAccountNumber}</p>
          <p>Bank Name : {selectedUser?.bankName}</p>
          <p>Name: {selectedUser?.userId?.name}</p>
          <p>Mobile Number: {selectedUser?.userId?.phoneNumber}</p>
          <p>Car Condition :{selectedUser?.carCondition}</p>
          <p>Color :{selectedUser?.color}</p>
          <p>Employement Address :{selectedUser?.employmentAddress}</p>
          <p>Engine No. :{selectedUser?.engineNo}</p>
          <p>Form Filled By :{selectedUser?.formFilledBy}</p>
          <p>Fuel Type :{selectedUser?.fuelType}</p>
          <p>Insurance Company :{selectedUser?.insuranceCompany}</p>
          <p>License PlateNo :{selectedUser?.licensePlateNo}</p>
          <p>Loan Term :{selectedUser?.loanTerm}</p>
          <p>Vehicle Brand :{selectedUser?.vehicleBrand}</p>
          <p>Vehicle Libre :{selectedUser?.vehicleLibre}</p>
          <p>vehicle Model :{selectedUser?.vehicleModel}</p>
          <p>Vehicle Name :{selectedUser?.vehicleName}</p>
          <p>vehicle RegistrationNo :{selectedUser?.vehicleRegistrationNo}</p>
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
export default CarLoanListingComponent;

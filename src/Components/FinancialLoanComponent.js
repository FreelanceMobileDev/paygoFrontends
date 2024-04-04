import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import axios from "axios";
import { Table, Button, Modal, Dropdown } from "react-bootstrap";

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
      const response = await axios.put(
        `http://13.127.84.202:3213/api/insurance/update-financial-status?id=${user._id}`,
        { status }
      );
      const updatedFinancialLoan = financialLoan.map((item) =>
        item.id === user.id ? { ...item, status } : item
      );
      setFinancialLoan(updatedFinancialLoan);
    } catch (error) {
      console.error("Error updating financial status:", error);
    }
  };

  return (
    <div>
      <div className="header-container">
        <SidebarComponent />
        <div className="user-container">
          <h1>Finance Loans</h1>
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
                  <th>Loan Amount </th>
                  <th>Status</th>
                  <th>Action</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {financialLoan.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user?.userId?.name}</td>
                    <td>{user?.loanType}</td>
                    <td>{user?.loanAmount}</td>
                    <td>
                      <Button variant="primary">
                        {user?.status === "in_progress"
                          ? "In Progress"
                          : user?.status === "approved"
                          ? "Approved"
                          : user?.status === "rejected"
                          ? "Rejected"
                          : user?.status}
                      </Button>
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                          Actions
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              handleUpdateStatus(user, "in_progress")
                            }
                          >
                            In Progress
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleUpdateStatus(user, "approved")}
                          >
                            Approved
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleUpdateStatus(user, "rejected")}
                          >
                            Reject
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleShowUserInfo(user)}
                      >
                        View Details
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
        <Modal.Body>{/* Modal content here */}</Modal.Body>
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

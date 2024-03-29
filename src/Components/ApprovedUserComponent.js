import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import axios from "axios";
import { userLogo } from "../constants/constantMessages";
import { FaSearch } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap"; // Import Modal from react-bootstrap
import { Table } from "react-bootstrap";

const UserComponent = () => {
  const [userData, setUserData] = useState([]);
  const [userRequest, setUserRequest] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user details
  const [showDetailsModal, setShowDetailsModal] = useState(false); // State to control modal visibility

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://13.127.84.202:3213/api/user/get-approved-user"
      );
      setUserRequest(response?.data?.data?.getUserCount);
      setUserData(response?.data?.data?.getAllUser);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle showing user details
  const handleShowDetails = (user) => {
    setSelectedUser(user); // Set selected user details
    setShowDetailsModal(true); // Show modal
  };

  return (
    <div>
      <div className="header-container">
        <SidebarComponent />
        <div className="user-container">
          <div className="search-container">
            <h1>Approved User</h1>
            <div className="user-search-container">
              <input
                type="text"
                className="inputTextUserSearchField"
                placeholder="Search User"
                name="search"
              />
              <Button variant="primary">
                <FaSearch />
              </Button>
            </div>
          </div>
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
                {userData.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user?.name}</td>
                    <td>{user?.phoneNumber}</td>
                    <td>
                      {user?.gender === "male" ? (
                        <Button variant="outline-warning">Male</Button>
                      ) : (
                        <Button variant="outline-info">Female</Button>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleShowDetails(user)} // Pass user data to the function
                      >
                        Show Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal to display user details */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Mobile Number:</strong> {selectedUser.phoneNumber}</p>
              {/* Add more details as needed */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserComponent;

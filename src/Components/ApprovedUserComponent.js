import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import axios from "axios";
import { userLogo } from "../constants/constantMessages";
import { FaSearch } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";

const UserComponent = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [blockSuccess, setBlockSuccess] = useState(false); // State to track blocking success

  // Fetch user data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://13.127.84.202:3213/api/user/get-approved-user"
      );
      setUserData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle opening details modal
  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  // Function to handle opening confirmation modal for blocking user
  const handleOpenConfirmModal = (user) => {
    setSelectedUser(user);
    setConfirmModal(true);
  };

  // Function to handle blocking a user
  const handleBlockUser = async () => {
    try {
      // Call API to block user
      const response = await axios.put(
        `http://13.127.84.202:3213/api/block-user?id=${selectedUser?._id}`,
        { blockStatus: true }
      );
      // Set flag to indicate blocking success
      setBlockSuccess(true);
    } catch (error) {
      console.error("Error blocking user:", error);
    } finally {
      // Close confirmation modal
      setConfirmModal(false);
      // Show feedback modal
      setFeedbackModal(true);
    }
  };

  // Function to handle closing confirmation modal
  const handleCloseConfirmModal = () => {
    setConfirmModal(false);
  };

  // Function to handle closing feedback modal
  const handleCloseFeedbackModal = () => {
    setFeedbackModal(false);
    // Reset blocking success flag
    setBlockSuccess(false);
  };

  // Function to handle opening message popup
  const handleOpenMessagePopup = () => {
    setShowMessagePopup(true);
  };

  // Function to close message popup
  const handleCloseMessagePopup = () => {
    setShowMessagePopup(false);
  };

  return (
    <div>
      <div className="header-container">
        <SidebarComponent />
        <div className="user-container">
          <div className="search-container">
            <h1> User</h1>
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
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Action</th>
                  <th>Block User</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {userData?.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user?.name}</td>
                    <td>{user?.phoneNumber}</td>
                    <td>{user?.email}</td>
                    <td>
                      {user?.gender === "male"||"Male" ? (
                        <Button variant="outline-warning">Male</Button>
                      ) : (
                        <Button variant="outline-info">Female</Button>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleShowDetails(user)}
                      >
                        View Info
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleOpenConfirmModal(user)}
                      >
                        Block
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={handleOpenMessagePopup}
                      >
                        Message
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <img
                className="userImages"
                src={
                  selectedUser?.image ||
                  "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                }
              />
              {/* Render user details */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={confirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to block this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBlockUser}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={feedbackModal} onHide={handleCloseFeedbackModal}>
        <Modal.Body>
          {blockSuccess ? (
            <React.Fragment>
              <p>User Blocked Successfully</p>
              <Button variant="secondary" onClick={handleCloseFeedbackModal}>
                Close
              </Button>
            </React.Fragment>
          ) : (
            <p>Error blocking user. Please try again later.</p>
          )}
        </Modal.Body>
      </Modal>

      {showMessagePopup && (
        <Modal show={showMessagePopup} onHide={handleCloseMessagePopup}>
          <Modal.Header closeButton style={{ backgroundColor: "#FF914D" }}>
            <Modal.Title>Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>This functionality is in process.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseMessagePopup}
              style={{ backgroundColor: "#FF914D", border: "#FF914D" }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default UserComponent;

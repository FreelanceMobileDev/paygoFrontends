import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import axios from "axios";
import { userLogo } from "../constants/constantMessages";
import { FaSearch } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";

const BlockUserComponent = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  console.log(userData);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://13.127.84.202:3213/api/get-block-user"
      );
      setUserData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleOpenConfirmModal = (user) => {
    setSelectedUser(user);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
    window.location.reload();
  };

  const handleUnblockUser = async () => {
    try {
      const response = await axios.put(
        `http://13.127.84.202:3213/api/unblock-user?id=${selectedUser?._id}`,
        { blockStatus: false }
      );
      if (response.data.success) {
        setShowFeedbackModal(true);
        // Refetch data after successful unblocking
        fetchData();
      } else {
        console.error("Error unblocking user:", response.data.message);
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  return (
    <div>
      <div className="header-container">
        <SidebarComponent />
        <div className="user-container">
          <div className="search-container">
            <h1>Blocked User</h1>
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
                  <th>View Details</th>
                  <th>Unblock</th>
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
                      {user?.gender && (
                        <Button
                          variant={
                            user.gender.toLowerCase() === "male"
                              ? "outline-warning"
                              : "outline-info"
                          }
                        >
                          {user.gender}
                        </Button>
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
                        Unblock
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
              <p>
                <strong>Name:</strong> {selectedUser?.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser?.email}
              </p>
              <p>
                <strong>Is Verified:</strong> {selectedUser?.isVerified}
              </p>
              <p>
                <strong>Phone Number:</strong> {selectedUser?.phoneNumber}
              </p>
              <p>
                <strong>Country Code:</strong> {selectedUser?.countryCode}
              </p>
              <p>
                <strong>Gender:</strong> {selectedUser?.gender}
              </p>
              <p>
                <strong>Date Of Birth:</strong> {selectedUser?.dateOfBirth}
              </p>
              <p>
                <strong>Nationality:</strong> {selectedUser?.nationality}
              </p>
              <p>
                <strong>Education Status:</strong>{" "}
                {selectedUser?.educationStatus}
              </p>
              <p>
                <strong>Country:</strong> {selectedUser?.country}
              </p>
              <p>
                <strong>Current Address:</strong> {selectedUser?.currentAddress}
              </p>
              <p>
                <strong>Region:</strong> {selectedUser?.region}
              </p>
              <p>
                <strong>Zone:</strong> {selectedUser?.zone}
              </p>
              <p>
                <strong>City:</strong> {selectedUser?.city}
              </p>
              <p>
                <strong>Sub City:</strong> {selectedUser?.subCity}
              </p>
              <p>
                <strong>House Number:</strong> {selectedUser?.houseNumber}
              </p>
              <p>
                <strong>Land Line Number:</strong>{" "}
                {selectedUser?.landlineNumber}
              </p>
              <p>
                <strong>Father Name:</strong> {selectedUser?.fName}
              </p>
              <p>
                <strong>Mother Name:</strong> {selectedUser?.mName}
              </p>
              <p>
                <strong>Grand Father Name:</strong> {selectedUser?.gFName}
              </p>
              <p>
                <strong>Grand Mother Name:</strong> {selectedUser?.gMName}
              </p>
              <p>
                <strong>Marital Status:</strong> {selectedUser?.maritalStatus}
              </p>
              <p>
                <strong>Full Name of Spouse:</strong>{" "}
                {selectedUser?.fullNameOfSpouse}
              </p>
              <p>
                <strong>Total Family Number:</strong>{" "}
                {selectedUser?.totalFamilyNumber}
              </p>
              <p>
                <strong>Total Male Number:</strong>{" "}
                {selectedUser?.totalMaleNumber}
              </p>
              <p>
                <strong>Total Female Number:</strong>{" "}
                {selectedUser?.totalFemaleNumber}
              </p>
              <p>
                <strong>Type of Identification Card:</strong>{" "}
                {selectedUser?.typeOfIdentificationCard}
              </p>
              <p>
                <strong>Id Number:</strong> {selectedUser?.idNumber}
              </p>
              <p>
                <strong>Occupational Status:</strong>{" "}
                {selectedUser?.occupationalStatus}
              </p>
              <p>
                <strong>Income Nature:</strong> {selectedUser?.incomeNature}
              </p>
              <p>Facial Picture</p>

              <p>Identification Card</p>
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

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to unblock this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUnblockUser}>
            Unblock
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFeedbackModal} onHide={handleCloseFeedbackModal}>
        <Modal.Body>User unblocked successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFeedbackModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlockUserComponent;

import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import axios from "axios";
import { userLogo } from "../constants/constantMessages";
import { FaSearch } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { FaInfo,FaBan,FaMailBulk } from "react-icons/fa";
const UserComponent = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [blockSuccess, setBlockSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://13.127.84.202:3213/api/user/get-approved-user?page=${currentPage}&limit=10`
      );
      setUserData(response?.data?.data);
      setHasMorePages(response?.data?.data?.length === 10);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data whenever currentPage changes

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleOpenConfirmModal = (user) => {
    setSelectedUser(user);
    setConfirmModal(true);
  };

  const nextPage = () => {
    if (hasMorePages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const renderImages = (imageUrls) => {
    return imageUrls.split(",").map((url, index) => (
      <img className="userImages" key={index} src={url.trim()} alt={`Image ${index}`} />
    ));
  };
  const handleBlockUser = async () => {
    try {
      const response = await axios.put(
        `http://13.127.84.202:3213/api/block-user?id=${selectedUser?._id}`,
        { blockStatus: true }
      );
      setBlockSuccess(true);
    } catch (error) {
      console.error("Error blocking user:", error);
    } finally {
      setConfirmModal(false);
      setFeedbackModal(true);
    }
  };

  const handleCloseConfirmModal = () => {
    setConfirmModal(false);
  };

  const handleCloseFeedbackModal = () => {
    setFeedbackModal(false);
    setBlockSuccess(false);
    window.location.reload();
  };

  const handleOpenMessagePopup = () => {
    setShowMessagePopup(true);
  };

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
                       <FaInfo/>
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="light"
                        onClick={() => handleOpenConfirmModal(user)}
                      >
                        <FaBan   style={{
      color: "#ea0628",
    }}/>
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="Light"
                        style={{backgroundColor: "#fff"}}
                        onClick={handleOpenMessagePopup}
                      >
                        <FaMailBulk style={{color:"#193152"}}/>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div
            className="pagination-controls"
            style={{ textAlign: "right", marginRight: "20px" }}
          >
            <Button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </Button>
            &nbsp;
            <Button onClick={nextPage} disabled={!hasMorePages}>
              Next
            </Button>
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
              <p><strong>Facial Pictures:</strong></p>
              {renderImages(selectedUser.facialPicture)}

              <p><strong>Identification Cards:</strong></p>
              {renderImages(selectedUser.identificationCard)}
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

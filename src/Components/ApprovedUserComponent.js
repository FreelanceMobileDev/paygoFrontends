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
  const [showMessagePopup, setShowMessagePopup] = useState(false); // State for message popup

  console.log(userData)

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
  const handleShowDetails = (user) => {
    setSelectedUser(user)
    setShowDetailsModal(true)
  };

  // Function to handle blocking a user
  const handleBlockUser = async (user) => {
    try {
            const response = axios.put(`http://13.127.84.202:3213/api/block-user?id=${user?._id}`,{blockStatus:true})
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  // Function to handle opening message popup
  const handleOpenMessagePopup = () => {
    setShowMessagePopup(true); // Show message popup
  };

  // Function to close message popup
  const handleCloseMessagePopup = () => {
    setShowMessagePopup(false); // Close message popup
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
                {console.log(userData)}
                {userData?.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user?.name}</td>
                    <td>{user?.phoneNumber}</td>
                    <td>{user?.email}</td>
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
                        View Info
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleBlockUser(user)} // Call handleBlockUser function with user data
                      >
                        Block
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={handleOpenMessagePopup} // Open message popup
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
              <img className="userImages" src={selectedUser?.image||"https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"}/>
              <p><strong>Name:</strong> {selectedUser?.name}</p>
              <p><strong>Email:</strong> {selectedUser?.email}</p>
              <p><strong>Is Verified:</strong> {selectedUser?.isVerified}</p>
              <p><strong>Phone Number:</strong> {selectedUser?.phoneNumber}</p>
              <p><strong>Country Code:</strong> {selectedUser?.countryCode}</p>
              <p><strong>Gender:</strong> {selectedUser?.gender}</p>
              <p><strong>Date Of Birth:</strong> {selectedUser?.dateOfBirth}</p>
              <p><strong>Nationality:</strong> {selectedUser?.nationality}</p>
              <p><strong>Education Status:</strong> {selectedUser?.educationStatus}</p>
              <p><strong>Country:</strong> {selectedUser?.country}</p>
              <p><strong>Current Address:</strong> {selectedUser?.currentAddress}</p>
              <p><strong>Region:</strong> {selectedUser?.region}</p>
              <p><strong>Zone:</strong> {selectedUser?.zone}</p>
              <p><strong>City:</strong> {selectedUser?.city}</p>
              <p><strong>Sub City:</strong> {selectedUser?.subCity}</p>
              <p><strong>House Number:</strong> {selectedUser?.houseNumber}</p>
              <p><strong>Land Line Number:</strong> {selectedUser?.landlineNumber}</p>
              <p><strong>Father Name:</strong> {selectedUser?.fName}</p>
              <p><strong>Mother Name:</strong> {selectedUser?.mName}</p>
              <p><strong>Grand Father Name:</strong> {selectedUser?.gFName}</p>
              <p><strong>Grand Mother Name:</strong> {selectedUser?.gMName}</p>
              <p><strong>Marital Status:</strong> {selectedUser?.maritalStatus}</p>
              <p><strong>Full Name of Spouse:</strong> {selectedUser?.fullNameOfSpouse}</p>
              <p><strong>Total Family Number:</strong> {selectedUser?.totalFamilyNumber}</p>
              <p><strong>Total Male Number:</strong> {selectedUser?.totalMaleNumber}</p>
              <p><strong>Total Female Number:</strong> {selectedUser?.totalFemaleNumber}</p>
              <p><strong>Type of Identification Card:</strong> {selectedUser?.typeOfIdentificationCard}</p>
              <p><strong>Id Number:</strong> {selectedUser?.idNumber}</p>
              <p><strong>Occupational Status:</strong> {selectedUser?.occupationalStatus}</p>
              <p><strong>Income Nature:</strong> {selectedUser?.incomeNature}</p>
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

    
      {showMessagePopup && (
      <Modal show={showMessagePopup} onHide={handleCloseMessagePopup}>
      <Modal.Header closeButton style={{ backgroundColor: "#FF914D" }}>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This functionality is in process.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseMessagePopup}  style={{ backgroundColor:'#FF914D', border:'#FF914D'}}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
      )}
    </div>
  );
};

export default UserComponent;

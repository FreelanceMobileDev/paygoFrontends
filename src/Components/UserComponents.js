import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import axios from "axios";
import { userLogo } from "../constants/constantMessages";
import { FaSearch } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";

const UserComponent = () => {
  const [userData, setUserData] = useState([]);
  const [userRequest, setUserRequest] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://13.127.84.202:3213/api/user/list-user-details"
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

  const handleApprove = async (user) => {
    try {
      await axios.put("http://13.127.84.202:3213/api/user/update-user-status", {
        userId: user._id,
        isVerified: true,
      });
      // Filter out the approved user from userData array
      const updatedUserData = userData.filter((u) => u._id !== user._id);
      setUserData(updatedUserData);
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleReject = async (user) => {
    try {
      await axios.put("http://13.127.84.202:3213/api/user/update-user-status", {
        userId: user._id,
        isVerified: false,
      });
      // Filter out the rejected user from userData array
      const updatedUserData = userData.filter((u) => u._id !== user._id);
      setUserData(updatedUserData);
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };

  return (
    <div>
      <div className="header-container">
        <SidebarComponent />
        <div className="user-container">
          <div className="search-container">
            <h1>User Request</h1>
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
          <div className="user-container-logo">
            <div className="user-logo">
              <img src={userLogo} alt="User Logo" />
            </div>
            <div className="user-text">
              <b>{userRequest}</b> Total User Request
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
                      {user?.isVerified ? (
                        <Button
                          variant="success"
                          onClick={() => handleApprove(user)}
                        >
                          Approve
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="success"
                            onClick={() => handleApprove(user)}
                            style={{ marginRight: "5px" }}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleReject(user)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;

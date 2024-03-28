import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import { Table } from "react-bootstrap";
import axios from "axios";

const ContactUsComponent = () => {
    const [contactUs, setContactUs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3213/api/user/get-contact"
                );
                setContactUs(response?.data?.data || []);
            } catch (error) {
                setError("Error fetching user data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="header-container">
            <SidebarComponent />
            <div className="user-container">
                <h1>Contact Us </h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="user-table-data">
                        <Table striped bordered hover size="sm" style={{ borderRadius: "5px" }}>
                            <thead>
                                <tr>
                                    <th>S.NO.</th>
                                    <th>Title</th>
                                    <th>Email</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contactUs.map((contact, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{contact?.title}</td>
                                        <td>{contact?.email}</td>
                                        <td>{contact?.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactUsComponent;

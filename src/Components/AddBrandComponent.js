import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SidebarComponent from "./SidebarComponent";
import {  Table, Modal, Form, Button} from "react-bootstrap";
import { FaPen } from "react-icons/fa";

const AddBrandComponent = () => {
    const navigate = useNavigate();
    const [brands, setIBrands] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              "http://http://13.127.84.202/:3213/api/car/get-brand-name"
            );
            setIBrands(response?.data?.data || []);
          } catch (error) {
            console.error("Error fetching insurance data:", error);
          }
        };
        fetchData();
      }, []);
      const handleAddBrand = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(
            "http://http://13.127.84.202:3213/api/car/add-brand",
            { name: values.brandName } 
        );
        console.log("API Response:", response.data.data);
        setIBrands([...brands, response.data.data]); 
        setSubmitting(false);
        handleCloseModal();
          
    } catch (error) {
        console.error("Error adding brand:", error);
    }
      console.log("Form values:", values);
        setSubmitting(false);
        handleCloseModal();
    };
  return (
    <div>
      <div className="header-container">
        <SidebarComponent />
        <div className="user-container">
          <div className="search-container">
            <h1>Add Brand</h1>
          </div>
          <div className="add-brand">
            <button className="addBrandButton" onClick={handleAddBrand}> Add Brand</button>
          </div>
          <div className="user-table-data">
          <Table
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>S.NO.</th>
                  <th style={{ textAlign: "center" }}>Brand Name</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
              {brands.map((brand, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td style={{ textAlign: "center" }}>{brand?.name}</td>
                    <td style={{ textAlign: "center" }}><FaPen /></td>
                    </tr>
                    ))}
              </tbody>
              </Table>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Brand</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ brandName: "" }}
                        validationSchema={Yup.object({
                            brandName: Yup.string().required("Brand name is required"),
                        })}
                        onSubmit={handleSubmit}
                    >
                        <FormikForm>
                            <Form.Group controlId="brandName">
                                <Form.Label>Brand Name</Form.Label>
                                <Field
                                    as={Form.Control}
                                    type="text"
                                    name="brandName"
                                    placeholder="Enter brand name"
                                />
                                
                                <ErrorMessage name="brandName" component="div" className="text-danger" />
                            </Form.Group>
                            <br/>
                            <Button variant="primary" type="submit">
                                Add Brand
                            </Button>
                        </FormikForm>
                    </Formik>
                </Modal.Body>
            </Modal>
    </div>
  );
};
export default AddBrandComponent;

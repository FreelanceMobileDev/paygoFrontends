import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SidebarComponent from "./SidebarComponent";
import {  Table, Modal, Form, Button} from "react-bootstrap";
import { FaPen, FaTrash } from "react-icons/fa";

const AddBrandComponent = () => {
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              "http://13.127.84.202:3213/api/car/get-brand-name"
            );
            setBrands(response?.data?.data || []);
          } catch (error) {
            console.error("Error fetching brands:", error);
          }
        };
        fetchData();
      }, []);

    const handleAddBrand = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedBrand(null);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
      try {
          if (selectedBrand) {
              const response = await axios.put(
                  `http://13.127.84.202:3213/api/car/edit-brand-name?id=${selectedBrand._id}`,
                  { name: values.brandName }
              );
              const updatedBrand = response.data.data;
              setBrands(brands.map(brand => (brand._id === updatedBrand._id ? updatedBrand : brand)));
          } else {
              const response = await axios.post(
                  "http://13.127.84.202:3213/api/car/add-brand",
                  { name: values.brandName } 
              );
              setBrands([...brands, response.data.data]); 
          }
          setSubmitting(false);
          handleCloseModal();
      } catch (error) {
          console.error("Error adding/editing brand:", error);
      }
  };

    const handleEditBrand = (brand) => {
        setSelectedBrand(brand);
        setShowModal(true);
    };

    const handleDeleteBrand = async (brandId) => {
        try {
            await axios.delete(`http://13.127.84.202:3213/api/car/delete-brand?id=${brandId}`);
            setBrands(brands.filter(brand => brand._id !== brandId));
        } catch (error) {
            console.error("Error deleting brand:", error);
        }
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
          <Table>
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
                    <td style={{ textAlign: "center" }}>
                        <Button variant="primary" onClick={() => handleEditBrand(brand)}>
                            <FaPen />
                        </Button>
                        &nbsp;
                        <Button variant="danger" onClick={() => handleDeleteBrand(brand._id)}>
                            <FaTrash />
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
                    <Modal.Title>{selectedBrand ? 'Edit Brand' : 'Add New Brand'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ brandName: selectedBrand ? selectedBrand.name : '' }}
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
                                {selectedBrand ? 'Update Brand' : 'Add Brand'}
                            </Button>
                        </FormikForm>
                    </Formik>
                </Modal.Body>
            </Modal>
    </div>
  );
};
export default AddBrandComponent;

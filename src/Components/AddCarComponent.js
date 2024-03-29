import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SidebarComponent from "./SidebarComponent";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { FaPen } from "react-icons/fa";

const AddCarComponent = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalData, setShowModalData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://13.127.84.202:3213/api/car/get-brand-name"
        );
        const responseData = await axios.get(
          "http://13.127.84.202:3213/api/car/get-car-name"
        );
        console.log(response?.data?.data)
        console.log(responseData?.data?.data);
        setShowModalData(responseData?.data?.data || []);
        setBrands(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddModel = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://13.127.84.202:3213/api/car/add-model",
        {
          id: values.brandId,
          name: values.modelName,
        }
      );
      setSubmitting(false);
      handleCloseModal();
      const updatedBrandsResponse = await axios.get(
        "http://13.127.84.202:3213/api/car/get-brand-name"
      );
      setBrands(updatedBrandsResponse?.data?.data || []);
      navigate('http://13.127.84.202:3000/add-car', { replace: true });
    } catch (error) {
      console.error("Error adding model:", error);
    }
  };

  return (
    <div>
      <div className="header-container">
        <SidebarComponent />
        <div className="user-container">
          <div className="search-container">
            <h1>Add Model</h1>
          </div>
          <div className="add-brand">
            <button className="addBrandButton" onClick={handleAddModel}>
              {" "}
              Add Model
            </button>
          </div>
          <div className="user-table-data">
            <Table>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>S.NO.</th>
                  <th style={{ textAlign: "center" }}>Brand Name</th>
                  <th style={{ textAlign: "center" }}>Car Name</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(showModalData) &&
                  showModalData.map((brand, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td style={{ textAlign: "center" }}>
                        {brand?.brandId?.name}
                      </td>
                      <td style={{ textAlign: "center" }}>{brand?.name}</td>
                      <td style={{ textAlign: "center" }}>
                        <FaPen />
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
          <Modal.Title>Add New Model</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ brandId: "", modelName: "" }}
            validationSchema={Yup.object({
              brandId: Yup.string().required("Brand is required"),
              modelName: Yup.string().required("Model name is required"),
            })}
            onSubmit={handleSubmit}
          >
            <FormikForm>
              <Form.Group controlId="brandId">
                <Form.Label>Brand</Form.Label>
                <Field as={Form.Control} component="select" name="brandId">
                  <option value="">Select Brand</option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="brandId"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
              <Form.Group controlId="modelName">
                <Form.Label>Model Name</Form.Label>
                <Field
                  as={Form.Control}
                  type="text"
                  name="modelName"
                  placeholder="Enter model name"
                />
                <ErrorMessage
                  name="modelName"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Model
              </Button>
            </FormikForm>
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddCarComponent;

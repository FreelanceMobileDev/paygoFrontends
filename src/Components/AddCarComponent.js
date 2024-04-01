import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddModelModal from "./AddModelModal";
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
          "http://http://13.127.84.202:3213/api/car/get-brand-name"
        );
        console.log("====>>response", response);
        const responseData = await axios.get(
          "http://http://13.127.84.202:3213/api/car/get-car-name"
        );
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
        "http://http://13.127.84.202:3213/api/car/add-model",
        {
          id: values.brandId,
          name: values.modelName,
        }
      );
      setShowModalData(response?.data?.data)
      setSubmitting(false);
      handleCloseModal();
      const updatedBrandsResponse = await axios.get(
        "http://http://13.127.84.202:3213/api/car/get-brand-name"
      );
      console.log("====>>updatedBrandsResponse", updatedBrandsResponse);
      setBrands(updatedBrandsResponse?.data?.data || []);
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
      <AddModelModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        brands={brands}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddCarComponent;

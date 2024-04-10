import React, { useEffect, useState } from "react";
import axios from "axios";
import AddModelModal from "./AddModelModal";
import SidebarComponent from "./SidebarComponent";
import {  Table, Modal, Form, Button} from "react-bootstrap";
import { FaPen, FaTrash } from "react-icons/fa";

const AddCarComponent = () => {
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalData, setShowModalData] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandResponse = await axios.get(
          `http://13.127.84.202:3213/api/car/get-brand-name`
        );
        setBrands(brandResponse?.data?.data || []);

        const carResponse = await axios.get(
          `http://13.127.84.202:3213/api/car/get-car-name?page=${currentPage}&limit=10`
        );
        setShowModalData(carResponse?.data?.data || []);
        setHasMorePages(carResponse?.data?.data?.length == "10");
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleAddModel = () => {
    setSelectedModel(null);
    setShowModal(true);
  };

  const handleEditModel = (model) => {
    setSelectedModel(model);
    setShowModal(true);
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
  const handleDeleteModel = async (modelId) => {
    try {
      const response = await axios.delete(
        `http://13.127.84.202:3213/api/car/delete-car?id=${modelId}`
      );
      if (response.data.success) {
        setShowModalData(
          showModalData.filter((model) => model._id !== modelId)
        );
      } else {
        console.error("Error deleting model:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting model:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response;
      if (selectedModel) {
        response = await axios.put(
          `http://13.127.84.202:3213/api/car/edit-car-name?id=${selectedModel._id}`,
          {
            id: values.brandId,
            name: values.modelName,
          }
        );
        const updatedModel = response.data.data;
        setShowModalData(
          showModalData.map((model) =>
            model._id === updatedModel._id ? updatedModel : model
          )
        );
      } else {
        response = await axios.post(
          "http://13.127.84.202:3213/api/car/add-model",
          {
            id: values.brandId,
            name: values.modelName,
          }
        );
        setShowModalData([...showModalData, response.data.data]);
      }

      setSubmitting(false);
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error("Error adding/editing model:", error);
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
                  showModalData.map((model, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td style={{ textAlign: "center" }}>
                        {model?.brandId?.name}
                      </td>
                      <td style={{ textAlign: "center" }}>{model?.name}</td>
                      <td style={{ textAlign: "center" }}>
                        <Button
                          variant="primary"
                          onClick={() => handleEditModel(model)}
                        >
                          <FaPen />
                        </Button>
                        &nbsp;
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteModel(model._id)}
                        >
                          <FaTrash />
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

      <AddModelModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        brands={brands}
        handleSubmit={handleSubmit}
        selectedModel={selectedModel}
      />
    </div>
  );
};

export default AddCarComponent;

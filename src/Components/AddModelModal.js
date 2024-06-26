// AddModelModal.js

import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddModelModal = ({ showModal, handleCloseModal, brands, handleSubmit, selectedModel }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedModel ? "Edit Model" : "Add Model"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            brandId: selectedModel ? selectedModel.brandId._id : "",
            modelName: selectedModel ? selectedModel.name : "",
          }}
          validationSchema={Yup.object({
            brandId: Yup.string().required("Brand is required"),
            modelName: Yup.string().required("Model name is required"),
          })}
          onSubmit={handleSubmit}
        >
          <FormikForm>
            <Form.Group controlId="brandId">
              <Form.Label>Brand</Form.Label>
              <Field as="select" name="brandId" className="form-control">
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="brandId" component="div" className="text-danger" />
            </Form.Group>
            <Form.Group controlId="modelName">
              <Form.Label>Model Name</Form.Label>
              <Field
                as={Form.Control}
                type="text"
                name="modelName"
                placeholder="Enter model name"
              />
              <ErrorMessage name="modelName" component="div" className="text-danger" />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              {selectedModel ? "Update Model" : "Add Model"}
            </Button>
          </FormikForm>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddModelModal;

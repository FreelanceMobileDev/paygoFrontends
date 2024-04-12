
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HandleModal from "../constants/helper";

const AddMember = ({ close }) => {
    const navigate = useNavigate();
    const { open, setValues } = HandleModal()
    const formik = useFormik({
        initialValues: {
            emails: "",
            passwords: "",
            name: "",
            userType: "",
            number: "",
        },
        validationSchema: Yup.object({
            emails: Yup.string().required("Required"),
            passwords: Yup.string().required("Required"),
            userType: Yup.string().required("Required"),
            name: Yup.string().required("Required"),
            number: Yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post(
                    `http://13.127.84.202:3213/api/admin/create-admin`,
                    {
                        email: values?.emails,
                        password: values?.passwords,
                        name: values.name,
                        userType: values.userType,
                        mobileNumber: values.number.toString()
                    }
                );   
             alert("User created sucessfully.")
                close()
            } catch (error) {
                alert("This User Already exist")  
            }
        },
    });

    return (
        <Modal show={true}  >
            <Modal.Header closeButton onHide={() => { close() }}>
                <Modal.Title>Create Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ height: 470, width: '100%', alignSelf: 'center', justifyContent: 'center', display: 'flex', }}>
                    <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '90%', alignSelf: 'center', }}
                        onSubmit={formik.handleSubmit}>
                        <div>
                            <label className="inputTextModal" htmlFor="Name">Name</label>
                            <input
                                className="inputTextFieldModal"
                                type="text"
                                id="name"
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}/>
                            {formik.touched.name && formik.errors.name ? (
                                <div>{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="inputTextModal" htmlFor="email">Email</label>
                            <input
                                className="inputTextFieldModal"
                                type="text"
                                id="emails"
                                name="emails"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.emails}/>
                            {formik.touched.emails && formik.errors.emails ? (
                                <div>{formik.errors.emails}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="inputTextModal" htmlFor="email">User Type</label>
                            <select
                                className="inputTextFieldModal"
                                id="userType"
                                name="userType"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.userType}>
                                <option value="">Select...</option>
                                <option value="banks">Bank</option>
                                <option value="Admin"> Admin</option>
                                <option value="insurance">Insurance</option>
                            </select>

                            {formik.touched.userType && formik.errors.userType ? (
                                <div>{formik.errors.userType}</div>
                            ) : null}
                        </div>

                        <div>

                            <label className="inputTextModal" htmlFor="password">
                                Phone
                            </label>
                            <input
                                className="inputTextFieldModal"
                                type="number"
                                id="number"
                                name="number"
                                placeholder=""
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.number}
                            />
                            {formik.touched.number && formik.errors.number ? (
                                <div>{formik.errors.number}</div>
                            ) : null}
                        </div>

                        <div>

                            <label className="inputTextModal" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="inputTextFieldModal"
                                type="password"
                                id="passwords"
                                name="passwords"
                                placeholder=""
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.passwords}
                            />
                            {formik.touched.passwords && formik.errors.passwords ? (
                                <div>{formik.errors.passwords}</div>
                            ) : null}
                        </div>

                        <button className="loginButtonModal" type="submit" >
                            Submit
                        </button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}


export default AddMember
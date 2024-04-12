import React, { useState } from "react"
import { BASEURL } from "./constantMessages";
import axios from "axios";
const HandleModal = () => {
    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(0);
    const [tabData, setTabData] = useState([])
    const setValues = () => {
        setOpen(!open)
    }

    const handleTabClick = (index) => {
        setActiveTab(index);
        fetchData(index)
    };

    const fetchData = async (index) => {
        const endPoint = index === 1 ? "Admin" : index === 2 ? "insurance" : index === 3 ? "banks" : null
        try {
            const response = await axios.get(
                `${BASEURL}get-user-types?types=${endPoint}`
            );
            setTabData(response?.data?.data);

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return { open, setValues, activeTab, handleTabClick, tabData }


}

export default HandleModal
import React from "react";
import { LOGO } from "../constants/constantMessages";
import { Link } from "react-router-dom";
const SidebarComponent = () => {
    return (
        <div className="sideBarComponent">
                <div className="logoSideBarComponent">
                    <img src={LOGO} alt="sidebar logo"/>
                </div>
                <div className="main">
                    <ul className="menu">
                        <li>
                            
                                <span> Home</span>
                            
                        </li>
                        <li>
                           
                                <span> Users</span>
                            
                        </li>
                        <li>
                            
                                <span> User Request</span>
                            
                        </li>
                        <li>
                            
                                <span> Messages</span>
                            
                        </li>
                        <li>
                            
                                <span> Insurance Loan</span>
                            
                        </li>
                        <li>
                            
                                <span> Financial Loan</span>
                            
                        </li>
                        <li>
                            
                                <span> Add agent</span>
                            
                        </li>    
                        <li>
                            
                                <span> Premium Information</span>
                            
                        </li>                     
                    </ul>
                </div>
            
        </div>
    );
};

export default SidebarComponent;
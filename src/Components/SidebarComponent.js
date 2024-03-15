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
                            <Link to="/home">
                                <span> Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user">
                                <span> Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/messages">
                                <span> User Request</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/jobs">
                                <span> Messages</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/completed-jobs">
                                <span> Insurance Loan</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/support">
                                <span> Financial Loan</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings">
                                <span> Add agent</span>
                            </Link>
                        </li>    
                        <li>
                            <Link to="/settings">
                                <span> Premium Information</span>
                            </Link>
                        </li>                     
                    </ul>
                </div>
            
        </div>
    );
};

export default SidebarComponent;
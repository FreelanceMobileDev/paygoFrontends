import React from 'react';
import { Button } from "react-bootstrap";
const Tabs = ({ handleTabClick,activeTab}) => {
    const tabs = [
        {
          title: 'Users',
          // content: <div>This is the content of Tab 1.</div>
        },
        {
          title: 'Admin',
          // content: <div>This is the content of Tab 2.</div>
        },
        {
          title: 'Insurance',
          // content: <div>This is the content of Tab 3.</div>
        },
    
        {
          title: 'Bank',
          // content: <div>This is the content of Tab 3.</div>
        }
      ];

  return (
    <div className="tabs">
        {tabs.map((tab, index) => (
          <Button
            style={{ backgroundColor:index === activeTab? '#FF914D' :"lightgrey",
             borderWidth: 0, width: 150 ,
             borderRadius:0,
             borderTopLeftRadius:index === 0 ? 5 :0,
             borderBottomLeftRadius:index === 0 ? 5 :0,
             borderTopRightRadius:index === 3 ? 5 :0,
             borderBottomRightRadius:index === 3 ? 5 :0,
             color:'white'
            }}
            key={index}
            onClick={() => handleTabClick(index)}
            className={index === activeTab ? "active" : "tab"}>
            {tab.title}
          </Button>
        ))}
    </div>
  );
};

export default Tabs;
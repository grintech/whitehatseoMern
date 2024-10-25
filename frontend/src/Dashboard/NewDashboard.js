import React from "react";
import "./newdash.css";
import Sidebar from "./Sidebar";
import DashNav from "./DashNav";

const WEBSITE_URL = process.env.REACT_APP_FRONTEND;

const NewDashboard = () => {

  return (
    <>
      <div className="main_wrapper">
        <Sidebar  />

        <div className="main_content">
          <DashNav  />
          <div className="container-fluid">
            <h2 className="text-center py-4 mt-4">Dashboard </h2>
           <div className="mt-5 col-lg-4 col-11 mx-auto">
           <img className="w-100" src={`${WEBSITE_URL}/welcome.png`} />
           </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewDashboard;


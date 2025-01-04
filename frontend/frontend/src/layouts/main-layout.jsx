import React from "react";
import Outlet4Main from "./outlet";
import Header from "../core/header";
import Footer from "../core/footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;

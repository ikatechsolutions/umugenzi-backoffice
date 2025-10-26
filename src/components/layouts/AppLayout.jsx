import React from "react"
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";

const AppLayout = () => {
  return <div className="d-flex" style={{width: '100%'}}>
            <SideBar />
            {/* <div className="w-100" style={{ overflow: 'auto' }}>
              <Header />
              
              <Outlet />
              
            </div> */}

            <div className="w-100 d-flex flex-column min-vh-100" style={{ overflow: 'auto' }}>
              <Header />
              
              <div className="flex-grow-1 px-3 py-2">
                  <Outlet />
              </div>
              
              <Footer />

            </div>
            
        </div>;
}

export default AppLayout;
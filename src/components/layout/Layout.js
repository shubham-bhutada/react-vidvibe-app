import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import { Container } from "react-bootstrap";

const Layout = ({ Children }) => {
  const [sidebar, setSidebar] = useState(true);

  const handleToggleSidebar = () => setSidebar((value) => !value);
  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app_container">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app_main">
          {Children}
        </Container>
      </div>
    </>
  );
};

export default Layout;

import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./Components/Navbar.js";
import { Reviews } from "./Components/Reviews.js";
import { Create } from "./Components/Create.js";
import { DashBoard } from "./Components/Dashboard";

import { Row } from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <div
      className="App"
      style={{ minHeight: "100vh", backgroundColor: "#121212" }}
    >
      <NavBar />
      <Create />

      <Row className="mx-0 py-3">
        {window.location.pathname.includes("Home") ? (
          <Reviews />
        ) : (
          <DashBoard />
        )}
      </Row>
    </div>
  );
}

export default App;

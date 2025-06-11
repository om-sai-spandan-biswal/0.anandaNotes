import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const logout = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };
  return (
    <>
      <nav className="navbar sticky-top bg-body-tertiary">
        <div className="container-fluid navBox">
          <Link className="navbar-brand" to="/">
            <img src="/logo.png" alt="Logo" />
          </Link>
          <div className="d-flex" role="search">
            <Link to="/auth/resister">
              <button className="btn btn-primary btn-sm">Resister</button>
            </Link>
            {"/"}
            <Link to="/auth/login">
              <button className="btn btn-primary btn-sm">Login</button>
            </Link>
            <form onSubmit={(event) => logout(event)}>
              <button className="btn btn-primary btn-sm">Logout</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;

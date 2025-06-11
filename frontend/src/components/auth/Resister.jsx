import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Resister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const sendDataOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/resister", formData, {
        withCredentials: true,
      });
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };
  const inputHandler = (event) => {
    setFormData((preData) => ({
      ...preData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          sendDataOnSubmit(event);
        }}
      >
        <label htmlFor="username">Username</label>
        <br />
        <input
          id="username"
          name="username"
          onChange={(event) => {
            inputHandler(event);
          }}
          value={formData.username}
        />
        <br />
        <label htmlFor="email">email</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          onChange={(event) => {
            inputHandler(event);
          }}
          value={formData.email}
        />
        <br />
        <label htmlFor="passsword">Password</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          onChange={(event) => {
            inputHandler(event);
          }}
          value={formData.password}
        />
        <br />
        <button type="submit" className="btn btn-primary btn-sm p-2 m-3">
          Resister
        </button>
      </form>
    </div>
  );
}

export default Resister;

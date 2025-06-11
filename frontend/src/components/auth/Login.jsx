import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const sendDataOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/login", formData, {
        withCredentials: true,
      });
      setFormData({
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

export default Login;

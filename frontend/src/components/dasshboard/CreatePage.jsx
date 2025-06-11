import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./CreatePage.css";
import axios from "axios";

function CreatePage() {
  const navigate = useNavigate() ;
  const [formData, setFormData] = useState({
    title: "",
    note: "",
  });
  const sendDataOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/notes", formData,{
        withCredentials:true
      });
      alert(res.data.message)
      setFormData({
        title: "",
        note: ""
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/")
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
        <label htmlFor="title">Title</label>
        <br />
        <input
          id="title"
          name="title"
          onChange={(event) => {
            inputHandler(event);
          }}
          value={formData.title}
        /><br />
        <label htmlFor="note">Create a Note</label>
        <br />
        <textarea
          id="note"
          name="note"
          className="inputNote"
          onChange={(event) => {
            inputHandler(event);
          }}
          value={formData.note}
        />
        <br />
        <button type="submit" className="btn btn-primary btn-lg p-2 m-3">
          Give a Note...
        </button>
      </form>
    </div>
  );
}

export default CreatePage;

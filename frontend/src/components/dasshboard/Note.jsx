import React from "react";
import "./Note.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Note({ data, refreshNotes, curUser }) {
  const navigate = useNavigate();
  const deleteOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/notes/${data._id}`,
        {
          withCredentials: true,
        }
      );
      alert(res.data.message);
      refreshNotes();
    } catch (error) {
      console.log(`Error is : ${error}`);
    }
    navigate("/");
  };
  const isAuther = () => {
    return data.auther["email"] == curUser["email"];
  };

  return (
    <div className="note col-2">
      <div>
        {" "}
        <h5>-{data.title}-</h5>
        <p>" {data.note} "</p>
      </div>
      <div>
        <p>
          <i>:) @{data.auther["username"]}__</i>
        </p>
        {isAuther() ? (
          <>
            <button
              onClick={() => {
                navigate("/note/edit", { state: data });
              }}
              className="btn btn-outline-secondary btn-sm"
            >
              edit.
            </button>{" "}
            <form
              className="submit-btn"
              onSubmit={(event) => deleteOnSubmit(event)}
            >
              <button type="submit" className="btn btn-outline-danger btn-sm">
                delete
              </button>
            </form>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Note;

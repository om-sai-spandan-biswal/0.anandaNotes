import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Note from "./Note";
import "./Notes.css";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [curUser, setCurUser] = useState({
    username: "",
    email: "",
  });

  const fetchCrrUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/current-user", {
        withCredentials: true,
      });
      const {username,email} = res.data ;
      setCurUser({username,email});
    } catch (err) {
      console.log(`Fetching error user: ${err}`);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes", {
        withCredentials: true,
      });
      const cur = res.data;
      setNotes(res.data);
    } catch (err) {
      console.log(`Fetching error : ${err}`);
    }
  };

  useEffect(() => {
    fetchCrrUser();
    fetchNotes();
  }, []);

  return (
    <section className="notes">
      <Link to="/note/create">Create ...</Link>
      <div className="row">
        {notes.map((el, id) => {
          return (
            <Note
              refreshNotes={fetchNotes}
              curUser={curUser}
              key={id}
              data={el}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Notes;

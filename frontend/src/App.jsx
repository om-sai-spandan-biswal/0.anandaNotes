import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Notes from "./components/dasshboard/Notes";
import CreatePage from "./components/dasshboard/CreatePage";
import EditPage from "./components/dasshboard/EditPage";
import Resister from "./components/auth/Resister";
import Login from "./components/auth/Login";

function App() {
  return (
    <div className="d-flex flex-column">
      <main className="flex-fill">
        <Navbar />
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/note/create" element={<CreatePage />} />
          <Route path="/note/edit" element={<EditPage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/resister" element={<Resister />} />
        </Routes>

        <Footer />
      </main>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { getApi } from "../../utils/axios";
import SyncLoader from "react-spinners/SyncLoader";
import { useSelector } from "react-redux";
import { popAlert } from "../../utils/alert";
import { useNavigate } from "react-router-dom";

const AddNotes = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loader, setLoader] = useState(false);
  const id = useSelector((state) => state.auth.sid);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    getApi()
      .post(`/note/addNote/${id}`, {
        title,
        description,
      })
      .then((res) => {
        popAlert("Success!", "Note Added Successfuly", "success", "Ok").then(
          (res) => {
            navigate("/notes");
            setLoader(false);
          }
        );
      })
      .catch((err) => {
        popAlert("Error!", err.response.data.message, "error", "ok");
        setLoader(false);
      });
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Creating a note</h1>
      {loader ? (
        <div style={{ marginLeft: "45%", marginTop: "10%" }}>
          <SyncLoader color="green" size={60} />
        </div>
      ) : (
        <Container maxWidth="sm">
          <Box sx={{ height: "80vh" }}>
            <form onSubmit={handleSubmit} className="login-container">
              <label>Title</label>
              <br />
              <input
                type="text"
                placeholder="Add title here"
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <label>description</label>
              <br />
              <textarea
                placeholder="Add description here"
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <input type="submit" className="submit-btn" />
            </form>
          </Box>
        </Container>
      )}
    </div>
  );
};

export default AddNotes;

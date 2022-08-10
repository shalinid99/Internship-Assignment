import React, { useState } from "react";
import { getApi } from "../../utils/axios";
import { popAlert } from "../../utils/alert";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Adduser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sid, setsid] = useState("");
  const [loader, setLoader] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoader(true);
    getApi()
      .post("/user", {
        sid,
        email,
        password,
      })
      .then((res) => {
        popAlert("Success!", "User Added Successfully", "success", "Ok").then(
          (res) => {
            navigate("/users");
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
      <h1 style={{ textAlign: "center" }}>Add User</h1>
      {loader ? (
        <div style={{ marginLeft:"45%",marginTop:"40%" }}>
          <SyncLoader color="green" size={60} />
        </div>
      ) : (
        <Container maxWidth="sm">
          <Box sx={{ height: "40vh" }}>
            <form onSubmit={submitHandler} className="login-container">
              <label>Student ID</label>
              <input
                type="text"
                placeholder="Enter an unique ID"
                value={sid}
                onChange={(e) => setsid(e.target.value)}
              />

              <br />
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter a valid email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />

              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />

              <input
                type="submit"
                className="submit-btn"
                placeholder="sent email"
                style={{ cursor: "pointer", marginTop: "3rem" }}
              />
            </form>
          </Box>
        </Container>
      )}
    </div>
  );
};

export default Adduser;

import React, { useState, useEffect } from "react";
import { getApi } from "../../utils/axios";
import { popAlert } from "../../utils/alert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const UpdateUser = () => {
  const navigate = useNavigate();

  //get the state(id) from the redux store.
  const id = useSelector((state) => state.auth.userId);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getUser = () => {
      getApi()
        .get(`/user/${id}`)

        .then((res) => {
          setFirstName(res.data.name);
          setEmail(res.data.email);
        })
        .catch((err) => {
          popAlert("Error!", err.response.data.message, "error", "ok");
        });

      return () => {
        source.cancel();
      };
    };

    getUser();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    getApi()
      .patch(`/user/updateUser/${id}`, {
        firstName,
        lastName,
        email,
        dateOfBirth,
        mobile,
        status: false,
        password,
      })
      .then((res) => {
        popAlert("Success!", "User Updated Successfuly", "success", "Ok").then(
          (res) => {
            navigate("/notes");
          }
        );
      })
      .catch((err) => {
        popAlert("Error!", err.response.data.message, "error", "ok");
      });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Reset Profile</h1>
      <Container maxWidth="sm">
        <Box sx={{ height: "30vh" }}>
          <form onSubmit={submitHandler} className="login-container">
            {/* <label>student ID</label>
            <input
              type="text"
              placeholder="Enter a valid email address"
              value={sid}
              readOnly
            />
            <br />

            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter a valid email address"
              value={email}
              readOnly
            />
            <br /> */}

            <label>Password</label>
            <input
              type="text"
              placeholder="Reset Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />

            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />

            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />

            <label>Date of birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <br />

            <label>Mobile</label>
            <input
              type="number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <br />

            <input
              type="submit"
              className="submit-btn"
              style={{ cursor: "pointer", marginTop: "1rem" }}
            />
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default UpdateUser;

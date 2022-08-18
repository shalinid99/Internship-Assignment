import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { getApi } from "../../utils/axios";
import { popAlert } from "../../utils/alert";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

// import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    getApi()
      .post("/auth/login", { email, password })
      .then((res) => {
        const token = res.data.token;
        popAlert(
          "Success!",
          "You have successfully logged in to the system!",
          "success",
          "Ok"
        ).then((res) => {
          dispatch(authActions.login(token));
          navigate("/");
        });
      })
      .catch((err) => {
        popAlert("Error!", err.response.data.message, "error", "Ok");
      });
  };
  return (
    <Container maxWidth="sm" style={{backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius:"10px",marginTop:"15px",width:"550px"}}>
      <Box sx={{ height: "66vh" }} style={{width:"520px",padding:"2px" }}>
        <h1 style={{ textAlign: "center", fontSize: "3rem",fontWeight:"700",color:"white" }}>Login</h1>
        <p
          style={{
            textAlign: "center",
            marginTop: "-1.5rem",
            marginBottom:"1.8rem",
            letterSpacing: "0.5rem",
          }}
        >
          Welcome to  <span style={{ color: "gold" }}> one note</span>.
        </p>
        
        <form onSubmit={submitHandler} className="login-container">
          <label>Email Address</label>
          <br />
          <input
            type="email"
            placeholder="Enter a valid email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />

          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <input type="submit" className="submit-btn" />
        </form>
      </Box>
    </Container>
  );
};

export default Login;

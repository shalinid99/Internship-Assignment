import React from "react";
import { useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Users from "../users/Users";
import UpdateUser from "../users/UpdateUser";
import MyNotes from "../notes/MyNotes";
import Login from "../login/Login";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userType = useSelector((state) => state.auth.userType);
  const userStatus = useSelector((state) => state.auth.userStatus);

  return (
    <div className="home-container">
      {isLoggedIn ? (
        <button
          className="logout-btn"
          onClick={() => {
            dispatch(authActions.logout());
            navigate("/");
          }}
        >
          Logout
        </button>
      ) : (
        <>
          <button
            className="logout-btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
          <Login />
        </>
      )}

      {isLoggedIn && userType === "Admin" ? (
        <Users />
      ) : isLoggedIn && userType === "Student" && userStatus === true ? (
        <UpdateUser />
      ) : isLoggedIn && userType === "Student" && userStatus === false ? (
        <MyNotes />
      ) : (
        ""
      )}
      {/* {!isLoggedIn ? <Home /> : ""} */}
    </div>
  );
};

export default Home;

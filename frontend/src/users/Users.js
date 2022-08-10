import React, { useState, useEffect } from "react";
import { popAlert } from "../../utils/alert";
import { getApi } from "../../utils/axios";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";
import { useNavigate } from "react-router-dom";
import Popup from "../../common/Popup";
import { BiSearchAlt } from "react-icons/bi";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [key, setKey] = useState("");
  // const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(false);
  const [popBtn, setPopBtn] = useState(false);
  const [popupUser, setPopupUser] = useState({});

  useEffect(() => {
    setLoader(true);

    const source = axios.CancelToken.source();
    const getUsers = () => {
      getApi()
        .get(`/user/getAll`, {
          cancelToken: source.token,
        })
        .then((res) => {
          setUsers(res.data);

          setLoader(false);
        })
        .catch((err) => {
          popAlert("Error!", err.response.data.message, "error", "ok");
          setLoader(false);
        });

      return () => {
        source.cancel();
      };
    };

    getUsers();
  }, [key]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "2rem",
          marginLeft: "1rem",
        }}
      >
        <h1>User Details</h1>
        <div>
          <input
            placeholder="    search user"
            style={{
              width: "300px",
              height: "40px",
              border: "none",
              borderRadius: "5px",
              fontFamily: "poppins",
            }}
            onChange={(e) => setKey(e.target.value)}
          />
          <BiSearchAlt
            fontSize={35}
            style={{
              marginBottom: "-0.9rem",
              marginLeft: "1rem",
              cursor: "pointer",
            }}
          />
        </div>
        <button className="adduser-btn" onClick={() => navigate("/addUser")}>
          Add User
        </button>
      </div>

      {loader ? (
        <div className="loader">
          <SyncLoader color="green" size={60} />
        </div>
      ) : (
        <div className="grid-container">
          {users.map((user) => {
            return (
              <div key={user.sid}>
                <div
                  style={{ cursor: "pointer" }}
                  className="grid-item"
                  onClick={() => {
                    setPopBtn(true);
                    setPopupUser({
                      fname: user.firstName,
                      lname: user.lastName,
                      email: user.email,
                      dofb: user.dateOfBirth,
                      mobile: user.mobile,
                      sid: user.sid,
                      status: user.status,
                    });
                  }}
                >
                  <p>
                    <span style={{ fontWeight: "bold" }}>id </span> - {user.sid}
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>email </span> -
                    {user.email}
                  </p>
                  {user.status === true ? (
                    <p>
                      <span style={{ fontWeight: "bold" }}>status </span> -{" "}
                      <span style={{ color: "red" }}>not updated</span>
                    </p>
                  ) : (
                    <p>
                      {" "}
                      <span style={{ fontWeight: "bold" }}>status</span> -{" "}
                      <span style={{ color: "green" }}>updated</span>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Popup trigger={popBtn} setTrigger={setPopBtn}>
        <h2 style={{ textAlign: "center" }}>User Details</h2>
        <h3>
          <span style={{ fontWeight: "400" }}>Student ID -</span>{" "}
          {popupUser.sid}
        </h3>
        <h3>
          {" "}
          <span style={{ fontWeight: "400" }}>Email -</span> {popupUser.email}
        </h3>
        <h3>
          <span style={{ fontWeight: "400" }}>First Name -</span>{" "}
          {popupUser.fname}
        </h3>
        <h3>
          <span style={{ fontWeight: "400" }}>Last Name -</span>{" "}
          {popupUser.lname}
        </h3>
        <h3>
          <span style={{ fontWeight: "400" }}>Mobile -</span> {popupUser.mobile}
        </h3>
        <h3>
          <span style={{ fontWeight: "400" }}>Date of Birth -</span>{" "}
          {popupUser.dofb}
        </h3>
        <h3>
          {popupUser.status === true ? (
            <span style={{ fontWeight: "400" }}>Status - Not Updated</span>
          ) : (
            <span style={{ fontWeight: "400" }}>Status - Updated</span>
          )}
        </h3>
      </Popup>
    </div>
  );
};

export default Users;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getApi } from "../../utils/axios";
import { popAlert } from "../../utils/alert";
import SyncLoader from "react-spinners/SyncLoader";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import Popup from "../../common/Popup";
import { useNavigate } from "react-router-dom";

const MyNotes = () => {
  const id = useSelector((state) => state.auth.sid);
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loader, setLoader] = useState(false);
  const [popBtn, setPopBtn] = useState(false);
  const [updatebleNote, setUpdatebleNote] = useState({});
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");

  useEffect(() => {
    setLoader(true);

    const source = axios.CancelToken.source();

    const getNotes = () => {
      getApi()
        .get(`/note/getNotes/${id}`, { cancelToken: source.token })
        .then((res) => {
          setNotes(res.data);

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

    getNotes();
  }, [id]);

  const deleteNote = (id) => {
    getApi()
      .delete(`/note/deleteNote/${id}`)

      .then((res) => {
        popAlert("Success!", "Note Deleted", "success", "Ok");
        window.location.reload();
      })
      .catch((err) => {
        popAlert("Error!", err.response.data.message, "error", "ok");
      });
  };

  const updateNote = (e) => {
    e.preventDefault();

    getApi()
      .patch(
        `/note/updateNote/${updatebleNote.noteId}`,
        {
          sid: id,
          title: updateTitle,
          description: updateDescription,
        },
        window.location.reload()
      )
      .then((res) => {
        popAlert("Success!", "Note Updated Successfuly", "success", "Ok").then(
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
          gap: "2rem",
        }}
      >
        <h1 style={{ textAlign: "center" }}>My Notes</h1>
        <button className="adduser-btn" onClick={() => navigate("/addNote")}>
          Add Note
        </button>
      </div>
      {loader ? (
        <div className="loader">
          <SyncLoader color="green" size={60} />
        </div>
      ) : (
        <div className="grid-container-note">
          {notes.map((note) => {
            return (
              <div key={note._id} className="grid-item-note">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3>{note.title}</h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      gap: "1rem",
                      marginRight: "2rem",
                      cursor: "pointer",
                    }}
                  >
                    <AiFillEdit
                      fontSize={25}
                      onClick={() => {
                        setPopBtn(true);
                        setUpdatebleNote({
                          noteId: note._id,
                          title: note.title,
                          description: note.description,
                        });
                      }}
                    />
                    <AiFillDelete
                      fontSize={24}
                      color="red"
                      onClick={() => {
                        deleteNote(note._id);
                      }}
                    />
                  </div>
                </div>
                <p>{note.description}</p>
              </div>
            );
          })}
        </div>
      )}

      <Popup trigger={popBtn} setTrigger={setPopBtn}>
        <h2 style={{ textAlign: "center" }}>Update Note</h2>

        <form onSubmit={updateNote}>
          <label>Title</label>
          <input
            type="text"
            defaultValue={updatebleNote.title}
            onChange={(e) => setUpdateTitle(e.target.value)}
            className="pop-input"
          />
          <br />
          <br />
          <label>Description</label>
          <textarea
            type="textAria"
            defaultValue={updatebleNote.description}
            onChange={(e) => setUpdateDescription(e.target.value)}
            className="pop-textaria"
          />
          <br />
          <input style={{width:"95%",border:"none",height:"2rem",borderRadius:"10px"}} type="submit" className="submit-btn" />
        </form>
      </Popup>
    </div>
  );
};

export default MyNotes;

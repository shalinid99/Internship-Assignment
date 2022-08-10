import React from "react";
import "../assets/css.css";
import { MdCancel } from "react-icons/md";

export default function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <MdCancel
          color="red"
          fontSize="30px"
          className="close-btn"
          onClick={() => props.setTrigger(false)}
        >
          close
        </MdCancel>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

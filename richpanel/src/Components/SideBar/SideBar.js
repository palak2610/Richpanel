import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import {
  logout,
  selectUser
} from "../../userSlice";
import "./Sidebar.css";

function Sidebar({  }) {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();

  return (
    <div style={{backgroundColor:"blue",height:"99vh",width:"100%"}}>

      <div
        className="signout__button"
        style={{alignItems:"center",justifyContent:"center",width:132}}
        onClick={() => {
          dispatch(logout());
          history.push("/");
        }}
      >
        <img
          src={user?.profile_pic}
          width="50px"
          height="50px"
          onClick={() => history.push("/")}
          style={{ cursor: "pointer",backgroundColor:"white",borderRadius:100 }}
        />      
        </div>
    </div>
  );
}

export default Sidebar;

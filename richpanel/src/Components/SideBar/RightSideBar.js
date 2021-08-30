import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

import {
  logout,
  selectUser,
  selectConversationUser
} from "../../userSlice";
import "./Sidebar.css";

function RightSideBar({}) {
    const user = useSelector(selectUser);
    const conversationUser = useSelector(selectConversationUser);

    const dispatch = useDispatch();
    const history = useHistory();

  return (
    <div style={{
        backgroundColor:"#eff2f6",
        height:"99vh",
        width:"100%"
      }}
    >
      <div>
          {conversationUser ?
            <div style={{
                alignItems:"center",
                height:250,
                display:"flex",
                flexDirection:"column",
                backgroundColor:"white",
                justifyContent:"center"
              }}
            >
                <img
                    src={conversationUser?.profile_pic}
                    width="70px"
                    height="70px"
                    onClick={() => history.push("/")}
                    style={{ cursor: "pointer",backgroundColor:"white",borderRadius:100 }}
                />
                <h2 style={{margin:0,padding:0}}>{conversationUser?.first_name + " " + conversationUser?.last_name}</h2>
                <div style={{
                    justifyContent:"space-around",
                    flexDirection:"row",
                    display:"flex",
                    width:"100%",
                    marginTop:15
                  }}
                >
                    <Button variant="outlined">
                    <i style={{marginRight:5}} class="fas fa-phone-alt"></i>
                        Call
                    </Button>  
                    <Button variant="outlined">
                    <i  style={{marginRight:5}} class="fas fa-user-circle"></i>
                        Profile
                    </Button>  
                 </div>
            </div>:null}
      </div>

      <div style={{padding:15}}>
          {conversationUser ?
            <div style={{
                height:180,
                borderRadius:10,
                display:"flex",
                flexDirection:"column",
                backgroundColor:"white",
                padding:15
              }}
            >
                <h5 style={{margin:0,marginBottom:10}}>Customer Details</h5>
                <div style={{
                    justifyContent:"space-between",
                    flexDirection:"row",
                    display:"flex"
                  }}
                >
                    <p style={{margin:0}}>Email</p>
                    <p style={{margin:0,fontSize:18,fontWeight:"600"}}>{conversationUser?.email}</p>
                 </div>
                <div style={{justifyContent:"space-between",flexDirection:"row",display:"flex"}}>
                    <p >First Name</p>
                    <p style={{fontSize:18,fontWeight:"600"}}>{conversationUser?.first_name}</p>
                 </div>   
                 <div style={{justifyContent:"space-between",flexDirection:"row",display:"flex"}}>
                    <p style={{margin:0}}>Last Name</p>
                    <h6 style={{margin:0,fontSize:18,fontWeight:"600"}}>{conversationUser?.last_name}</h6>
                 </div>
                <p style={{margin:0,marginTop:15,color:"blue",fontWeight:"600"}}>View more details</p>
            </div>:null}
      </div>
    </div>
  );
}

export default RightSideBar;

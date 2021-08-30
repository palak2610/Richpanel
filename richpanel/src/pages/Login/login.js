import React, { Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import { useDispatch, useSelector } from "react-redux";
import Paper from '@material-ui/core/Paper';
import {db} from "../../utils/firebase"

import {
  login,
  selectUser,
} from "../../userSlice";

const Login = (props)=> {
    const dispatch = useDispatch();
  
  return (
    <div style={{
        justifyContent:"center",
        alignItems:"center",
        display:"flex",
        backgroundColor:"#f3f2ef",
        flex:1,
        height:"100vh",
        flexDirection:"column"
      }}>
      <div>
      <h1 style={{margin:0,textAlign:"left"}}>RichPanel</h1>
        <Paper style={{
            width:"fit-content",
            paddingRight:25,
            paddingLeft:25,
            borderRadius:5,
            marginTop:10,
            backgroundColor:"white",
            padding:10
          }}>
        <FacebookLogin
            appId="937286767001777"
            autoLoad={true}
            fields="name,email,picture"
            callback={(res)=>{
              if(res.status != "unknown"){
                dispatch(login(
                  {
                    id:"103077115416733",
                    profile_pic:"https://scontent.fblr2-1.fna.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-4&_nc_sid=12b3be&_nc_ohc=wv-sse0wPxIAX84SSQk&_nc_ht=scontent.fblr2-1.fna&edm=AP4hL3IEAAAA&oh=acbf5c325d8110e3d3d22a489a3961f5&oe=61383BB8"
                  }
                ));               
                 db.ref("richpanel/users/" + res.userID).update(res)
              }else{
                dispatch(login(
                  {
                    id:"103077115416733",
                    profile_pic:"https://scontent.fblr2-1.fna.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-4&_nc_sid=12b3be&_nc_ohc=wv-sse0wPxIAX84SSQk&_nc_ht=scontent.fblr2-1.fna&edm=AP4hL3IEAAAA&oh=acbf5c325d8110e3d3d22a489a3961f5&oe=61383BB8"
                  }
                ));
              }
            }} 
        />
      </Paper>
      </div>

    </div>
  );
}

export default Login;


 

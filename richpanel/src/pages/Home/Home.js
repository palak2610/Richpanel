import React, { useEffect,useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import SideBar from "../../Components/SideBar/SideBar"
import {db} from "../../utils/firebase";
import Messaging from '../../Components/Messaging/Messaging';
import {
  login,
  selectUser,
  setConversationUser,
  selectConversationUser
} from "../../userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const conversationUser = useSelector(selectConversationUser);
  const [allMessages,setAllMessages] = useState(null)
  const [res,setRes] = useState([])

  useEffect(() => {
    var temp = [];
    db.ref("richpanel/users/" + user?.id + "/messages").on("value",(snap)=>{
      console.log(snap.val())
      var dat = snap.val();
      var keys = Object.keys(dat);
      keys.forEach((id)=>{
         temp.push(
          <div 
            onClick={()=>{dispatch(setConversationUser(dat[id]))}} 
            style={{
              backgroundColor:conversationUser?.id == id ? "#edeeef" : "white",
              width:"100%",
              borderWidth:10,
              border:"2px solid #dfdde2",
              flex:1,
              cursor:'pointer',
              padding:10,
              paddingLeft:15
            }}
          >
            <h4 style={{margin:0,padding:0,marginBottom:5}}>{dat[id].first_name  + " " + dat[id].last_name}</h4>
            <h6 style={{margin:0,padding:0}}>Messenger DM</h6>
            <p style={{color:"#2E2E2E"}}>{dat[id]?.newMessage?.text}</p>
          </div>
         )
      })
      setRes(temp)
    })

  }, [])
  return (
    <div style={{width:"100%"}}>
      <Grid container>
        <Grid item xs={3} 
            style={{
              backgroundColor:"white",
              display:"flex",
              flex:1,
              flexDirection:"column",
              height:"100vh"
            }}
          >
          <div style={{width:"100%",borderWidth:10,border:"2px solid #dfdde2",flex:1}}>
            <h2 style={{textAlign:"center"}}>Conversations</h2>
          </div>
          <div style={{flex:9}}>
            {res}
          </div>
        </Grid>
        <Grid
          item
          xl={9}
          style={{
              backgroundColor:"#f6f6f7",
              display:"flex",
              flex:1,
              flexDirection:"column"
          }}
        >
          <div style={{
              width:"100%",
              borderWidth:10,
              border:"2px solid #dfdde2",
              flex:1,
              backgroundColor:"white"
            }}
          >
            <h2 style={{marginLeft:20}}>{conversationUser ? conversationUser.first_name  + " " + conversationUser.last_name : null}</h2>
          </div>
          <div style={{flex:9,padding:20}}>
          {conversationUser?.id ?
            <Messaging />
          :           
          <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3D103261008731677%26id%3D103077115416733&show_text=true&width=500" width="500" height="158" style={{border:"none",overflowY:"hidden"}} scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        }
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;


 

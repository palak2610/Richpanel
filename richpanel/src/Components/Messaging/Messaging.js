import React, { useEffect,useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {db} from "../../utils/firebase"
import {
  login,
  selectUser,
  setConversationUser,
  selectConversationUser
} from "../../userSlice";
import moment from "moment";



const Messaging = ({}) => {
  const user = useSelector(selectUser);
  const conversationUser = useSelector(selectConversationUser);
  const [res,setRes] = useState([])
  const [messageText,setMessageText] = useState("")

  useEffect(() => {
      if(conversationUser){
        db.ref("richpanel/users/" + user?.id + "/messages/" + conversationUser?.id + "/messaging").on("value",(snap)=>{
          if(snap.val()){
            var temp = [];
            var dat = snap.val();
            var keys = Object.keys(dat);
            keys.sort((a,b)=>{
                return dat[a].timestamp - dat[b].timestamp
            })
            var senderLastMessage =null,userLastMessage=null;
            keys.reverse().forEach((id)=>{
              if(dat[id].sender.id ==  conversationUser?.id && senderLastMessage == null){
                senderLastMessage = dat[id]
             }
             if(dat[id].sender?.id ==  user?.id && userLastMessage == null){
              userLastMessage= dat[id]
             }
               temp.push(
                <div style={{
                    justifyContent:dat[id].sender.id ==  conversationUser?.id ? "flex-start" : "flex-end",
                    display:"flex",alignItems:"center"
                  }}
                >
                  {dat[id].sender.id ==  conversationUser?.id && senderLastMessage?.timestamp == dat[id]?.timestamp ?
                    <img
                      src={conversationUser?.profile_pic}
                      width="40px"
                      height="40px"
                      style={{
                        backgroundColor:"white",
                        borderRadius:100,
                        marginRight:10 
                      }}
                    /> :
                    <div style={{
                          height:40,
                          width:40,
                          marginRight:10
                        }}
                    ></div>}

                    <div style={{
                        display:"flex",
                        flexDirection:"column"
                      }}
                    >
                      <Paper style={{
                          alignSelf:dat[id].sender.id ==  conversationUser?.id ? "flex-start" : "flex-end",
                          width:"fit-content",
                          paddingRight:25,
                          paddingLeft:25,
                          borderRadius:5,
                          marginTop:10,
                          backgroundColor:"white",
                          padding:10}}
                      >
                        <h4 style={{
                              margin:0,
                              padding:0,
                              marginBottom:5
                            }}>
                              {dat[id]?.message?.text}
                        </h4>
                      </Paper>

                      {dat[id].sender.id ==  conversationUser?.id && senderLastMessage?.timestamp == dat[id]?.timestamp ?
                        <p style={{
                            margin:0,
                            fontSize:12,
                            marginTop:5,
                            fontWeight:"400"
                          }}
                        >
                          {moment(dat[id].timestamp).format('MMM Do YY, h:mm a')}
                        </p>
                      :null}
                      
                      {dat[id].sender.id ==  user?.id && userLastMessage?.timestamp == dat[id]?.timestamp ?
                        <p style={{
                              margin:0,
                              fontSize:12,
                              marginTop:5,
                              fontWeight:"400"
                            }}
                        >
                          {moment(dat[id].timestamp).format('MMM Do YY, h:mm a')}
                        </p>
                      :null}
                    </div>
                    
                    {dat[id].sender.id ==  user?.id && userLastMessage?.timestamp == dat[id]?.timestamp ?
                    <img
                      src={user?.profile_pic}
                      width="40px"
                      height="40px"
                      style={{backgroundColor:"white",borderRadius:100,marginLeft:10 }}
                    />:<div style={{height:40,width:40,marginRight:10}}></div>}
                </div>  
               )
            })
            setRes(temp.reverse())
          }
        })
      }
  }, [conversationUser])

  const postMessage =async () =>{
    (async () => {
      fetch('https://richpanel-backend-fb.herokuapp.com/message/' + conversationUser?.id + '/messageText/' + messageText,)
    .then((response) => response.json())
    .then(async(responseJson) => {
        console.log(responseJson);
        await db.ref("richpanel/users/" + user?.id + "/messages/" + conversationUser?.id + "/messaging/").push().set(
          {
            message:{text:messageText},
            timestamp:moment().valueOf(),
            sender:{id:user?.id},
            recipient:{id:conversationUser?.id}
          })
        await db.ref("richpanel/users/" + user?.id + "/messages/" + conversationUser?.id + "/newMessage/").update({timestamp:moment().valueOf(),text:messageText});
        setMessageText("")
    })
    .catch(async(error) => {
        console.error(error);
        await db.ref("richpanel/users/" + user?.id + "/messages/" + conversationUser?.id + "/messaging/").push().set(
          {
            message:{text:messageText},
            timestamp:moment().valueOf(),
            sender:{id:user?.id},
            recipient:{id:conversationUser?.id}
          })
        await db.ref("richpanel/users/" + user?.id + "/messages/" + conversationUser?.id + "/newMessage/").update({timestamp:moment().valueOf(),text:messageText});
        setMessageText("")
    });



    })();   
  }
  return (
    <div style={{
        width:"100%",
        overflowY:"scroll",
        maxHeight:500
      }}
    >
      {res}
      {conversationUser ? 
      <div style={{
          position:"absolute",
          bottom:10,
          flexDirection:"row",
          display:"flex",
          width:"50%"
        }} 
      >
        <TextField 
          value={messageText}
          style={{width:"90%",marginRight:15}} 
          id="outlined-basic" label="" 
          variant="outlined" 
          onChange={(text)=>setMessageText(text.target.value)}
          placeholder={conversationUser ? ("message " + conversationUser?.first_name.toLowerCase() + " " + conversationUser?.last_name.toLowerCase()) : ""}
        />
        <Button onClick={()=>postMessage()} variant="contained" color="primary">
          SEND
      </Button>
        </div>:null}
    </div>
  );
}

export default Messaging;


 

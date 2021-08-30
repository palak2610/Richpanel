import React, { useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/login"
import Home from "./pages/Home/Home"
import {
  login,
  selectUser,
  selectConversationUser
} from "./userSlice";
import { Grid } from "@material-ui/core";
import SideBar from "./Components/SideBar/SideBar"
import RightSideBar from './Components/SideBar/RightSideBar';
function App() {
  const user = useSelector(selectUser);
  const conversationUser = useSelector(selectConversationUser);

  
  useEffect(() => {
    console.log(user)
  }, [user])

  function RoutesComp({comp}) {
    return (
      <Grid container>
        <Grid item xs={1} style={{backgroundColor:"#7E67F6"}}>
          <SideBar />
        </Grid>
        <Grid
          item
          xl={9}
          style={{display:"flex",flex:1 }}
          className="home__main"
        >
          {comp}
        </Grid>
        <Grid
          item
          xs={2}
        >
          <RightSideBar />
      </Grid>
  </Grid>
    )
  }
  return (
    <div>
      {!user ? 
        <Login /> : (
          <Router>
            <Switch>
              <Route exact path="/">
                <RoutesComp comp={<Home />} />
              </Route>
            </Switch>
        </Router>
        )}
    </div>
  );
}

export default App;


 

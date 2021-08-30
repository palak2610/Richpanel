import { createSlice } from "@reduxjs/toolkit";
/*
    user: {
      id:"103077115416733",
      profile_pic:"https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=4175870319171288&width=1024&ext=1631214511&hash=AeSlaY9aaoZtW53Ngoo"
    },

*/
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,    
    conversationsUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      console.log(action.payload);
      try {
        localStorage.setItem("user", action.payload);
      } catch (e) {
        console.log("userslice login error " + e);
      }
    },
    setConversationUser: (state, action) => {
      state.conversationsUser = action.payload;
      try {
        localStorage.setItem("conversationsUser", action.payload);
      } catch (e) {
        console.log("userslice login error " + e);
      }
    },


    logout: (state) => {
      state.user = null;
      localStorage.setItem("user", "");
    },
  },
});

export const {
  login,
  logout,
  setConversationUser
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectConversationUser = (state) => state.user.conversationsUser;


export default userSlice.reducer;

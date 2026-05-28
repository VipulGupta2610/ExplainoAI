import { createSlice } from "@reduxjs/toolkit"

const rawuser = localStorage.getItem("euser")
let parseduser = null

if (rawuser) {
    try {
         parseduser = JSON.parse(atob(rawuser))
    } catch (error) {
        console.log("Error at parsing user")
        localStorage.removeItem("euser")
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: parseduser
    },
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload
            const stringifiedUser = JSON.stringify(action.payload)
            const encodedUser = btoa(stringifiedUser)
            localStorage.setItem("euser", encodedUser)
        },
        logoutUser: (state, action) => {
            state.user = null
            localStorage.removeItem("euser")
        }
    }
})

export const {loginUser , logoutUser} = authSlice.actions;
export default authSlice.reducer
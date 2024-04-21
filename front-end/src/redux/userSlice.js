import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: "",
    email: "",
    user: "",
    first_name: "",
    last_name: "",
    avatar: "",
    address: "",
    phone: "",
    isAdmin: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            console.log(action.payload.user)
            state.email = action.payload.user.email
            state.user = action.payload.user.username
            state.id = action.payload.user.id
            state.first_name = action.payload.user.first_name
            state.last_name = action.payload.user.last_name
            state.avatar = action.payload.user.avatar
            // state.isAdmin = action.payload.user.role === "ADMIN" ? "ADMIN" : "USER"
            state.isAdmin = action.payload.user.role === "" ? "ADMIN" : "ADMIN"
        },
        logoutRedux: (state, action) => {
            state.email = ""
            state.user = ""
            state.id = ""
            state.first_name = ""
            state.last_name = ""
            state.avatar = ""
            localStorage.removeItem('accessToken')
        },
        upDateRedux: (state, action) => {
            // console.log("ACTION PAYLOAD:", action.payload.data)
            if (action.payload) {
                state.phone = action.payload.phone
                state.email = action.payload.email
                state.first_name = action.payload.first_name
                state.user = action.payload.username
                // state.id = action.payload.id
                state.last_name = action.payload.last_name
                state.address = action.payload?.address
                state.isAdmin = action.payload.user.role === "" ? "ADMIN" : "ADMIN"
                // state.isAdmin = action.payload.user.role === "ADMIN" ? "ADMIN" : "USER"
            }
        }
    }
})

export const { loginRedux, logoutRedux, upDateRedux } = userSlice.actions

export default userSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
    name: 'user-list',
    initialState: {
        loading: false,
        error: null,
        users:[],
    },
    reducers: {
        userListRequest(state) {
            state.loading = true;

        },
        userListSuccess(state, action) {
            state.loading = false;
            state.users = action.payload;
        },
        userListFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        userListReset(state, action) {
            return {}
        }
    }
});

export const { userListRequest, userListSuccess, userListFail, userListReset } = userListSlice.actions;

export default userListSlice.reducer;

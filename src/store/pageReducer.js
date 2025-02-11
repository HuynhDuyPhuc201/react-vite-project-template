import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    openSidebar: false,
};

const pageReducer = createSlice({
    name: 'page',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.openSidebar = !state.openSidebar;
        },
    },
});

export const { toggleSidebar } = pageReducer.actions;
export default pageReducer.reducer;

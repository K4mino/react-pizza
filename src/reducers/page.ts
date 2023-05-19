import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PageSliceState = {
    activePage: number
}

const initialState: PageSliceState = {
  activePage: 1,
}

export const pageSlice = createSlice({
    name:'page',
    initialState,
    reducers: {
        setActivePage:(state, action: PayloadAction<number>) => {
            state.activePage = action.payload
        }
    }
})

export const {setActivePage} = pageSlice.actions;

export default pageSlice.reducer;
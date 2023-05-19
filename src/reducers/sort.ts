import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SorthSliceState = {
    activeSort: string
}

const initialState: SorthSliceState = {
  activeSort: 'rating',
}

export const sortSlice = createSlice({
    name:'sort',
    initialState,
    reducers:{
        setActiveSort: (state,action: PayloadAction<string>) => {
            state.activeSort = action.payload
        }
    }
})

export const {setActiveSort} = sortSlice.actions;

export default sortSlice.reducer;
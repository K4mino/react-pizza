import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CategorySliceState = {
    activeCategory: number
}

const initialState: CategorySliceState = {
  activeCategory: 0,
}

export const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers: {
        setActiveCategory: (state, action: PayloadAction<number>) => {
            state.activeCategory = action.payload
        }
    }
})

export const {setActiveCategory} = categorySlice.actions;

export default categorySlice.reducer;
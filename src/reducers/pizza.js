import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getItems = createAsyncThunk(
    'pizza/fetchPizzas',
    async({activePage,activeCategory,activeSort}) => {
      const {data} = await axios.get(`https://6450d98ae1f6f1bb22a09070.mockapi.io/pizza/items?page=${activePage}&limit=4&sortBy=${activeSort}&category=${
        activeCategory === 0 ? "" : activeCategory
      }`)
      return data;
    })

const initialState = {
  items: [],
  status: 'loading'
}

export const pizzaSlice = createSlice({
    name:'pizza',
    initialState,
    reducers: {
        setItems:(state, action) => {
            state.items = action.payload
        }
    },
    extraReducers: {
      [getItems.fulfilled]: (state, action) => {
        state.items = action.payload
        state.status = 'fulfilled'
      },
      [getItems.pending]: (state) => {
        state.status = 'loading'
        state.items = []
      },
      [getItems.rejected]: (state) => {
        state.status = 'error'
        state.items = []
      }
    }
})


export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

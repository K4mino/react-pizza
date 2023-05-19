import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type FetchPizzasProps = {
  activePage: number,
  activeCategory: number,
  activeSort: string
}

type Pizza = {
  title: string,
  price: number,
  sizes: number[],
  types: number[],
  imageUrl: string,
  id: string,
  rating: number
}

export const getItems = createAsyncThunk<Pizza[], FetchPizzasProps>(
    'pizza/fetchPizzas',
    async({activePage,activeCategory,activeSort}) => {
      const {data} = await axios.get<Pizza[]>(`https://6450d98ae1f6f1bb22a09070.mockapi.io/pizza/items?page=${activePage}&limit=4&sortBy=${activeSort}&category=${
        activeCategory === 0 ? "" : activeCategory
      }`)
      return data;
    })

interface PizzaSliceState {
  items: Pizza[],
  status: Status
}

enum Status {
  LOADING = 'loading',
  ERROR = 'error',
  FULFILLED = 'fulfilled'
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING
}

export const pizzaSlice = createSlice({
    name:'pizza',
    initialState,
    reducers: {
        setItems:(state, action) => {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
      builder.addCase(getItems.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = Status.FULFILLED
      });

      builder.addCase(getItems.pending, (state, action) => {
        state.status = Status.LOADING
        state.items = []
      });

      builder.addCase(getItems.rejected, (state, action) => {
        state.status = Status.ERROR
        state.items = []
      })
    }
})


export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import sortReducer from '../reducers/sort';
import categoryReducer from '../reducers/category';
import searchReducer from '../reducers/search';
import pageReducer from '../reducers/page';
import cartReducer from '../reducers/cart';
import pizzaReducer from '../reducers/pizza';

export const store = configureStore({
  reducer: {
    sort: sortReducer,
    category: categoryReducer,
    search: searchReducer,
    page: pageReducer,
    cart: cartReducer,
    pizza: pizzaReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
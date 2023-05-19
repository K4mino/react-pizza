import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
    id: string,
    title: string,
    type: string,
    price: number,
    count: number,
    src: string,
    size: number
}

interface CartSliceState {
    items: CartItem[],
    totalPrice: number
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const foundItem = state.items.find((item) => item.id === action.payload.id)

            if(foundItem){
                foundItem.count++;
            }else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0);
        },
        minusItem: (state, action: PayloadAction<string>) => {
            const foundItem = state.items.find((item) => item.id === action.payload)

            if (foundItem && foundItem.count <= 1) {
                const updatedItems = state.items.filter((item) => item.id !== foundItem.id);
                state.items = updatedItems
              }

            if(foundItem){
                foundItem.count--;
                state.totalPrice = state.totalPrice - foundItem.price;
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            const foundItem = state.items.find((item) => item.id === action.payload)
            state.items = state.items.filter((item) => item.id !== action.payload)

            if(foundItem){
                state.totalPrice = state.items.reduce((sum, obj) => {
                    return sum - (foundItem.price * foundItem.count);
                }, state.totalPrice);
            }
        },
        clearCart: (state) => {
            state.items = []
            state.totalPrice= 0
        }
    }
})

export const {addItem,removeItem,minusItem,clearCart} = cartSlice.actions;

export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.quantity += 1;
      state.cartItems.push(action.payload);
      state.total += +(action.payload.price * action.payload.quantity);
    },
    removeItem: (state, action) => {
      state.quantity -= action.payload.quantity;
      // state.cartItems.
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;

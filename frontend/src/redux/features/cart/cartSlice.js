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
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
    },
    calculateTotals: state => {
      let total = 0;
      let quantity = 0;
      state.cartItems.forEach(item => {
        quantity += item.quantity;
        total += item.quantity * item.price;
      });
      state.quantity = quantity;
      state.total = total;
    },
  },
});

export const { addItem, removeItem, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;

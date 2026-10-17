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
      const newItem = action.payload;
      // One cart line per product + size; id stays the Stripe price id
      const cartId = `${newItem.id}-${newItem.size}`;
      const currentItem = state.cartItems.find(item => item.cartId === cartId);
      if (currentItem) {
        currentItem.quantity += newItem.quantity;
        return;
      }
      state.cartItems.push({ ...newItem, cartId });
    },
    removeItem: (state, action) => {
      const cartId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.cartId !== cartId);
    },
    increment: (state, { payload }) => {
      const item = state.cartItems.find(item => item.cartId === payload.cartId);
      item.quantity = item.quantity + 1;
    },
    decrement: (state, { payload }) => {
      const item = state.cartItems.find(item => item.cartId === payload.cartId);
      item.quantity = item.quantity - 1;
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
    clearCart: state => {
      state.cartItems = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  calculateTotals,
  increment,
  decrement,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

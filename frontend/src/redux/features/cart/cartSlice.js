import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

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
      let sameItem = action.payload;
      let currentItem = state.cartItems.find(item => item.id === sameItem.id);
      if (currentItem && currentItem.size === sameItem.size) {
        currentItem.quantity += 1;
        return;
      } else if (currentItem && currentItem.size !== sameItem.size) {
        sameItem.id = nanoid();
      }
      state.cartItems.push(action.payload);
      state.quantity += 1;
      state.total += +(action.payload.price * action.payload.quantity);
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
    },
    increment: (state, { payload }) => {
      const item = state.cartItems.find(item => item.id === payload.id);
      item.quantity = item.quantity + 1;
    },
    decrement: (state, { payload }) => {
      const item = state.cartItems.find(item => item.id === payload.id);
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

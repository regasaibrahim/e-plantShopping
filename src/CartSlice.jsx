import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // 
    addedToCart: {},
    totalItems: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload; // Extract the plant data
      const existingItem = state.items.find(item => item.name === newItem.name);

     
      if (existingItem) {
       
        existingItem.quantity += 1;
      } else {
      
        state.items.push({...newItem, quantity: 1});
      }

 
      state.addedToCart = {
        ...state.addedToCart,
        [newItem.name]: true,
      };


      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    removeItem: (state, action) => {
      const itemName = action.payload; 
      state.items = state.items.filter(item => item.name !== itemName); 
      delete state.addedToCart[itemName];
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; 
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity = quantity; 
      }
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    addedToCart: {},
    totalItems: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload; // Extract the plant data
      const existingItem = state.items.find(item => item.name === newItem.name);

      // Check if the item already exists in the cart
      if (existingItem) {
        // If it exists, increase the quantity
        existingItem.quantity += 1;
      } else {
        // Otherwise, add the new item to the cart with quantity 1
        state.items.push({...newItem, quantity: 1});
      }

      // Update the addedToCart state, ensuring it's set to true for the newly added item
      state.addedToCart = {
        ...state.addedToCart,
        [newItem.name]: true,
      };

      // Update the total item count
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    removeItem: (state, action) => {
      const itemName = action.payload; // Get the name of the item to remove
      state.items = state.items.filter(item => item.name !== itemName); // Remove item by name
      delete state.addedToCart[itemName];
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Get name and new quantity from the action payload
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity = quantity; // Update the quantity of the item
      }
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
import {createSlice} from '@reduxjs/toolkit';
import {generateUniqueId} from '../functions/GlobalFunction';


const initialState = {
  cartItem: [],
  orderHistory: [],
  
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a new item to the cart
    setCartItems: (state, action) => {
      const {id, name, price} = action.payload;
      // Check if item already exists
      const existingItemIndex = state.cartItem.findIndex(
        item => item.productId === action.payload.id,
      );
      if (existingItemIndex >= 0) {
console.log('vdfgth',state.cartItem[existingItemIndex].quantity);

        state.cartItem[existingItemIndex] = {
          ...state.cartItem[existingItemIndex],
         
           quantity: state.cartItem[existingItemIndex].quantity + 1,
         

        };
        return;
      } else {
        // Add new item with initial quantity of 1
        state.cartItem.push({
          productId: id,
          name,
          price,
          quantity: 1, // Initialize quantity to 1
          id: generateUniqueId(),
        });
      }
    },
    // Update quantity of an item
    updateQuantity: (state, action) => {
      const {id, delta, maxQuantity} = action.payload;
      const itemIndex = state.cartItem.findIndex(item => item.id === id);

      if (itemIndex >= 0) {
        const item = state.cartItem[itemIndex];
        const numericDelta = Number(delta);

        // Ensure quantity is a number and update it
        const currentQuantity = Number(item.quantity) || 1;

        let newQuantity = currentQuantity + numericDelta; // Prevent quantity from going below 1
        if (delta == 1) {
          if (currentQuantity < Number(maxQuantity)) {
            state.cartItem[itemIndex] = {...item, quantity: newQuantity};
          }
        } else {
          if (newQuantity <= 0) {
            // Remove the item if the new quantity is 0 or less
            state.cartItem.splice(itemIndex, 1);
          } else {
            newQuantity = Math.min(newQuantity);
            state.cartItem[itemIndex] = {...item, quantity: newQuantity};
          }
        }
      }

      //

      //
    },
    placeOrder: (state,) => {
      // Create an order with the details of all items in the cart
      const order = state.cartItem.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }))
    
      
      state.orderHistory.push(order); // Store the detailed order in orderHistory
      state.cartItem = []; // Clear the cart after placing the order
    
    },
  },
});

export const {setCartItems, updateQuantity, placeOrder} = cartSlice.actions;

export default cartSlice.reducer;

import { updateQuantity } from "../Redux/cartSlice";
import { store } from "../Redux/store";

 export const generateUniqueId = (length = 20) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  };
 export const handleIncreaseQuantity = (id,productId) => {
  const products=store.getState().product.products
    const product = products.find(product => product.id === productId);
    store.dispatch(updateQuantity({id, delta: 1, maxQuantity: product.quantity}));
  };
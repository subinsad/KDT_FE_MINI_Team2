// store/cartStore.js
import { create } from 'zustand';
import axios from 'axios';

const useCartStore = create((set) => ({
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  fetchCartCount: async (secretKey) => {
    try {
      const response = await axios.get("/api/v1/basket/all", {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      });
      set({ cartCount: response.data.data.length });
    } catch (error) {
      console.error("Failed to fetch cart count", error);
    }
  }
}));

export default useCartStore;

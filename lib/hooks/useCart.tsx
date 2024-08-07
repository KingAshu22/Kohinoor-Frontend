import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  item: ProductType;
  quantity: number;
  category: string;
  color?: string; // ? means optional
  size?: string; // ? means optional
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (idToRemove: string) => void;
  increaseQuantity: (idToIncrease: string) => void;
  decreaseQuantity: (idToDecrease: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, category, color, size } = data;
        const currentItems = get().cartItems; // all the items already in cart
        const isExisting = currentItems.find(
          (cartItem) => cartItem.item._id === item._id
        );

        if (isExisting) {
          return toast("Item already in cart");
        }

        set({
          cartItems: [
            ...currentItems,
            { item, quantity, category, color, size },
          ],
        });
        toast.success("Item added to cart", { icon: "🛒" });
      },
      removeItem: (idToRemove: String) => {
        const newCartItems = get().cartItems.filter(
          (cartItem) => cartItem.item._id !== idToRemove
        );
        set({ cartItems: newCartItems });
        toast.success("Item removed from cart");
      },
      increaseQuantity: (idToIncrease: String) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === idToIncrease
            ? {
                ...cartItem,
                quantity:
                  cartItem.category === "Gross"
                    ? cartItem.quantity + 2
                    : cartItem.quantity + 1,
              }
            : cartItem
        );
        set({ cartItems: newCartItems });
        toast.success("Item quantity increased");
      },
      decreaseQuantity: (idToDecrease: string) => {
        const currentItems = get().cartItems;
        const updatedItems = currentItems.map((cartItem) => {
          if (cartItem.item._id === idToDecrease) {
            if (
              (cartItem.category === "Gross" && cartItem.quantity === 10) ||
              (cartItem.category === "Individual" && cartItem.quantity === 1)
            ) {
              // Remove the item from the cart if quantity is 10
              return null;
            } else {
              // Decrease the quantity by 2
              return {
                ...cartItem,
                quantity:
                  cartItem.category === "Gross"
                    ? cartItem.quantity - 2
                    : cartItem.quantity - 1,
              };
            }
          }
          return cartItem;
        });

        // Filter out null items (i.e., items to be removed)
        const newCartItems = updatedItems.filter(Boolean) as CartItem[];

        set({ cartItems: newCartItems });
        toast.success("Item quantity decreased");
      },
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useOrderStore = create(
    persist(
        (set) => ({
            orderItem: {},
            setOrderItem: (product) => set((state) => ({ orderItem: product })),
            removeFromCart: (id) =>
                set((state) => ({
                    orders: state.orders.filter((item) => item.id !== id),
                })),
            clearCart: () => set({ orders: [] }),
        }),
        {
            name: 'order-storage', // Tên key lưu trong localStorage
            getStorage: () => localStorage, // Chọn nơi lưu trữ (localStorage hoặc sessionStorage)
        },
    ),
);
export default useOrderStore;

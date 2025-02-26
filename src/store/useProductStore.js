import { create } from 'zustand';

export const useProductStore = create((set) => ({
    sort: 'desc',
    rating: null,
    price: 0,
    handleSortandFiler: (newState) => set((state) => ({ ...state, ...newState })), // ✅ Giữ lại state cũ
}));

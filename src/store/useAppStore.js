import { create } from 'zustand';

export const useAppStore = create((set) => ({
    openSidebar: false,
    openModal: false,
    toggleSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })), // ✅ Lấy state từ store
    toggleModal: () => set((state) => ({ openModal: !state.openModal })), // ✅ Lấy state từ store
}));

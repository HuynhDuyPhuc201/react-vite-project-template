import { create } from 'zustand';

export const useAppStore = create((set) => ({
    isOverlayVisible: false, // ✅ State để quản lý overlay nền mờ
    searchResults: [],
    searchValue: '',
    openSidebar: false,
    openModal: false,
    toggleSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })), // ✅ Lấy state từ store
    toggleModal: () => set((state) => ({ openModal: !state.openModal })), // ✅ Lấy state từ store
    setSearchResults: (data) => set(() => ({ searchResults: data })),
    setSearchValue: (data) => set(() => ({ searchValue: data })),
    setOverlayVisible: (isVisible) => set({ isOverlayVisible: isVisible }), // ✅ Hàm bật/tắt overlay
}));

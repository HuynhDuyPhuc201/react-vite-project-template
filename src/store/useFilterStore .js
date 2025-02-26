import { create } from 'zustand';

export const useFilterStore = create((set) => ({
    sort: 'asc',
    rating: '',
    price: '',
    category: '',
    setSort: (sort) => set({ sort }),
    setRating: (rating) => set({ rating }),
    setPrice: (price) => set({ price }),
    setCategory: (category) => set({ category }),
}));

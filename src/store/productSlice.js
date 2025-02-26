import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productService } from '~/services/product.service';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const data = await productService.getAll();
        console.log('data', data);
        return data;
    } catch (error) {
        console.log(error);
    }
});
const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        sort: 'desc',
        rating: null,
        price: 0,
        loading: false,
        error: null,
    },
    reducers: {
        handleSortandFiler: (state, action) => {
            (state.sort = action.payload.sort),
                (state.rating = action.payload.rating),
                (state.price = action.payload.price);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { handleSortandFiler } = productSlice.actions;

export default productSlice;

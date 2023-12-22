import { createSlice } from "@reduxjs/toolkit";
import { ProductsState } from "../types/products-state.type";
import {
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addNewProduct,
} from "./products.actions";

const initialState: ProductsState = {
  products: [],
  product: null,
  pending: {
    products: false,
    product: false,
  },
  errors: {
    products: null,
    product: null,
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ============ GET PRODUCT ============ //
      .addCase(getProduct.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.pending.product = false;
        state.product = payload;
      })
      .addCase(getProduct.rejected, (state, action: any & { payload: any }) => {
        state.pending.product = false;
        state.errors.product = action.payload.message;
      })
      // ============ GET PRODUCTS ============ //
      .addCase(getAllProducts.pending, (state) => {
        state.pending.products = true;
        state.errors.products = null;
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.pending.products = false;
        state.products = payload;
      })
      .addCase(
        getAllProducts.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.products = false;
          state.errors.products = action.payload.message;
        }
      )
      // ============ DELETE PRODUCT ============ //
      .addCase(deleteProduct.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.pending.product = false;
        state.product = payload;
      })
      .addCase(
        deleteProduct.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.product = false;
          state.errors.product = action.payload.message;
        }
      )
      // ============ UPDATE PRODUCT ============ //
      .addCase(updateProduct.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.pending.product = false;
        state.product = payload;
      })
      .addCase(
        updateProduct.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.product = false;
          state.errors.product = action.payload.message;
        }
      )
      // ============ ADD NEW PRODUCT ============ //
      .addCase(addNewProduct.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(addNewProduct.fulfilled, (state, { payload }) => {
        state.pending.product = false;
        state.product = payload;
      })
      .addCase(
        addNewProduct.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.product = false;
          state.errors.product = action.payload.message;
        }
      );
  },
});

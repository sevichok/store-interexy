import { createAsyncThunk } from "@reduxjs/toolkit";

import repository from "repository";

// ============ DTOS ============ //
import { ProductDto } from "../types/product-dto.type";

export const getAllProducts = createAsyncThunk<ProductDto[]>(
  "GET/products/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await repository.get("/products/all");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getProduct = createAsyncThunk<ProductDto, { productId: string }>(
  "GET/products/:userId",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await repository.get(`/products/${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk<
  ProductDto,
  { productId: string }
>("DELETE/products/:userId", async ({ productId }, { rejectWithValue }) => {
  try {
    const response = await repository.delete(`/products/${productId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const addNewProduct = createAsyncThunk<
  ProductDto,
  { newProduct: ProductDto }
>("POST/products/new", async ({ newProduct }, { rejectWithValue }) => {
  try {
    const response = await repository.post(`/products/new`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const updateProduct = createAsyncThunk<
  ProductDto,
  { productId: number; newProduct: ProductDto }
>(
  "PUT/products/new",
  async ({ productId, newProduct }, { rejectWithValue }) => {
    try {
      const response = await repository.put(`/products/${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

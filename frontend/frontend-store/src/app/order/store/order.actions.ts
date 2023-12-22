import { createAsyncThunk } from "@reduxjs/toolkit";

import repository from "repository";

// ============ DTOS ============ //
import { OrderDto, OrderItemDto } from "../types/order-dto.type";
import { ProductDto } from "@app/products/types/product-dto.type";

export const getAllOrders = createAsyncThunk<OrderDto[]>(
  "GET/orders/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await repository.get("/orders/all");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getActiveOrder = createAsyncThunk<OrderDto>(
  "GET/orders/active",
  async (_, { rejectWithValue }) => {
    try {
      const response = await repository.get("/orders/active");
      const sort = response.data.orderItems.sort(
        (a: ProductDto, b: ProductDto) => a.id - b.id
      );
      return {
        ...response.data,
        orderItems: sort,
      };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getOrderById = createAsyncThunk<OrderDto, { orderId: number }>(
  "GET/orders/:id",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const response = await repository.get(`/orders/${orderId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createOrder = createAsyncThunk<OrderDto, Partial<OrderItemDto>>(
  "POST/orders/new",
  async (data, { rejectWithValue }) => {
    try {
      const response = await repository.post(`/orders/new`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateOrder = createAsyncThunk<OrderDto, Partial<OrderItemDto>>(
  "POST/orders/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await repository.post(`/orders/update`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const cancelOrder = createAsyncThunk<OrderDto, { orderId: number }>(
  "PATCH/orders/:id/cancel",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const response = await repository.patch(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const completeOrder = createAsyncThunk<OrderDto, { orderId: number }>(
  "PATCH/orders/:id/complete",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const response = await repository.patch(`/orders/${orderId}/complete`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteOrder = createAsyncThunk<OrderDto, { orderId: number }>(
  "DELETE/orders/:id/delete",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const response = await repository.delete(`/orders/${orderId}/delete`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteOrderItemById = createAsyncThunk<
  OrderItemDto,
  { orderItemId: number }
>("DELETE/items/:id", async ({ orderItemId }, { rejectWithValue }) => {
  try {
    const response = await repository.delete(`/items/${orderItemId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const updateOrderItemQuantity = createAsyncThunk<
  OrderItemDto,
  { orderItemId: number; newQuantity: number }
>(
  "PATCH/items/update/:orderItemId/:newQuantity",
  async ({ orderItemId, newQuantity }, { rejectWithValue }) => {
    try {
      const response = await repository.patch(
        `/items/update/${orderItemId}/${newQuantity}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

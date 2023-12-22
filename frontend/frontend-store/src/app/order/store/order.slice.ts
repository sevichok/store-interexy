import { createSlice } from "@reduxjs/toolkit";
import { OrderState } from "../types/order-state.type";
import {
  cancelOrder,
  completeOrder,
  createOrder,
  deleteOrder,
  deleteOrderItemById,
  getActiveOrder,
  getOrderById,
  updateOrder,
  updateOrderItemQuantity,
} from "./order.actions";

const initialState: OrderState = {
  order: null,
  pending: {
    order: false,
  },
  errors: {
    order: null,
  },
};
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ============ GET ORDER BY ID ============ //
      .addCase(getOrderById.pending, (state) => {
        state.pending.order = true;
        state.errors.order = null;
      })
      .addCase(getOrderById.fulfilled, (state, { payload }) => {
        state.pending.order = false;
        state.order = payload;
      })
      .addCase(
        getOrderById.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.order = false;
          state.errors.order = action.payload.message;
        }
      )
      // ============ GET ACTIVE ORDER ============ //
      .addCase(getActiveOrder.pending, (state) => {
        state.pending.order = true;
        state.errors.order = null;
      })
      .addCase(getActiveOrder.fulfilled, (state, { payload }) => {
        state.pending.order = false;
        state.order = payload;
      })
      .addCase(
        getActiveOrder.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.order = false;
          state.errors.order = action.payload.message;
        }
      )
      // ============ CANCEL ORDER ============ //
      .addCase(cancelOrder.pending, (state) => {
        state.pending.order = true;
        state.errors.order = null;
      })
      .addCase(cancelOrder.fulfilled, (state, { payload }) => {
        state.pending.order = false;
        state.order = payload;
        // state.order = null;
      })
      .addCase(
        cancelOrder.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.order = false;
          state.errors.order = action.payload.message;
        }
      )
      // ============ COMPLETE ORDER ============ //
      .addCase(completeOrder.pending, (state) => {
        state.pending.order = true;
        state.errors.order = null;
      })
      .addCase(completeOrder.fulfilled, (state, { payload }) => {
        state.pending.order = false;
        state.order = null;
      })
      .addCase(
        completeOrder.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.order = false;
          state.errors.order = action.payload.message;
        }
      )
      // ============ DELETE ORDER ============ //
      .addCase(deleteOrder.pending, (state) => {
        state.pending.order = true;
        state.errors.order = null;
      })
      .addCase(deleteOrder.fulfilled, (state, { payload }) => {
        state.pending.order = false;
        state.order = null;
      })
      .addCase(
        deleteOrder.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.order = false;
          state.errors.order = action.payload.message;
        }
      )
      // ============ CREATE ORDER ============ //
      .addCase(createOrder.pending, (state) => {
        state.pending.order = true;
        state.errors.order = null;
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.pending.order = false;
        // console.log(payload);
        // state.order = payload;
      })
      .addCase(
        createOrder.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.order = false;
          state.errors.order = action.payload.message;
        }
      )
      // ============ UPDATE ORDER ============ //
      .addCase(updateOrder.pending, (state) => {
        state.pending.order = true;
        state.errors.order = null;
      })
      .addCase(updateOrder.fulfilled, (state, { payload }) => {
        state.pending.order = false;
        // state.order = payload;
      })
      .addCase(
        updateOrder.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.order = false;
          state.errors.order = action.payload.message;
        }
      )
      // ============ DELETE ORDER ITEM ============ //
      .addCase(deleteOrderItemById.pending, (state) => {
        state.pending.order = true;
        state.errors.order = null;
      })
      .addCase(deleteOrderItemById.fulfilled, (state, { payload }) => {
        state.pending.order = false;
        // state.order = payload;
      })
      .addCase(
        deleteOrderItemById.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.order = false;
          state.errors.order = action.payload.message;
        }
      )
      // ============ UPDATE ORDER ITEM QUANTITY ============ //
      .addCase(updateOrderItemQuantity.pending, (state) => {
        state.pending.order = true;
        state.errors.order = null;
      })
      .addCase(updateOrderItemQuantity.fulfilled, (state, { payload }) => {
        state.pending.order = false;
        // state.order = payload;
      })
      .addCase(
        updateOrderItemQuantity.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.order = false;
          state.errors.order = action.payload.message;
        }
      );
  },
});

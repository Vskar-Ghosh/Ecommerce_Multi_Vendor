import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { base_url } from "../../utils/config";
import axios from "axios";

export const place_order = createAsyncThunk(
  "order/place_order",
  async (
    { price, products, shipping_fee, shippingInfo, userId, navigate, items },
    { getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/home/order/place-order`,
        {
          price,
          products,
          shipping_fee,
          shippingInfo,
          userId,
          navigate,
          items,
        },
        config
      );

      navigate("/payment", {
        state: {
          price: price + shipping_fee,
          items,
          orderId: data.orderId,
        },
      });
      console.log(data);
      return true;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const get_orders = createAsyncThunk(
  "order/get_orders",
  async (
    { customerId, status },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/customer/get-orders/${customerId}/${status}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const get_order = createAsyncThunk(
  "order/get_order",
  async (orderId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/customer/get-order/${orderId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    errorMessage: "",
    successMessage: "",
    myOrder: {},
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //   .addCase(add_to_card.pending, (state, _) => {
      //     state.loader = true;
      //   })
      // .addCase(add_to_card.rejected, (state, { payload }) => {
      //   state.errorMessage = payload.error;
      // })
      .addCase(get_orders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
      })
      .addCase(get_order.fulfilled, (state, { payload }) => {
        state.myOrder = payload.order;
      });
  },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;

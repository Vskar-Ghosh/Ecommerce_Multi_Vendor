import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { base_url } from "../../utils/config";

export const get_dashboard_index_data = createAsyncThunk(
  "dashboard/get_dashboard_index_data",
  async (userId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/customer/get-dashboard-data/${userId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const dashboardReducer = createSlice({
  name: "dasjboard",
  initialState: {
    recentOrders: [],
    errorMessage: "",
    successMessage: "",
    totalOrder: 0,
    pendingOrder: 0,
    cancelledOrder: 0,
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
      //   .addCase(add_to_card.rejected, (state, { payload }) => {
      //     state.errorMessage = payload.error;
      //   })
      .addCase(get_dashboard_index_data.fulfilled, (state, { payload }) => {
        state.pendingOrder = payload.pendingOrder;
        state.totalOrder = payload.totalOrder;
        state.cancelledOrder = payload.cancelledOrder;
        state.recentOrders = payload.recentOrders;
      });
  },
});

export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;

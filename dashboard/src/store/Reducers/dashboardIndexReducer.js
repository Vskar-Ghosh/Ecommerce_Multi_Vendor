import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import api from "../../api/api";
import { base_url } from "../../utils/config";
import axios from "axios";

export const get_seller_dashboard_index_data = createAsyncThunk(
  "dashboardIndex/get_seller_dashboard_index_data",
  async (_, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/seller/get-dashboard-index-data`,
        config
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_admin_dashboard_index_data = createAsyncThunk(
  "dashboardIndex/get_admin_dashboard_index_data",
  async (_, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/admin/get-dashboard-index-data`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboardIndexReducer = createSlice({
  name: "dashboardIndex",
  initialState: {
    recentMessage: [],
    recentOrders: [],
    totalSale: 0,
    totalOrder: 0,
    totalProduct: 0,
    totalPendingOrder: 0,
    totalSeller: 0,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        get_seller_dashboard_index_data.fulfilled,
        (state, { payload }) => {
          state.totalSale = payload.totalSale;
          state.totalOrder = payload.totalOrder;
          state.totalProduct = payload.totalProduct;
          state.totalPendingOrder = payload.totalPendingOrder;
          state.recentOrders = payload.recentOrders;
          state.recentMessage = payload.messages;
        }
      )
      .addCase(
        get_admin_dashboard_index_data.fulfilled,
        (state, { payload }) => {
          state.totalSale = payload.totalSale;
          state.totalOrder = payload.totalOrder;
          state.totalProduct = payload.totalProduct;
          state.totalSeller = payload.totalSeller;
          state.recentOrders = payload.recentOrders;
          state.recentMessage = payload.messages;
        }
      );
    //   .addCase(get_seller.fulfilled, (state, { payload }) => {
    //     state.seller = payload.seller;
    //   })
    //   .addCase(seller_status_update.fulfilled, (state, { payload }) => {
    //     state.seller = payload.seller;
    //     state.successMessage = payload.message;
    //   })
    //   .addCase(get_active_sellers.fulfilled, (state, { payload }) => {
    //     state.sellers = payload.sellers;
    //     state.totalSeller = payload.totalSeller;
    //   })
    //   .addCase(get_deactive_sellers.fulfilled, (state, { payload }) => {
    //     state.sellers = payload.sellers;
    //     state.totalSeller = payload.totalSeller;
    //   })
    //   .addCase(active_stripe_connect_account.pending, (state, { payload }) => {
    //     state.loader = true;
    //   })
    //   .addCase(active_stripe_connect_account.rejected, (state, { payload }) => {
    //     state.loader = false;
    //     state.errorMessage = payload.message;
    //   })
    //   .addCase(
    //     active_stripe_connect_account.fulfilled,
    //     (state, { payload }) => {
    //       state.loader = false;
    //       state.successMessage = payload.message;
    //     }
    //   );
  },
});
export const { messageClear } = dashboardIndexReducer.actions;
export default dashboardIndexReducer.reducer;

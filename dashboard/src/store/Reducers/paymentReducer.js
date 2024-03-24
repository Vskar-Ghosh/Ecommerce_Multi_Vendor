import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import api from "../../api/api";
import axios from "axios";
import { base_url } from "../../utils/config";

export const get_seller_payment_details = createAsyncThunk(
  "payment/get_seller_payment_details",
  async (sellerId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/payment/seller-payment-details/${sellerId}`,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const send_withdrowl_request = createAsyncThunk(
  "payment/send_withdrowl_request",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/payment/withdrowl-request`,
        info,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_payment_request = createAsyncThunk(
  "payment/get_payment_request",
  async (_, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/payment/request`,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const confirm_parment_request = createAsyncThunk(
  "payment/confirm_parment_request",
  async (paymentId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/payment/payment-request-confirm`,
        { paymentId },
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const paymentReducer = createSlice({
  name: "payment",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    pendingWithdrows: [],
    successWithdrows: [],
    totalAmount: 0,
    withdrowAmount: 0,
    pendingAmount: 0,
    availableAmount: 0,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_seller_payment_details.fulfilled, (state, { payload }) => {
        state.pendingWithdrows = payload.pendingWithdrows;
        state.successWithdrows = payload.successWithdrows;
        state.totalAmount = payload.totalAmount;
        state.availableAmount = payload.availableAmount;
        state.withdrowAmount = payload.withdrowAmount;
        state.pendingAmount = payload.pendingAmount;
      })
      .addCase(send_withdrowl_request.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(send_withdrowl_request.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(send_withdrowl_request.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.availableAmount =
          state.availableAmount - payload.withdrowal.amount;
        state.pendingAmount = payload.withdrowal.amount;
        state.pendingWithdrows = [
          ...state.pendingWithdrows,
          payload.withdrowal,
        ];
      })
      .addCase(get_payment_request.fulfilled, (state, { payload }) => {
        state.pendingWithdrows = payload.withdrowalRequest;
      })
      .addCase(confirm_parment_request.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(confirm_parment_request.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(confirm_parment_request.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        const temp = state.pendingWithdrows.filter(
          (r) => r._id !== payload.payment._id
        );
        state.pendingWithdrows = temp;
      });
  },
});
export const { messageClear } = paymentReducer.actions;
export default paymentReducer.reducer;
